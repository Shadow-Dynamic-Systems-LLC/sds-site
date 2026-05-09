# SDS.DX.001: Heuristic Governance Substitution

**Type**: DIAGNOSIS
**Identifier**: SDS.DX.001
**Title**: Heuristic Governance Substitution
**Date**: 2026-03-02
**Author**: Jason Crittenden
**Derived From**: "Guardrails Are Not Safety. Structure Is Safety." (2025-12-10)

## Summary

Systems that replace mechanistic enforcement with probabilistic filtering and treat the result as a governance control exhibit Heuristic Governance Substitution. The pattern produces the appearance of governance without the structural properties governance requires.

## Type Definition

A Diagnosis identifies and classifies a recurring architectural pattern or anti-pattern within AI systems. It abstracts beyond any single implementation and evaluates structural consequences under adversarial modeling. A Diagnosis names the pattern, defines its layer, specifies its capability, and articulates the resulting pathology.

## Disclaimer

A Diagnosis does not assert misuse, inevitability, or intent. It evaluates structural properties of mechanisms and assurance posture under stated assumptions. It does not constitute incident attribution, legal analysis, or empirical claim about deployment behavior.

## Analysis

Heuristic Governance Substitution occurs when a system replaces mechanistic, deterministic governance controls with probabilistic or heuristic alternatives while presenting the result as governance.

The pattern typically manifests as:
- Probabilistic content filters applied post-inference
- Confidence-score-based gating without deterministic boundaries
- Semantic analysis treated as authorization logic
- Post-detection mechanisms presented as prevention controls

### Structural Properties

**Authorization**: Decisions are nondeterministic across identical inputs. Given the same system state and inputs, different model states or sampling parameters can produce different authorization outcomes.

**Evidence Persistence**: No persistent evidence trail for decision reproducibility. Authorization decisions cannot be replayed without reproducing the exact model state at the time of decision.

**Boundary Stability**: Governance boundary shifts with model changes. When the underlying model is updated, replaced, or configured differently, authorization behavior changes implicitly.

**Control Timing**: Post-detection treated as prevention. Monitoring, logging, and response mechanisms are presented as governance when they function only as observation and correction.

### Consequence

This pattern produces the appearance of governance without the structural properties governed execution requires:
- Auditable authorization
- Reproducible decisions
- Enforceable boundaries
- Evidence-coupled execution

The structural gap between mechanism and presentation creates unbounded risk. Systems appear governed to casual inspection but lack the invariants required for insurability or liability attribution in high-consequence domains.

## References

- ZTG-0b (Observability)
- ZTG-1 (Replayable Authorization)
- ZTG-2 (Deterministic Policy Evaluation)
- ZTG-4 (Mechanistic Boundary)
- SDS.SYS.FAIL-003

## Related Patterns

- SDS.DX.002 (Prompt-Mediated Governance): Similar outcome via different mechanism
- SDS.FN.003 (Observation Is Not Governance): Clarifies the monitoring vs. governance distinction