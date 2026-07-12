/**
 * Server-side env validation.
 *
 * `assertServerEnv()` is invoked from `src/instrumentation.ts` at server
 * startup. In a production deploy (Vercel's `VERCEL_ENV=production`),
 * a missing required env var throws immediately so the deploy fails
 * loudly instead of silently 503-ing at request time. In dev and
 * preview, missing values are logged as warnings — API routes already
 * handle their own missing env gracefully (see the waitlist and
 * contact routes).
 *
 * Vercel automatically sets:
 *   VERCEL_ENV = production | preview | development
 *
 * Required vars are the third-party API secrets. Everything else is
 * either public (SITE_URL / brand copy in `constants.ts`) or optional.
 */

const REQUIRED_KEYS = [
  'KIT_API_KEY',
  'KIT_FORM_ID',
  'RESEND_API_KEY',
] as const;

export function assertServerEnv(): void {
  const missing = REQUIRED_KEYS.filter((key) => !process.env[key]);
  if (missing.length === 0) return;

  const label = missing.join(', ');
  if (process.env.VERCEL_ENV === 'production') {
    throw new Error(
      `Missing required environment variables in production: ${label}. ` +
        'Configure these in the Vercel project dashboard.',
    );
  }

  console.warn(
    `[env] Missing env vars: ${label} (routes will 503 until set)`,
  );
}
