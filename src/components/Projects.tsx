export function Projects() {
  const projects = [
    {
      title: 'Agent Mesh Memory Model',
      description: 'Exploring distributed memory and resonance-based context across agents.',
      image: '/assets/memory-mesh-1.webp',
      summary: 'Rather than isolate memory within a single agent, we explore how distributed context can be maintained and evolved across many. By emphasizing patterns of resonance—rather than content alone—this approach fosters continuity and collective intuition among cooperating systems.'
    },
    {
      title: 'Reasoning Pattern Catalog (RPC)',
      description: 'Codified methods for structured agent reasoning and decision support.',
      image: '/assets/glyph-reason.webp',
      summary: 'We\'re codifying structured reasoning methods into reusable forms that agents can call upon as needed. From decomposition strategies to failure mode introspection, these patterns provide scaffolding for deeper analysis.'
    },
    {
      title: 'Orchestration Interfaces',
      description: 'Interfaces for guiding and overseeing intelligent agent systems.',
      image: '/assets/globe-web.webp',
      summary: 'We\'re experimenting with new ways for humans to direct, supervise, and collaborate with intelligent systems. The result is a more intuitive command structure for complex, evolving agent systems.'
    },
    {
      title: 'Verifiable Core System',
      description: 'A zero-trust execution layer for verified agent behavior across platforms.',
      image: '/assets/phoenix-logo.jpg',
      summary: 'We are building a zero-trust execution layer designed for intelligence at scale. It ensures that agent actions can be independently verified, logged, and audited—no matter where they run.'
    }
  ];

  return (
    <section id="projects" className="page-section">
      <div className="container">
        <h2>Our Research & Development</h2>
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
