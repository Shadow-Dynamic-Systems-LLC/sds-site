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
    type: 'DIAGNOSIS',
    identifier: 'SDS.DX.005',
    title: 'Model-Adjacent Covert Channel',
    date: '2026-03-02',
    author: 'Jason Crittenden',
    summary: 'Sampler-level keyed perturbation of token probabilities introduces recoverable signal below semantics. The assurance failure: "cannot" collapses into "has not," which is not externally falsifiable over time.',
    image: '/assets/monolith-terminal.webp',
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
    image: '/assets/industrial-integrity.webp',
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
    image: '/assets/monolith-terminal.webp',
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
    image: '/assets/filing-cabinet.webp',
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
    type: 'RESEARCH PAPER',
    identifier: 'SDS.RP.001',
    title: 'Silent Refusals and Selective Hedging: How Cultural Keywords Reshape LLM Reasoning Across Cognitive Domains',
    date: '2026-01-02',
    author: 'Jason Crittenden',
    summary: 'Systematic study of cultural keyword sensitivity in large language models, analyzing 5,760 responses across 10 frontier models. Primary finding: domain-selective sensitivity where interpretive domains show substantial differential hedging while mathematical domains remain robust.',
    image: '/assets/industrial-integrity.webp',
    status: 'DRAFT',
    repository: 'https://github.com/Shadow-Dynamic-Systems-LLC/SDS-Cultural-Experiment',
    references: ['SDS.DX.001', 'SDS.DX.002', 'SDS.DX.003'],
    content: `ABSTRACT

We present a systematic study of cultural keyword sensitivity in large language models, analyzing 5,760 responses across 10 frontier models (GPT-4, GPT-4o variants, GPT-5 series, Claude 3.5/4/4.5 Sonnet). Using a three-condition experimental design with 48 isomorphic prompt pairs, we measure differential hedging rates when logically identical questions are framed with abstract, fictional, or real cultural references.

Our primary finding is domain-selective sensitivity: interpretive domains (Authority, Access, Inference) show substantial differential hedging (Δ = 0.30-0.56), while mathematical domains remain robust (Δ ≈ 0.006).

Notably, fictional cultural baselines (e.g., "Kaleshi," "Tavrian") produce lower hedging rates than abstract controls (Δ_context = -0.04), suggesting that grounded scenarios improve reasoning when safety mechanisms are not triggered.

We document a novel "silent refusal" phenomenon in GPT-5, where 33.5% of culturally-framed prompts receive empty responses despite successful processing of logically equivalent abstract versions.

RESEARCH QUESTIONS

• RQ1: Do LLMs exhibit differential response patterns when cultural keywords are added to logically equivalent prompts?
• RQ2: Is this sensitivity domain-general or domain-selective?
• RQ3: Can fictional cultural references serve as baselines to isolate safety-trigger effects from context effects?
• RQ4: Do different model families exhibit qualitatively different sensitivity patterns?

EXPERIMENTAL DESIGN

We employed a three-condition within-subjects design:

• Control: Abstract framing, no cultural references ("A rule states all Xs must be Y...")
• Baseline: Fictional culture (Kaleshi, Tavrian, Sorinthian, Nemari, Arendelle)
• Test: Real cultural/demographic reference

This design enables decomposition of the total effect:
• Δ_total = HR(Test) - HR(Control): Overall cultural sensitivity
• Δ_context = HR(Baseline) - HR(Control): Effect of grounded vs. abstract framing
• Δ_sensitivity = HR(Test) - HR(Baseline): Effect of cultural recognition/safety triggers

KEY FINDINGS

DOMAIN SELECTIVITY

Cultural sensitivity is highly domain-selective:

• Authority: Δ = 0.564 (High sensitivity)
• Access: Δ = 0.549 (High sensitivity)
• Hierarchy: Δ = 0.513 (High sensitivity)
• Inference: Δ = 0.425 (Moderate-high)
• Math: Δ = 0.006 (Robust)
• Proportion: Δ = 0.000 (Robust)
• Allocation: Δ = 0.006 (Robust)

Mathematical domains show essentially zero sensitivity, while interpretive domains show substantial effects.

GPT-5 SILENT REFUSALS

GPT-5 exhibited a unique failure pattern: 33.5% of responses were empty, concentrated entirely in Test conditions for specific entity clusters.

• religion-catholic: 100% Test refusal, 8% Control refusal
• religion-bible: 100% Test refusal, 0% Control refusal
• israeli-palestinian: 75% Test refusal, 25% Control refusal
• race-us: 0% refusal (both conditions)
• gender: 0% refusal (both conditions)

This pattern suggests a pre-processing content filter that activates on religious and territorial topics but not race or gender topics.

IMPLICATIONS

The Consistency View holds that logically equivalent inputs should yield logically equivalent outputs. Under this view, differential hedging represents a reasoning failure—the model's safety mechanisms interfere with valid logical inference.

The Contextual View holds that statements about real groups carry different epistemic and social stakes than abstract statements. Under this view, hedging on culturally-situated questions is appropriate caution.

We do not adjudicate between these views. Our contribution is empirical: we document that the effect exists, is domain-selective, varies across models, and manifests differently in different model architectures (hedging vs. silent refusal).

PRACTITIONER RECOMMENDATIONS

• Test isomorphic prompt pairs during red-teaming to detect cultural sensitivity
• Distinguish reasoning failures from alignment interventions in logging
• Consider fictional baselines in safety evaluation—over-broad safety nets may degrade reasoning
• Match model to domain requirements: mathematical tasks are reliable, interpretive tasks vary
• Implement isomorphic testing for deployment validation in culturally-diverse contexts

STATUS

This paper is currently in DRAFT status, pending peer review. Data and code are available at the repository link.`
  },
  {
    type: 'FIELD NOTE',
    identifier: 'SDS.FN.001',
    title: 'Authorization Precedes Commit',
    date: '2026-03-01',
    author: 'Jason Crittenden',
    summary: 'In high-consequence systems, authorization precedes commit. AI systems entering high-consequence domains do not change this constraint.',
    image: '/assets/phoenix-logo.jpg',
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
    image: '/assets/phoenix-logo.jpg',
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
    image: '/assets/phoenix-logo.jpg',
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
    image: '/assets/phoenix-logo.jpg',
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
    image: '/assets/neutral-orchestration.webp',
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
    image: '/assets/assembly-hall.webp',
    references: ['ZTG-1', 'SDS.DX.001'],
    content: `Training quality, dataset composition, and fine-tuning operate in the Envelope layer. Governance operates in the System Invariant layer. Improving one does not improve the other.

This is a layered architecture observation, not a claim that model quality is unimportant.

The Envelope layer (model capabilities, training data, fine-tuning) determines what the system can reason about. The System Invariant layer (governance boundaries, authorization mechanisms, evidence trails) determines what the system is allowed to execute.

Improving model training does not create missing governance primitives. Better data does not enforce execution boundaries. More sophisticated reasoning does not create evidence-coupled execution.

These are orthogonal concerns. A highly capable model without governance invariants is uninsurable. A robust governance framework attached to an incapable model cannot compensate for the capability gap.

Improving both is required. Neither is a substitute for the other.

Reference invariants: ZTG-1 (Replayable Authorization), SDS.DX.001 (Heuristic Governance Substitution).`
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
