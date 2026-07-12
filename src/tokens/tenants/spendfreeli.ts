/**
 * Tier 1 — SpendFreeli native theme.
 *
 * Applied by default (when TENANT is unset or TENANT=spendfreeli).
 * These are the values every user who downloads SpendFreeli directly
 * from the App Store or Google Play sees.
 */
import { defaultTokens, type Tokens } from '../base';

export const spendfreeli: Tokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    primary: '#FF9800',
    primaryDark: '#E65100',
    primaryLight: '#FFE0B2',
    background: '#FFF9F0',
    surface: '#FFFFFF',
    text: {
      ...defaultTokens.colors.text,
      primary: '#1A1A2E',
    },
  },
  fonts: {
    heading: 'var(--font-inter)',
    body: 'var(--font-inter)',
  },
};
