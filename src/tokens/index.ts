/**
 * Active tenant tokens.
 *
 * Selects the active tenant based on `process.env.TENANT`, defaulting
 * to `spendfreeli` (Tier 1 native). See `./base.ts` for the architecture
 * overview and `./tenants/_template.ts` for the partner onboarding guide.
 *
 * Import surface: components should only import `tokens` (or its `Tokens`
 * type) from this module — never from a specific tenant file. That way
 * a build with `TENANT=<partner>` transparently swaps the token values
 * consumed by every component.
 *
 * The generator script at `scripts/generate-tokens-css.ts` reads this
 * module during `prebuild` and emits the matching Tailwind v4 `@theme`
 * block to `./tokens.css`.
 */
import type { Tokens } from './base';
import { spendfreeli } from './tenants/spendfreeli';

const activeTenant = process.env.TENANT ?? 'spendfreeli';

function resolveTokens(): Tokens {
  switch (activeTenant) {
    case 'spendfreeli':
      return spendfreeli;
    // Register additional tenants here as they are onboarded.
    // Example:
    //   case 'ynab':
    //     return ynab;
    default:
      throw new Error(
        `Unknown TENANT "${activeTenant}". ` +
          `Register the tenant by adding a case to src/tokens/index.ts ` +
          `and a matching file in src/tokens/tenants/.`,
      );
  }
}

export const tokens: Tokens = resolveTokens();
export const tenantName = activeTenant;
export type { Tokens } from './base';
