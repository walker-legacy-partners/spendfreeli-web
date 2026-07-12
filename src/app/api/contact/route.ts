import { NextResponse, type NextRequest } from 'next/server';
import { Resend } from 'resend';
import { CONTACT_EMAIL } from '@/lib/constants';
import type { ApiResponse, ContactSubject, ContactSubmission } from '@/types';

/**
 * POST /api/contact — send a contact-form submission via Resend.
 *
 * Two emails per successful submission:
 *   1. Notification to CONTACT_EMAIL (required; failure fails the request).
 *   2. Confirmation to the sender (best-effort; a failure here is logged
 *      but the request still returns success because we already received
 *      their message).
 *
 * Same rate-limit caveat as the waitlist route — in-memory per-instance
 * only, replace with Upstash for real defense.
 */

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_MAP_SIZE = 1000;
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 5000;
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const rateLimitMap = new Map<string, number>();

const validSubjects: readonly ContactSubject[] = [
  'general',
  'feature',
  'bug',
  'partnership',
  'press',
  'other',
];

const subjectLabels: Record<ContactSubject, string> = {
  general: 'General Question',
  feature: 'Feature Request',
  bug: 'Bug Report',
  partnership: 'Partnership',
  press: 'Press Inquiry',
  other: 'Other',
};

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  const ip = getClientIp(request);
  if (isCurrentlyRateLimited(ip)) {
    return jsonError(
      "You've already sent a message recently. Please give us a moment to respond.",
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid request body.', 400);
  }

  const parsed = parseSubmission(body);
  if (!parsed.ok) return jsonError(parsed.error, 400);

  const { name, email, subject, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('contact: missing RESEND_API_KEY');
    return jsonError(
      'The contact form is temporarily unavailable. Please try again shortly.',
      503,
    );
  }

  const resend = new Resend(apiKey);
  const subjectLabel = subjectLabels[subject];

  try {
    await resend.emails.send({
      from: `SpendFreeli Website <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Contact Form] ${subjectLabel} — ${name}`,
      html: buildNotificationHtml({ name, email, subjectLabel, message }),
    });
  } catch (err) {
    console.error('contact: notification email failed', err);
    return jsonError(
      'Something went wrong on our end. Please try again.',
      502,
    );
  }

  // Non-critical: user confirmation. We already have their message; a
  // delivery failure here (bad domain, temporarily unreachable) should
  // not fail the request.
  try {
    await resend.emails.send({
      from: `SpendFreeli <${CONTACT_EMAIL}>`,
      to: email,
      subject: 'We received your message — SpendFreeli',
      html: buildConfirmationHtml({ name }),
    });
  } catch (err) {
    console.warn('contact: confirmation email failed (non-fatal)', err);
  }

  markRateLimited(ip);
  return NextResponse.json<ApiResponse>({ ok: true, data: null });
}

function buildNotificationHtml({
  name,
  email,
  subjectLabel,
  message,
}: {
  name: string;
  email: string;
  subjectLabel: string;
  message: string;
}): string {
  const rows = [
    `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
    `<p><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>`,
    `<hr>`,
    `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
  ];
  return rows.join('');
}

function buildConfirmationHtml({ name }: { name: string }): string {
  return [
    `<p>Hi ${escapeHtml(name)},</p>`,
    `<p>Thanks for reaching out, we&rsquo;ll respond shortly.</p>`,
    `<p>— The SpendFreeli team</p>`,
  ].join('');
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

function parseSubmission(
  body: unknown,
):
  | { ok: true; data: ContactSubmission }
  | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, error: 'Invalid submission.' };
  }
  const raw = body as Record<string, unknown>;

  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  if (name.length === 0 || name.length > NAME_MAX) {
    return { ok: false, error: 'Please enter your name.' };
  }

  const email =
    typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : '';
  if (
    email.length === 0 ||
    email.length > EMAIL_MAX ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  const subject = raw.subject as ContactSubject;
  if (!validSubjects.includes(subject)) {
    return { ok: false, error: 'Please choose a subject.' };
  }

  const message =
    typeof raw.message === 'string' ? raw.message.trim() : '';
  if (message.length < MESSAGE_MIN) {
    return {
      ok: false,
      error: `Please enter a message of at least ${MESSAGE_MIN} characters.`,
    };
  }
  if (message.length > MESSAGE_MAX) {
    return { ok: false, error: 'That message is too long.' };
  }

  return { ok: true, data: { name, email, subject, message } };
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
