# SDS.FN.006: Model Improvement Does Not Improve Governance

**Type**: FIELD NOTE
**Identifier**: SDS.FN.006
**Title**: Model Improvement Does Not Improve Governance
**Date**: 2026-03-02
**Author**: Jason Crittenden
**Derived From**: "The Next Frontier Isn't Better Text" (2025-12-27) + "Fine Tuning — Afterburners on a Paper Airplane" (2025-07-19)

## Summary

Training quality, dataset composition, and fine-tuning operate in the Envelope layer. Governance operates in the System Invariant layer. Improving one does not improve the other.

## Type Definition

A Field Note records emerging signals, early-stage mechanisms, or architectural trends that may warrant future classification. It is exploratory and provisional, intended to surface potential structural themes before formal abstraction.

## Disclaimer

A Field Note does not assert pattern generality or formal classification. Observations may evolve, be refined, or be withdrawn as additional evidence emerges. Field Notes are explicitly non-final.

## Content

Training quality, dataset composition, and fine-tuning operate in the Envelope layer. Governance operates in the System Invariant layer. Improving one does not improve the other.

This is a layered architecture observation, not a claim that model quality is unimportant.

The Envelope layer (model capabilities, training data, fine-tuning) determines what the system can reason about. The System Invariant layer (governance boundaries, authorization mechanisms, evidence trails) determines what the system is allowed to execute.

Improving model training does not create missing governance primitives. Better data does not enforce execution boundaries. More sophisticated reasoning does not create evidence-coupled execution.

These are orthogonal concerns.

A highly capable model without governance invariants is uninsurable. The system may reason brilliantly but cannot be trusted with irreversible execution because governance primitives are absent. Capability does not substitute for constrained authority.

A robust governance framework attached to an incapable model cannot compensate for the capability gap. The system may have perfect execution boundaries but cannot reason effectively about the tasks assigned to it. Governance does not substitute for reasoning capability.

Improving both is required. Neither is a substitute for the other.

The architectural implication is that resource allocation should not trade off between these layers. Investment in better training and datasets does not reduce the need to implement ZTG invariants. Investment in governance infrastructure does not reduce the need for capable models. They solve different problems.

The confusion arises when organizations treat "better model" as a complete solution to AI risk rather than one component of a layered system. Model quality addresses the reasoning envelope. Governance addresses the execution boundary. Both are required for high-consequence deployment.

## References

- ZTG-1 (Replayable Authorization)
- SDS.DX.001 (Heuristic Governance Substitution)