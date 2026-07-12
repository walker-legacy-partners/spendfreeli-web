import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SITE_URL, TAGLINE } from '@/lib/constants';
import { tokens } from '@/tokens';
import './globals.css';

/**
 * Root layout.
 *
 * Wires the Inter font variable that the token system references
 * (`--font-inter`), applies site-wide metadata, and renders the
 * persistent Header/Footer shell around every route.
 */

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const SITE_TITLE = `SpendFreeli — ${TAGLINE.full}`;
const SITE_DESCRIPTION =
  'The family budgeting app that makes money management simple. Track spending, set budgets, and reach your financial goals together.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s — SpendFreeli',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'SpendFreeli',
  authors: [{ name: 'Walker Legacy Partners LLC' }],
  keywords: [
    'family budgeting',
    'budgeting app',
    'personal finance',
    'money management',
    'household budget',
    'SpendFreeli',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'SpendFreeli',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
    // TODO: replace with real 1200x630 OG image before launch.
    // images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SpendFreeli' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // TODO: images once /og-image.png exists.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: tokens.colors.primary,
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-background text-text-primary">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
