import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from './SectionHeader';
import { SectionCut } from './ArchitecturalSystem';
import { researchProjects } from '../data/research';
import './ArchitecturalSystem.css';

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const project = researchProjects[activeIndex];

  return (
    <section id="projects" className="page-section">
      <div className="container">
        <SectionHeader path="SDS.WEB.RESEARCH //" title="Research" />

        <SectionCut label="RESEARCH DOCUMENTS" />

        {/* Research Carousel */}
        <div className="research-carousel">
          <div
            key={project.id}
            className="research-card carousel-item-active"
          >
            <img
              src={project.image}
              alt={project.title}
              className="research-card-image"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/333333?text=...';
              }}
            />
            <div className="research-card-content">
              <div className="research-card-id">{project.id.toUpperCase()}</div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>

              <div className="research-card-actions">
                <Link to={`/research/${project.id}`} className="research-card-read-btn">
                  READ DOCUMENT
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Selectors */}
        <div className="research-carousel-selectors">
          {researchProjects.map((proj, idx) => (
            <button
              key={proj.id}
              className={`research-carousel-selector ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
              title={proj.title}
            >
              <span className="selector-index">{String(idx + 1).padStart(2, '0')}</span>
              <span className="selector-title">{proj.id.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
