/**
 * Site-wide constants: canonical URLs and contact info.
 *
 * Anything referenced from multiple places (nav CTA, hero CTA, download
 * section, footer, metadata) must live here — never inline.
 */

export const SITE_URL = 'https://spendfreeli.com';

export const CONTACT_EMAIL = 'info@spendfreeli.com';

export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.walkerlegacypartners.spendfreeli';

export const ANDROID_PACKAGE_NAME = 'com.walkerlegacypartners.spendfreeli';

export const COMPANY_NAME = 'Walker Legacy Partners LLC';

export const COMPANY_LOCATION = 'Frisco, Texas';

// Displayed in the Hero social-proof line. Update as real user counts land
// (e.g. "10,000+", "50,000+"). Left as a phrase for now so we never
// misrepresent the number pre-launch.
export const SOCIAL_PROOF_COUNT = 'hundreds of';

// Product tagline — single source of truth. Consumed by the Hero
// headline, the Footer brand line, and the metadata title. Update here
// and every surface picks it up.
export const TAGLINE = {
  full: 'Budget intentionally. Spend freely.',
  primary: 'Budget intentionally.',
  accent: 'Spend freely.',
} as const;
