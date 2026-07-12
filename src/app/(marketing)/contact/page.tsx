import type { Metadata } from 'next';
import { ContactForm } from '@/components/sections/ContactForm';
import { CONTACT_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "We'd love to hear from you. Send us a message and we'll be in touch shortly.",
  openGraph: {
    title: 'Contact — SpendFreeli',
    description:
      "We'd love to hear from you. Send us a message and we'll be in touch shortly.",
  },
};

export default function Contact() {
  return (
    <>
      <section className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            Get in touch
          </h1>
          <p className="mt-6 text-lg text-text-secondary">
            We&rsquo;d love to hear from you. Send us a message and we&rsquo;ll
            be in touch shortly.
          </p>
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </section>

      <section className="bg-background px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-text-primary">
            Email
          </h2>
          <p className="mt-2 text-text-secondary">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="transition-colors hover:text-primary"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
