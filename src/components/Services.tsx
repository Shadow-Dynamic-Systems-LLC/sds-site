import { SectionHeader } from './SectionHeader';
import { ZTGSchematic } from './ZTGSchematic';
import { SectionCut } from './ArchitecturalSystem';
import { CORE_GOVERNANCE } from '../data/glyphs';
import { BoundaryGlyph, PolicyGlyph, AuthorityGlyph, EvidenceGlyph, SurfaceGlyph } from './GlyphIcons';
import './ArchitecturalSystem.css';
import './ZTGSchematic.css';

interface ServiceItem {
  icon?: typeof BoundaryGlyph;
  glyph?: string;
  title: string;
  description: string;
}

export function Services() {
  const services: ServiceItem[] = [
    {
      icon: BoundaryGlyph,
      title: 'Execution Boundary Enforcement',
      description: 'All irreversible actions pass through a mechanistic governance gate prior to execution. Boundaries are code-enforced, not intent-interpreted. Post-execution detection does not constitute governance.'
    },
    {
      icon: PolicyGlyph,
      title: 'Deterministic Policy Evaluation',
      description: 'Authorization logic is rule-bound and reproducible. Given identical initial state and identical inputs, the governance system produces identical decisions. Governance evaluation nondeterminism is not permitted.'
    },
    {
      icon: AuthorityGlyph,
      title: 'Authority Attribution',
      description: 'Execution rights resolve to identifiable, accountable actors. When governance state is uncertain, the system halts rather than proceeding under degraded authority. Resumed execution requires explicit human authorization.'
    },
    {
      icon: EvidenceGlyph,
      title: 'Evidence-Coupled Execution',
      description: 'No externally observable effect may exist without simultaneous durable evidence of authorization and execution. The evidence record is not documentation of the effect — it is a constitutive part of it.'
    },
    {
      icon: SurfaceGlyph,
      title: 'Governed Effect Surfaces',
      description: 'All agent-generated external effects occur exclusively through registered, governance-addressable surfaces. Each surface formally classifies actions by effect type, reversibility, and rollback cost prior to execution.'
    },
    {
      glyph: CORE_GOVERNANCE.CONTAINMENT.glyph,
      title: 'Graduated Containment',
      description: 'Component-level freeze mechanisms halt execution at targeted scope without requiring system-wide halt. Escalation is mechanistic: surface freeze, subsystem freeze, system-wide stasis. Containment is proportional to failure.'
    }
  ];

  return (
    <section id="services" className="page-section">
      <div className="container">
        <SectionHeader path="SDS.ZTG.CORE //" title="Zero Trust Governance" />
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-glyph">
                {service.icon ? <service.icon /> : service.glyph}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        {/* ZTG Architectural Layers Cross-Section */}
        <div className="ztg-schematic-panel">
          <SectionCut label="ARCHITECTURAL CROSS-SECTION" />
          <ZTGSchematic />
        </div>
      </div>
    </section>
  );
}
