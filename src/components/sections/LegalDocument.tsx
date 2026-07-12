import { fetchLegalDocument } from '@/lib/legal';

type Props = {
  slug: string;
  title: string;
};

/**
 * Server component that renders one legal document.
 *
 * Renders extracted-and-sanitized markdown-body HTML from the legal repo,
 * or a graceful fallback with a direct link if the fetch fails.
 */
export async function LegalDocument({ slug, title }: Props) {
  const result = await fetchLegalDocument(slug);

  return (
    <section className="bg-background px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-text-primary sm:text-5xl">
          {title}
        </h1>

        {result.ok ? (
          <div
            className="legal-content mt-8"
            dangerouslySetInnerHTML={{ __html: result.html }}
          />
        ) : (
          <FetchFallback sourceUrl={result.sourceUrl} />
        )}
      </div>
    </section>
  );
}

function FetchFallback({ sourceUrl }: { sourceUrl: string }) {
  return (
    <div className="mt-8 rounded-lg border border-border bg-surface p-6">
      <p className="text-text-primary">
        We&rsquo;re having trouble loading this document right now.
      </p>
      <p className="mt-4 text-text-secondary">
        You can read it directly at:
      </p>
      <p className="mt-2">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline transition-colors hover:text-primary-dark"
        >
          {sourceUrl}
        </a>
      </p>
    </div>
  );
}
