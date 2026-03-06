export function Hero() {
  const buildDate = new Date().toISOString().split('T')[0].replace(/-/g, '.');

  return (
    <section id="hero" className="page-section visible">
      <div className="container">
        <h1>
          Governed Execution<span className="highlight">.</span>
        </h1>
        <p>
          We build the control plane for autonomous systems — deterministic
          governance that makes AI execution auditable, bounded, and insurable.
        </p>
        <div className="hero-metadata">
          <span>ENV: PUBLIC-NODE</span>
          <span>BUILD: SDS-{buildDate}</span>
          <span>STATUS: OPERATIONAL</span>
        </div>
      </div>
    </section>
  );
}
