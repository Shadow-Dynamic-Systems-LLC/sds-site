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
        summary: 'ZTG defines ten invariants across five preconditions (Observability, Replayability, Temporal Integrity, Identity Integrity, Governance Consistency) and five operational guarantees (Mechanistic Boundary, Stasis, Governed Effect Surface, Evidence-Coupled Execution, Graduated Freeze). The specification is published for collaborative review.',
        hasSchematic: true,
        content: `ZERO TRUST GOVERNANCE (ZTG) SPECIFICATION

The Zero Trust Governance (ZTG) Specification establishes the foundational requirements for deploying autonomous execution systems into high-consequence environments. 

Rather than focusing on model alignment or cognitive capabilities, ZTG defines the structural prerequisites that must exist *around* a stochastic engine to render its actions deterministic, auditable, and replayable.

1. OBSERVABILITY
All inputs to the execution decision must be captured and logged in a tamper-evident manner.

2. REPLAYABILITY
Given the same inputs, the authorization mechanism must produce the identical decision context and outcome.

3. TEMPORAL INTEGRITY
The sequence of authorizations and actions must be cryptographically or structurally verifiable in order.

4. IDENTITY INTEGRITY
The origin of any intent, whether human or synthetic, must be uniquely identifiable.

5. GOVERNANCE CONSISTENCY
Authorization logic must decouple from inference architecture.

6. MECHANISTIC BOUNDARY
The line between reasoning and action must be structurally impenetrable without explicit authority exchange.

7. STASIS
The system defaults to non-execution.

8. GOVERNED EFFECT SURFACE
Every possible mutation on the world must be declared, typed, and permissioned prior to execution.

9. EVIDENCE-COUPLED EXECUTION
No action occurs without a cryptographic payload attaching the authorization decision to the action payload.

10. GRADUATED FREEZE
The system must be capable of localized halts without total availability loss.`
    },
    {
        id: 'insurability',
        title: 'AI Insurability Framework',
        description: 'Executive framework examining minimum architectural conditions for AI insurability, grounded in ZTG.',
        image: '/assets/industrial-integrity.webp',
        summary: 'Maps Zero Trust Governance invariants to five underwriting-relevant primitives: execution boundary enforcement, deterministic policy evaluation, authority attribution, replayable authorization record, and commit verification. Published for underwriter and risk architect review.',
        content: `AI INSURABILITY FRAMEWORK

Underwriting autonomous systems requires translating software architecture into quantifiable risk boundaries. Current coverage models rely heavily on operational history and human-in-the-loop (HITL) processes, which fail to scale or apply accurately to pure machine execution.

The AI Insurability Framework maps ZTG (Zero Trust Governance) primitives onto core underwriting requirements.

KEY PRIMITIVES FOR UNDERWRITERS:

• Execution Boundary Enforcement
If an AI can breach its execution envelope without tripping a deterministic check, the system's risk profile is unbounded. We dictate the presence of hard, non-stochastic architectural boundaries.

• Deterministic Policy Evaluation
The logic determining whether an action is permissible must be mathematical and absolute, completely external to the language model’s prompt execution cycle.

• Authority Attribution
Every system change must carry an irrefutable signature binding the inference step, the governance policy, and the resulting action.

• Replayable Authorization Record
In the event of a claim, forensic teams must be able to replay the internal state of the governor and reproduce the identical authorization given the identical inputs, isolating failures.

• Commit Verification
The system must cryptographically verify that the state mutation perfectly matches the authorized intent payload.`
    },
    {
        id: 'sys-fail',
        title: 'SDS.SYS.FAIL — Modern Systems Archaeology and Pathology',
        description: 'Formal taxonomy of execution-layer governance failures mapped to missing ZTG primitives.',
        image: '/assets/failure-analysis.webp',
        summary: 'Each entry identifies a recurring structural failure pattern, maps it to a missing governance invariant, and provides diagnostic vocabulary for insurers and builders. Failure modes demonstrate what happens when governance is absent — not as warning, but as structural analysis.',
        content: `SDS.SYS.FAIL — MODERN SYSTEMS ARCHAEOLOGY AND PATHOLOGY

A living taxonomy of architectural failures in autonomous systems. By classifying known failures into structural pathologies, we build a diagnostic vocabulary for both risk underwriters and system architects.

COMMON PATHOLOGIES

Pathology 01: Prompt-Mediated Governance
Encoding governance principles into stochastic prompts instead of deterministic boundaries. 
Result: System hallucinated permission, bypassing safety constraints.

Pathology 02: Heuristic Governance Substitution
Using probabilistic classification models to gate execution instead of hard-coded, math-based rules.
Result: Authorization decisions become non-reproducible over time as the classifier drifts.

Pathology 03: Inference-Delegated Authorization
Allowing the language model itself to decide if it is authorized to execute its own proposed intent.
Result: Silent policy drift; governance boundaries change immediately when model weights are patched.

Pathology 04: Authority Inheritance Across Temporal Scope
An agent is authorized to "balance the books," and proceeds to run 50 irreversible operations over the next three hours without re-validating state.
Result: Bounded intent becomes unbounded execution.`
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
