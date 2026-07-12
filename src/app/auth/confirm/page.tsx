'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Click-wall confirmation page — SpendFreeli
 *
 * WHY THIS EXISTS:
 * Modern email security scanners (Gmail, Outlook/Microsoft ATP,
 * Proofpoint, Mimecast) use headless Chromium crawlers that execute
 * JavaScript, including React useEffect and window.location.replace().
 * Any auto-redirect on page load will consume the one-time Supabase
 * PKCE token before the real user clicks, causing "token not found."
 *
 * THE RULE: Zero network calls and zero navigation on page load.
 * The confirmation URL is only followed when a human clicks the button.
 * Bots render the page, find a button with an onClick handler, and
 * move on without consuming the token.
 *
 * WHAT NOT TO DO — these all fail against modern scanners:
 *   ✗ useEffect(() => location.replace(url), [])
 *   ✗ <meta http-equiv="refresh" content="0;url=...">
 *   ✗ <script>window.location.href = url</script>
 *   ✗ router.push(url) inside useEffect
 */
function ConfirmClickWall() {
  const searchParams = useSearchParams();
  const raw = searchParams.get('confirmation_url');
  const confirmationUrl = raw ? decodeURIComponent(raw) : null;

  function handleConfirm() {
    if (confirmationUrl) {
      window.location.href = confirmationUrl;
    }
  }

  if (!confirmationUrl) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="text-5xl mb-6">💰</div>
          <h1 className="text-2xl font-bold text-text-primary mb-3">SpendFreeli</h1>
          <p className="text-error text-sm mt-4">
            Invalid confirmation link. Please request a new magic link from the app.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-6">💰</div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">SpendFreeli</h1>
        <p className="text-text-secondary mb-8">
          Tap the button below to complete your sign-in.
        </p>
        <button
          onClick={handleConfirm}
          className="w-full bg-primary text-white font-bold text-base py-4 px-8 rounded-full hover:bg-primary-dark active:scale-95 transition-all duration-150"
        >
          Complete sign-in
        </button>
        <p className="mt-6 text-xs text-text-secondary">
          This link expires in 1 hour. If it no longer works, request a new one from the app.
        </p>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-5xl">💰</div>
        </main>
      }
    >
      <ConfirmClickWall />
    </Suspense>
  );
}
