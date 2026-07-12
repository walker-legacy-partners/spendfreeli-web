import type { ComponentPropsWithoutRef } from 'react';

type CardProps = ComponentPropsWithoutRef<'div'>;

export function Card({ className, ...rest }: CardProps) {
  const base =
    'rounded-lg border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md';
  return <div className={`${base} ${className ?? ''}`.trim()} {...rest} />;
}
