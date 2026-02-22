export function Services() {
  const services = [
    {
      icon: '易',
      title: 'Agentic Orchestration Platform',
      description: 'A fully modular, platform-agnostic system for coordinating multi-agent LLM workflows, featuring a semantic memory mesh and a reasoning framework rooted in structured doubt.'
    },
    {
      icon: '🧠',
      title: 'Advanced Memory Systems',
      description: 'Hybrid memory mesh combining vector, symbolic, and episodic storage, inspired by human cognition to support long-term task tracking and reusable reasoning.'
    },
    {
      icon: '🛡️',
      title: 'AI Governance & HITL API',
      description: 'A cryptographically signed, multi-signature Human-in-the-Loop API for high-stakes decisions, emphasizing verifiability, traceability, and human authority.'
    },
    {
      icon: '🤔',
      title: 'Deliberative Reasoning Frameworks',
      description: 'Development of "The Assembly," a system where AI agents with conflicting roles argue and refine beliefs via dialectical methods, based on the "Pact of Doubt."'
    },
    {
      icon: '🤖',
      title: 'CARETAKER Host & Multimedia Interfaces',
      description: 'An emotionally reactive AI host for user-facing interactions, implemented as a minimalist glyph/light-based avatar for interactive experiences.'
    },
    {
      icon: '⚙️',
      title: 'Model Efficiency & Deployment',
      description: 'Sparse LLM experimentation, dynamic API routing, and price/latency-aware model selection, with local-first systems using vLLM, OpenWebUI, and Docker.'
    }
  ];

  return (
    <section id="services" className="page-section">
      <div className="container">
        <h2>Current Research & Focus Areas</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
