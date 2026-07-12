import type { ComponentPropsWithoutRef } from 'react';

type InputProps = ComponentPropsWithoutRef<'input'> & {
  invalid?: boolean;
};

export function Input({ invalid, className, ...rest }: InputProps) {
  const base =
    'h-12 w-full rounded-md bg-surface px-4 text-base text-text-primary placeholder:text-text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark';
  const state = invalid
    ? 'border border-error focus-visible:border-error'
    : 'border border-border focus-visible:border-primary';
  return (
    <input
      aria-invalid={invalid || undefined}
      className={`${base} ${state} ${className ?? ''}`.trim()}
      {...rest}
    />
  );
}
