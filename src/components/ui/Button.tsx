import type { ComponentPropsWithoutRef } from 'react';

type Variant = 'primary' | 'secondary' | 'disabled';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant;
  fullWidth?: boolean;
};

/**
 * Shared class string for the button visual system. Exported so that
 * `<a>` and `<span>` elements (Hero CTAs, coming-soon placeholders)
 * render as buttons without duplicating styles.
 *
 * Height is fixed at h-12 (48px) so buttons align with matching-height
 * inputs when they sit side-by-side in a form.
 */
export function buttonClasses(
  variant: Variant = 'primary',
  fullWidth = false,
): string {
  const base =
    'inline-flex h-12 items-center justify-center rounded-full px-6 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark';
  const width = fullWidth ? ' w-full' : '';
  switch (variant) {
    case 'primary':
      return `${base}${width} bg-primary text-text-inverse shadow-sm hover:bg-primary-dark`;
    case 'secondary':
      return `${base}${width} border border-border bg-surface text-text-primary hover:border-primary`;
    case 'disabled':
      return `${base}${width} cursor-not-allowed bg-border text-text-secondary`;
  }
}

export function Button({
  variant = 'primary',
  fullWidth,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const effectiveVariant: Variant = disabled ? 'disabled' : variant;
  const merged = `${buttonClasses(effectiveVariant, fullWidth)} ${className ?? ''}`.trim();
  return <button className={merged} disabled={disabled} {...rest} />;
}
