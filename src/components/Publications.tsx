import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';
import { SectionHeader } from './SectionHeader';
import { artifacts, artifactTypeDefs, parseContentToSections, identifierToSlug, type Artifact } from '../data/artifacts';

type ArtifactType = Artifact['type'];

export function Publications() {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [activeFilters, setActiveFilters] = useState<ArtifactType[]>([]);
  const [hoveredType, setHoveredType] = useState<ArtifactType | null>(null);

  const allTypes = Object.keys(artifactTypeDefs) as ArtifactType[];

  const toggleFilter = (type: ArtifactType) => {
    setActiveFilters(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredArtifacts = activeFilters.length === 0
    ? artifacts
    : artifacts.filter(a => activeFilters.includes(a.type));

  return (
    <section id="publications" className="page-section">
      <div className="container">
        <SectionHeader path="SYS.LOG //" title="Publications" />

        <div className="meta-statement">
          <p>
            This publication series classifies architectural structures and their
            assurance properties. It does not assess actor intent, predict
            inevitability, or render legal judgment. All analyses are structural
            and assumption-bound.
          </p>
        </div>

        <div className="publications-controls">
          <div className="filter-chips">
            <span className="filter-label">FILTER</span>
            {allTypes.map((type) => {
              const isActive = activeFilters.includes(type);
              const count = artifacts.filter(a => a.type === type).length;
              return (
                <button
                  key={type}
                  className={`filter-chip ${isActive ? 'active' : ''}`}
                  onClick={() => toggleFilter(type)}
                  onMouseEnter={() => setHoveredType(type)}
                  onMouseLeave={() => setHoveredType(null)}
                >
                  <span className="chip-label">{artifactTypeDefs[type].label}</span>
                  <span className="chip-count">{count}</span>
                </button>
              );
            })}
            {activeFilters.length > 0 && (
              <button
                className="filter-clear"
                onClick={() => setActiveFilters([])}
              >
                Clear
              </button>
            )}
          </div>

          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              title="Card view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1" />
                <rect x="9" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="9" width="6" height="6" rx="1" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
              </svg>
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="2" width="14" height="2" rx="0.5" />
                <rect x="1" y="7" width="14" height="2" rx="0.5" />
                <rect x="1" y="12" width="14" height="2" rx="0.5" />
              </svg>
            </button>
          </div>
        </div>

        {hoveredType && (
          <div className="type-definition-tooltip">
            <p className="tooltip-definition">{artifactTypeDefs[hoveredType].definition}</p>
            <p className="tooltip-disclaimer">{artifactTypeDefs[hoveredType].disclaimer}</p>
          </div>
        )}

        {viewMode === 'cards' ? (
          <div className="services-grid">
            {filteredArtifacts.map((artifact, index) => (
              <div
                key={index}
                className="blog-card"
              >
                <Link to={`/dx/${identifierToSlug(artifact.identifier)}`} className="blog-card-link">
                  <div className="artifact-type-badge">{artifactTypeDefs[artifact.type].label}</div>
                  {artifact.status && <div className="artifact-status-badge">{artifact.status}</div>}
                  <div className="artifact-identifier">{artifact.identifier}</div>
                  <img
                    src={artifact.image}
                    alt={artifact.title}
                    className="blog-card-image"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/ffd700?text=Artifact';
                    }}
                  />
                  <div className="blog-card-content">
                    <h3>{artifact.title}</h3>
                    <p className="blog-meta">{artifact.date} · {artifact.author}</p>
                    <p>{artifact.summary}</p>
                  </div>
                </Link>
                <button
                  className="card-modal-trigger"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedArtifact(artifact);
                  }}
                  title="Quick view"
                >
                  ⤢
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="artifacts-list">
            {filteredArtifacts.map((artifact, index) => (
              <div key={index} className="artifact-list-item">
                <div className="artifact-list-meta">
                  <span className="artifact-list-type">{artifactTypeDefs[artifact.type].label}</span>
                  <span className="artifact-list-id">{artifact.identifier}</span>
                  {artifact.status && <span className="artifact-list-status">{artifact.status}</span>}
                </div>
                <Link to={`/dx/${identifierToSlug(artifact.identifier)}`} className="artifact-list-link">
                  <h3 className="artifact-list-title">{artifact.title}</h3>
                </Link>
                <p className="artifact-list-summary">{artifact.summary}</p>
                <div className="artifact-list-footer">
                  <span className="artifact-list-date">{artifact.date}</span>
                  <span className="artifact-list-author">{artifact.author}</span>
                  <button
                    className="artifact-list-quickview"
                    onClick={() => setSelectedArtifact(artifact)}
                    title="Quick view"
                  >
                    ⤢ Quick View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedArtifact && (
        <Modal
          isOpen={!!selectedArtifact}
          onClose={() => setSelectedArtifact(null)}
          title=""
        >
          <div className="diagnosis-document">
            <div className="diagnosis-header">
              <div className="diagnosis-header-top">
                <div className="diagnosis-number">{artifactTypeDefs[selectedArtifact.type].label} {selectedArtifact.identifier.split('.').pop()}</div>
                <h1 className="diagnosis-title">{selectedArtifact.title}</h1>
              </div>
              <div className="diagnosis-badges">
                <span className="diagnosis-badge">Type: {artifactTypeDefs[selectedArtifact.type].label}</span>
                <span className="diagnosis-badge">Author: {selectedArtifact.author}</span>
                <span className="diagnosis-badge">Date: {selectedArtifact.date}</span>
              </div>
            </div>

            <div className="diagnosis-content-grid">
              <div className="diagnosis-main-content">
                {parseContentToSections(selectedArtifact.content).map((section, idx) => (
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
                {selectedArtifact.status && (
                  <div className="diagnosis-sidebar-card">
                    <div className="sidebar-heading">STATUS</div>
                    <p className="sidebar-content sidebar-code" style={{ color: selectedArtifact.status === 'DRAFT' ? 'var(--color-accent-orange)' : 'var(--color-accent-yellow)' }}>
                      {selectedArtifact.status}
                    </p>
                  </div>
                )}

                <div className="diagnosis-sidebar-card">
                  <div className="sidebar-heading">SUMMARY</div>
                  <p className="sidebar-content">{selectedArtifact.summary}</p>
                </div>

                {selectedArtifact.repository && (
                  <div className="diagnosis-sidebar-card">
                    <div className="sidebar-heading">REPOSITORY</div>
                    <a
                      href={selectedArtifact.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-content sidebar-code"
                      style={{ color: 'var(--color-accent-yellow)', textDecoration: 'none', fontSize: '0.75rem', wordBreak: 'break-all' }}
                    >
                      {selectedArtifact.repository.replace('https://github.com/', '')}
                    </a>
                  </div>
                )}

                {selectedArtifact.references && selectedArtifact.references.length > 0 && (
                  <div className="diagnosis-sidebar-card">
                    <div className="sidebar-heading">REFERENCES</div>
                    <p className="sidebar-content sidebar-code">{selectedArtifact.references.join(', ')}</p>
                  </div>
                )}

                <div className="diagnosis-sidebar-card">
                  <div className="sidebar-heading">IDENTIFIER</div>
                  <p className="sidebar-content sidebar-code">{selectedArtifact.identifier}</p>
                </div>

                <div className="diagnosis-sidebar-card">
                  <div className="sidebar-heading">ARTIFACT TYPE</div>
                  <p className="sidebar-content" style={{ fontSize: '0.8rem' }}>{artifactTypeDefs[selectedArtifact.type].definition}</p>
                </div>
              </aside>
            </div>

            <div className="diagnosis-footer">
              <span className="diagnosis-footer-text">
                SDS · {selectedArtifact.identifier}
              </span>
              <Link
                to={`/dx/${identifierToSlug(selectedArtifact.identifier)}`}
                className="diagnosis-fullpage-link"
                onClick={() => setSelectedArtifact(null)}
              >
                Open Full Page →
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
