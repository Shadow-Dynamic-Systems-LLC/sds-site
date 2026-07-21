import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LegalDocumentPageProps {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}

/**
 * Shared layout for standalone legal/policy documents (Privacy, Terms).
 *
 * Replaces the prior in-page modal pattern: a modal is the wrong UX for long
 * policy text, and routing gives bookmarkable, open-in-new-tab URLs that work
 * without JavaScript. The single layout keeps both policies visually and
 * structurally identical — fix once, verify both instances.
 */
export function LegalDocumentPage({ title, effectiveDate, children }: LegalDocumentPageProps) {
  // Start at the top when arriving directly or via in-app navigation.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <nav className="legal-page__nav" aria-label="Legal document">
        <div className="container">
          <Link to="/#publications" className="legal-nav-link">
            ← Back to Site
          </Link>
          <span className="legal-nav-path">SDS.WEB.LEGAL</span>
        </div>
      </nav>

      <main className="legal-page__main">
        <div className="container">
          <header className="legal-page__header">
            <div className="legal-header__meta">
              <span className="legal-header__type">LEGAL DOCUMENT</span>
              <span className="legal-header__date">Effective {effectiveDate}</span>
            </div>
            <h1 className="legal-header__title">{title}</h1>
          </header>

          <article className="legal-page__body">
            {children}
          </article>
        </div>
      </main>

      <footer className="legal-page__footer">
        <div className="container legal-page__footer-row">
          <span>SDS.LEGAL</span>
          <span>Shadow Dynamic Systems LLC</span>
        </div>
      </footer>
    </div>
  );
}
