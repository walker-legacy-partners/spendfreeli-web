import type { Metadata } from 'next';
import { AuthCallbackClient } from './AuthCallbackClient';

/**
 * Server wrapper for the auth callback.
 *
 * Handles metadata (title, robots noindex) since the client component
 * cannot export metadata. The actual redirect logic runs inside
 * `AuthCallbackClient` because it needs to read `window.location.hash`,
 * which is not available on the server.
 *
 * The route MUST also be marked no-cache at the CDN layer — see the
 * `vercel.json` entry (added in Step 15) that sets Cache-Control
 * `no-store, no-cache, must-revalidate` on this path. A magic-link
 * fragment must never be replayed against a stale cached response.
 */

export const metadata: Metadata = {
  title: 'Signing in',
  robots: { index: false, follow: false },
};

export default function AuthCallbackPage() {
  return <AuthCallbackClient />;
}
