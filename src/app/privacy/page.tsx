import type { Metadata } from 'next';
import { LegalDocument } from '@/components/sections/LegalDocument';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <LegalDocument slug="privacy-policy" title="Privacy Policy" />;
}
