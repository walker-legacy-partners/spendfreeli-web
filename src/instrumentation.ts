/**
 * Next.js instrumentation hook — runs once when the server starts.
 * https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
 *
 * Used to assert required env vars are present before serving any
 * request. A production deploy without KIT_API_KEY / KIT_FORM_ID /
 * RESEND_API_KEY throws here and the deployment fails visibly.
 */
export async function register() {
  const { assertServerEnv } = await import('./lib/env');
  assertServerEnv();
}
