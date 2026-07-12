import type { Metadata } from 'next';
import { LegalDocument } from '@/components/sections/LegalDocument';

export const metadata: Metadata = {
  title: 'Terms of Service',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <LegalDocument slug="terms-of-service" title="Terms of Service" />
  );
}
