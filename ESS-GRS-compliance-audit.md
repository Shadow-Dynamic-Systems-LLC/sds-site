# ESS/GRS Compliance Audit — Website Content

**Audit Date**: 2026-03-19
**Spec Reference**: SDS-SPEC-ESS-001 v1.0
**Auditor**: Claude (automated review)
**Scope**: All content in `website/` and `llms.txt` / `llms-full.txt`

---

## Severity Legend

| Level | Meaning |
|-------|---------|
| **S1** | Structural violation — load-bearing term violates core invariant |
| **S2** | Missing required element — dual-layer, diagram, or observable anchor absent |
| **S3** | Style/density violation — sentence length, concept rate, or readability |

---

## CR-001: No page references `core.yaml` as canonical source

**Severity**: S1
**Spec**: §4.1 — "Pages may reference but must not redefine terms."
**Scope**: All pages

**Finding**: Every page independently defines ZTG terms. No page references `/semantics/core.yaml`. Term definitions vary across pages (e.g., "Mechanistic Boundary" is defined differently in `llms.txt`, `insurance.md`, `SDS.RX.001.md`, and `SDS.DX.001.md`). Each is close but not identical, creating semantic drift.

**Change Required**:
1. Establish `core.yaml` (now created) as the single source.
2. All pages must reference `core.yaml` definitions. Where terms appear, link to or reproduce the canonical definition — do not paraphrase independently.
3. Audit each page's term definitions against `core.yaml` and reconcile divergences.

---

## CR-002: `llms.txt` / `llms-full.txt` — Terms before grounding

**Severity**: S1
**Spec**: §1.2 — "A load-bearing term may not appear before its meaning is established through concrete behavior."
**Scope**: `website/llms.txt`, `website/llms-full.txt`

**Finding**: The opening paragraph uses five load-bearing terms before grounding any of them:

> "SDS develops Zero Trust Governance (ZTG), a framework that separates stochastic reasoning from deterministic execution authority..."

Terms used before grounding:
- "Zero Trust Governance"
- "stochastic reasoning"
- "deterministic execution authority"
- "governed execution"
- "Lighthouse"

**Change Required**: Restructure the opening to follow the ESS encoding model (§2.1):
1. Lead with concrete behavior: "AI systems can reason unpredictably and act on that reasoning. When those actions are irreversible, someone must authorize them before they execute."
2. Then assign the term: "We call this requirement Zero Trust Governance."
3. Then state the constraint.

All five terms must be grounded in observable behavior before their first use.

---

## CR-003: All pages — Dual-Layer Representation missing

**Severity**: S2
**Spec**: §1.5 — "Every core concept must exist in two forms: Entry Layer and Formal Layer."
**Scope**: All external-facing content

**Finding**: No page provides both layers for any term. Specific violations:

| Page | Layer Present | Layer Missing |
|------|--------------|---------------|
| `llms.txt` Core Concepts | Formal-ish (dense prose) | Entry Layer |
| `llms-full.txt` ZTG Invariants | Formal | Entry Layer |
| `SDS.RX.001.md` Terms | Formal only | Entry Layer |
| `insurance.md` Domain Introduction | Entry-ish (accessible) | Formal Layer |
| `SDS.DX.001.md` Pattern/Pathology | Formal | Entry Layer |
| `SDS.DX.006.md` Pattern Definition | Formal | Entry Layer |
| `safety_and_governance.md` | Entry (accessible) | Formal Layer |

**Change Required**: For every load-bearing term on every external-facing page:
1. Add Entry Layer (concrete behavior first, ≤ grade 10, ≤ 20 words/sentence).
2. Retain or add Formal Layer (precise, minimal redundancy).
3. Follow the canonical template from §2.1/§2.2.

Priority pages: `llms.txt` (site homepage equivalent), `insurance.md` (primary audience surface), `SDS.RX.001.md` (terminology reference).

---

## CR-004: Zero diagrams on primary site surfaces

**Severity**: S2
**Spec**: GRS-1 — "Any concept involving flow, boundary, or state transition SHOULD have a graphical representation."
**Spec**: GRS-4 — "Diagram must appear immediately after concept introduction."
**Scope**: `llms.txt`, `llms-full.txt`, `insurance.md`, `SDS.RX.001.md`

**Finding**: The primary site copy (`llms.txt`) contains **zero diagrams**. The following concepts require diagrams per GRS-1 but have none:

| Concept | Page(s) | Diagram Type Required (GRS-2) |
|---------|---------|-------------------------------|
| Mechanistic Boundary | `llms.txt`, `SDS.RX.001.md`, `insurance.md` | Flow / Boundary |
| Governed Effect Surface | `llms.txt`, `SDS.RX.001.md`, `insurance.md` | Flow |
| Graduated Containment | `llms.txt`, `SDS.RX.001.md` | State Transition |
| Governed Execution Path | `llms.txt`, `llms-full.txt` | Flow |
| Evidence-Coupled Execution | `llms.txt`, `SDS.RX.001.md` | Flow |
| Statistically Bounded Envelope | `llms-full.txt` | Layer |
| Three-Layer Architecture | `llms-full.txt`, `insurance.md` | Layer |
| Authorization Flow | `insurance.md` | Flow |
| Sedation Feedback Loop | `SDS.DX.006.md` | State Transition |

The NIST response (`site_update_handoff.md`) contains the Figure 1 ASCII diagram, which is GRS-compliant — but this diagram does not appear on the main site surfaces.

**Change Required**:
1. Add canonical diagrams from GRS-10 (§6) to `llms.txt` for Mechanistic Boundary, Graduated Containment, and the Unified System Diagram.
2. Add the Governed Effect Surface diagram from §2.3 to all pages that introduce it.
3. Add a Three-Layer Architecture layer diagram to `llms-full.txt` and `insurance.md`.
4. Add a sedation feedback loop state transition diagram to `SDS.DX.006.md`.
5. All diagrams must appear immediately after concept introduction (GRS-4), not in appendices.

---

## CR-005: `llms.txt` Core Concepts — Observable anchoring missing

**Severity**: S2
**Spec**: §1.4 — "Every concept must map to at least one observable system behavior or falsifiable condition."
**Scope**: `website/llms.txt` Core Concepts section

**Finding**: Two concepts lack observable anchors:

- **"The AI Liability Gap"**: Defined as a conceptual gap. No observable system behavior or falsifiable condition specified. What would an evaluator observe to confirm a liability gap exists or doesn't?
- **"Bounded Autonomy"**: Defined as "autonomy within declared, verifiable boundaries." The boundaries themselves are not observable in this definition — the definition is philosophical, not operational.

**Change Required**:
1. For "The AI Liability Gap": add observable indicators (e.g., "Observable when: a system executes irreversible actions without pre-authorization checks; when authorization decisions cannot be replayed; when no governance boundary exists between model output and execution").
2. For "Bounded Autonomy": anchor to observable system behaviors (e.g., "Observable when: every execution path passes through a registered governed surface; when authorization leases are scoped to specific proposals; when the envelope is measurably bounded").

---

## CR-006: `llms-full.txt` — Sentence length and concept density violations

**Severity**: S3
**Spec**: §3.1 — "Target ≤ 20 words per sentence (Entry Layer)"
**Spec**: §3.2 — "Max 1 new term every 2–3 sentences"
**Scope**: `website/llms-full.txt` Core Concepts, ZTG Invariants

**Finding — Sentence length**: Multiple sentences in what should be Entry Layer content exceed 20 words. Examples:

- "SDS develops Zero Trust Governance (ZTG), a framework that separates stochastic reasoning from deterministic execution authority, making AI systems auditable, understandable, and repeatable." (26 words, 3 clauses)
- "The gap exists between what AI systems are permitted to do and what governance structures can verify, audit, and bound." (20 words, 2 clauses — borderline)
- "Irreversible actions are permitted only after mechanistic, replayable evaluation against declared policy." (12 words — OK)

**Finding — Concept density**: The Core Concepts section introduces 5 new terms in ~10 sentences (~1 term per 2 sentences). The ZTG Invariants section introduces 9 invariants in rapid succession with minimal grounding between them.

**Change Required**:
1. Break compound sentences in the opening and Core Concepts section.
2. Space term introductions: max 1 new term per 2–3 sentences.
3. Add grounding sentences between invariant definitions (concrete behavior examples).

---

## CR-007: `SDS.RX.001.md` — Formal Layer only, no Entry Layer

**Severity**: S2
**Spec**: §1.5 — Dual-Layer Representation
**Scope**: `website/artifacts/SDS.RX.001.md`

**Finding**: This is the terminology reference document. Every term definition is Formal Layer only. For a document whose purpose is to enable cross-domain comprehension, the absence of Entry Layer is particularly damaging.

Example — "Governed Execution" definition:
> "The operational property that irreversible actions are permitted only following deterministic authorization that is auditable, attributable, and replayable."

This is precise but not Entry Layer. A grade 10 reader cannot parse "deterministic authorization that is auditable, attributable, and replayable" on first encounter.

**Change Required**: Add Entry Layer above each Formal Layer definition, following the §2.1 template:

Entry Layer example for Governed Execution:
> "Before the system takes an irreversible action, it must get explicit permission. That permission must follow fixed rules — not model judgment. We call this Governed Execution. It ensures that every irreversible action can be traced to a specific authorization."

---

## CR-008: `insurance.md` — Terms before grounding in Domain Introduction

**Severity**: S1
**Spec**: §1.2 — No Term Before Grounding
**Scope**: `website/collections/insurance.md`

**Finding**: The Domain Introduction uses "Zero Trust Governance (ZTG)" and "governed execution" before grounding them in concrete behavior. Line 19:

> "Zero Trust Governance (ZTG) provides a structural answer: separate reasoning from authority."

The reader encounters "Zero Trust Governance" for the first time here without prior grounding. The concrete behavior (separate reasoning from authority) follows the term instead of preceding it.

**Change Required**: Restructure the Domain Introduction to ground before naming:
1. Describe the concrete problem (reasoning + action in one step).
2. Describe the concrete solution (separate them mechanistically).
3. Then assign the term (ZTG).

---

## CR-009: `safety_and_governance.md` — Does not use canonical ZTG vocabulary

**Severity**: S1
**Spec**: §4.1 — "Pages may reference but must not redefine terms."
**Scope**: `website/projects/safety_and_governance.md`

**Finding**: This is a major Lighthouse project page that describes governance architecture using entirely different vocabulary from `core.yaml`:

| Page Term | Canonical `core.yaml` Equivalent |
|-----------|----------------------------------|
| "capability binding" | Governed Effect Surface (partial) |
| "intent-governed planning" | No direct equivalent |
| "contextual memory scoping" | No direct equivalent |
| "bounded heuristic behavior" | Statistically Bounded Envelope |
| "detectable failure states" | Graduated Containment (partial) |
| "structural safety" | Mechanistic Boundary + System Invariant |

The page never mentions ZTG invariants by name. A reader cannot connect this page's concepts to the canonical framework.

**Change Required**:
1. Map each section heading to its canonical ZTG equivalent.
2. Either use canonical terms directly or explicitly bridge (e.g., "Capability Binding — what ZTG calls Governed Effect Surfaces").
3. Add ZTG invariant references where concepts map.

---

## CR-010: `essay_one.md` — Contains meta-commentary / draft artifacts

**Severity**: S3
**Spec**: General quality — not specific ESS invariant
**Scope**: `website/essay_one.md`

**Finding**: Lines 207–217 contain draft meta-commentary that should not appear in published content:

> "If you want next steps, we can: extract design invariants for Lighthouse directly from this..."
> "But as-is, this is a complete SDS artifact. It doesn't persuade. It marks a fault line."
> "And that's exactly what you said you wanted."

This is LLM-conversation residue, not published copy.

**Change Required**: Remove lines 207–217. The essay ends naturally at line 205: "The danger is that they will fail quietly — and teach us not to notice."

---

## CR-011: `cultural_primer.md` — Contains meta-commentary

**Severity**: S3
**Spec**: General quality
**Scope**: `website/projects/cultural_primer.md`

**Finding**: Line 267 contains LLM-conversation residue:

> "Here it is — clean, polished, and formatted exactly as it should appear at the bottom of the document, with the micro-edits applied and no extra commentary."

**Change Required**: Remove line 267 and the `---` preceding it (line 266). The document should flow directly from the posture section into the Project Description section.

---

## CR-012: `verifiable_core_system.md` — No connection to ZTG framework

**Severity**: S2
**Spec**: §4.1, §1.2
**Scope**: `website/projects/verifiable_core_system.md`

**Finding**: This page describes "a zero-trust execution layer" but uses none of the canonical ZTG terminology. The SAIP RFC dominates the page and is presented in a humorous tone ("not entirely not a joke") that conflicts with the ESS requirement for deterministic comprehension of load-bearing terms.

The page's load-bearing claim — "zero-trust execution layer for verified agent behavior" — uses "zero-trust" without connecting to ZTG or grounding it in observable behavior per ESS.

**Change Required**:
1. Add a section connecting the verifiable core to ZTG invariants (which ones does it implement?).
2. Ground "zero-trust execution layer" in concrete behavior before the term.
3. Clarify the SAIP RFC's status — is it a published artifact, a thought experiment, or a joke? Its current ambiguity violates §1.1 (Deterministic Comprehension).

---

## CR-013: Hover Definition System not implemented

**Severity**: S2
**Spec**: §5 — "On hover of any load-bearing term: Show Entry Layer definition + mini diagram immediately"
**Scope**: Website implementation

**Finding**: The live site at shadowdynamic.systems has no hover system. No load-bearing term on any page is inspectable via hover. This is a website implementation requirement, not a content issue, but it is a spec violation.

**Change Required**: Implement the hover system per §5.2:
1. All load-bearing terms (§11 index) must be hover-inspectable.
2. Hover shows Entry Layer + mini diagram.
3. Expand shows Formal Layer + full diagram.
4. Hover definitions are pulled from `core.yaml`, not redefined per-page.

**Note**: This is an implementation task, not a content edit. Track separately.

---

## CR-014: `SDS.DX.006.md` — Missing state transition diagram for feedback loop

**Severity**: S2
**Spec**: GRS-1, GRS-4
**Scope**: `website/artifacts/SDS.DX.006.md`

**Finding**: The "self-reinforcing" feedback loop described in the Pattern Definition section is a state transition concept but has no diagram:

> "suppressed signals produce calm interfaces → calm interfaces reduce operator intervention → reduced intervention allows conditions to persist → persistent conditions generate further signals that are suppressed"

This is a textbook state transition. GRS-1 requires a diagram. GRS-4 requires it immediately after the concept introduction.

**Change Required**: Add a state transition diagram immediately after the feedback loop description:

```
[ Unresolved Condition ]
         │
         │ generates repeated signals
         ▼
[ Signal Suppression ]
         │
         │ produces calm interface
         ▼
[ Reduced Operator Intervention ]
         │
         │ allows condition to persist
         ▼
[ Condition Persists ]
         │
         │ generates more signals
         ▼
[ Signal Suppression ] (cycle)
```

---

## CR-015: Color semantics not declared

**Severity**: S3
**Spec**: §10.1 — "Color Must Encode Meaning or Be Removed"
**Scope**: Website implementation

**Finding**: The `site_update_handoff.md` requests distinct color tags for PRESCRIPTION (yellow/gold) and CASE STUDY types. If these are implemented, the color assignments must conform to §10.1:

| Color | ESS-Required Meaning |
|-------|---------------------|
| Red | Execution constraints |
| Blue | Observability / auditability |
| Gold | System boundaries / envelope |

Arbitrary color assignment to publication types would violate this rule unless the colors map to the semantic categories above.

**Change Required**: Either:
1. Map publication type colors to ESS semantic categories (e.g., PRESCRIPTION → Gold if it relates to system boundaries), or
2. Use non-color differentiation for publication types (shape, icon, label) to avoid conflicting with the ESS color semantics.

---

## Summary

| Severity | Count | Key Theme |
|----------|-------|-----------|
| S1 | 4 | Terms before grounding; no canonical source; vocabulary drift |
| S2 | 7 | Missing dual-layer; missing diagrams; no hover system; no observable anchors |
| S3 | 3 | Sentence length; meta-commentary; color semantics |
| **Total** | **14** | |

## Recommended Priority Order

1. **CR-002** + **CR-008** (Terms before grounding — S1, affects first impression)
2. **CR-001** (Canonical source — S1, prevents further drift)
3. **CR-004** (Add diagrams — S2, highest-impact visual gap)
4. **CR-003** + **CR-007** (Dual-layer — S2, enables comprehension)
5. **CR-009** (Safety & governance vocabulary — S1, major disconnect)
6. **CR-010** + **CR-011** (Remove meta-commentary — S3, quick wins)
7. **CR-005** (Observable anchors — S2)
8. **CR-006** (Sentence length — S3)
9. **CR-012** (Verifiable core — S2)
10. **CR-013** (Hover system — S2, implementation task)
11. **CR-014** (DX.006 diagram — S2)
12. **CR-015** (Color semantics — S3)
