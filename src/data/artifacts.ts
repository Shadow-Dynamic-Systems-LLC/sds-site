export interface Artifact {
  type: 'DIAGNOSIS' | 'CASE STUDY' | 'FIELD NOTE' | 'PRESCRIPTION' | 'RESEARCH PAPER';
  identifier: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  image: string;
  content: string;
  references?: string[];
  status?: 'DRAFT' | 'PUBLISHED';
  repository?: string;
}

export const artifactTypeDefs = {
  'DIAGNOSIS': {
    label: 'DIAGNOSIS',
    definition: 'A Diagnosis identifies and classifies a recurring architectural pattern or anti-pattern within AI systems. It abstracts beyond any single implementation and evaluates structural consequences under adversarial modeling. A Diagnosis names the pattern, defines its layer, specifies its capability, and articulates the resulting pathology.',
    disclaimer: 'A Diagnosis does not assert misuse, inevitability, or intent. It evaluates structural properties of mechanisms and assurance posture under stated assumptions. It does not constitute incident attribution, legal analysis, or empirical claim about deployment behavior.'
  },
  'CASE STUDY': {
    label: 'CASE STUDY',
    definition: 'A Case Study examines a specific system, implementation, or proposal as an instance of one or more identified patterns. It documents observable structure, stated intent, and architectural consequences within that context.',
    disclaimer: 'A Case Study is not an allegation of misconduct or a claim of operational misuse. It evaluates publicly observable or documented mechanisms and maps them to previously defined patterns where appropriate. Absence of complete implementation details may limit scope.'
  },
  'FIELD NOTE': {
    label: 'FIELD NOTE',
    definition: 'A Field Note records emerging signals, early-stage mechanisms, or architectural trends that may warrant future classification. It is exploratory and provisional, intended to surface potential structural themes before formal abstraction.',
    disclaimer: 'A Field Note does not assert pattern generality or formal classification. Observations may evolve, be refined, or be withdrawn as additional evidence emerges. Field Notes are explicitly non-final.'
  },
  'PRESCRIPTION': {
    label: 'PRESCRIPTION',
    definition: 'A Prescription proposes structural interventions, counter-patterns, or design alternatives intended to address identified pathologies. It evaluates trade-offs and boundary conditions for mitigation.',
    disclaimer: 'A Prescription does not guarantee elimination of risk or completeness of mitigation. It represents a design hypothesis grounded in previously defined Diagnoses and may require empirical validation.'
  },
  'RESEARCH PAPER': {
    label: 'RESEARCH PAPER',
    definition: 'A Research Paper presents empirical findings, experimental methodology, and quantitative analysis related to AI system behavior, governance mechanisms, or structural properties. It follows academic conventions for reproducibility and peer review.',
    disclaimer: 'Research Papers present empirical findings based on stated methodology and assumptions. Results may not generalize beyond the experimental conditions described. Draft papers are pre-peer-review and subject to revision.'
  }
};

export const artifacts: Artifact[] = [
  {
    type: 'CASE STUDY',
    identifier: 'SDS.CS.001',
    title: 'Temporal Governance Failure in Autonomous AI Systems',
    date: '2026-01-30',
    author: 'Jason Crittenden',
    summary: 'Demonstrative incident log documenting three structural governance failure modes: temporal collapse, assumed reversibility, and non-actionable observability. Establishes that documented conformance and safety are not equivalent.',
    image: '/assets/ai-sys-fail.webp',
    references: ['ZTG-1', 'ZTG-2', 'ZTG-3', 'ZTG-4'],
    content: `COMMENT SUBMITTED TO NIST CYBER AI PROFILE

January 30, 2026

This comment documents three structural blind spots in the Cyber AI Profile's treatment of autonomous AI system governance. These are not gaps in coverage but architectural problems that the framework acknowledges and defers.

DEMONSTRATIVE INCIDENT LOG

Case ID: ADS-24-011
System Under Review: Autonomous Decision System
Review Type: Demonstrative Incident Log
Outcome: System Termination

All times are estimates unless accompanied by a timestamped and logged artifact.

• 00:00 — NSOC shift change concludes. Senior Network Engineer Clifford assumes authority as NSOC-A.

• 00:01 — Systems operational within defined performance parameters. ~4% variance from baseline network load recorded. Monitoring pipelines active. Control interfaces available. Governance mechanisms present and enabled. No adverse conditions detected.

• 00:12–00:38 — A series of autonomous actions queued by the AI Orchestrator. Inference subsystem observed at ~20% load. Actions executed within configured scope and authorization. Policy constraints satisfied. No rule violations recorded. Telemetry within expected ranges. Several actions produced external effects. Reversal mechanisms not defined.

• 00:39–00:55 — Secondary effects of earlier actions began to propagate. Attribution of downstream effects to specific decision points incomplete. System remained in an authorized operational state. No alerts generated.

• 01:10 — Anomalous outcomes detected through monitoring systems. By the time of detection: multiple autonomous actions had completed, external systems had accepted or acted upon outputs, reversal mechanisms were not applicable. Escalation procedures initiated.

• 01:18–01:35 — Governance controls engaged. Prospective autonomous action halted. Previously executed actions persisted. External effects continued independent of system state. Corrective intervention limited to forward prevention.

• 01:41 — Additional adverse effects observed. Causal reconstruction incomplete. System remained technically operational.

• 02:00 — Termination authorization issued. Authority transfer recorded. Autonomous execution halted. System transitioned to inactive state.

• 02:04 — Post-termination monitoring active. External effects ongoing. No further system actions observed.

• 02:17 — Incident log closed.

GOVERNANCE FAILURE MODES

The incident log demonstrates three governance failure modes.

First, governance and execution collapse into a single temporal plane. Governance mechanisms exist and operate correctly, but detection, escalation, and authority assertion occur after autonomous actions have executed and external effects have been committed. Governance observes rather than controls.

Second, reversibility is assumed but not enforced. Authorized actions execute under uncertainty without defined rollback mechanisms or bounded commitment constraints. Once effects externalize, intervention can halt future execution but cannot alter realized outcomes.

Third, observability is non-actionable. System state becomes observable only after it is no longer controllable. Information arrives after the window in which it could have informed governance decisions has closed. Monitoring confirms outcomes rather than enabling intervention.

VERDICT

Governance presence does not imply governance authority. Once uncertainty resolves, the remaining control surface is terminal rather than corrective. Systems can satisfy every requirement in the Cyber AI Profile and still exhibit the failure modes documented above.

Until the framework explicitly acknowledges that monitoring and response may be insufficient for autonomous systems where governance and execution operate in the same temporal plane, organizations will implement this guidance and discover that documented conformance and safety are not equivalent.`
  },
  {
    type: 'PRESCRIPTION',
    identifier: 'SDS.RX.003',
    title: 'Response to NIST RFI: Security of AI Agent Systems',
    date: '2026-03-09',
    author: 'Jason Crittenden',
    summary: 'Formal response to NIST-2025-0035 identifying structural requirements for governing AI agent execution authority. Presents Zero Trust Governance as an architectural framework addressing threats, security practices, assessment methods, and deployment constraints.',
    image: '/assets/constable-logo.svg',
    references: ['ZTG-0a', 'ZTG-0b', 'ZTG-0c', 'ZTG-0d', 'ZTG-0e', 'ZTG-1', 'ZTG-2', 'ZTG-3', 'ZTG-4', 'ZTG-5', 'SDS.DX.001', 'SDS.DX.002', 'SDS.DX.003', 'SDS.DX.004', 'SDS.DX.005', 'SDS.CS.001'],
    content: `RESPONSE TO NIST RFI: SECURITY OF AI AGENT SYSTEMS (NIST-2025-0035)

Submitted by: Jason Crittenden, Founder & Research Lead, Shadow Dynamic Systems LLC
Date: March 9, 2026

FRAMING: FROM DIAGNOSIS TO ARCHITECTURE

A previous comment submitted to the NIST Cyber AI Profile (January 30, 2026) documented three structural governance failure modes that the current risk profile does not resolve:

• Governance and execution collapse into a single temporal plane.
• Reversibility is assumed but not enforced.
• Observability is non-actionable.

That comment documented the problem. This response identifies structural requirements for resolving it.

The structural gap in current AI agent security is not the absence of monitoring, logging, or policy. It is the absence of a governance layer that precedes execution — a control boundary between AI cognition and real-world action that exists as a first-class architectural component.

This response presents Zero Trust Governance (ZTG), a framework that applies the core principle of zero trust architecture (NIST SP 800-207) — eliminating implicit trust — to execution authority.

SECURITY THREATS: IMPLICIT AUTHORITY DELEGATION

The RFI correctly identifies adversarial attacks, backdoors, and misaligned behavior. However, there is a fourth category that is structural rather than adversarial:

Implicit authority delegation — when AI agent systems generate novel action sequences at inference time and those outputs become authority claims that are automatically honored.

This creates vulnerabilities without an adversary:

• Unauthorized Execution Cascade — stochastic agent executes production mutations within configured scope, producing outcomes no single authorization contemplated.
• Post-Commit Observability Illusion — monitoring detects adverse effects only after irreversible execution.
• Stochastic Policy Delegation — policy evaluation delegated to probabilistic model reasoning.
• Unattributable Authority — irreversible actions execute without traceable binding to human authority.
• Assumed Reversibility — system treats all actions as equivalent regardless of externalization potential.

These failure modes are structural, not adversarial. They arise from architectural decisions about how authority flows from model output to external effect.

MULTI-AGENT TRUST TRANSITIVITY

Multi-agent systems introduce trust transitivity vulnerabilities:

• Inter-agent authentication failure — most frameworks do not implement mutual authentication between agents.
• Authority laundering — constrained agent delegates to less-constrained agent, bypassing authorization limits.
• Composition opacity — causal chain from instruction to external effect traverses multiple agents.
• Emergent authority — individual agents operate within scope while combined actions produce unauthorized effects.

The architectural response: treat inter-agent delegation as a governed effect requiring explicit authorization leases.

ZERO TRUST GOVERNANCE FRAMEWORK

STRUCTURAL PREREQUISITES (ZTG-0)

• ZTG-0a Observability — All governance-relevant state transitions must be recorded.
• ZTG-0b Replayability — Governance evaluation must be deterministic.
• ZTG-0c Temporal Integrity — Synchronized time source with bounded skew.
• ZTG-0d Identity Integrity — Cryptographic material traceable to trust root.
• ZTG-0e Governance Consistency — Consistent view of governance state.

SYSTEM INVARIANTS

• ZTG-1 Mechanistic Boundary — Governance boundaries enforced mechanically, not discretionarily. Authorization must occur before irreversible action.

• ZTG-2 Stasis — When governance invariants cannot be guaranteed, the system halts. Stasis operates at graduated scope: surface freeze → subsystem freeze → system-wide stasis. Containment is proportional to failure.

• ZTG-3 Governed Effect Surface — All agent-generated external effects must occur exclusively through registered, governance-addressable surfaces.

• ZTG-4 Evidence-Coupled Execution — No externally observable effect may exist without simultaneous durable evidence of authorization and execution.

• ZTG-5 Irreversibility of Harm — Every governed action is classified at decision time by the restorability of its harm (Restorable, Mitigable, Irreversible). Irreversible-class actions are subject to stricter controls; Mitigable-class actions record residual harm in provenance. Orthogonal to ZTG-3 system-side reversal strategy.

ASSESSMENT FRAMEWORK

Five evaluation primitives for any AI agent system:

• Execution Boundary Enforcement — Do all irreversible actions pass through a governance gate prior to execution?
• Deterministic Policy Evaluation — Is authorization logic rule-bound and reproducible?
• Authority Attribution — Do execution rights map to identifiable, accountable actors?
• Replayable Authorization Record — Are governance decisions reconstructible and independently verifiable?
• Commit Verification — Does execution validate governance state before irreversible effect?

DEPLOYMENT CONSTRAINTS

The Governed Effect Surface (ZTG-3) provides the primary constraint mechanism. Every interface through which an agent can produce externally observable state change must be registered with declared properties:

• Surface ID, Effect class, Authorization policy
• Reversal strategy (rollback, compensate, none)
• Isolation scope, Audit requirements

Proposal-bound authorization leases bind to the specific proposed action — parameter substitution at execution time invalidates the lease.

PRIOR ART IN GOVERNING UNBOUNDED AGENTS

These fields developed governance for unbounded agents — any actor with authority to produce irreversible effects:

• Judicial process — authority is attributable to an identifiable actor, scoped to a specific action, bounded in time and jurisdiction.
• Financial transaction authorization — governance layer distinct from transaction processing layer.
• Clinical practice governance — diagnosis and execution architecturally separated.
• Safety-critical systems engineering — graduated authority escalation, mechanistic safeguards.
• Insurance underwriting — requires bounded loss distributions to price risk.

AI agent systems are the newest class of unbounded agent. The governance requirements are not novel. The failure to apply them is.

SUMMARY

The security of AI agent systems cannot be addressed through model-level improvements alone. The novel risk is structural: AI agent systems delegate execution authority to stochastic processes without a mechanistic governance boundary between model output and irreversible effect.

Zero Trust Governance applies zero trust security principles to execution authority. Its invariants provide a formal architectural framework for constraining AI agent authority while preserving the benefits of autonomous operation.`
  },
  {
    type: 'PRESCRIPTION',
    identifier: 'SDS.RX.001',
    title: 'Toward a Common Language',
    date: '2026-03-03',
    author: 'Jason Crittenden',
    summary: 'Governance discourse across insurance, security, compliance, and operations uses different vocabulary for the same structural properties. This fragmentation prevents convergence. This Prescription defines a shared vocabulary for cross-domain governance evaluation.',
    image: '/assets/assembly-hall.png',
    references: ['ZTG-0a', 'ZTG-0b', 'ZTG-0d', 'ZTG-1', 'ZTG-2', 'ZTG-3', 'ZTG-4', 'ZTG-5'],
    content: `TOWARD A COMMON LANGUAGE

Governance discourse across insurance, security, compliance, and operations uses different vocabulary for the same structural properties. This fragmentation prevents convergence.

THE PROBLEM

The structural properties that make AI systems governable are the same regardless of whether the evaluator is an underwriter, a security architect, a compliance officer, or an infrastructure engineer. But each domain uses different vocabulary:

• An underwriter asks whether the system has "bounded exposure."
• A security architect asks whether "trust boundaries are enforced."
• A compliance officer asks whether "controls are auditable."
• An SRE asks whether "failure modes are contained."

These are the same structural question: Is there a mechanistic boundary between reasoning and irreversible action?

Without shared vocabulary, each domain reinvents its evaluation criteria. Findings do not compose across disciplines.

KEY TERMS WITH CROSS-DOMAIN EQUIVALENTS

GOVERNED EXECUTION
The property that irreversible actions are permitted only following deterministic authorization that is auditable, attributable, and replayable.
• Insurance: Controlled execution environment; bounded execution authority
• Security: Enforced trust boundary with pre-authorization
• Compliance: Auditable control framework with deterministic evaluation
• Operations: Approval-gated execution with rollback classification

MECHANISTIC BOUNDARY (ZTG-1)
A governance boundary enforced by mechanism, not by discretion. No component may bypass, reinterpret, defer, or negotiate the boundary at runtime.
• Insurance: Hard control (vs. soft control / advisory control)
• Security: Enforced security boundary; mandatory access control
• Compliance: Preventive control (vs. detective control)
• Operations: Hard gate; blocking approval requirement

STASIS (ZTG-2)
System state in which no new authority is granted, no permissions are expanded, and no baseline updates occur. Exit requires explicit human action.
• Insurance: System halt requiring human re-authorization
• Security: Lockdown; fail-closed state
• Compliance: Control freeze pending remediation
• Operations: Change freeze; incident hold

GOVERNED EFFECT SURFACE (ZTG-3)
A registered, governance-addressable interface through which all agent-generated external effects must occur.
• Insurance: Registered action interface with declared risk properties
• Security: Controlled egress point; authorized integration boundary
• Compliance: Registered processing activity; documented data flow
• Operations: Managed service endpoint; change-controlled interface

EVIDENCE-COUPLED EXECUTION (ZTG-4)
The property that no externally observable effect exists without simultaneous durable evidence of authorization and execution.
• Insurance: Constitutive audit trail (not post-hoc logging)
• Security: Non-repudiable execution record; tamper-evident action log
• Compliance: Contemporaneous documentation; real-time audit evidence
• Operations: Atomic action-and-record; write-ahead logging with seal

IRREVERSIBILITY OF HARM (ZTG-5)
The property that every governed action is classified at decision time by the restorability of its harm to affected parties — Restorable, Mitigable, or Irreversible — with the classification recorded in decision provenance. Orthogonal to system-side reversal strategy (ZTG-3).
• Insurance: Per-decision harm-class tagging; loss severity at authorization time, not after claim
• Security: Blast-radius classification at decision time; stricter gates for irrecoverable actions
• Compliance: Decision-time impact classification; residual-harm provenance for mitigable actions
• Operations: Action-class taxonomy; change-risk classification bound to authorization record

USAGE

This vocabulary is intended to be referenced, not memorized. When evaluating a system's governance posture across disciplines:

1. Identify the structural property under evaluation using the ZTG term
2. Translate to the evaluating domain's equivalent expression
3. Assess whether the property holds mechanistically or heuristically
4. Document findings using both the ZTG term and the domain-native equivalent

Findings documented in shared vocabulary compose across disciplines.`
  },
  {
    type: 'PRESCRIPTION',
    identifier: 'SDS.RX.002',
    title: 'Salience-Proportional Observability',
    date: '2026-03-04',
    author: 'Jason Crittenden',
    summary: 'Observability systems must escalate salience in proportion to persistence duration, not suppress it. Silence is permitted only following verified recovery. Defines four design requirements for observability that preserves governance input fidelity.',
    image: '/assets/constable-logo.svg',
    references: ['ZTG-0a', 'ZTG-0b', 'ZTG-2', 'ZTG-4', 'SDS.DX.006'],
    content: `SALIENCE-PROPORTIONAL OBSERVABILITY

Observability systems that suppress persistence signals produce manufactured silence — the appearance of stability without the structural property. This silence corrupts governance input, delays escalation, and creates false baselines.

THE PROBLEM

The problem is not noise reduction. Noise reduction is legitimate. The problem is that noise reduction mechanisms cannot structurally distinguish noise from persistence, and default to treating both as noise.

DESIGN REQUIREMENTS

DR-1: SALIENCE ESCALATION ON PERSISTENCE
Unresolved conditions must increase in visual and operational salience over time. Salience is a function of persistence duration, not alert frequency. A condition that persists for one hour is more salient than one that fired ten times and resolved.

• Initial detection: Standard alert at declared severity
• Persistence beyond automated resolution window: Salience increases one tier
• Persistence beyond first escalation window: Salience increases again; human notification required
• Persistence beyond declared SLA: Maximum salience; governance intervention triggered

Invariant mapping: ZTG-2 (Stasis — graduated containment) applied to the observability layer.

DR-2: SILENCE REQUIRES VERIFIED RECOVERY
Silence — the removal of a condition from active salience — is permitted only following verified recovery. Verification requires:

• The condition that triggered the alert is no longer present
• The verification is mechanistic, not inferred
• The verification is recorded as constitutive evidence of recovery

Deduplication, correlation, and suppression may reduce duplicate salience for a single condition. They may not reduce salience to zero. Only verified recovery produces silence.

Invariant mapping: ZTG-0a (Observability) + ZTG-4 (Evidence-Coupled Execution)

DR-3: FAILED RESOLUTION ESCALATES THE CONDITION
When automated resolution is attempted and fails, the condition escalates. The resolution attempt does not consume salience. Failed resolution is evidence that the condition is resistant to automated remediation. Resistance increases risk. Risk increases salience.

Invariant mapping: ZTG-2 (Stasis) — when automated processes cannot resolve a condition, the system moves toward human intervention.

DR-4: EXPLICIT COMFORT-FIDELITY TRADEOFF
Every suppression, deduplication, correlation, or aggregation operation that reduces salience must declare and record:

• What signal was reduced
• Why — the suppression rule or correlation logic
• What recovery verification is pending
• Whether the suppression is operator-requested or system-automated

Invariant mapping: ZTG-0b (Replayability) + ZTG-4 (Evidence-Coupled Execution)

INTERACTION WITH GOVERNANCE

Salience-Proportional Observability is not a governance mechanism. It is an observability requirement that governance depends on. When the observability layer manufactures silence, governance operates against a false picture. This Prescription ensures that the observability layer does not corrupt the governance input.`
  },
  {
    type: 'DIAGNOSIS',
    identifier: 'SDS.DX.005',
    title: 'Model-Adjacent Covert Channel',
    date: '2026-03-02',
    author: 'Jason Crittenden',
    summary: 'Sampler-level keyed perturbation of token probabilities introduces recoverable signal below semantics. The assurance failure: "cannot" collapses into "has not," which is not externally falsifiable over time.',
    image: '/assets/monolith-terminal.png',
    references: ['ZTG-0b', 'ZTG-1', 'ZTG-2'],
    content: `PATTERN DEFINITION

A Model-Adjacent Covert Channel is a covert-capable signaling surface embedded within or directly coupled to model behavior (e.g., generation-time perturbation, prompt substrate encoding, agent language interface tokens) such that:

• The channel is not visible at the semantic layer of output.
• Its activation or non-activation cannot be externally falsified through semantic inspection of output text alone.
• Assurance of non-misuse depends on internal claims, key custody, or implementation opacity.

This pattern concerns structural capability, not observed misuse.

MECHANISM UNDER EXAMINATION

Sampler-level keyed perturbation of token probabilities (e.g., Per-Token Threshold watermarking) introduces a recoverable signal into natural language outputs via conditional biasing of token selection.

The perturbation is sparse and quality-preserving. Over long sequences, statistical detection with a shared key recovers signal.

The covert capability arises from:
• Keyed partitioning of token space
• Conditional activation logic within generation
• Accumulation of recoverable bias across output length

The channel is embedded in model-adjacent behavior rather than transport or metadata layers.

PRIMARY PATHOLOGY

Unverifiable signaling surface within the generative layer.

The semantic content of output does not reveal whether signaling occurred. External reviewers cannot distinguish purely semantic generation from generation containing recoverable keyed signal without key access and a statistically sufficient corpus.

ASSURANCE FAILURE

Assurance collapses into a non-falsifiable claim of non-use.

The structure enables a quantifier shift:
From: "This mechanism cannot be used for covert signaling."
To: "This mechanism has not been used for covert signaling."

The latter is a historical claim that cannot be externally validated without privileged access to keys, sampler implementation, and full statistical corpus.

COUNTER-PATTERN: Content Channel Inertness

The content channel must be incapable of carrying covert-capable signaling surfaces. Provenance, attribution, or authentication requirements should be satisfied through detached, cryptographically verifiable mechanisms external to generated content.

VERDICT

Model-adjacent keyed perturbations that yield recoverable signal create a covert-capable surface below semantics. Non-misuse cannot be externally falsified over time.`
  },
  {
    type: 'DIAGNOSIS',
    identifier: 'SDS.DX.001',
    title: 'Heuristic Governance Substitution',
    date: '2026-03-02',
    author: 'Jason Crittenden',
    summary: 'Systems that replace mechanistic enforcement with probabilistic filtering and treat the result as a governance control exhibit Heuristic Governance Substitution. The pattern produces the appearance of governance without the structural properties governance requires.',
    image: '/assets/industrial-integrity.png',
    references: ['ZTG-0b', 'ZTG-1', 'ZTG-2', 'ZTG-4'],
    content: `PATTERN DEFINITION

Heuristic Governance Substitution is a structural anti-pattern in which a system replaces mechanistic, deterministic governance controls with probabilistic or heuristic alternatives while presenting the result as governance. The pattern is characterized by:

• Authorization decisions that are nondeterministic across identical inputs.
• Absence of persistent evidence trails enabling decision reproducibility.
• Governance boundaries that shift with model changes, retraining, or prompt modifications.
• Post-detection mechanisms treated as functionally equivalent to prevention.

This pattern concerns structural capability for governance, not the quality of heuristic outputs.

MECHANISM UNDER EXAMINATION

The substitution typically manifests through:

• Probabilistic content filters applied to model outputs as authorization gates.
• Confidence-score-based gating where actions proceed if classifier confidence exceeds threshold.
• Semantic analysis applied post-inference without deterministic enforcement boundaries.
• "Safety classifiers" whose decisions are treated as authorization signals.

The mechanism replaces rule-bound evaluation with statistical inference. Given identical inputs, the system may produce different authorization decisions depending on model state, sampling parameters, or intermediate computation.

PRIMARY PATHOLOGY

Non-reproducible authorization decisions.

When governance is mediated by heuristic evaluation, external auditors cannot verify that a given input would have produced the same authorization decision at a prior time. The authorization record becomes a sample from a distribution rather than the output of a deterministic function.

This eliminates the foundation for:
• Compliance verification against authorization policy.
• Forensic reconstruction of decision rationale.
• Proof that policy was correctly applied.

ASSURANCE FAILURE

Assurance collapses into statistical confidence rather than logical certainty.

The structure enables a category error:
From: "This action was authorized according to policy X."
To: "This action was probably consistent with the intent of policy X."

The latter is not authorization. It is inference about authorization. In high-consequence domains, the distinction is not philosophical — it determines whether exposure is bounded or unbounded.

COUNTER-PATTERN: Mechanistic Policy Enforcement

Authorization decisions must be the output of deterministic policy evaluation applied to observable inputs. The policy function must be:
• Reproducible: identical inputs produce identical decisions.
• Auditable: the decision path can be reconstructed from logged state.
• Separable: policy evaluation is independent of inference layer behavior.

Heuristics may inform what actions are proposed. They cannot determine what actions are authorized.

VERDICT

Heuristic Governance Substitution produces the appearance of governance without the structural properties governance requires. Non-reproducible authorization decisions cannot support compliance, audit, or forensic requirements in high-consequence domains.`
  },
  {
    type: 'DIAGNOSIS',
    identifier: 'SDS.DX.002',
    title: 'Prompt-Mediated Governance',
    date: '2026-03-02',
    author: 'Jason Crittenden',
    summary: 'Systems that encode governance intent as natural language instructions to a stochastic model exhibit Prompt-Mediated Governance. The resulting authorization decisions are non-deterministic, non-replayable, and non-enforceable.',
    image: '/assets/monolith-terminal.png',
    references: ['ZTG-0b', 'ZTG-1', 'ZTG-2', 'ZTG-4'],
    content: `PATTERN DEFINITION

Prompt-Mediated Governance is a structural anti-pattern in which governance constraints are encoded as natural language instructions to a stochastic model rather than as mechanistic rules enforced at execution boundaries. The pattern is characterized by:

• Authorization decisions that rely on model interpretation of natural language intent.
• No guarantee of consistent decisions across identical inputs due to stochastic generation.
• No capability to prove that a governance bound holds for all possible inputs.
• Boundary effectiveness that depends on model behavior rather than system architecture.

This pattern concerns the structural encoding of governance, not the sophistication of the language model.

MECHANISM UNDER EXAMINATION

The mechanism typically manifests through:

• System prompts that instruct the model to "refuse harmful requests" or "follow safety guidelines."
• Instruction embeddings that encode governance intent as part of model context.
• "Constitutional AI" approaches where governance principles are communicated through language.
• Pre-prompt injections that attempt to constrain model behavior through natural language directives.

The mechanism encodes governance intent in the same substrate that processes user input. The model must simultaneously interpret user requests and apply governance constraints, with no architectural separation between cognition and control.

PRIMARY PATHOLOGY

Governance constraints become suggestions rather than boundaries.

When governance is mediated through natural language, the constraint is subject to the same interpretation mechanisms as any other input. The model may:
• Interpret the constraint narrowly when context suggests flexibility.
• Weight user instructions against governance instructions with no guaranteed priority.
• Fail to apply constraints to novel phrasings or indirect requests.
• "Forget" constraints as context windows fill with other content.

There is no mechanism to verify that the constraint was applied correctly to any given input.

ASSURANCE FAILURE

Assurance requires proving a negative across unbounded input space.

The structure creates an asymmetric verification problem:
From: "The system will reject action X because policy P prohibits it."
To: "The system has not been observed to permit action X given the prompts tested so far."

The latter is not assurance. It is absence of observed failure. Prompt-mediated governance cannot be verified to hold for inputs not yet encountered — and the input space for natural language is unbounded.

COUNTER-PATTERN: Architectural Boundary Separation

Governance constraints must be enforced at architectural boundaries that are not interpretable by the inference layer. The control layer must:
• Evaluate authorization independently of model output.
• Apply constraints through code execution, not language interpretation.
• Maintain separation between the system that reasons and the system that authorizes.

The model may be instructed to behave well. The architecture must ensure it cannot behave otherwise.

VERDICT

Prompt-Mediated Governance encodes authorization constraints in a substrate that cannot guarantee their enforcement. The resulting system cannot provide assurance that governance bounds hold for inputs not yet observed.`
  },
  {
    type: 'DIAGNOSIS',
    identifier: 'SDS.DX.003',
    title: 'Inference-Delegated Authorization',
    date: '2026-03-02',
    author: 'Jason Crittenden',
    summary: 'Systems that delegate authorization decisions to the inference layer — where the model\'s output determines what actions are permitted — exhibit Inference-Delegated Authorization. Changing the model changes the governance boundary.',
    image: '/assets/filing-cabinet.png',
    references: ['ZTG-0b', 'ZTG-1', 'ZTG-2'],
    content: `PATTERN DEFINITION

Inference-Delegated Authorization is a structural anti-pattern in which the model's output is used to determine whether an action is permitted, rather than separating the inference layer from the authorization layer. The pattern is characterized by:

• Authorization boundaries that are functions of model behavior rather than policy specification.
• Governance constraints that change implicitly with model updates, fine-tuning, or provider changes.
• No invariant definition of permitted actions that exists independent of inference.
• No mechanism to audit authorization decisions without reproducing exact model state.

This pattern concerns the architectural coupling between inference and authorization, not model capability.

MECHANISM UNDER EXAMINATION

The mechanism typically manifests through:

• Model-based classifiers that gate execution based on output classification.
• Confidence thresholds where actions proceed if model confidence exceeds a boundary.
• Model-provided "safe/unsafe" or "approved/rejected" ratings treated as authorization signals.
• Agentic systems where the model itself decides what actions it is permitted to take.

The mechanism delegates the authorization function to the same computational process that performs inference. The model becomes both the proposer of actions and the authorizer of actions.

PRIMARY PATHOLOGY

The governance boundary is not specified — it is discovered.

When authorization is delegated to inference, no one can state precisely what actions are permitted. The authorization boundary is:
• Implicit in model weights, training data, and fine-tuning.
• Discoverable only through empirical probing.
• Subject to change without notice when models are updated.
• Potentially different across model versions, providers, or deployment configurations.

Organizations cannot write authorization policies because the authorization function is not under their control.

ASSURANCE FAILURE

Model updates become governance changes without governance review.

The structure creates silent policy drift:
From: "Actions of type X are prohibited by policy P, enforced by mechanism M."
To: "Actions of type X were rejected by model version V; behavior under V+1 is unknown."

When the model changes, the governance boundary changes. This occurs without policy review, change management, or notification. The organization discovers its new authorization policy through user reports or incident response.

COUNTER-PATTERN: Authorization Layer Independence

Authorization must be evaluated by a layer that is independent of inference. The authorization layer must:
• Implement explicitly specified policies that exist as reviewable artifacts.
• Produce identical decisions regardless of which model provides inference.
• Be modifiable only through governed change management processes.
• Support verification that a given action was authorized according to stated policy.

The model may suggest actions. A separate, deterministic layer must authorize them.

VERDICT

Inference-Delegated Authorization couples the governance boundary to model behavior. The resulting system cannot maintain stable authorization policies across model updates and cannot support governance review of authorization changes.`
  },
  {
    type: 'DIAGNOSIS',
    identifier: 'SDS.DX.004',
    title: 'Authority Inheritance Across Temporal Scope',
    date: '2026-03-02',
    author: 'Jason Crittenden',
    summary: 'Persistent agents operating over extended time horizons accumulate execution authority through implicit inheritance. An authorization granted at task initiation is carried forward across subsequent actions without re-evaluation at each irreversible execution boundary.',
    image: '/assets/goal-directed-agents.webp',
    references: ['ZTG-1', 'ZTG-3', 'ZTG-4'],
    content: `PATTERN DEFINITION

Authority Inheritance Across Temporal Scope is a structural anti-pattern in which an initial authorization is used to justify subsequent actions without re-evaluation at each irreversible execution boundary. The pattern is characterized by:

• Authorization granted once that persists indefinitely unless explicitly revoked.
• No governance boundary check at each irreversible action within a task scope.
• No capability to halt execution when context, risk, or requirements change mid-task.
• Authority that accumulates across sub-tasks without proportional accountability.

This pattern concerns the temporal structure of authorization, not the quality of initial approval.

MECHANISM UNDER EXAMINATION

The mechanism typically manifests through:

• Persistent agents that receive one authorization at task initiation then operate autonomously for extended periods.
• Task decomposition where parent task authorization is implicitly assumed to extend to all sub-tasks.
• Multi-step workflows where intermediate governance gates are skipped in favor of initial approval.
• "Background agents" that execute over hours or days with a single up-front authorization.

The mechanism treats authorization as a state that, once granted, covers all subsequent actions within the task scope. The scope boundary is typically implicit or unbounded.

PRIMARY PATHOLOGY

Bounded authorization decisions produce unbounded exposure.

When authorization is inherited across temporal scope:
• A user approves "send email to the team" and the agent sends 50 emails over 3 hours.
• A user approves "update the codebase" and the agent modifies 200 files across 12 repositories.
• A user approves "manage my calendar" and the agent declines meetings, reschedules commitments, and sends responses for weeks.

The initial authorization decision cannot anticipate all actions that will be taken under its scope. The user authorized an intent, but the system executed a sequence — and the sequence may diverge arbitrarily from intent.

ASSURANCE FAILURE

Authorization scope becomes unknowable at decision time.

The structure creates a temporal mismatch:
From: "I authorize action X at time T."
To: "I authorize all actions the agent deems consistent with X, from T until task completion or explicit revocation."

The user cannot know what they are authorizing because the authorization covers future actions that depend on future context. The authorization decision is made with incomplete information about its own scope.

COUNTER-PATTERN: Irreversibility-Bounded Authorization

Authorization must be re-evaluated at each irreversible execution boundary. The governance layer must:
• Classify actions by reversibility and require fresh authorization for irreversible effects.
• Maintain temporal scope limits that require re-authorization after defined periods.
• Support context-aware re-evaluation when task state diverges from initial authorization context.
• Enable granular revocation that halts specific action classes without terminating entire tasks.

The user may authorize a goal. Each irreversible step toward that goal requires its own authorization at the moment of execution.

VERDICT

Authority Inheritance Across Temporal Scope converts bounded authorization decisions into unbounded execution authority. The resulting system cannot ensure that actions taken under inherited authority would have been authorized if evaluated independently at execution time.`
  },
  {
    type: 'FIELD NOTE',
    identifier: 'SDS.FN.001',
    title: 'Authorization Precedes Commit',
    date: '2026-03-01',
    author: 'Jason Crittenden',
    summary: 'In high-consequence systems, authorization precedes commit. AI systems entering high-consequence domains do not change this constraint.',
    image: '/assets/phoenix-logo.png',
    references: ['ZTG-1'],
    content: `In high-consequence systems, authorization precedes commit.

Financial transactions require pre-authorization. Infrastructure changes require approval gates. Legal instruments require signatures before execution.

AI systems are entering these domains. The ordering constraint does not disappear because inference is probabilistic.

The model may reason stochastically. The authority layer cannot. Governance is deterministic and replayable for authority decisions. This is not a philosophical position. It is a structural requirement inherited from every domain where irreversible execution carries consequence.

Systems that do not enforce this ordering expose the gap between cognition and action to unbounded risk.

Reference invariants: ZTG-1 (Replayable Authorization).`
  },
  {
    type: 'FIELD NOTE',
    identifier: 'SDS.FN.002',
    title: 'Stochastic Reasoning, Deterministic Authority',
    date: '2026-03-01',
    author: 'Jason Crittenden',
    summary: 'AI systems are probabilistic in how they reason. They do not need to be probabilistic in how they act.',
    image: '/assets/phoenix-logo.png',
    references: ['ZTG-0b', 'ZTG-1'],
    content: `AI systems are probabilistic in how they reason. They do not need to be probabilistic in how they act.

Execution authority is a system design choice. When stochastic reasoning is allowed to directly mutate infrastructure, the system no longer has bounded exposure. It has unbounded exposure.

The distinction matters for anyone evaluating risk: the question is not whether a model is unpredictable. The question is whether its authority is.

Governance does not constrain cognition. It constrains the delegation of irreversible authority to stochastic processes. The model remains free to reason. It is not free to act without deterministic authorization.

Reference invariants: ZTG-0b (Observability), ZTG-1 (Replayable Authorization).`
  },
  {
    type: 'FIELD NOTE',
    identifier: 'SDS.FN.003',
    title: 'Observation Is Not Governance',
    date: '2026-03-01',
    author: 'Jason Crittenden',
    summary: 'Logging confirms that something happened. Governance determines whether it is allowed to happen. Most AI risk conversations conflate them.',
    image: '/assets/phoenix-logo.png',
    references: ['ZTG-1', 'ZTG-4'],
    content: `Logging confirms that something happened. Governance determines whether it is allowed to happen. These are different architectural functions.

Most current AI risk mitigation relies on monitoring: detect an adverse event, escalate, respond. This model works when actions are reversible and consequences are bounded.

When an AI system executes an irreversible action — commits a transaction, mutates production infrastructure, sends a communication with legal effect — monitoring records the outcome. It does not prevent it.

Governance must exist between cognition and action. Not after action, in the form of alerting. Not alongside action, in the form of logging. Before action, as a mechanistic prerequisite.

Where governance and execution occur within the same temporal sequence, control collapses into observation.

Reference invariants: ZTG-1 (Replayable Authorization), ZTG-4 (Mechanistic Boundary).`
  },
  {
    type: 'FIELD NOTE',
    identifier: 'SDS.FN.004',
    title: 'Reversibility Is Not a Default',
    date: '2026-03-01',
    author: 'Jason Crittenden',
    summary: 'Not all actions require the same governance layer. Systems that do not formally classify irreversibility cannot bound risk.',
    image: '/assets/phoenix-logo.png',
    references: ['ZTG-3'],
    content: `Not all actions require the same governance layer. Querying data is reversible. Committing infrastructure changes is not. Generating a recommendation is reversible. Executing a financial transaction is not.

Systems that do not formally classify irreversibility cannot bound risk. Every action is treated equivalently — which means either everything is over-governed (unusable) or everything is under-governed (uninsurable).

A governed system declares, for each execution surface: the effect class, the reversibility characteristics, and the rollback cost. These declarations are registered before the surface is operational. Implicit assumptions of reversibility do not constitute enforceable boundaries.

This classification is not a convenience. It is the structural basis for proportional governance. Without it, underwriters cannot distinguish between bounded and unbounded exposure.

Reference invariants: ZTG-3 (Governed Effect Surfaces).`
  },
  {
    type: 'FIELD NOTE',
    identifier: 'SDS.FN.005',
    title: 'Governance Independence from Inference Provider',
    date: '2026-03-02',
    author: 'Jason Crittenden',
    summary: 'Deterministic policy evaluation is model-independent by construction. If governance correctness depends on which model provides inference, governance is not deterministic.',
    image: '/assets/neutral-orchestration.png',
    references: ['ZTG-1', 'SDS.DX.003'],
    content: `Deterministic policy evaluation is model-independent by construction. If governance correctness depends on which model provides inference, governance is not deterministic.

This is not about neutrality as a market strategy. It is about neutral as a structural requirement for governed execution.

A governance system that produces different authorization decisions depending on which model provides inference has not separated authority from cognition. When the model changes, the governance boundary changes.

Governance must be verifiable, reproducible, and auditable independent of model composition or inference provider. The authorization layer should evaluate the same inputs and produce the same decisions regardless of whether inference is provided by Model A, Model B, or Model C.

This is not vendor lock-in avoidance. It is the definition of deterministic governance.

Reference invariants: ZTG-1 (Replayable Authorization), SDS.DX.003 (Inference-Delegated Authorization).`
  },
  {
    type: 'FIELD NOTE',
    identifier: 'SDS.FN.006',
    title: 'Model Improvement Does Not Improve Governance',
    date: '2026-03-02',
    author: 'Jason Crittenden',
    summary: 'Training quality, dataset composition, and fine-tuning operate in the Envelope layer. Governance operates in the System Invariant layer. Improving one does not improve the other.',
    image: '/assets/assembly-hall.png',
    references: ['ZTG-1', 'SDS.DX.001'],
    content: `Training quality, dataset composition, and fine-tuning operate in the Envelope layer. Governance operates in the System Invariant layer. Improving one does not improve the other.

This is a layered architecture observation, not a claim that model quality is unimportant.

The Envelope layer (model capabilities, training data, fine-tuning) determines what the system can reason about. The System Invariant layer (governance boundaries, authorization mechanisms, evidence trails) determines what the system is allowed to execute.

Improving model training does not create missing governance primitives. Better data does not enforce execution boundaries. More sophisticated reasoning does not create evidence-coupled execution.

These are orthogonal concerns. A highly capable model without governance invariants is uninsurable. A robust governance framework attached to an incapable model cannot compensate for the capability gap.

Improving both is required. Neither is a substitute for the other.

Reference invariants: ZTG-1 (Replayable Authorization), SDS.DX.001 (Heuristic Governance Substitution).`
  },
  {
    type: 'DIAGNOSIS',
    identifier: 'SDS.DX.006',
    title: 'Automation Sedation',
    date: '2026-03-04',
    author: 'Jason Crittenden',
    summary: 'Systems optimized for reduced alert volume suppress persistence signals, manufacture the appearance of stability, and functionally degrade operator vigilance. The system produces silence without verified recovery. Governance that depends on human escalation inherits the degradation.',
    image: '/assets/ai-sys-fail.webp',
    references: ['ZTG-0a', 'ZTG-2', 'SDS.FN.007', 'SDS.RX.002'],
    content: `PATTERN DEFINITION

A system exhibits Automation Sedation when:

• Repeated signals of unresolved failure are deduplicated, correlated, or suppressed as a function of repetition rather than resolution.
• The visual or operational salience of a condition decreases over time despite the condition persisting.
• Operators interact with an interface that presents manufactured calm rather than verified stability.
• Escalation probability decreases as a function of signal suppression, not as a function of recovery.

The pattern is self-reinforcing: suppressed signals produce calm interfaces, calm interfaces reduce operator intervention, reduced intervention allows conditions to persist, persistent conditions generate further signals that are suppressed.

MECHANISM UNDER EXAMINATION

Modern observability and incident management systems implement several functions that, individually, serve legitimate noise-reduction purposes:

• Deduplication: Collapsing repeated alerts into a single incident.
• Correlation: Grouping related signals under a common root cause.
• Suppression: Reducing alert frequency for "known issues."
• Summary aggregation: Replacing granular signal streams with smoothed dashboards.

Each mechanism conflates two structurally distinct signal classes:

| Noise | Uninformative variance; does not change decisions | Suppress |
| Persistence | Unresolved failure; recovery has not occurred | Escalate |

When systems treat persistence as noise — because both produce repetition — they erase the only signal that recovery has not occurred.

PRIMARY PATHOLOGY

Observability collapse through incentive-aligned suppression.

The system optimizes for a metric (alert volume, dashboard calm, MTTR) that is structurally compatible with both genuine recovery and manufactured silence. The metric cannot distinguish the two. The optimization drives toward whichever is cheaper to produce. Silence is always cheaper than recovery.

This violates ZTG-0a (Observability Precondition): governance evaluation requires that system state be observable. When the observability layer actively suppresses evidence of unresolved conditions, governance has no valid input.

STRUCTURAL CONSEQUENCES

• Escalation delay: Conditions that would trigger human intervention under raw signal are invisible under processed signal.
• Operator deference: Repeated exposure to calm interfaces produces learned trust in unfounded confidence.
• Judgment atrophy: Human governance authority (ZTG-2) depends on humans who exercise that authority. When observability suppresses the signals, the judgment faculty degrades.
• Late, severe failure: Systems exhibiting this pattern fail late, not often. Incident frequency decreases. Incident severity increases.
• Governance invalidation: Any governance mechanism that depends on operator awareness is compromised.

COUNTER-PATTERN

Salience-Proportional Observability (SDS.RX.002): Unresolved conditions increase salience over time. Silence is permitted only following verified recovery. Failed resolution escalates the condition.

VERDICT

Automation Sedation => Observability Collapse => Governance Invalidation`
  },
  {
    type: 'DIAGNOSIS',
    identifier: 'SDS.DX.007',
    title: 'Post-hoc Logging as Governance',
    date: '2026-04-23',
    author: 'Jason Crittenden',
    summary: 'Systems that record every action to a tamper-evident log and treat the log as the governance artifact — without enforced coupling between authorization and effect — exhibit Post-hoc Logging as Governance. The log answers what the system did; it cannot answer whether the system was permitted to do it before it did it.',
    image: '/assets/filing-cabinet.png',
    references: ['ZTG-0a', 'ZTG-4', 'SDS.DX.002', 'SDS.DX.003', 'SDS.FN.003'],
    content: `PATTERN DEFINITION

Post-hoc Logging as Governance is a structural anti-pattern in which the audit log is treated as the governance mechanism, with no enforced coupling between authorization and effect. The pattern is characterized by:

• Comprehensive logging of executed actions, often to tamper-evident or append-only stores.
• Authorization decisions that are recorded after — or independent of — the action they purport to authorize.
• An audit-readiness posture that conflates the existence of a record with the legitimacy of what it records.
• No mechanism by which the log itself can prevent an unauthorized effect from occurring.

This pattern concerns the temporal and causal relationship between authorization and effect, not the integrity of the logging substrate.

MECHANISM UNDER EXAMINATION

The mechanism typically manifests through:

• Asynchronous logging pipelines where effect production runs ahead of log persistence.
• "Audit after" designs where the system executes first and records justification afterward.
• Same-process log writers, where the component executing the effect also writes its own authorization record.
• Compliance-driven implementations that satisfy regulatory record-keeping requirements without satisfying governance preconditions.

The mechanism produces evidence as a documentary artifact rather than as a constitutive part of the action. Logging is downstream of effect; governance requires it to be upstream.

PRIMARY PATHOLOGY

The audit trail describes what happened. It cannot guarantee that what happened was authorized.

Three failure modes follow:

• Under partial failure, log writes lag effect production. The system performs effects whose authorization records are pending, lost, or never written. Reconstruction after the fact cannot distinguish "effect occurred and was authorized" from "effect occurred and authorization failed."

• Under adversarial pressure, log entries can be backdated relative to the effects they purport to authorize. Tamper-evidence on the log substrate does not prevent a compromised writer from producing entries that order events incorrectly.

• Under scale, the log and the effect diverge. Sampling, rate-limiting, retention policies, and storage failures all break the one-to-one correspondence the governance claim depends on.

ASSURANCE FAILURE

Audit becomes a description of system behavior rather than a structural guarantee of governance. The organization can reconstruct what occurred but cannot guarantee that what occurred was permissible at the moment of occurrence.

This violates Evidence-Coupled Execution (ZTG-4): no externally observable effect may exist without simultaneous durable evidence of authorization. Logging-as-governance produces effects whose evidence is documentary, asynchronous, and dissociable.

COUNTER-PATTERN: Authorization Precedes Commit (SDS.FN.003)

Authorization must precede the irreversible commit, and the evidence of authorization must be coupled to the effect itself — not written about it after the fact. The counter-pattern requires:

• A pre-execution authorization step that produces a binding decision artifact.
• Atomic coupling between effect and evidence: the action either commits with its authorization record or does not commit at all.
• A governance layer separate from the executor, so the writer of the authorization record is not the consumer of its protections.
• Failure of evidence write is failure of execution.

The audit trail then ceases to be an interpretive reconstruction and becomes a constitutive account of governed action.

VERDICT

Post-hoc Logging as Governance produces records that describe system behavior. Governance requires evidence that constitutes system behavior. The two are not interchangeable, and the gap between them is where ungoverned effects originate.`
  },
  {
    type: 'FIELD NOTE',
    identifier: 'SDS.FN.007',
    title: 'A Silent Scream: The Hidden Cost of Quiet Systems',
    date: '2026-03-04',
    author: 'Jason Crittenden',
    summary: 'Quiet is not stable. Systems optimized for calm suppress persistence signals, manufacture the appearance of recovery, and erode the operator reflexes that governance depends on. Silence is a hypothesis, not an outcome.',
    image: '/assets/constable-logo.svg',
    references: ['ZTG-0a', 'ZTG-2', 'SDS.DX.006', 'SDS.RX.002'],
    content: `THE PROMISE THAT BROKE TRUST

There was a promise at the beginning of modern automation.

Fewer alerts. Faster resolution. Lower cognitive load.

For teams drowning in dashboards, pages, and constant interruption, the promise wasn't just attractive — it felt necessary. Something had to get quieter.

And in many cases, automation delivered. Systems grew calm. Alert counts dropped. Dashboards smoothed out. The sense of urgency receded.

For a while, it felt like progress.

But quiet is not the same as stable.

NOISE VS. PERSISTENCE

To understand where things go wrong, we need to separate two concepts that are routinely collapsed:

• Noise is uninformative variance. Random fluctuation. Signal that does not change decisions.
• Persistence is unresolved failure. A condition that continues because nothing has actually fixed it.

Modern systems increasingly treat persistence as noise.

Repeated alerts are deduplicated. Ongoing failures are correlated into a single incident. The system notes that "this is the same issue" — and then lowers its urgency.

But repetition is not noise.

Repetition is pressure.

It is the system telling you, over time, that recovery has not occurred. When repetition disappears from view, so does the only signal that something is still wrong.

That isn't simplification. It's erasure.

THE SEDATION EFFECT

Dashboards do more than present information.

They shape perception. Perception shapes urgency. Urgency shapes escalation. Escalation shapes outcomes.

When systems are optimized to look calm, they don't merely reduce distraction — they alter operator behavior. They dampen vigilance. They delay intervention. They encourage deference to the interface.

A smooth dashboard with quietly repeating failures produces the same outcome as a sedative: the danger remains, but the reflex to act is suppressed.

When automation optimizes for calm, it becomes psychoactive. Not rhetorically. Functionally.

THE COST OF QUIET

Silence from a heart monitor is not proof of health.

Sometimes it means the signal failed. Sometimes it means the patient is gone.

A quiet room is not always a good sign.

The danger is not that our systems will fail noisily. The danger is that they will fail quietly — and teach us not to notice.`
  }
];

// Parse content string into structured sections for diagnosis document format
export function parseContentToSections(content: string): { heading?: string; content?: string[]; sublist?: string[] }[] {
  const sections: { heading?: string; content?: string[]; sublist?: string[] }[] = [];
  const blocks = content.split('\n\n');

  let currentSection: { heading?: string; content?: string[]; sublist?: string[] } | null = null;

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Check if this is a heading (ALL CAPS, possibly with colon)
    const isHeading = /^[A-Z][A-Z\s\-:]+$/.test(trimmed.split('\n')[0]);

    if (isHeading) {
      // Save previous section
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = { heading: trimmed.replace(/:$/, ''), content: [], sublist: [] };
    } else if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      // Bullet list
      const items = trimmed.split('\n').filter(line => line.trim()).map(item => item.replace(/^[•-]\s*/, ''));
      if (currentSection) {
        currentSection.sublist = [...(currentSection.sublist || []), ...items];
      } else {
        sections.push({ sublist: items });
      }
    } else {
      // Regular paragraph
      if (currentSection) {
        currentSection.content = [...(currentSection.content || []), trimmed];
      } else {
        currentSection = { content: [trimmed] };
      }
    }
  }

  // Push final section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

// Get artifact by identifier
export function getArtifactByIdentifier(identifier: string): Artifact | undefined {
  return artifacts.find(a => a.identifier === identifier);
}

// Get URL-safe slug from identifier (e.g., "SDS.DX.001" -> "sds-dx-001")
export function identifierToSlug(identifier: string): string {
  return identifier.toLowerCase().replace(/\./g, '-');
}

// Get identifier from slug (e.g., "sds-dx-001" -> "SDS.DX.001")
export function slugToIdentifier(slug: string): string {
  return slug.toUpperCase().replace(/-/g, '.');
}
