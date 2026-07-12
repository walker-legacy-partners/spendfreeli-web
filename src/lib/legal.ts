/**
 * Server-side fetch + extract for the legal documents published at
 * https://walker-legacy-partners.github.io/spendfreeli-legal.
 *
 * ISR: `revalidate: 3600` — a legal-repo push propagates to the site
 * within an hour without a spendfreeli-web redeploy.
 *
 * Trust boundary: the source is our own GitHub Pages site, so
 * dangerouslySetInnerHTML consumption downstream is acceptable. A light
 * regex sanitizer strips scripts, event-handler attributes, and
 * javascript: URLs anyway as defense in depth.
 *
 * The Jekyll theme wraps everything in a single
 * `<div class="…markdown-body">…</div>` — the only div in the document
 * — so a non-greedy match to the next `</div>` cleanly extracts the
 * rendered markdown without pulling in the Jekyll chrome.
 */

const BASE_URL =
  'https://walker-legacy-partners.github.io/spendfreeli-legal';
const REVALIDATE_SECONDS = 3600;

const CONTAINER_START = /<div class="[^"]*\bmarkdown-body\b[^"]*">/i;
const CONTAINER_END = /<\/div>/i;
// The Jekyll minimal theme prepends a repo-title <h1><a>...</a></h1>.
// We supply our own page title, so strip it.
const LEADING_H1_LINK = /^\s*<h1><a[^>]*>[^<]*<\/a><\/h1>\s*/i;

export type LegalResult =
  | { ok: true; html: string; sourceUrl: string }
  | { ok: false; sourceUrl: string };

export async function fetchLegalDocument(
  slug: string,
): Promise<LegalResult> {
  const sourceUrl = `${BASE_URL}/${slug}`;
  try {
    const response = await fetch(sourceUrl, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return { ok: false, sourceUrl };

    const raw = await response.text();
    const extracted = extractMarkdownBody(raw);
    if (!extracted) return { ok: false, sourceUrl };

    return { ok: true, html: sanitize(extracted), sourceUrl };
  } catch {
    return { ok: false, sourceUrl };
  }
}

function extractMarkdownBody(html: string): string | null {
  const startMatch = html.match(CONTAINER_START);
  if (!startMatch || startMatch.index === undefined) return null;

  const contentStart = startMatch.index + startMatch[0].length;
  const rest = html.slice(contentStart);
  const endMatch = rest.match(CONTAINER_END);
  if (!endMatch || endMatch.index === undefined) return null;

  const content = rest.slice(0, endMatch.index).trim();
  return content.replace(LEADING_H1_LINK, '').trim();
}

function sanitize(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}
