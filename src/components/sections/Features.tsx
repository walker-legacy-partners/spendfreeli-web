import { Card } from '@/components/ui/Card';

type Feature = {
  emoji: string;
  title: string;
  description: string;
};

const features: readonly Feature[] = [
  {
    emoji: '💰',
    title: 'Set Your Budget Once',
    description:
      'Create a master budget template and apply it every month in seconds.',
  },
  {
    emoji: '👨‍👩‍👧',
    title: 'Budget as a Family',
    description:
      'Every household member sees the same budget. No more surprises.',
  },
  {
    emoji: '📊',
    title: 'Track Every Dollar',
    description:
      'Add transactions in seconds. See your spending patterns instantly.',
  },
  {
    emoji: '🎯',
    title: 'Reach Your Goals',
    description:
      'Set savings goals and track progress toward the things that matter most.',
  },
  {
    emoji: '🔒',
    title: 'Bank-Level Security',
    description:
      'Your financial data is encrypted and protected with enterprise-grade security.',
  },
  {
    emoji: '📱',
    title: 'Works on Any Device',
    description:
      'Access your budget from your phone, tablet, or computer. Always in sync.',
  },
];

export function Features() {
  return (
    <section id="features" className="bg-surface px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-text-primary sm:text-4xl">
          Everything your family needs to budget together
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title}>
              <Card className="h-full">
                <span aria-hidden="true" className="text-4xl">
                  {feature.emoji}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-text-secondary">
                  {feature.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
