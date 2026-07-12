import type { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { COMPANY_LOCATION, COMPANY_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the family behind SpendFreeli. Why we built it and what we believe about family budgeting.',
  openGraph: {
    title: 'About — SpendFreeli',
    description:
      'Meet the family behind SpendFreeli. Why we built it and what we believe about family budgeting.',
  },
};

type Value = {
  title: string;
  description: string;
};

const values: readonly Value[] = [
  {
    title: 'Simplicity',
    description:
      "Built for real people, not spreadsheet experts. Whether you're budgeting solo or with your whole household, SpendFreeli meets you where you are.",
  },
  {
    title: 'Stewardship',
    description:
      "Every dollar is a resource to be managed wisely. Whether you're saving for yourself or building a future for your family, your goals deserve a budget that works as hard as you do.",
  },
  {
    title: 'Freedom through Intention',
    description:
      "Financial freedom isn't reserved for a select few. With intention and the right tools, anyone can take control of their money and build the future they deserve.",
  },
];

export default function About() {
  return (
    <>
      <section className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            Born from a simple idea: budgeting should actually work.
          </h1>
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <blockquote className="text-lg leading-relaxed text-text-primary">
            <p>I built SpendFreeli because my family needed it.</p>
            <p className="mt-4">
              After years of spreadsheets and budgeting apps that were too
              complicated or didn&rsquo;t have the right features, I decided
              to build something different.
            </p>
            <p className="mt-4">
              SpendFreeli is designed around one simple idea: budgeting
              should be easy enough that you or your whole family actually
              does it. Whether budgeting for yourself or for your family,
              when you budget and spend wisely, you build wealth.
            </p>
            <footer className="mt-6 text-sm font-semibold text-text-secondary">
              — Marcus Walker, Founder
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="bg-background px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            Our mission
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary">
            To make financial stewardship accessible to everyone — because
            when you budget with intention, you live with freedom.
          </p>
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-text-primary sm:text-4xl">
            What we believe
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value) => (
              <li key={value.title}>
                <Card className="h-full text-center">
                  <h3 className="text-xl font-semibold text-text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-text-secondary">
                    {value.description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-text-secondary">
            SpendFreeli is a product of {COMPANY_NAME}, based in{' '}
            {COMPANY_LOCATION}.
          </p>
        </div>
      </section>
    </>
  );
}
