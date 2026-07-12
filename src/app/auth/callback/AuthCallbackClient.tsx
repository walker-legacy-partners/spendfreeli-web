'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { PLAY_STORE_URL } from '@/lib/constants';

/**
 * Mobile magic-link callback handler.
 *
 * The magic-link email points at `https://spendfreeli.com/auth/callback`
 * with the auth tokens carried in the URL fragment (and/or query string,
 * depending on the auth provider). Fragments are never sent to the
 * server, so this MUST run client-side.
 *
 * Flow:
 *   - On mobile UA WITH auth tokens in the URL → deep-link to
 *     `spendfreeli://auth-callback${search}${hash}` so the native app
 *     receives the fragment and finishes the sign-in.
 *   - On desktop, OR on mobile without tokens (a direct visit to the
 *     URL) → tell the user to open the app on their phone.
 *   - If the deep link doesn't get intercepted within 3 seconds (usually
 *     because the app isn't installed), fall back to a Play Store
 *     install prompt so the user has a next action.
 *
 * Both search and hash are forwarded because different auth providers
 * put tokens in different places — losing either would break sign-in
 * for a subset of users, and forwarding both is safe when only one is
 * present.
 *
 * Mobile detection catches modern iPads too: iPadOS 13+ reports as
 * `Macintosh` in the UA string, so we also treat any `MacIntel` device
 * with multi-touch as mobile.
 *
 * Detection uses `useSyncExternalStore` so the initial render is
 * SSR-safe (server snapshot returns `'detecting'`) and the platform +
 * token check happens after hydration without triggering the React 19
 * `react-hooks/set-state-in-effect` rule.
 */

type State = 'detecting' | 'redirect' | 'desktop';

const subscribe = () => () => {};

// Combined snapshot: the state we render is a pure function of both the
// device platform (mobile vs. desktop) AND whether the URL carries auth
// tokens. Returning a string primitive avoids the referential-equality
// pitfall that plain-object snapshots hit with `useSyncExternalStore`.
const getState = (): State => {
  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const hasToken =
    window.location.search.includes('code') ||
    window.location.hash.includes('access_token') ||
    window.location.hash.includes('token');
  return isMobile && hasToken ? 'redirect' : 'desktop';
};

const getServerState = (): State => 'detecting';

export function AuthCallbackClient() {
  const state = useSyncExternalStore(subscribe, getState, getServerState);
  // DEBUG: setter dropped because the fallback timer is disabled while
  // the debug overlay is deployed. Restore both when re-enabling redirect.
  const [showFallback] = useState(false);

  useEffect(() => {
    console.log(
      '[auth-callback] full URL:',
      typeof window !== 'undefined' ? window.location.href : 'SSR',
    );
    console.log(
      '[auth-callback] hash:',
      typeof window !== 'undefined' ? window.location.hash : 'SSR',
    );
    console.log(
      '[auth-callback] search:',
      typeof window !== 'undefined' ? window.location.search : 'SSR',
    );

    if (state !== 'redirect') return;

    // DEBUG: redirect intentionally disabled so the on-screen debug
    // overlay stays visible. Restore before shipping.
    // const { search, hash } = window.location;
    // window.location.href = `spendfreeli://auth-callback${search}${hash}`;
    //
    // const fallbackTimer = window.setTimeout(() => {
    //   setShowFallback(true);
    // }, 3000);
    // return () => window.clearTimeout(fallbackTimer);
  }, [state]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'black',
          color: 'lime',
          fontSize: 11,
          padding: 8,
          wordBreak: 'break-all',
          zIndex: 9999,
        }}
      >
        <div>
          href:{' '}
          {typeof window !== 'undefined' ? window.location.href : 'ssr'}
        </div>
        <div>
          hash:{' '}
          {typeof window !== 'undefined'
            ? window.location.hash || '(empty)'
            : 'ssr'}
        </div>
        <div>
          search:{' '}
          {typeof window !== 'undefined'
            ? window.location.search || '(empty)'
            : 'ssr'}
        </div>
        <div>state: {state}</div>
      </div>
      <section className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="mx-auto max-w-md text-center">
          {state === 'detecting' && <DetectingUI />}
          {state === 'redirect' && (
            <RedirectingUI showFallback={showFallback} />
          )}
          {state === 'desktop' && <DesktopUI />}
        </div>
      </section>
    </>
  );
}

function DetectingUI() {
  return (
    <>
      <Spinner />
      <p className="mt-6 text-lg text-text-secondary">Signing you in…</p>
    </>
  );
}

function RedirectingUI({ showFallback }: { showFallback: boolean }) {
  return (
    <>
      <Spinner />
      <h1 className="mt-6 text-2xl font-semibold text-text-primary">
        Opening SpendFreeli…
      </h1>
      {showFallback && (
        <div className="mt-8">
          <p className="text-sm text-text-secondary">
            Didn&rsquo;t open? SpendFreeli may not be installed on this device.
          </p>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Get SpendFreeli
          </a>
        </div>
      )}
    </>
  );
}

function DesktopUI() {
  return (
    <>
      <div
        aria-hidden="true"
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-3xl"
      >
        📱
      </div>
      <h1 className="mt-6 text-3xl font-bold text-text-primary">
        Check your SpendFreeli app
      </h1>
      <p className="mt-4 text-lg text-text-secondary">
        The link has been processed. Please return to the SpendFreeli app
        on your phone.
      </p>
      <div className="mt-8">
        <p className="text-sm text-text-secondary">
          Don&rsquo;t have SpendFreeli yet?
        </p>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Download for Android
        </a>
      </div>
    </>
  );
}

function Spinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary-light border-t-primary"
    />
  );
}
