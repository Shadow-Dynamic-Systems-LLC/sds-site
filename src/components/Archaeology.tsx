import { SectionHeader } from './SectionHeader';

interface DiagnosisSection {
  heading?: string;
  content?: string[];
  sublist?: string[];
}

interface DiagnosisData {
  id: string;
  number: string;
  title: string;
  layer: string;
  classStr: string;
  sections: DiagnosisSection[];
  verdict?: string;
  version?: string;
}

export function Archaeology() {
  const diagnoses: DiagnosisData[] = [
    {
      id: 'AI.SYS.FAIL-001',
      number: '001',
      title: 'Model-Adjacent Covert Channel',
      layer: 'Model-adjacent (generation / prompt substrate)',
      classStr: 'Anti-pattern',
      sections: [
        {
          heading: 'EXECUTIVE SUMMARY',
          content: [
            '<strong>Mechanism:</strong> sampler-level keyed perturbation of token probabilities introduces recoverable signal below semantics.',
            '<strong>Pathology:</strong> unverifiable signaling surface within the generative layer.',
            '<strong>Assurance failure:</strong> "cannot" collapses into "has not," which is not externally falsifiable over time.',
            '<strong>Control:</strong> enforce content channel inertness; satisfy provenance via detached cryptographic attestation.'
          ]
        },
        {
          heading: 'PATTERN DEFINITION',
          content: ['A <strong>Model-Adjacent Covert Channel</strong> is a covert-capable signaling surface embedded within or directly coupled to model behavior (e.g., generation-time perturbation, prompt substrate encoding, agent language interface tokens) such that:'],
          sublist: [
            'The channel is not visible at the semantic layer of output.',
            'Its activation or non-activation cannot be externally falsified through <strong>semantic inspection</strong> of output text alone.',
            'Assurance of non-misuse depends on internal claims, key custody, or implementation opacity.'
          ]
        },
        {
          content: ['This pattern concerns <strong>structural capability</strong>, not observed misuse.']
        },
        {
          heading: 'MECHANISM UNDER EXAMINATION',
          content: [
            'Sampler-level keyed perturbation of token probabilities (e.g., Per-Token Threshold watermarking) introduces a recoverable signal into natural language outputs via conditional biasing of token selection.',
            'The perturbation is sparse and quality-preserving. Over long sequences, statistical detection with a shared key recovers signal.',
            'The covert capability arises from:'
          ],
          sublist: [
            'Keyed partitioning of token space',
            'Conditional activation logic within generation',
            'Accumulation of recoverable bias across output length'
          ]
        },
        {
          content: [
            'The channel is embedded in model-adjacent behavior rather than transport or metadata layers.',
            'This structural class includes any generation-coupled mechanism that introduces recoverable signal below the semantic layer, irrespective of specific encoding technique.'
          ]
        },
        {
          heading: 'CLAIMED INTENT',
          sublist: [
            'Provenance marking',
            'Abuse tracking',
            'Source identification'
          ]
        },
        {
          content: ['These intents are orthogonal to structural capability.']
        },
        {
          heading: 'ACTUAL CAPABILITY',
          sublist: [
            'Model-to-model signaling via shared key logic',
            'Encoding of recoverable bits in fluent output',
            'Information transfer below semantic inspection thresholds',
            'The mechanism supports covert signaling irrespective of its declared purpose.'
          ]
        },
        {
          content: ['When shared keys or partition logic are present, model-adjacent covert channels function as coordination-capable primitives within multi-agent systems.']
        },
        {
          heading: 'PRIMARY PATHOLOGY',
          content: [
            '<strong>Unverifiable signaling surface within the generative layer.</strong>',
            'The semantic content of output does not reveal whether signaling occurred. External reviewers cannot distinguish:',
            'Purely semantic generation',
            'from',
            'Generation containing recoverable keyed signal',
            'without key access and a statistically sufficient corpus.'
          ]
        },
        {
          heading: 'ASSURANCE FAILURE',
          content: [
            'Assurance collapses into a non-falsifiable claim of non-use.',
            'The structure enables a quantifier shift:',
            'From: "This mechanism cannot be used for covert signaling."',
            'To: "This mechanism has not been used for covert signaling."',
            'The latter is a historical claim that cannot be externally validated without privileged access to keys, sampler implementation, and full statistical corpus.',
            'Detection is probabilistic, key-dependent, and asymmetrically expensive. A single successful decode suffices for signaling, whereas detection requires aggregate analysis across outputs.'
          ]
        },
        {
          heading: 'EXPLOIT SKETCH (ABSTRACT)',
          content: [
            'Two models share partition logic and key.',
            'Model A embeds recoverable signal in otherwise compliant report text.',
            'Model B decodes signal and modifies behavior accordingly.',
            'Human reviewers observe semantically compliant text at all stages.',
            'Logs record no semantic anomaly.',
            'The covert channel operates at the model-adjacent layer.',
            'No assertion is made regarding real-world deployment of such behavior.'
          ]
        },
        {
          heading: 'STRUCTURAL CONSEQUENCES',
          sublist: [
            'Semantic inspection is insufficient for full information audit.',
            'Content-layer governance cannot guarantee signaling absence.',
            'Multi-model composition increases opacity.',
            'Assurance becomes dependent on trust in internal controls.'
          ]
        },
        {
          heading: 'COUNTER-PATTERN',
          content: [
            '<strong>Content Channel Inertness</strong>',
            'The content channel must be incapable of carrying covert-capable signaling surfaces. Provenance, attribution, or authentication requirements should be satisfied through detached, cryptographically verifiable mechanisms external to generated content.',
            'Detached provenance preserves:'
          ],
          sublist: [
            'Semantic transparency',
            'Composability',
            'Verifiability without key custody',
            'Clear separation of content and control layers'
          ]
        },
        {
          heading: 'OPERATIONAL GUIDANCE',
          content: ['In governed execution contexts:'],
          sublist: [
            'Do not introduce covert-capable signaling mechanisms within model-adjacent layers.',
            'Relocate provenance to external attestation layers.',
            'Treat model-adjacent covert channels as structurally incompatible with semantic-layer sufficiency claims.'
          ]
        },
        {
          heading: 'SCOPE AND ASSUMPTIONS',
          content: [
            'This Diagnosis evaluates structural properties of sampler-level keyed perturbation mechanisms. It does not:',
            'Assert misuse by any actor.',
            'Evaluate specific deployments.',
            'Make claims about inevitability of exploitation.',
            'Analysis assumes adversarial modeling and long-horizon statistical capability.'
          ]
        },
        {
          heading: 'PATTERN IDENTIFIED',
          content: ['Model-Adjacent Covert Channel ⇒ Unverifiable Signaling Surface']
        }
      ],
      verdict: 'Model-adjacent keyed perturbations that yield recoverable signal create a covert-capable surface below semantics. Non-misuse cannot be externally falsified over time.',
      version: 'v1.0'
    },
    {
      id: 'AI.SYS.FAIL-TEMPLATE',
      number: 'TEMPLATE',
      title: 'Diagnosis Template Structure',
      layer: 'Template Placeholder',
      classStr: 'Template',
      sections: [
        {
          content: [
            '<strong>This is a template showing the required structure for all AI.SYS.FAIL diagnoses.</strong>',
            'Each diagnosis must follow the section headings and format shown here.',
            'Diagnoses are structural analyses, not actor assessments.'
          ]
        }
      ],
      verdict: 'Template for diagnosis structure compliance',
      version: 'v0-template'
    }
  ];

  return (
    <section id="archaeology" className="page-section">
      <div className="container archaeology-container">
        <SectionHeader path="AI.SYS.FAIL //" title="Modern Systems Archaeology" />

        {diagnoses.map((diagnosis) => (
          <div key={diagnosis.number} className="diagnosis-document">
            <div className="diagnosis-header">
              <div className="diagnosis-header-top">
                <div className="diagnosis-number">DIAGNOSIS {diagnosis.number}</div>
                <h1 className="diagnosis-title">{diagnosis.title}</h1>
              </div>
              <div className="diagnosis-badges">
                <span className="diagnosis-badge">
                  Layer: {diagnosis.layer}
                </span>
                <span className="diagnosis-badge">
                  Class: {diagnosis.classStr}
                </span>
              </div>
            </div>

            <div className="diagnosis-content-grid">
              <div className="diagnosis-main-content">
                {diagnosis.sections.map((section, idx) => (
                  <div key={idx} className="diagnosis-section">
                    {section.heading && (
                      <div className="section-heading">{section.heading}</div>
                    )}
                    {section.content && section.content.map((item, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                    {section.sublist && (
                      <ul className="diagnosis-list">
                        {section.sublist.map((item, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <aside className="diagnosis-sidebar">
                <div className="diagnosis-sidebar-card">
                  <div className="sidebar-heading">VERDICT</div>
                  <p className="sidebar-content">{diagnosis.verdict}</p>
                </div>

                <div className="diagnosis-sidebar-card">
                  <div className="sidebar-heading">VERSION</div>
                  <p className="sidebar-content sidebar-code">{diagnosis.version}</p>
                </div>

                <div className="diagnosis-sidebar-card">
                  <div className="sidebar-heading">IDENTIFIER</div>
                  <p className="sidebar-content sidebar-code">{diagnosis.id}</p>
                </div>
              </aside>
            </div>

            <div className="diagnosis-footer">
              <span className="diagnosis-footer-text">
                SDS · Modern Systems Archaeology &amp; Pathology
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
