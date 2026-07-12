import { NextResponse, type NextRequest } from 'next/server';
import type { ApiResponse } from '@/types';

/**
 * POST /api/waitlist — subscribe an email to the Kit (ConvertKit) V3 form.
 *
 * Contract: request body { email: string }. Response is the shared
 * `ApiResponse` shape so the client only needs to check `ok`.
 *
 * Rate limiting: an in-memory Map provides best-effort per-IP throttling
 * within a warm serverless instance. Vercel instances are ephemeral so
 * this is *not* a real defense against abuse — replace with Upstash
 * Ratelimit before we start marketing at scale.
 */

// Node runtime — we call fetch to a third-party API and want stable
// per-instance memory for the rate-limit map.
export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_MAP_SIZE = 1000;
const rateLimitMap = new Map<string, number>();

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  const ip = getClientIp(request);

  // Reject repeat successful signups from the same IP, but do NOT count
  // this hit yet — a validation error or upstream failure below should
  // not lock the user out.
  if (isCurrentlyRateLimited(ip)) {
    return jsonError(
      "You've already joined the list from this device. Check your email.",
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid request body.', 400);
  }

  const email = extractEmail(body);
  if (!email) {
    return jsonError('Please enter a valid email address.', 400);
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  if (!apiKey || !formId) {
    console.error('waitlist: missing KIT_API_KEY or KIT_FORM_ID');
    return jsonError(
      'The waitlist is temporarily unavailable. Please try again shortly.',
      503,
    );
  }

  try {
    const kitResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${encodeURIComponent(formId)}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: apiKey, email }),
      },
    );

    if (!kitResponse.ok) {
      const detail = await kitResponse.text().catch(() => '');
      console.error(
        'waitlist: Kit subscribe rejected',
        kitResponse.status,
        detail.slice(0, 500),
      );
      return jsonError(
        'Something went wrong on our end. Please try again.',
        502,
      );
    }

    markRateLimited(ip);
    return NextResponse.json<ApiResponse>({ ok: true, data: null });
  } catch (err) {
    console.error('waitlist: Kit request threw', err);
    return jsonError('Network error. Please try again.', 500);
  }
}

function jsonError(
  message: string,
  status: number,
): NextResponse<ApiResponse> {
  return NextResponse.json<ApiResponse>(
    { ok: false, error: message },
    { status },
  );
}

function extractEmail(body: unknown): string | null {
  if (typeof body !== 'object' || body === null) return null;
  const raw = (body as Record<string, unknown>).email;
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (trimmed.length === 0 || trimmed.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;
  return trimmed.toLowerCase();
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function isCurrentlyRateLimited(ip: string): boolean {
  const expiresAt = rateLimitMap.get(ip);
  return expiresAt !== undefined && expiresAt > Date.now();
}

function markRateLimited(ip: string): void {
  const now = Date.now();

  if (rateLimitMap.size > RATE_LIMIT_MAX_MAP_SIZE) {
    for (const [key, expiresAt] of rateLimitMap) {
      if (expiresAt < now) rateLimitMap.delete(key);
    }
  }

  rateLimitMap.set(ip, now + RATE_LIMIT_WINDOW_MS);
}
