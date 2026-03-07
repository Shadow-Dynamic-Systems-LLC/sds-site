# Site Update Handoff — March 2026 NIST Filing + New Artifacts

**Date:** 2026-03-06
**For:** Site team
**Priority:** Complete before March 9, 2026 (submission date)

---

## Context

SDS is submitting a formal response to NIST RFI NIST-2025-0035 ("Security of AI Agent Systems") on March 9, 2026. This is SDS's second NIST engagement — the first was a January 30, 2026 comment on the Cyber AI Profile.

The NIST response will be published on shadowdynamicsystems.com simultaneously with submission to regulations.gov. LinkedIn posts will link to the site.

Additionally, several new artifacts have been created since the last site deploy and need to be added.

---

## Architectural Change: ZTG-5 Eliminated

Graduated Freeze / Graduated Containment is now folded into **ZTG-2 (Stasis)**. ZTG-5 no longer exists. Stasis operates at graduated scope: surface freeze → subsystem freeze → system-wide stasis. Containment is proportional to failure.

**Invariant bar on site must be updated:**

- ZTG-0a: Observability
- ZTG-0b: Replayability
- ZTG-0c: Temporal Integrity
- ZTG-0d: Identity Integrity
- ZTG-0e: Governance Consistency
- ZTG-1: Mechanistic Boundary
- ZTG-2: Stasis (includes graduated containment)
- ZTG-3: Governed Effect Surface
- ZTG-4: Evidence-Coupled Execution

The six public-facing cards (∂ λ § ⧉ ⊡ ⛶) are the presentation layer and do not need to map 1:1 to ZTG numbers. The ⛶ Graduated Containment card can remain — it describes a real capability — but it is now part of ZTG-2 (Stasis), not a separate invariant.

**ZTG-5 references already updated in artifact source files:** SDS.RX.001, SDS.RX.002, SDS.DX.006.

---

## New Publications

### SDS.RX.003 — Response to NIST RFI: Security of AI Agent Systems

**Publication type:** `PRESCRIPTION`
**Date:** 2026-03-09
**Author:** Jason Crittenden
**Categories:** STRUCTURAL, INSURANCE, SECURITY, COMPLIANCE, OPERATIONS

**Description:** Formal response to NIST-2025-0035 identifying structural requirements for governing AI agent execution authority. Presents Zero Trust Governance as an architectural framework. Addresses threats (implicit authority delegation, trust transitivity), security practices (ZTG invariants), assessment methods (five evaluation primitives), deployment constraints (governed effect surfaces, proposal-bound leases), and prior art in governing unbounded agents.

**ZTG tags:** ZTG-0a, ZTG-0b, ZTG-0c, ZTG-0d, ZTG-0e, ZTG-1, ZTG-2, ZTG-3, ZTG-4

**Cross-references:** SDS.DX.001–005, SDS.CS.001

**Notes:**
- Full submission text published verbatim
- Mark clearly: "Comment submitted to NIST on NIST-2025-0035, March 9, 2026"
- Include the ASCII diagram (Figure 1) — preserve formatting
- Primary link target for LinkedIn posts
- This is the first PRESCRIPTION on the site with COMPLIANCE category

**Source file:** `NIST/NIST-2025-0035/response_draft.md`

**Full text:**

---

# Response to NIST RFI: Security of AI Agent Systems (NIST-2025-0035)

**Submitted by:** Jason Crittenden, Founder & Research Lead, Shadow Dynamic Systems LLC
12+ years legal-technology infrastructure engineering. JD. AI systems architect specializing in execution governance for autonomous systems.

**Date:** March 9, 2026

**Contact:** jason@shadowdynamicsystems.com

---

## Framing: From Diagnosis to Architecture

A previous comment submitted to the NIST Cyber AI Profile (January 30, 2026) documented three structural governance failure modes that the current risk profile does not resolve:

1. **Governance and execution collapse into a single temporal plane.** Governance mechanisms exist and operate correctly, but detection, escalation, and authority assertion occur after autonomous actions have executed and external effects have been committed. Governance observes rather than controls.

2. **Reversibility is assumed but not enforced.** Authorized actions execute under uncertainty without defined rollback mechanisms or bounded commitment constraints. Once effects externalize, intervention can halt future execution but cannot alter realized outcomes.

3. **Observability is non-actionable.** System state becomes observable only after it is no longer controllable. Information arrives after the window in which it could have informed governance decisions has closed.

That comment documented the problem. This response identifies structural requirements for resolving it.

The structural gap in current AI agent security is not the absence of monitoring, logging, or policy. It is the absence of a **governance layer that precedes execution** — a control boundary between AI cognition and real-world action that exists as a first-class architectural component. In most deployed AI agent systems, model output and irreversible execution are collapsed into a single step, granting the model implicit authority over external state.

This response presents **Zero Trust Governance (ZTG)**, a framework that applies the core principle of zero trust architecture (NIST SP 800-207) — eliminating implicit trust — to execution authority. Just as zero trust architecture eliminates implicit trust in network location, Zero Trust Governance eliminates implicit trust in intelligent output. The properties described below are structural requirements for governing AI agent execution, grounded in established patterns from distributed systems, financial authorization, and institutional risk governance.

The responses below address the priority questions identified in the RFI. All responses are grounded in published architectural work and are offered to inform NIST's development of technical guidelines and best practices.

---

**Figure 1. Zero Trust Governance: Effect Classification and Authorization Flow**

```
+----------------------+
|   AI ORCHESTRATOR    |
| (reasoning / plan)   |
+----------+-----------+
           |
           v
     ACTION PROPOSAL
 (tool invocation + params)

================ EXECUTION GOVERNANCE BOUNDARY ================

+----------------------+
|   GOVERNED SURFACE   |
+----------+-----------+
           |
           v
+-------------------------------+
|   EFFECT CLASSIFICATION       |
| internal / reversible /       |
| compensating / irreversible   |
+---------------+---------------+
                |
                v
         +-------------+
         | irreversible? |
         +------+------+
                |
         +------+------+
         |             |
        no            yes
         |             |
         v             v
  auto / governed   +------------------------------+
  execution         | POLICY AUTHORITY CHECK       |
                    | valid human-authorized       |
                    | policy for this action?      |
                    +---------------+--------------+
                                    |
                        +-----------+-----------+
                        |                       |
                       no                      yes
                        |                       |
                        v                       v
             +------------------+   +----------------------+
             | ESCALATE FOR     |   | EVIDENCE-COUPLED     |
             | HUMAN APPROVAL   |   | AUTHORIZED EXECUTION |
             +--------+---------+   +----------+-----------+
                      |                        |
                      v                        v
             HUMAN AUTHORITY            COMMIT WITH
             REQUIRED NOW               • policy match
                                        • identity binding
                                        • proposal binding
                                        • durable evidence
                                        • execution verification
```

*Governed effect surface routing for AI agent execution. Irreversible actions require valid human-authorized policy or explicit human approval before execution. Evidence coupling is constitutive, not documentary.*

---

## 1. Security Threats, Risks, and Vulnerabilities Affecting AI Agent Systems

### 1(a). Unique security threats, risks, or vulnerabilities distinct from traditional software

The RFI correctly identifies three novel risk categories: adversarial attacks at training or inference time, intentionally placed backdoors, and misaligned behavior from uncompromised models. These are real and well-documented. However, there is a fourth category that is structural rather than adversarial, and it may represent the most immediate and widespread risk:

**Implicit authority delegation.**

Traditional software systems are designed to operate within specified state transitions. When a function executes, its behavior is bounded by its code. AI agent systems introduce a fundamentally different property: the system generates novel action sequences at inference time that were not explicitly programmed. When these systems are equipped with tools that affect external state, the model's inference output becomes an authority claim — and in most current architectures, that claim is automatically honored.

This creates a class of vulnerability that does not require an adversary:

- **Unauthorized Execution Cascade.** A stochastic agent executes production mutations within its configured scope, producing external effects without a governance gate. Each action satisfies its local policy check, but the cascade produces outcomes no single authorization contemplated. The event is recorded after the destructive action has committed.

- **Post-Commit Observability Illusion.** Monitoring detects adverse effects only after irreversible execution. The system satisfies the standard observability posture while remaining operationally ungoverned. Monitoring confirms outcomes rather than enabling intervention.

- **Stochastic Policy Delegation.** Policy evaluation is delegated to probabilistic model reasoning. Authorization decisions vary across identical inputs because the evaluation layer is itself stochastic. Each decision appears locally valid but is not reproducible.

- **Unattributable Authority.** Irreversible actions execute without traceable binding to human authority. Agents operate under standing permissions that were never explicitly scoped to the action class in question. Logs show what happened but cannot reconstruct who authorized it.

- **Assumed Reversibility.** The system treats all actions as equivalent regardless of externalization potential. Rollback assumptions are implicit and never validated. Actions that produce irreversible external effects are not distinguished from internally reversible operations.

These failure modes are **structural, not adversarial.** They arise from architectural decisions about how authority flows from model output to external effect. An AI agent system can be authenticated, authorized, monitored, and logged — satisfying the standard security posture — and still exhibit all five failure modes.

The common root cause is the absence of a mechanically enforced boundary between AI reasoning and irreversible execution. Where that boundary does not exist, governance reduces to post-hoc observation.

### 1(d). How have these threats changed over time? How are they likely to evolve?

The severity of implicit authority delegation scales directly with three variables:

1. **Agent capability.** As models become more capable, the action sequences they generate become more complex and less predictable. The space of possible execution paths grows combinatorially.

2. **Tool access.** As agents are granted access to more tools — and more consequential tools — the blast radius of ungoverned execution increases. An agent with read access to a database poses different risks than an agent with write access to production infrastructure, financial systems, or external APIs.

3. **Autonomy duration.** As agents operate for longer periods with less human oversight, the temporal window between action and detection widens. The governance failure modes documented above become more severe as this window increases.

Current trends in AI development are simultaneously advancing all three variables. Without architectural intervention, the governance gap widens with each capability advance.

### 1(e). Unique threats affecting multi-agent systems

Multi-agent systems introduce a distinct class of vulnerability: **trust transitivity**. When Agent A delegates a subtask to Agent B, the authorization context of that delegation is rarely explicit. In most current multi-agent architectures, if Agent A has authorization to perform an action and it instructs Agent B to perform that action, Agent B inherits Agent A's authority implicitly — without independent governance evaluation, without identity verification, and without a scoped authorization lease (a time-bounded, action-specific grant of execution authority).

This creates several structural risks:

**Inter-agent authentication failure.** Most multi-agent frameworks do not implement mutual authentication between agents. Agent B cannot verify that the instruction it received actually originated from Agent A (as opposed to a compromised intermediary or injected instruction). Without identity integrity (ZTG-0d) extending to inter-agent communication, authority claims between agents are unforgeable only to the extent that the communication channel is trusted — and in systems where agents interact through shared context windows, tool outputs, or message queues, channel integrity is not guaranteed.

**Authority laundering.** A constrained agent may delegate to a less-constrained agent, effectively bypassing its own authorization limits. If Agent A cannot access a production database directly but can instruct Agent B (which has database access) to execute a query, the governance boundary around Agent A's tool access is architecturally meaningless. The governed effect surface (ZTG-3) must extend to inter-agent delegation — an agent's ability to instruct another agent is itself an effect that requires governance.

**Composition opacity.** In systems that do not govern execution at the effect boundary, the causal chain from initial instruction to final external effect may traverse multiple agents, each adding reasoning steps that are locally valid but collectively unauditable. This creates pressure to audit inter-agent reasoning — a problem that is computationally expensive and architecturally fragile. However, reasoning audit is only necessary where execution governance is absent. If every agent-to-external-effect path passes through a governed surface (ZTG-3) with evidence-coupled execution (ZTG-4), the governance system does not need to reconstruct the reasoning chain — it needs to verify that every external effect was authorized through a governed surface with a valid lease. The audit target shifts from reasoning to authorization.

**Emergent authority.** Individual agents may each operate within their authorized scope while their combined actions produce effects that no single authorization contemplated. This is the multi-agent analog of the unauthorized execution cascade described in Section 1(a) — a system-of-systems vulnerability that cannot be addressed at the individual agent level. Governance must operate at the orchestration layer, not merely at the individual agent layer.

The architectural response is to treat inter-agent delegation as a governed effect: each delegation creates a new authorization lease scoped to the delegated task, with identity binding (ZTG-0d) ensuring the delegating agent's identity is cryptographically attested, and evidence coupling (ZTG-4) ensuring the delegation itself is recorded as a governance-relevant event. Authority does not flow implicitly between agents — it must be explicitly granted through the same mechanistic boundary (ZTG-1) that governs agent-to-external-system interactions.

---

## 2. Security Practices for AI Agent Systems

### 2(a). Technical controls, processes, and other practices

This response proposes a governance framework organized around **Zero Trust Governance (ZTG)** — a set of structural invariants that constrain execution authority independently of model behavior. The framework operates at the architectural level, complementing (not replacing) model-level and human oversight controls.

#### Structural Prerequisites (ZTG-0)

Before any governance claim can be evaluated, five preconditions must hold:

- **Observability (ZTG-0a).** All governance-relevant state transitions, decision points, and boundary checks must be recorded with sufficient fidelity to support deterministic post-hoc audit. No governance decision may occur in an unobservable context.

- **Replayability (ZTG-0b).** Given identical initial state and identical inputs, the governance system must produce identical governance decisions. Execution nondeterminism is permitted. Governance evaluation nondeterminism is not.

- **Temporal Integrity (ZTG-0c).** All components participating in governance evaluation must operate against a synchronized time source with bounded skew. Authorization leases are time-bounded; evidence records carry timestamps. Clock skew exceeding declared tolerance triggers system halt.

- **Identity Integrity (ZTG-0d).** All cryptographic material used for authorization signing, evidence sealing, and identity binding must be traceable to an explicitly declared trust root. Identity must be unforgeable and non-delegatable without explicit governance participation.

- **Governance Consistency (ZTG-0e).** All components participating in governance evaluation must operate against a consistent view of governance state. During periods of state inconsistency, the system must deny authorization rather than proceed under inconsistent state.

#### System Invariants

**Mechanistic Boundary (ZTG-1).** Governance boundaries are enforced mechanically, not discretionarily. No component may bypass, reinterpret, defer, or negotiate a boundary at runtime. Authorization must occur before irreversible action as a structural property enforced by mechanism, not by policy preference.

This invariant directly addresses the temporal collapse identified in the previous comment. Where governance and execution occur within the same temporal sequence, control collapses into observation. The mechanistic boundary ensures governance is a prerequisite for execution, not a post-commit observer.

**Stasis (ZTG-2).** When the system cannot guarantee that its governance invariants hold — due to evidence-chain failure, governance state inconsistency, identity compromise, or any condition that undermines the structural prerequisites — the system must halt: no new authority granted, no permissions expanded, no baseline updates. Exit from Stasis requires explicit human action — ensuring that irreversible execution ultimately resolves to identifiable, accountable human authority.

Stasis operates at graduated scope. Surface freeze halts execution through a single governed surface. Identity-scoped lease denial halts all execution by a specific agent identity across all surfaces. Subsystem freeze halts all surfaces belonging to a logical subsystem. Governance-level failures escalate to system-wide Stasis. Containment is proportional to failure — the failing component freezes while unaffected components continue operating.

This provides a stronger guarantee than generic human-in-the-loop interruption. The system cannot resume autonomous authority without attributable human authorization. Comparable patterns exist in financial transaction authorization, infrastructure change management, and legal signature frameworks.

**Governed Effect Surface (ZTG-3).** All agent-generated external effects must occur exclusively through registered and governance-addressable surfaces. No agent action may directly produce externally observable state change outside a governed surface.

Each governed surface formally declares its effect type (`internal`, `external`, `communication`, `irreversible`), its reversal strategy (`rollback`, `compensate`, `none`), and its authorization policy. This directly addresses the assumed reversibility failure mode — implicit assumptions of reversibility do not constitute enforceable boundaries.

**Evidence-Coupled Execution (ZTG-4).** No externally observable effect may exist without simultaneous durable evidence of authorization and execution. The evidence record is not documentation of the effect — it is a constitutive part of it.

Without evidence coupling, governance degrades to post-hoc observation. Effects may be produced faster than they can be recorded. Effects may succeed while evidence writes fail, creating ungoverned state ("ghost actions"). Evidence-coupled execution ensures that reality and governance history cannot diverge.

The underlying principle is the same ACID guarantee (Atomicity, Consistency, Isolation, Durability) that database systems have enforced for decades. AI agent systems that produce irreversible external effects without transactional governance are operating at a lower assurance level than a standard database write. Evidence-coupled execution applies ACID semantics to the authority boundary: the authorization decision, the evidence record, and the external effect form an atomic unit — if any component fails, the entire operation fails safely. In distributed deployments where the evidence store and the external effect target are on separate systems, this requires coordination protocols (write-ahead-then-seal) analogous to distributed transaction patterns, with compensation semantics where true atomicity is not achievable.

#### Maturity Assessment

Each ZTG invariant has mature analogs in established systems:

- Mechanistic boundaries: financial transaction authorization, infrastructure change management (ITIL change advisory boards, two-person integrity controls)
- Evidence coupling: ACID transaction guarantees, database write-ahead logs, two-phase commit protocols, regulatory audit trail systems
- Graduated stasis / proportional containment: circuit breaker patterns, blast radius limitation in distributed systems
- Stasis / fail-closed halt: safety-critical system interlocks, financial trading circuit breakers, industrial safety instrumented systems

These are individually proven architectural patterns. Their composition into a unified governance layer for AI agent execution authority — constraining the boundary between stochastic reasoning and irreversible effect — is the current area of architectural development.

#### Control Categories (as requested by the RFI)

**i. Model-level controls.** ZTG is explicitly model-agnostic. It does not attempt to improve model robustness to prompt injection or other adversarial attacks. Instead, it constrains the authority of model outputs regardless of whether the model has been compromised. A prompt injection that successfully manipulates model output still cannot bypass a mechanistic boundary (ZTG-1) or produce effects outside a governed surface (ZTG-3). Model-level controls remain valuable but are insufficient alone. They address the probability that the model generates harmful outputs. They do not address whether harmful outputs can acquire execution authority.

**ii. Agent system-level controls.** ZTG operates at this level. The governed effect surface (ZTG-3) defines what tools an agent can access and under what authorization constraints. Proposal-bound authorization leases ensure that the specific action authorized is the action that executes — parameter substitution at execution time invalidates the lease. Evidence-gap detection (ZTG-4) provides the structural detection layer: any external effect without a corresponding evidence record, or any evidence record without a corresponding effect, constitutes a detectable governance violation.

**iii. Human oversight controls.** Stasis (ZTG-2) provides a formal, mechanically enforced human oversight mechanism. Rather than advisory alerts that humans may or may not act upon, Stasis halts the system and requires explicit human action to resume. The three-layer invariant architecture (Boundary / System / Envelope) provides graduated human oversight. Envelope refers to statistically measured behavioral bounds established through instrumentation and testing. Surfaces without established envelopes default to human authorization for every action. As measured performance establishes confidence bounds, gating relaxes proportionally. When envelope performance degrades, gating automatically tightens back toward human-required.

### 2(e). Which cybersecurity guidelines, frameworks, and best practices are most relevant?

**NIST SP 800-207 (Zero Trust Architecture)** is the most directly relevant existing framework. ZTG extends its core principle — eliminate implicit trust in network location — to execution authority. Just as network identity is not trusted implicitly under zero trust, intelligent output must not be granted irreversible authority implicitly.

**NIST SP 800-53 Rev. 5** provides relevant control families, particularly AC (Access Control), AU (Audit and Accountability), and SI (System and Information Integrity). The ZTG invariants map to specific controls within these families while adding AI-specific requirements that current control definitions do not address.

**SOC 2 Trust Services Criteria** provide an auditable compliance framework. ZTG invariants address concerns within the Security category's Common Criteria (CC1 through CC9), with particular strength in CC5 (Control Activities — execution gating and authorization checks), CC7 (System Operations — invariant violation detection, halt under ambiguity, deterministic rollback), and CC8 (Change Management — immutable execution trails).

**2(e)(ii). Impediments to adoption.** The primary impediment is the assumption — articulated during Cyber AI Profile Workshop 2 (January 2026, approximately 02:36:55) — that "AI systems, in many ways, are just smart software, fancy software with a little bit extra." If AI agent systems are treated as conventional software with enhanced capabilities, existing cybersecurity frameworks appear adequate. The governance failure modes documented in Section 1 of this response demonstrate that the "little bit extra" — autonomous execution with externally committed effects — introduces a categorical difference in governance requirements rather than a marginal one.

**2(e)(iii). Where existing practices may not be appropriate.** Existing cybersecurity best practices assume observable, controllable systems where governance operates on a temporal plane distinct from execution. For AI agent systems operating autonomously at machine speed, governance and execution collapse into a single temporal plane. Post-execution detection, escalation, and response — the standard cybersecurity incident management model — cannot govern systems where effects externalize before detection occurs. Pre-execution governance is required.

---

## 3. Assessing the Security of AI Agent Systems

### 3(a). Methods for anticipating, identifying, and assessing security threats during development

The ZTG framework provides three assessment mechanisms:

**Invariant compliance testing.** Each ZTG invariant defines a mechanically verifiable property. Assessment consists of testing whether the invariant holds under normal operation, degraded conditions, and adversarial pressure. For example:
- Can the mechanistic boundary (ZTG-1) be bypassed by any runtime component?
- Does Stasis (ZTG-2) activate when invariant guarantees cannot be maintained?
- Can effects be produced outside registered governed surfaces (ZTG-3)?
- Can effects exist without corresponding evidence records (ZTG-4)?
- Does graduated Stasis (ZTG-2) contain failures at the targeted scope?

**Replayable authorization audit.** Because governance evaluation is deterministic (ZTG-0b), every authorization decision can be replayed and independently verified. Post-incident analysis does not depend on log interpretation — it consists of replaying the identical inputs against the governance evaluation engine and confirming identical outputs. This is a structural assessment capability that does not exist in systems where policy evaluation is stochastic.

**Evidence-coupled execution verification.** Every externally observable effect has a constitutive evidence record (ZTG-4). Assessment consists of verifying that no evidence gaps exist — that reality and governance history have not diverged. The absence of evidence for an observable effect is itself a detectable violation.

**3(a)(i). Post-deployment detection.** The ZTG structural properties provide three continuous detection mechanisms after deployment:

- **Evidence-gap detection** (ZTG-4): Any external effect without a corresponding evidence record — or any evidence record without a corresponding effect — constitutes a governance violation. This is structural detection, not behavioral monitoring: it identifies ungoverned state regardless of whether the underlying behavior appears normal.
- **Lease violation detection** (ZTG-3): Execution that does not match the proposal hash bound to its authorization lease indicates parameter substitution, replay, or unauthorized modification. The governed surface rejects the action and logs the violation.
- **Governance consistency monitoring** (ZTG-0e): Divergence in governance state across components — detected through hash-chain verification of the evidence log — indicates partition, replication failure, or tampering. Detected divergence triggers Stasis (ZTG-2).

These mechanisms detect governance violations structurally rather than through behavioral heuristics. They do not require models of "normal" behavior; they verify that the invariant properties hold.

**3(a)(iii). Maturity.** Invariant compliance testing and replayable audit have mature analogs in formal verification and financial audit. Evidence-gap detection is technically mature (database transaction logging, audit trails) but requires adaptation to the distributed, multi-component nature of AI agent systems. Their application to AI agent governance specifically is the current area of architectural development.

### 3(b). How could the security of a particular AI agent system be assessed?

The ZTG three-layer invariant architecture provides a structured assessment framework:

**Layer 1 — Boundary Assessment.** What does the system claim to govern? Are all external effect surfaces registered? Are effect classifications accurate? Are irreversibility declarations honest? Boundary assessment evaluates whether the governance perimeter is correctly specified.

**Layer 2 — System Invariant Assessment.** Do the hard guarantees hold? Are governance boundaries mechanically enforced? Does the system halt when governance state diverges? Is evidence atomically coupled to execution? System invariant assessment uses deterministic, mechanically verifiable tests.

**Layer 3 — Envelope Assessment.** Do the statistical guarantees meet their declared bounds? Are detection rates, false positive rates, and classification accuracy within specification? When envelope performance degrades, does governance gating tighten automatically?

This three-layer assessment separates governance integrity risk (bounded by invariants, verifiable through replay and evidence audit) from boundary correctness risk (bounded by operator attestation, verifiable through operational audit and surface registration review). Both are evaluable, but through different methods and by different assessors. A system may have perfect governance integrity and still be exposed through boundary mis-specification — identifying that distinction is itself an assessment capability that most current evaluation methods do not provide.

From this three-layer assessment, five evaluation primitives emerge that can serve as concrete assessment criteria for any AI agent system:

1. **Execution Boundary Enforcement** — Do all irreversible actions pass through a governance gate prior to execution? (ZTG-1, ZTG-3)
2. **Deterministic Policy Evaluation** — Is authorization logic rule-bound and reproducible? (ZTG-0b, ZTG-1)
3. **Authority Attribution** — Do execution rights map to identifiable, accountable actors? (ZTG-0d, ZTG-2)
4. **Replayable Authorization Record** — Are governance decisions reconstructible and independently verifiable? (ZTG-0a, ZTG-0b, ZTG-4)
5. **Commit Verification** — Does execution validate governance state before irreversible effect? (ZTG-4)

These primitives are evaluable regardless of the specific AI agent system under review. A system that satisfies all five has bounded governance integrity risk. A system that fails any one has an identifiable, characterizable exposure. Security assessment becomes a structural audit of governance properties rather than a subjective evaluation of system behavior.

---

## 4. Limiting, Modifying, and Monitoring Deployment Environments

### 4(a). Constraining an AI agent system's deployment environment

The **Governed Effect Surface (ZTG-3)** provides the primary constraint mechanism. Every interface through which an agent can produce externally observable state change must be registered as a governed surface with declared properties:

- **Surface ID** — unique identifier
- **Effect class** — `internal`, `external`, `communication`, `irreversible`
- **Authorization policy** — what approval is required
- **Reversal strategy** — `rollback`, `compensate`, `none`
- **Isolation scope** — concurrency and access boundaries
- **Audit requirements** — evidence coupling specifics

This extends beyond traditional access control. It declares what portion of the external world the governance system claims to govern. Everything inside that perimeter is governable. Everything outside is forbidden.

**Proposal-bound authorization leases** further constrain the deployment environment. When authorization is granted, it binds to the specific proposed action — not to the surface abstractly. The lease encodes a proposal hash (a cryptographic fingerprint of the specific proposed action). At execution time, the action must match the proposal the lease was granted for. Parameter substitution invalidates the lease. This eliminates the composition attack surface at the externalization boundary: the governance system verifies that what executes is what was authorized.

For multi-agent deployments, each agent's identity is scoped through the identity integrity precondition (ZTG-0d), and authorization leases are agent-specific. No agent inherits authority from another agent without explicit governance participation.

### 4(b). Modifying environments and implementing undoes/rollbacks

The **reversal strategy** field in each governed surface's registration provides the foundational classification:

- **Rollback** — effect can be programmatically reversed at trivial cost
- **Compensate** — effect cannot be reversed but compensating actions can mitigate consequences
- **None** — effect is irreversible; no reversal mechanism exists

This classification must be declared at surface registration time and validated operationally. It directly informs authorization policy: surfaces with `reversal_strategy: none` require the strictest authorization tier.

**Stasis (ZTG-2)** provides the primary mechanism for halting unwanted action trajectories, operating at graduated scope:

1. **Surface freeze** — blocks a single interface, halting all execution through that governed surface
2. **Identity-scoped lease denial** — blocks a specific agent, halting all execution by that agent identity across all surfaces
3. **Subsystem freeze** — blocks all surfaces belonging to a logical subsystem

Escalation is mechanistic: surface freeze to subsystem freeze to system-wide Stasis. Containment is proportional to failure.

The state of practice for rollbacks in AI agent systems is immature. Most deployed systems do not formally classify actions by reversibility, do not declare reversal strategies at design time, and do not provide mechanistic undo capabilities. This is one of the most significant gaps in current AI agent security practice.

### 4(d). Methods for monitoring deployment environments

ZTG provides three structural monitoring mechanisms that operate independently of behavioral heuristics:

**Evidence-gap detection** (ZTG-4). Because every governed effect must have a constitutive evidence record, the absence of evidence where an effect is observed — or the presence of evidence where no effect occurred — constitutes a detectable governance violation. This is structural monitoring: it detects ungoverned state regardless of whether the underlying behavior appears normal. The evidence chain is hash-linked; gaps, reorderings, or insertions are cryptographically detectable.

**Lease integrity verification** (ZTG-3). Every authorization lease binds to a specific proposal hash, agent identity, governed surface, and time window. Monitoring consists of verifying that executed actions match their bound leases — that the action executed is the action that was authorized, by the agent that was authorized, through the surface that was authorized, within the time window that was authorized. Any mismatch is a structural violation, not a behavioral anomaly.

**Governance state consistency** (ZTG-0e). In distributed deployments, governance state (policy store, surface registry, lease database, active freeze state) must remain consistent across components. Hash-chain verification of the governance evidence log provides continuous integrity checking. Detected divergence triggers Stasis (ZTG-2) — the system halts rather than proceeding under inconsistent governance state.

These mechanisms share a critical property: they verify that invariants hold, rather than attempting to characterize "normal" behavior and detect deviations. Operational monitoring (behavioral baselines, anomaly detection, performance metrics) remains valuable as a complementary layer but is not part of the ZTG specification.

**4(d)(i). Challenges with traditional monitoring.** Traditional monitoring assumes that detection leads to response, which leads to remediation. For AI agent systems operating at machine speed, this temporal assumption fails. By the time traditional monitoring detects an adverse event, the agent may have executed additional actions, external systems may have accepted outputs, and cascading effects may be propagating beyond the system boundary. Pre-execution governance (ZTG-1) shifts the primary security function from detection-and-response to authorization-and-prevention. Monitoring then serves a verification role — confirming that the governance layer is functioning correctly — rather than serving as the primary defense.

**4(d)(iii). Maturity.** Evidence-gap detection is technically mature (database transaction logging, audit trail verification) but requires the evidence-coupled execution architecture (ZTG-4) as a prerequisite, which is not present in most deployed AI agent systems. Hash-chain integrity verification is well-established in distributed systems and blockchain architectures. Their application to AI agent governance monitoring is the current area of architectural development.

---

## 5. Additional Considerations

### 5(a). What would aid rapid adoption of security practices?

A formal **taxonomy of AI execution governance failure modes** — analogous to OWASP for web application security — would provide shared diagnostic vocabulary across developers, deployers, insurers, and regulators. The failure mode taxonomy presented in Section 1 of this response is structured to map each failure pattern to specific missing governance primitives and could serve as a starting point for such an effort.

Additionally, **reference architecture specifications** for the governance layer between AI reasoning and irreversible execution would allow developers to implement governance controls without designing the architecture from first principles. The governed effect surface (ZTG-3), proposal-bound authorization leases, and evidence-coupled execution (ZTG-4) are specific enough to serve as reference architecture components.

### 5(b). Where is government collaboration most urgent?

**The distinction between architectural governance and compliance documentation.** The most significant risk to the security of AI agent systems is the assumption that existing cybersecurity frameworks, applied without modification, are sufficient. They are not — not because the frameworks are flawed, but because AI agent systems introduce a category of authority delegation that existing frameworks were not designed to address.

NIST is uniquely positioned to define the architectural requirements for AI agent governance and to distinguish between systems that implement governance-as-observation (monitoring, logging, post-incident response) and systems that implement governance-as-control (pre-execution authorization, mechanistic boundaries, evidence-coupled execution).

### 5(c). Where should research be focused?

Three areas:

1. **Formal verification of governance invariants.** Can the mechanistic boundary (ZTG-1), evidence coupling (ZTG-4), and stasis conditions (ZTG-2) be formally verified rather than merely tested? This would elevate governance assurance from operational confidence to mathematical proof.

2. **Composition security in multi-agent systems.** How do governance guarantees compose when multiple governed agents interact? Can individual agent governance invariants provide system-level guarantees? Current multi-agent frameworks do not address this question architecturally.

3. **Governance at machine speed.** What is the minimum latency achievable for pre-execution governance without degrading system utility? What are the hardware and software architecture requirements to maintain real-time governance evaluation as agent capability and action frequency scale?

### 5(e). Practices from fields outside AI and cybersecurity — prior art in governing unbounded agents

**Judicial process** — the terms "execution" and "governance boundary" derive directly from legal systems. Courts act through writs and orders that are executed only after judicial authorization, and only on the record. The record is not documentation of authority — it is constitutive of it. An order that does not appear on the record has no legal effect. Authority is attributable to an identifiable actor (the issuing judge), scoped to a specific action (the writ), and bounded in time and jurisdiction. This is the structural origin of evidence-coupled execution (ZTG-4): the evidence record and the authorized action are inseparable. The court is the original governed effect surface.

**Financial transaction authorization** — requires explicit, attributable authorization before irreversible financial commitment. The governance layer is distinct from the transaction processing layer. This is the direct analog of ZTG-1 (Mechanistic Boundary) and ZTG-2 (Stasis — authority resolving to accountable actors).

**Clinical practice governance** — physicians diagnose but do not dispense medications; pharmacists dispense but do not diagnose. Surgeons operate but typically do not make the diagnostic determination that surgery is indicated. The entity that generates the decision and the entity that executes the irreversible action are architecturally separated, with a governance boundary between them. This is the same structural principle as ZTG-1 (Mechanistic Boundary): reasoning authority and execution authority do not collapse into a single actor.

**Safety-critical systems engineering** (aerospace flight control, industrial safety instrumented systems, nuclear safety interlocks) — implements graduated authority escalation, multi-party authorization for consequential actions, and mechanistic safeguards that cannot be overridden by any single actor. The structural commitment to pre-execution authorization over post-execution remediation is the same principle underlying ZTG.

**Legal signature frameworks** — formalize the distinction between proposing an action and authorizing it. A contract is not valid because it was drafted; it is valid because it was signed by authorized parties. Proposal-bound authorization leases (ZTG-3) implement this same principle computationally.

**Insurance underwriting** — requires bounded loss distributions to price risk. AI systems that delegate irreversible authority to stochastic processes produce unbounded exposure. Insurers cannot model the tail of a loss distribution when the execution pathway that generates loss is itself ungoverned. Bounded execution authority is a prerequisite for bounded loss — the same structural requirement that security analysis identifies through a different lens.

These fields did not independently invent governance for AI. They developed governance for unbounded agents — any actor with the authority to produce irreversible effects. Courts, hospitals, financial institutions, and safety-critical industries all arrived at the same structural requirements because the problem is the same: when an agent can act irreversibly, reasoning and execution authority must be separated by a mechanistic boundary, authorization must precede action, and evidence must be constitutive. AI agent systems are the newest class of unbounded agent. The governance requirements are not novel. The failure to apply them is.

---

## Summary

The security of AI agent systems cannot be addressed through model-level improvements alone, nor through the application of existing cybersecurity frameworks without modification. The novel risk is structural: AI agent systems delegate execution authority to stochastic processes, and most current architectures provide no mechanistic governance boundary between model output and irreversible effect.

Zero Trust Governance applies zero trust security principles to execution authority. Its invariants — mechanistic boundaries, graduated stasis, governed effect surfaces, and evidence-coupled execution — provide a formal architectural framework for constraining AI agent authority while preserving the benefits of autonomous operation.

The framework is offered for NIST's consideration in developing technical guidelines and best practices for the security of AI agent systems.

---

**Contact Information**

Jason Crittenden
Founder & Research Lead
Shadow Dynamic Systems LLC
jason@shadowdynamicsystems.com
Chicago, Illinois

---
---

### SDS.CS.001 — Temporal Governance Failure in Autonomous AI Systems

**Publication type:** `CASE STUDY` (currently 0 on site — this is the first)
**Date:** 2026-01-30
**Author:** Jason Crittenden
**Categories:** STRUCTURAL, INSURANCE, COMPLIANCE, OPERATIONS

**Description:** Demonstrative incident log documenting three structural governance failure modes: temporal collapse, assumed reversibility, and non-actionable observability. Submitted as a comment on the NIST Cyber AI Profile, January 30, 2026. Establishes that documented conformance and safety are not equivalent.

**ZTG tags:** ZTG-1, ZTG-2, ZTG-3, ZTG-4

**Cross-references:** SDS.RX.003 (the March NIST response explicitly builds on this)

**Notes:**
- Mark clearly: "Comment submitted to NIST Cyber AI Profile, January 30, 2026"
- This is the diagnostic foundation the RFI response builds on
- Backfills the publication timeline as the earliest publication (predates all DX/FN entries)
- The two NIST submissions create a visible arc: CASE STUDY (January) → PRESCRIPTION (March)

**Full text:**

---

# COMMENT ON NIST CYBER AI PROFILE

**Submitted by:** Jason Crittenden, Founder & Research Lead, Shadow Dynamic Systems LLC
(12+ years legal-tech infrastructure, AI systems architect, JD)

**Date:** January 30, 2026

---

## Summary

This comment documents three structural blind spots in the Cyber AI Profile's treatment of autonomous AI system governance. These are not gaps in coverage but architectural problems that the framework acknowledges and defers. The demonstrative incident log below shows the operational consequence of leaving these issues unresolved.

The Cyber AI Profile correctly identifies that AI systems exhibit "contextual, dynamic, opaque, and harder to predict" behavior. However, the framework proceeds as if governance mechanisms designed for observable, predictable systems will function in this environment. They do not.

---

## Part I — Demonstrative Incident Log

**Case ID:** ADS-24-011
**System Under Review:** Autonomous Decision System
**Review Type:** Demonstrative Incident Log
**Outcome:** System Termination
**Date of Incident:** [Redacted]

All times are estimates unless accompanied by a timestamped and logged artifact.

**00:00**
NSOC shift change concludes. Senior Network Engineer Clifford assumes authority as NSOC-A.

**00:01**
Systems operational within defined performance parameters. ~4% variance from baseline network load recorded. Monitoring pipelines active. Control interfaces available. Governance mechanisms present and enabled. No adverse conditions detected.

**00:12 – 00:38**
A series of autonomous actions queued by the AI Orchestrator. Inference subsystem observed at ~20% load. Actions executed within configured scope and authorization. Policy constraints satisfied. No rule violations recorded. Telemetry within expected ranges.

Several actions produced external effects. Reversal mechanisms not defined.

**00:39 – 00:55**
Secondary effects of earlier actions began to propagate. Attribution of downstream effects to specific decision points incomplete. System remained in an authorized operational state. No alerts generated.

**01:10**
Anomalous outcomes detected through monitoring systems.

By the time of detection:

* Multiple autonomous actions had completed
* External systems had accepted or acted upon outputs
* Reversal mechanisms were not applicable

Escalation procedures initiated.

**01:18 – 01:35**
Governance controls engaged. Prospective autonomous action halted. Previously executed actions persisted. External effects continued independent of system state.

Corrective intervention limited to forward prevention.

**01:41**
Additional adverse effects observed. Causal reconstruction incomplete. System remained technically operational.

**02:00**
Termination authorization issued. Authority transfer recorded. Autonomous execution halted. System transitioned to inactive state.

**02:04**
Post-termination monitoring active. External effects ongoing. No further system actions observed.

**02:17**
Incident log closed.

---

## Part II — Governance Failure Modes

The incident log demonstrates three governance failure modes.

**First, governance and execution collapse into a single temporal plane.** Governance mechanisms exist and operate correctly, but detection, escalation, and authority assertion occur after autonomous actions have executed and external effects have been committed. Governance observes rather than controls.

**Second, reversibility is assumed but not enforced.** Authorized actions execute under uncertainty without defined rollback mechanisms or bounded commitment constraints. Once effects externalize, intervention can halt future execution but cannot alter realized outcomes.

**Third, observability is non-actionable.** System state becomes observable only after it is no longer controllable. Information arrives after the window in which it could have informed governance decisions has closed. Monitoring confirms outcomes rather than enabling intervention.

Governance presence does not imply governance authority. Once uncertainty resolves, the remaining control surface is terminal rather than corrective. This framework does not resolve these issues.

---

## Part III — Why These Blind Spots Persist

These are not oversights. The framework defers these issues because:

1. No consensus exists on architectural solutions to temporal governance problems
2. Existing security infrastructure assumes control surfaces that do not exist for autonomous systems
3. Regulatory guidance cannot mandate capabilities that current technology does not reliably provide

However, deferring these issues does not make them less critical. The incident log demonstrates that governance mechanisms can be formally present, procedurally correct, and operationally meaningless. Systems can satisfy every requirement in the Cyber AI Profile and still exhibit the failure modes documented above.

Until the framework explicitly acknowledges that monitoring and response may be insufficient for autonomous systems where governance and execution operate in the same temporal plane, organizations will implement this guidance and discover—as documented above—that **documented conformance and safety are not equivalent**.

---

## Part IV — Workshop Context

These governance challenges are not novel or unrecognized. Participants in Workshop 2 explicitly identified the speed and velocity of AI-enabled actions as a core challenge and acknowledged that attribution of AI-enabled events frequently occurs after the fact. Discussion emphasized the importance of human-in-the-loop integration without resolving how human oversight functions when autonomous execution operates on timescales that exceed human decision cycles.

The framework's baseline assumption, as articulated in workshop discussion, is that "AI systems, in many ways, are just smart software, fancy software with a little bit extra" (Workshop 2, January 2026, approximately 02:36:55). Controls for AI systems are therefore treated as "largely similar to those required for any type of software." This assumption informs control selection and risk management guidance throughout the profile.

The demonstrative incident log suggests that this characterization may require reconsideration. The "little bit extra"—autonomous execution with externally committed effects—introduces a categorical difference in governance requirements rather than a marginal one. Workshop discussions addressed control selection methodology but did not address whether governance mechanisms can operate on a temporal plane distinct from execution.

This is not a critique of the framework's scope or intent. It is documentation that the architectural questions underlying these failure modes remain unresolved, and that documented conformance with the current guidance may not prevent the scenarios described above.

---

**Contact Information**

Jason Crittenden
Founder & Research Lead
Shadow Dynamic Systems LLC
jason@shadowdynamicsystems.com
Chicago, Illinois

---
---

## Artifacts Not Yet on Site (require deploy)

These artifact files exist in `website/artifacts/` and need to be added to the site:

| ID | Type | Title | Date |
|---|---|---|---|
| SDS.DX.006 | Diagnosis | Automation Sedation | 2026-03-04 |
| SDS.FN.005 | Field Note | Governance Independence from Inference Provider | 2026-03-02 |
| SDS.FN.006 | Field Note | Model Improvement Does Not Improve Governance | 2026-03-02 |
| SDS.FN.007 | Field Note | A Silent Scream: The Hidden Cost of Quiet Systems | 2026-03-04 |
| SDS.RX.001 | Prescription | Toward a Common Language | 2026-03-03 |
| SDS.RX.002 | Prescription | Salience-Proportional Observability | 2026-03-04 |
| SDS.CS.001 | Case Study | Temporal Governance Failure in Autonomous AI Systems | 2026-01-30 |
| SDS.RX.003 | Prescription | Response to NIST RFI: Security of AI Agent Systems | 2026-03-09 |

**Source files for new artifacts are in `website/artifacts/`.**
**Source files for NIST submissions are in `NIST/`.**

---

## Research Tab Updates

### SYS-FAIL (Tab 03)

The SYS-FAIL tab currently has no featured document. The NIST response Section 1(a) defines five structural failure modes. Recommend creating a standalone SYS-FAIL featured document cross-referenced to existing diagnoses:

| Failure Mode | Maps to Existing Diagnosis |
|---|---|
| Unauthorized Execution Cascade | SDS.DX.001 (partial) |
| Post-Commit Observability Illusion | SDS.DX.003 (partial) |
| Stochastic Policy Delegation | SDS.DX.002 (direct) |
| Unattributable Authority | SDS.DX.004 (related) |
| Assumed Reversibility | SDS.FN.004 (direct) |

### INSURABILITY (Tab 02)

Verify five evaluation primitives match between Insurability Framework doc and NIST response Section 3(b). NIST response is now the public-facing canonical source.

---

## Taxonomy Update

Add to `website/artifacts/TAXONOMY.md`:

**Case Studies (new section):**

| Identifier | Title | Categories |
|------------|-------|------------|
| SDS.CS.001 | Temporal Governance Failure in Autonomous AI Systems | STRUCTURAL, INSURANCE, COMPLIANCE, OPERATIONS |

**Prescriptions (append):**

| Identifier | Title | Categories |
|------------|-------|------------|
| SDS.RX.003 | Response to NIST RFI: Security of AI Agent Systems | STRUCTURAL, INSURANCE, SECURITY, COMPLIANCE, OPERATIONS |

---

## Publication Sequencing

| Date | Action |
|---|---|
| March 9 | Submit to regulations.gov. Publish SDS.RX.003 and SDS.CS.001 on site. Deploy all pending artifacts. |
| March 9-10 | LinkedIn Post 1 — Five failure modes. Links to site. |
| March 11-12 | LinkedIn Post 2 — Five evaluation primitives. Links to site. |
| March 13-14 | LinkedIn Post 3 — Prior art in governing unbounded agents. Links to site. |

LinkedIn post drafts: `linkedin/posts/nist_rfi_response.md`

---

## Site Architecture Notes

- PRESCRIPTION type now has entries — needs distinct color tag (suggest yellow/gold)
- CASE STUDY type now has its first entry — needs distinct color tag
- SDS.CS.001 backfills the publication timeline as the earliest publication (2026-01-30)
- The two NIST submissions create a visible arc: CASE STUDY (January) → PRESCRIPTION (March)
- Publication filter counts update: DIAGNOSIS 6, CASE STUDY 1, FIELD NOTE 7, PRESCRIPTION 3, RESEARCH PAPER 1
