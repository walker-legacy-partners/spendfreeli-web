'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * JavaScript-redirect confirmation page.
 *
 * Purpose: Gmail's link-prefetcher fetches URLs found in email HTML to
 * check for safety/spam. That prefetch consumes single-use Supabase
 * magic-link/confirmation tokens before the human ever clicks the
 * button. This page acts as a safe intermediate: Gmail's bot fetches
 * this page but does NOT execute the JS redirect, so the underlying
 * Supabase confirmation URL stays unconsumed until the real user
 * clicks through and their browser runs the effect below.
 *
 * The Supabase email template points here with the actual
 * confirmation URL passed as an urlquery-encoded param. On the
 * client, we decode it and `location.replace()` to hand control
 * back to Supabase. Users with JS disabled see the fallback link.
 */

function ConfirmRedirect() {
  const searchParams = useSearchParams();
  const confirmationUrl = searchParams.get('confirmation_url');

  useEffect(() => {
    if (confirmationUrl) {
      window.location.replace(decodeURIComponent(confirmationUrl));
    }
  }, [confirmationUrl]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="text-5xl mb-6">💰</div>
        <h1 className="text-2xl font-bold text-text-primary mb-3">
          SpendFreeli
        </h1>
        <p className="text-text-secondary mb-2">Confirming your email...</p>
        <div className="mt-4 h-1 w-32 mx-auto bg-primary-light rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse" />
        </div>
        {confirmationUrl && (
          <p className="mt-8 text-sm text-text-secondary">
            Not redirecting?{' '}
            <a
              href={decodeURIComponent(confirmationUrl)}
              className="text-primary hover:underline font-medium"
            >
              Tap here to continue
            </a>
          </p>
        )}
        {!confirmationUrl && (
          <p className="mt-8 text-sm text-error">
            Invalid confirmation link. Please request a new one.
          </p>
        )}
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
      <ConfirmRedirect />
    </Suspense>
  );
}
