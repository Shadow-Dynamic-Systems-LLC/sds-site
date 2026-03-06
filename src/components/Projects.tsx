import { SectionHeader } from './SectionHeader';

export function Projects() {
  const projects = [
    {
      title: 'Zero Trust Governance Specification',
      description: 'Public invariant specification defining the structural conditions for governed execution in AI systems.',
      image: '/assets/phoenix-logo.jpg',
      summary: 'ZTG defines ten invariants across five preconditions (Observability, Replayability, Temporal Integrity, Identity Integrity, Governance Consistency) and five operational guarantees (Mechanistic Boundary, Stasis, Governed Effect Surface, Evidence-Coupled Execution, Graduated Freeze). The specification is published for collaborative review.'
    },
    {
      title: 'AI Insurability Framework',
      description: 'Executive framework examining minimum architectural conditions for AI insurability, grounded in ZTG.',
      image: '/assets/industrial-integrity.webp',
      summary: 'Maps Zero Trust Governance invariants to five underwriting-relevant primitives: execution boundary enforcement, deterministic policy evaluation, authority attribution, replayable authorization record, and commit verification. Published for underwriter and risk architect review.'
    },
    {
      title: 'SDS.SYS.FAIL — Modern Systems Archaeology and Pathology',
      description: 'Formal taxonomy of execution-layer governance failures mapped to missing ZTG primitives.',
      image: '/assets/failure-analysis.webp',
      summary: 'Each entry identifies a recurring structural failure pattern, maps it to a missing governance invariant, and provides diagnostic vocabulary for insurers and builders. Failure modes demonstrate what happens when governance is absent — not as warning, but as structural analysis.'
    },
    {
      title: 'Lighthouse',
      description: 'Reference implementation of Zero Trust Governance for high-assurance environments.',
      image: '/assets/lighthouse.webp',
      summary: 'Lighthouse targets environments where failure carries systemic, financial, or safety consequences. It implements the full ZTG invariant set with layered deterministic governance, cryptographic provenance, full replayability, and invariant enforcement under adversarial conditions. Others may build ZTG-compatible implementations. Lighthouse is the certification reference.'
    }
  ];

  return (
    <section id="projects" className="page-section">
      <div className="container">
        <SectionHeader path="SYS.EXT //" title="Research" />
        <div className="services-grid">
          {projects.map((project, index) => (
            <div key={index} className="blog-card">
              <img
                src={project.image}
                alt={project.title}
                className="blog-card-image"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/333333?text=...';
                }}
              />
              <div className="blog-card-content">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
