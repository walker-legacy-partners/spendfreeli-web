import { Navigation } from './Navigation';

/**
 * Site header — sticky, translucent-white shell around the Navigation.
 *
 * Kept as its own component (not merged into Navigation) so future
 * additions like an announcement bar or a "back to top" affordance
 * can live at the header level without touching nav internals.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/70">
      <Navigation />
    </header>
  );
}
