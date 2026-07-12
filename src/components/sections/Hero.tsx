import { buttonClasses } from '@/components/ui/Button';
import { PLAY_STORE_URL, SOCIAL_PROOF_COUNT, TAGLINE } from '@/lib/constants';

export function Hero() {
  return (
    <section id="home" className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row">
        <div className="w-full max-w-xl lg:max-w-none lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            {TAGLINE.primary}
            <br />
            <span className="text-primary">{TAGLINE.accent}</span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed">
            The family budgeting app that makes money management simple
            enough that everyone participates. Start your free 30-day trial
            today.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('primary')}
            >
              Download for Android
            </a>
            <span
              aria-disabled="true"
              role="button"
              className={buttonClasses('disabled')}
            >
              Coming Soon on iOS
            </span>
          </div>

          <p className="mt-6 text-sm text-text-secondary">
            Join {SOCIAL_PROOF_COUNT} families already budgeting freely.
          </p>
        </div>

        <div className="w-full lg:w-1/2">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      <div className="absolute inset-0 rounded-full bg-primary-light opacity-70 blur-3xl" />
      <div className="absolute left-4 top-4 h-40 w-40 rounded-full bg-primary/60 blur-2xl" />
      <div className="absolute bottom-6 right-6 h-48 w-48 rounded-full bg-primary-dark/40 blur-2xl" />

      <div className="absolute left-8 top-8 h-36 w-36 rotate-6 rounded-3xl bg-primary shadow-lg" />
      <div className="absolute right-8 top-16 h-24 w-24 rounded-full bg-primary-dark shadow-md" />
      <div className="absolute bottom-10 left-16 h-28 w-28 -rotate-12 rounded-2xl bg-primary-light shadow-md" />
      <div className="absolute bottom-4 right-10 h-16 w-16 rounded-full bg-surface shadow-md" />

      <div className="absolute inset-16 rounded-full border-4 border-dashed border-primary/30" />
      <div className="absolute inset-24 rounded-full border-2 border-primary/40" />
    </div>
  );
}
