import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getResearchProjectById, researchProjects } from '../data/research';
import { parseContentToSections } from '../data/artifacts';
import { SectionCut, Timestamp } from './ArchitecturalSystem';
import { ZTGSchematic } from './ZTGSchematic';
import { EVIDENCE_LOGGING } from '../data/glyphs';
import { useMinimalMode } from '../hooks/useMinimalMode';
import './ArchitecturalSystem.css';
import './ZTGSchematic.css';

export function ResearchPage() {
    const { slug } = useParams<{ slug: string }>();
    const project = slug ? getResearchProjectById(slug) : undefined;
    const minimal = useMinimalMode();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="research-page research-page--not-found">
                <div className="container">
                    <div className="research-not-found">
                        <div className="research-not-found__code">ERR_NOT_FOUND</div>
                        <h2>Research document not found.</h2>
                        <Link to="/#projects" className="research-not-found__link">
                            RETURN TO INDEX
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const sections = parseContentToSections(project.content);
    const currentIndex = researchProjects.findIndex(p => p.id === project.id);
    const prevProject = currentIndex > 0 ? researchProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < researchProjects.length - 1 ? researchProjects[currentIndex + 1] : null;

    return (
        <div className="research-page">
            {/* Navigation Bar — suppressed in minimal mode for double-blind preview */}
            {!minimal && (
                <nav className="research-page__nav">
                    <div className="container">
                        <Link to="/#projects" className="research-nav-link">
                            <span className="research-nav-glyph">{EVIDENCE_LOGGING.REPLAY.glyph}</span>
                            RETURN TO INDEX
                        </Link>
                        <div className="research-nav-path">
                            SYS.EXT // RESEARCH // {project.id.toUpperCase()}
                        </div>
                    </div>
                </nav>
            )}

            <div className="container">
                {/* Document Header */}
                <header className="research-page__header">
                    <div className="research-header__meta">
                        <span className="research-header__type">RESEARCH DOCUMENT</span>
                        <span className="research-header__id">{project.id.toUpperCase()}</span>
                    </div>
                    <h1 className="research-header__title">{project.title}</h1>
                    <p className="research-header__description">{project.description}</p>
                </header>

                {/* Show schematic for ZTG spec */}
                {project.hasSchematic && project.id === 'ztg-spec' && (
                    <div className="research-page__schematic">
                        <SectionCut label="ARCHITECTURAL CROSS-SECTION" />
                        <ZTGSchematic />
                    </div>
                )}

                <SectionCut label="DOCUMENT BODY" />

                {/* Content Grid */}
                <div className="research-page__grid">
                    <article className="research-page__main">
                        {sections.map((section, idx) => (
                            <div
                                key={idx}
                                className="research-section"
                                style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                                {section.heading && (
                                    <h2 className="research-section__heading">
                                        <span className="research-section__number">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        {section.heading}
                                    </h2>
                                )}
                                {section.content?.map((paragraph, pIdx) => (
                                    <p key={pIdx} className="research-section__paragraph">
                                        {paragraph}
                                    </p>
                                ))}
                                {section.sublist && (
                                    <ul className="research-section__list">
                                        {section.sublist.map((item, iIdx) => (
                                            <li key={iIdx}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </article>

                    <aside className="research-page__sidebar">
                        <div className="research-sidebar__card">
                            <h3 className="research-sidebar__heading">SUMMARY</h3>
                            <p className="research-sidebar__text">{project.summary}</p>
                        </div>

                        <div className="research-sidebar__card">
                            <h3 className="research-sidebar__heading">METADATA</h3>
                            <dl className="research-sidebar__meta">
                                <dt>TYPE</dt>
                                <dd>RESEARCH DOCUMENT</dd>
                                <dt>IDENTIFIER</dt>
                                <dd>{project.id.toUpperCase()}</dd>
                                <dt>STATUS</dt>
                                <dd className="research-sidebar__status">PUBLISHED</dd>
                                <dt>TIMESTAMP</dt>
                                <dd><Timestamp date="2026-03-01" precision="date" /></dd>
                            </dl>
                        </div>

                        {/* Related Documents */}
                        <div className="research-sidebar__card">
                            <h3 className="research-sidebar__heading">RELATED</h3>
                            <div className="research-sidebar__related">
                                {researchProjects
                                    .filter(p => p.id !== project.id)
                                    .slice(0, 3)
                                    .map(p => (
                                        <Link
                                            key={p.id}
                                            to={`/research/${p.id}`}
                                            className="research-related-link"
                                        >
                                            <span className="research-related-id">{p.id.toUpperCase()}</span>
                                            <span className="research-related-title">{p.title}</span>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Document Navigation — suppressed in minimal mode (cross-doc links leak related-work attribution) */}
                {!minimal && (
                    <nav className="research-page__doc-nav">
                        <div className="research-doc-nav__prev">
                            {prevProject && (
                                <Link to={`/research/${prevProject.id}`} className="research-doc-nav__link">
                                    <span className="research-doc-nav__direction">PREVIOUS</span>
                                    <span className="research-doc-nav__title">{prevProject.title}</span>
                                </Link>
                            )}
                        </div>
                        <div className="research-doc-nav__next">
                            {nextProject && (
                                <Link to={`/research/${nextProject.id}`} className="research-doc-nav__link">
                                    <span className="research-doc-nav__direction">NEXT</span>
                                    <span className="research-doc-nav__title">{nextProject.title}</span>
                                </Link>
                            )}
                        </div>
                    </nav>
                )}

                {/* Footer notation — brand attribution suppressed in minimal mode */}
                <div className="research-page__footer">
                    <span>{minimal ? project.id.toUpperCase() : `SDS.EXT.${project.id.toUpperCase()}`}</span>
                    {!minimal && <span>Shadow Dynamic Systems</span>}
                </div>
            </div>
        </div>
    );
}
