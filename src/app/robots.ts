import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/**
 * Auto-generated robots.txt served at /robots.txt.
 *
 * `/api/` — endpoints, never useful to crawl.
 * `/auth/` — user-specific magic-link handler; `noindex` meta is set at
 *   the page level, but excluding at robots.txt saves crawler budget.
 * Legal pages (`/privacy`, `/terms`) are `noindex` via metadata but stay
 *   allowed here so users linking to them from third-party sites still
 *   pass link equity naturally.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/auth/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
