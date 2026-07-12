/**
 * White-label partner tenant template.
 *
 * To onboard a new Tier 2 partner (e.g. a bank licensing SpendFreeli):
 *
 *   1. Copy this file:
 *        cp src/tokens/tenants/_template.ts src/tokens/tenants/<partner>.ts
 *   2. Rename the exported const from `_template` to `<partner>`.
 *   3. Replace every value marked `// TODO` with the partner's brand values.
 *   4. Register the tenant in `src/tokens/index.ts` by adding a `case`.
 *   5. Build the partner bundle:
 *        TENANT=<partner> npm run build
 *
 * Unset values fall through to `defaultTokens` — safe neutrals, not
 * SpendFreeli branding, so a partially configured tenant will not
 * accidentally ship SpendFreeli colors to a partner's users.
 */
import { defaultTokens, type Tokens } from '../base';

export const _template: Tokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    primary: '#000000', // TODO: partner primary brand color
    primaryDark: '#000000', // TODO
    primaryLight: '#FFFFFF', // TODO
    background: '#FFFFFF', // TODO: page background
    surface: '#FFFFFF', // TODO: card / elevated surface
    text: {
      ...defaultTokens.colors.text,
      primary: '#111827', // TODO: body text color
    },
  },
  fonts: {
    // TODO: override to partner's font var (registered via next/font in layout.tsx).
    // Leaving defaults inherits the sans fallback.
    ...defaultTokens.fonts,
  },
};
