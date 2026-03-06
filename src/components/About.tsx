import { SectionHeader } from './SectionHeader';
import { SectionCut } from './ArchitecturalSystem';
import { LAYER_GLYPHS } from '../data/glyphs';
import './ArchitecturalSystem.css';

export function About() {
  return (
    <section id="about" className="page-section">
      <div className="container">
        <SectionHeader path="SYS.SPEC //" title="Doctrine" />

        <div className="doctrine-frame">
          {/* Corner marks */}
          <div className="doctrine-frame__corner doctrine-frame__corner--tl" />
          <div className="doctrine-frame__corner doctrine-frame__corner--tr" />
          <div className="doctrine-frame__corner doctrine-frame__corner--bl" />
          <div className="doctrine-frame__corner doctrine-frame__corner--br" />

          {/* Layer indicator strip */}
          <div className="doctrine-frame__layer-strip">
            <span className="doctrine-layer-glyph">{LAYER_GLYPHS.INVARIANT.glyph}</span>
            <span className="doctrine-layer-label">SYSTEM INVARIANT LAYER</span>
          </div>

          <div className="doctrine-content">
            <p className="doctrine-paragraph doctrine-paragraph--lead">
              Shadow Dynamic Systems is an AI research and development company
              focused on governance infrastructure for high-consequence domains.
            </p>

            <SectionCut label="STRUCTURAL OBSERVATION" />

            <p className="doctrine-paragraph">
              We design cognitive architectures, orchestration frameworks, and
              governance systems grounded in a structural observation: <em>when
              stochastic reasoning is granted irreversible execution authority
              without deterministic controls, risk becomes unbounded.</em>
            </p>

            <div className="doctrine-definition">
              <div className="doctrine-definition__header">
                <span className="doctrine-definition__term">Zero Trust Governance (ZTG)</span>
              </div>
              <p className="doctrine-definition__text">
                Formalizes the invariants required for governed execution — the
                operational property that irreversible actions are permitted only
                following deterministic authorization that is auditable,
                attributable, and replayable.
              </p>
              <div className="doctrine-definition__reference">
                <span className="doctrine-reference-chip">Lighthouse</span>
                <span className="doctrine-reference-note">Reference implementation</span>
              </div>
            </div>

            <SectionCut label="ORIGIN" />

            <p className="doctrine-paragraph doctrine-paragraph--founder">
              SDS was founded by <strong>Jason Crittenden</strong> (JD, 12+ years
              engineering in legal technology) at the intersection of liability
              architecture, evidentiary standards, and systems engineering — the
              three domains where governance either holds or fails.
            </p>
          </div>

          {/* Bottom notation */}
          <div className="doctrine-frame__notation">
            <span>SDS.SPEC.DOCTRINE</span>
            <span>v0.3-draft</span>
          </div>
        </div>
      </div>
    </section>
  );
}
