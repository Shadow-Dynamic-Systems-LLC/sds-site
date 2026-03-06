import { useParams, Link } from 'react-router-dom';
import { artifacts, artifactTypeDefs, parseContentToSections, slugToIdentifier } from '../data/artifacts';

export function ArtifactPage() {
  const { slug } = useParams<{ slug: string }>();
  const identifier = slug ? slugToIdentifier(slug) : '';
  const artifact = artifacts.find(a => a.identifier === identifier);

  if (!artifact) {
    return (
      <div className="artifact-page">
        <div className="container">
          <div className="artifact-not-found">
            <h1>Artifact Not Found</h1>
            <p>The requested artifact "{identifier}" could not be found.</p>
            <Link to="/#publications" className="back-link">← Back to Publications</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="artifact-page">
      <div className="artifact-page-nav">
        <Link to="/#publications" className="back-link">← Back to Publications</Link>
      </div>

      <div className="container artifact-page-container">
        <div className="diagnosis-document diagnosis-document-fullpage">
          <div className="diagnosis-header">
            <div className="diagnosis-header-top">
              <div className="diagnosis-number">{artifactTypeDefs[artifact.type].label} {artifact.identifier.split('.').pop()}</div>
              <h1 className="diagnosis-title">{artifact.title}</h1>
            </div>
            <div className="diagnosis-badges">
              <span className="diagnosis-badge">Type: {artifactTypeDefs[artifact.type].label}</span>
              <span className="diagnosis-badge">Author: {artifact.author}</span>
              <span className="diagnosis-badge">Date: {artifact.date}</span>
            </div>
          </div>

          <div className="diagnosis-content-grid">
            <div className="diagnosis-main-content">
              {parseContentToSections(artifact.content).map((section, idx) => (
                <div key={idx} className="diagnosis-section">
                  {section.heading && (
                    <div className="section-heading">{section.heading}</div>
                  )}
                  {section.content && section.content.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                  {section.sublist && section.sublist.length > 0 && (
                    <ul className="diagnosis-list">
                      {section.sublist.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <aside className="diagnosis-sidebar">
              {artifact.status && (
                <div className="diagnosis-sidebar-card">
                  <div className="sidebar-heading">STATUS</div>
                  <p className="sidebar-content sidebar-code" style={{ color: artifact.status === 'DRAFT' ? 'var(--color-accent-orange)' : 'var(--color-accent-yellow)' }}>
                    {artifact.status}
                  </p>
                </div>
              )}

              <div className="diagnosis-sidebar-card">
                <div className="sidebar-heading">SUMMARY</div>
                <p className="sidebar-content">{artifact.summary}</p>
              </div>

              {artifact.repository && (
                <div className="diagnosis-sidebar-card">
                  <div className="sidebar-heading">REPOSITORY</div>
                  <a
                    href={artifact.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-content sidebar-code"
                    style={{ color: 'var(--color-accent-yellow)', textDecoration: 'none', fontSize: '0.75rem', wordBreak: 'break-all' }}
                  >
                    {artifact.repository.replace('https://github.com/', '')}
                  </a>
                </div>
              )}

              {artifact.references && artifact.references.length > 0 && (
                <div className="diagnosis-sidebar-card">
                  <div className="sidebar-heading">REFERENCES</div>
                  <p className="sidebar-content sidebar-code">{artifact.references.join(', ')}</p>
                </div>
              )}

              <div className="diagnosis-sidebar-card">
                <div className="sidebar-heading">IDENTIFIER</div>
                <p className="sidebar-content sidebar-code">{artifact.identifier}</p>
              </div>

              <div className="diagnosis-sidebar-card">
                <div className="sidebar-heading">ARTIFACT TYPE</div>
                <p className="sidebar-content" style={{ fontSize: '0.8rem' }}>{artifactTypeDefs[artifact.type].definition}</p>
              </div>

              <div className="diagnosis-sidebar-card">
                <div className="sidebar-heading">DISCLAIMER</div>
                <p className="sidebar-content" style={{ fontSize: '0.75rem', opacity: 0.8 }}>{artifactTypeDefs[artifact.type].disclaimer}</p>
              </div>
            </aside>
          </div>

          <div className="diagnosis-footer">
            <span className="diagnosis-footer-text">
              SDS · {artifact.identifier}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
