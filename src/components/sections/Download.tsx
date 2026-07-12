import { PLAY_STORE_URL } from '@/lib/constants';

/**
 * Download section — Google Play (real link) + App Store coming-soon
 * placeholder. Uses inline SVGs so we don't depend on external badge
 * assets that might 404 or lag DNS on first paint.
 */
export function Download() {
  return (
    <section id="download" className="bg-background px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
          Start budgeting freely today
        </h2>
        <p className="mt-4 text-lg text-text-secondary">
          Free 30-day trial. No credit card required.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GooglePlayBadge />
          <AppStoreBadgeComingSoon />
        </div>
      </div>
    </section>
  );
}

function GooglePlayBadge() {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get SpendFreeli on Google Play"
      className="inline-flex min-w-[200px] items-center gap-4 rounded-lg bg-text-primary px-6 py-4 text-text-inverse shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <PlayIcon />
      <span className="text-left">
        <span className="block text-xs uppercase tracking-wide">GET IT ON</span>
        <span className="block text-lg font-semibold leading-tight">
          Google Play
        </span>
      </span>
    </a>
  );
}

function AppStoreBadgeComingSoon() {
  return (
    <div
      role="button"
      aria-disabled="true"
      aria-label="App Store — coming soon"
      className="relative inline-flex min-w-[200px] cursor-not-allowed items-center gap-4 rounded-lg bg-text-primary/30 px-6 py-4 text-text-inverse"
    >
      <AppleIcon />
      <span className="text-left">
        <span className="block text-xs uppercase tracking-wide">
          Download on the
        </span>
        <span className="block text-lg font-semibold leading-tight">
          App Store
        </span>
      </span>
      <span className="absolute -right-3 -top-3 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-text-inverse shadow-md">
        Coming Soon
      </span>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.5 3.6v16.8a1 1 0 0 0 1.55.83l12.6-8.4a1 1 0 0 0 0-1.66L6.05 2.77A1 1 0 0 0 4.5 3.6Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9-.7 0-1.9-.9-3.1-.9-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.2 1.7 2.5 3 2.4 1.2 0 1.6-.8 3-.8s1.8.8 3 .8c1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.4-1-2.4-3.8ZM14.4 5.4c.6-.8 1-1.9.9-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.5 2.8-1.3Z" />
    </svg>
  );
}
