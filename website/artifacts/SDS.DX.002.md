# SDS.DX.002: Prompt-Mediated Governance

**Type**: DIAGNOSIS
**Identifier**: SDS.DX.002
**Title**: Prompt-Mediated Governance
**Date**: 2026-03-02
**Author**: Jason Crittenden
**Derived From**: "The End of the Prompt Era" (2025-12-20)

## Summary

Systems that encode governance intent as natural language instructions to a stochastic model exhibit Prompt-Mediated Governance. The resulting authorization decisions are non-deterministic, non-replayable, and non-enforceable.

## Type Definition

A Diagnosis identifies and classifies a recurring architectural pattern or anti-pattern within AI systems. It abstracts beyond any single implementation and evaluates structural consequences under adversarial modeling. A Diagnosis names the pattern, defines its layer, specifies its capability, and articulates the resulting pathology.

## Disclaimer

A Diagnosis does not assert misuse, inevitability, or intent. It evaluates structural properties of mechanisms and assurance posture under stated assumptions. It does not constitute incident attribution, legal analysis, or empirical claim about deployment behavior.

## Analysis

Prompt-Mediated Governance occurs when governance constraints are encoded as natural language instructions to a stochastic model rather than as mechanistic rules enforced at execution boundaries.

The pattern typically manifests as:
- System prompts encoding "do not" or "should not" constraints
- Instruction embeddings or "constitutional AI" formulations
- Governance intent communicated through language patterns
- Alignment attempts via prompt engineering rather than architecture

### Structural Properties

**Intent Interpretation**: Authorization decisions rely on model interpretation of intent. The model must infer what governance means from natural language, introducing comprehension uncertainty.

**Decision Consistency**: No guarantee of consistent decisions across identical inputs. Model nondeterminism produces different governance outcomes for the same state and inputs.

**Proof of Boundaries**: No capability to prove governance bound holds for all possible inputs. Prompt-based constraints cannot be formally verified.

**Boundary Determinism**: Boundary effectiveness depends on model behavior, not system architecture. Governance is a function of model capability, not a structural invariant.

### Consequence

This produces authorization decisions that are non-deterministic, non-replayable, and non-enforceable in the sense required by high-consequence domains.

The fundamental issue is the layer at which governance operates. When governance intent is encoded as natural language, it becomes part of the inference problem rather than a structural constraint on execution. The model is asked to both reason and police its own reasoning simultaneously.

This creates a structural conflict: the inference mechanism cannot reliably enforce constraints on its own output when the enforcement mechanism flows through the same stochastic decision process as the constrained behavior.

## References

- ZTG-0b (Observability)
- ZTG-1 (Replayable Authorization)
- ZTG-2 (Deterministic Policy Evaluation)
- ZTG-4 (Mechanistic Boundary)
- SDS.SYS.FAIL-003

## Related Patterns

- SDS.DX.001 (Heuristic Governance Substitution): Similar outcome via different mechanism
- SDS.DX.003 (Inference-Delegated Authorization): Closely related—both involve inference in authorization