/**
 * Base tokens — the shared type contract every tenant must satisfy,
 * plus a neutral fallback used as the default starting point for new
 * tenants.
 *
 * Architecture:
 *   - This file defines the shape of `Tokens` and provides safe defaults.
 *   - Each tenant in `./tenants/<name>.ts` exports a full `Tokens` object,
 *     typically built by spreading `defaultTokens` and overriding brand
 *     values (see `./tenants/spendfreeli.ts` for the canonical example).
 *   - `./index.ts` selects the active tenant based on `process.env.TENANT`.
 *   - `../../scripts/generate-tokens-css.ts` reads the resolved tokens
 *     and emits `./tokens.css` (Tailwind v4 `@theme` block) at build time.
 *
 * Fallback values are intentionally neutral (generic blue/gray) so that
 * an incomplete tenant renders as an unbranded UI rather than accidentally
 * ships SpendFreeli branding to a white-label partner.
 */

export type ColorTokens = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    inverse: string;
  };
  border: string;
  success: string;
  error: string;
};

export type FontTokens = {
  heading: string;
  body: string;
};

/**
 * Spacing tokens are declared here for architectural completeness but
 * are NOT emitted to CSS. Tailwind v4 uses `--spacing-<key>` as the
 * single source for every size utility — including `max-w-*` — which
 * means defining `--spacing-lg: 1.5rem` for padding also silently
 * pins `max-w-lg` to 1.5rem. Components use Tailwind's numeric scale
 * (`p-6`, `mt-8`, …) instead so that named `max-w-*` utilities can
 * pick up Tailwind's default `--container-*` values (32rem, 42rem, …).
 *
 * Kept in the token model so JS code that wants a semantic spacing
 * value (e.g. an animation library) can still reference
 * `tokens.spacing.lg`.
 */
export type SpacingTokens = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
};

export type RadiusTokens = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
};

export type ShadowTokens = {
  sm: string;
  md: string;
  lg: string;
};

export type Tokens = {
  colors: ColorTokens;
  fonts: FontTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
};

export const defaultTokens: Tokens = {
  colors: {
    primary: '#3B82F6',
    primaryDark: '#1E40AF',
    primaryLight: '#DBEAFE',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      inverse: '#FFFFFF',
    },
    border: '#E5E7EB',
    success: '#10B981',
    error: '#EF4444',
  },
  fonts: {
    heading: 'var(--font-sans)',
    body: 'var(--font-sans)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
};
