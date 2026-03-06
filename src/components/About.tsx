import { SectionHeader } from './SectionHeader';

export function About() {
  return (
    <section id="about" className="page-section">
      <div className="container">
        <SectionHeader path="SYS.SPEC //" title="Doctrine" />
        <p>
          Shadow Dynamic Systems is an AI research and development company
          focused on governance infrastructure for high-consequence domains.
          We design cognitive architectures, orchestration frameworks, and
          governance systems grounded in a structural observation: when
          stochastic reasoning is granted irreversible execution authority
          without deterministic controls, risk becomes unbounded.
        </p>
        <p>
          Zero Trust Governance (ZTG) formalizes the invariants required for
          governed execution — the operational property that irreversible actions
          are permitted only following deterministic authorization that is
          auditable, attributable, and replayable. Lighthouse is the reference
          implementation.
        </p>
        <p>
          SDS was founded by Jason Crittenden (JD, 12+ years engineering in
          legal technology) at the intersection of liability architecture,
          evidentiary standards, and systems engineering — the three domains
          where governance either holds or fails.
        </p>
      </div>
    </section>
  );
}
