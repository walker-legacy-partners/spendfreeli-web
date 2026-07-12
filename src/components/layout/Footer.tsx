import Link from 'next/link';
import { COMPANY_NAME, TAGLINE } from '@/lib/constants';

/**
 * Site footer.
 *
 * Step 3 scope: brand column, three link columns, copyright bar.
 * Step 12 will add: social icon links (Instagram, TikTok, X, YouTube,
 * Facebook), plus any coming-soon items (Pricing, Blog).
 */

type FooterLink = {
  href: string;
  label: string;
};

const productLinks: readonly FooterLink[] = [
  { href: '/#features', label: 'Features' },
  { href: '/#download', label: 'Download' },
];

const companyLinks: readonly FooterLink[] = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks: readonly FooterLink[] = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold text-text-primary">
            <span aria-hidden="true" className="text-xl">
              💰
            </span>
            <span>SpendFreeli</span>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{TAGLINE.full}</p>
        </div>

        <FooterColumn title="Product" links={productLinks} />
        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Legal" links={legalLinks} />
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-4 text-center text-xs text-text-secondary">
          © {year} {COMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
