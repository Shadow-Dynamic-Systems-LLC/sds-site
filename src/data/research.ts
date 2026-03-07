export interface ResearchProject {
    id: string;
    title: string;
    description: string;
    image: string;
    summary: string;
    hasSchematic?: boolean;
    content: string;
}

export const researchProjects: ResearchProject[] = [
    {
        id: 'ztg-spec',
        title: 'Zero Trust Governance Specification',
        description: 'Public invariant specification defining the structural conditions for governed execution in AI systems.',
        image: '/assets/phoenix-logo.jpg',
        summary: 'ZTG defines nine invariants across five preconditions (Observability, Replayability, Temporal Integrity, Identity Integrity, Governance Consistency) and four operational guarantees (Mechanistic Boundary, Stasis, Governed Effect Surface, Evidence-Coupled Execution). Stasis now includes graduated containment. The specification is published for collaborative review.',
        hasSchematic: true,
        content: `ZERO TRUST GOVERNANCE (ZTG) SPECIFICATION v0.4

The Zero Trust Governance (ZTG) Specification establishes the foundational requirements for deploying autonomous execution systems into high-consequence environments.

Rather than focusing on model alignment or cognitive capabilities, ZTG defines the structural prerequisites that must exist *around* a stochastic engine to render its actions deterministic, auditable, and replayable.

STRUCTURAL PREREQUISITES (ZTG-0)

• ZTG-0a OBSERVABILITY
All governance-relevant state transitions, decision points, and boundary checks must be recorded with sufficient fidelity to support deterministic post-hoc audit.

• ZTG-0b REPLAYABILITY
Given identical initial state and identical inputs, the governance system must produce identical governance decisions. Execution nondeterminism is permitted; governance nondeterminism is not.

• ZTG-0c TEMPORAL INTEGRITY
All components participating in governance evaluation must operate against a synchronized time source with bounded skew. Clock skew exceeding declared tolerance triggers system halt.

• ZTG-0d IDENTITY INTEGRITY
All cryptographic material used for authorization signing, evidence sealing, and identity binding must be traceable to an explicitly declared trust root. Identity must be unforgeable and non-delegatable.

• ZTG-0e GOVERNANCE CONSISTENCY
All components participating in governance evaluation must operate against a consistent view of governance state. During inconsistency, the system must deny authorization.

SYSTEM INVARIANTS

• ZTG-1 MECHANISTIC BOUNDARY
Governance boundaries are enforced mechanically, not discretionarily. No component may bypass, reinterpret, defer, or negotiate a boundary at runtime. Authorization must occur before irreversible action.

• ZTG-2 STASIS
When the system cannot guarantee its governance invariants hold, it must halt. Stasis operates at graduated scope: surface freeze → subsystem freeze → system-wide stasis. Containment is proportional to failure.

• ZTG-3 GOVERNED EFFECT SURFACE
All agent-generated external effects must occur exclusively through registered and governance-addressable surfaces. Each surface formally declares effect type, reversal strategy, and authorization policy.

• ZTG-4 EVIDENCE-COUPLED EXECUTION
No externally observable effect may exist without simultaneous durable evidence of authorization and execution. The evidence record is constitutive, not documentary.`
    },
    {
        id: 'insurability',
        title: 'AI Insurability Framework',
        description: 'Executive framework examining minimum architectural conditions for AI insurability, grounded in ZTG.',
        image: '/assets/industrial-integrity.webp',
        summary: 'Maps Zero Trust Governance invariants to five underwriting-relevant evaluation primitives. A system satisfying all five has bounded governance integrity risk. A system failing any one has identifiable, characterizable exposure.',
        content: `AI INSURABILITY FRAMEWORK

Underwriting autonomous systems requires translating software architecture into quantifiable risk boundaries. Current coverage models rely heavily on operational history and human-in-the-loop (HITL) processes, which fail to scale or apply accurately to pure machine execution.

The AI Insurability Framework maps ZTG (Zero Trust Governance) primitives onto core underwriting requirements.

FIVE EVALUATION PRIMITIVES

These primitives serve as concrete assessment criteria for any AI agent system:

• Execution Boundary Enforcement (ZTG-1, ZTG-3)
Do all irreversible actions pass through a governance gate prior to execution? If an AI can breach its execution envelope without tripping a deterministic check, the system's risk profile is unbounded.

• Deterministic Policy Evaluation (ZTG-0b, ZTG-1)
Is authorization logic rule-bound and reproducible? The logic determining whether an action is permissible must be mathematical and absolute, completely external to the language model's prompt execution cycle.

• Authority Attribution (ZTG-0d, ZTG-2)
Do execution rights map to identifiable, accountable actors? Every system change must carry an irrefutable signature binding the inference step, the governance policy, and the resulting action.

• Replayable Authorization Record (ZTG-0a, ZTG-0b, ZTG-4)
Are governance decisions reconstructible and independently verifiable? In the event of a claim, forensic teams must be able to replay the internal state of the governor and reproduce the identical authorization given the identical inputs.

• Commit Verification (ZTG-4)
Does execution validate governance state before irreversible effect? The system must cryptographically verify that the state mutation perfectly matches the authorized intent payload.

VERDICT

A system that satisfies all five primitives has bounded governance integrity risk. A system that fails any one has an identifiable, characterizable exposure. Security assessment becomes a structural audit of governance properties rather than a subjective evaluation of system behavior.`
    },
    {
        id: 'sys-fail',
        title: 'SDS.SYS.FAIL — Structural Failure Modes',
        description: 'Formal taxonomy of execution-layer governance failures mapped to missing ZTG primitives and documented diagnoses.',
        image: '/assets/ai-sys-fail.webp',
        summary: 'Five structural failure modes arising from implicit authority delegation in AI agent systems. Each failure is mapped to specific diagnoses and missing governance invariants. These failures are structural, not adversarial — they arise from architectural decisions about how authority flows from model output to external effect.',
        content: `SDS.SYS.FAIL — STRUCTURAL FAILURE MODES

These failure modes are structural, not adversarial. They arise from architectural decisions about how authority flows from model output to external effect. An AI agent system can be authenticated, authorized, monitored, and logged — satisfying the standard security posture — and still exhibit all five failure modes.

FIVE STRUCTURAL FAILURE MODES

• Unauthorized Execution Cascade
A stochastic agent executes production mutations within its configured scope, producing external effects without a governance gate. Each action satisfies its local policy check, but the cascade produces outcomes no single authorization contemplated. The event is recorded after the destructive action has committed.
Maps to: SDS.DX.001 (Heuristic Governance Substitution) — partial

• Post-Commit Observability Illusion
Monitoring detects adverse effects only after irreversible execution. The system satisfies the standard observability posture while remaining operationally ungoverned. Monitoring confirms outcomes rather than enabling intervention.
Maps to: SDS.DX.003 (Inference-Delegated Authorization) — partial

• Stochastic Policy Delegation
Policy evaluation is delegated to probabilistic model reasoning. Authorization decisions vary across identical inputs because the evaluation layer is itself stochastic. Each decision appears locally valid but is not reproducible.
Maps to: SDS.DX.002 (Prompt-Mediated Governance) — direct

• Unattributable Authority
Irreversible actions execute without traceable binding to human authority. Agents operate under standing permissions that were never explicitly scoped to the action class in question. Logs show what happened but cannot reconstruct who authorized it.
Maps to: SDS.DX.004 (Authority Inheritance Across Temporal Scope) — related

• Assumed Reversibility
The system treats all actions as equivalent regardless of externalization potential. Rollback assumptions are implicit and never validated. Actions that produce irreversible external effects are not distinguished from internally reversible operations.
Maps to: SDS.FN.004 (Reversibility Is Not a Default) — direct

ROOT CAUSE

The common root cause is the absence of a mechanically enforced boundary between AI reasoning and irreversible execution (ZTG-1). Where that boundary does not exist, governance reduces to post-hoc observation.`
    },
    {
        id: 'lighthouse',
        title: 'Lighthouse',
        description: 'Reference implementation of Zero Trust Governance for high-assurance environments.',
        image: '/assets/lighthouse.webp',
        summary: 'Lighthouse targets environments where failure carries systemic, financial, or safety consequences. It implements the full ZTG invariant set with layered deterministic governance, cryptographic provenance, full replayability, and invariant enforcement under adversarial conditions. Others may build ZTG-compatible implementations. Lighthouse is the certification reference.',
        content: `LIGHTHOUSE 
Reference Implementation

Lighthouse is the primary zero-trust governance engine built by Shadow Dynamic Systems. It exists not merely as software, but as the certification baseline for ZTG architectural compliance.

LAYERS OF COMPLIANCE

1. The Intent Receiver
Lighthouse intercept all requests generated by stochastic models. It strips metadata, normalizes payloads, and cryptographically signs the inbound intent.

2. The Deterministic Policy Engine
Rules are executed in isolated, math-only environments (e.g., WebAssembly, strict logic interpreters). If an intent cannot be proven to satisfy all policies, the payload is destroyed and the action is blocked.

3. The Cryptographic Commit Layer
Actions leaving Lighthouse for execution endpoints are signed with a dual-key configuration, where the endpoint itself will refuse any payload not bearing the exact authorization signature of the Lighthouse governor.

By providing a reference architecture, developers and underwriters finally share a common vernacular for what constitutes a "secured" autonomous loop.`
    }
];

export function getResearchProjectById(id: string): ResearchProject | undefined {
    return researchProjects.find(p => p.id === id);
}
