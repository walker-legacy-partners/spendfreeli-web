import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/**
 * Auto-generated sitemap.xml served at /sitemap.xml.
 *
 * Only indexable pages appear here. `/privacy`, `/terms`, and
 * `/auth/callback` are intentionally excluded because they carry
 * `robots: noindex` metadata — listing them in a sitemap would send a
 * mixed signal to crawlers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
