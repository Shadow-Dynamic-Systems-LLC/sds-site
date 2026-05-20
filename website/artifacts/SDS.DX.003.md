# SDS.DX.003: Inference-Delegated Authorization

**Type**: DIAGNOSIS
**Identifier**: SDS.DX.003
**Title**: Inference-Delegated Authorization
**Date**: 2026-03-02
**Author**: Jason Crittenden
**Derived From**: "Beyond the Wrapper" (2025-06-25)

## Summary

Systems that delegate authorization decisions to the inference layer — where the model's output determines what actions are permitted — exhibit Inference-Delegated Authorization. Changing the model changes the governance boundary.

## Type Definition

A Diagnosis identifies and classifies a recurring architectural pattern or anti-pattern within AI systems. It abstracts beyond any single implementation and evaluates structural consequences under adversarial modeling. A Diagnosis names the pattern, defines its layer, specifies its capability, and articulates the resulting pathology.

## Disclaimer

A Diagnosis does not assert misuse, inevitability, or intent. It evaluates structural properties of mechanisms and assurance posture under stated assumptions. It does not constitute incident attribution, legal analysis, or empirical claim about deployment behavior.

## Analysis

Inference-Delegated Authorization occurs when the model's output is used to determine whether an action is permitted, rather than separating the inference layer from the authorization layer.

The pattern typically manifests as:
- Model-based classifiers gating execution permissions
- Confidence thresholds determining action authorization
- Model-provided "safe/unsafe" ratings as authorization signals
- Tool-calling logic dependent on model intent classification

### Structural Properties

**Boundary Definition**: Authorization boundary is a function of model behavior. The set of permissible actions is not defined independently of the model producing the classification.

**Model Coupling**: Changing the model changes the governance boundary explicitly. Model updates, fine-tuning, or configuration changes implicitly modify what actions are permitted.

**Invariant Definition**: No invariant definition of permitted actions independent of inference. The governance boundary cannot be stated as a set of rules separable from the model.

**Audit Capability**: No mechanism to audit authorization decisions without reproducing model state. Evidence of authorization is incomplete without the exact model weights and inference parameters.

### Consequence

This creates a governance boundary that shifts with every model update, making it impossible to establish stable, auditable authorization rules required by high-consequence domains.

The structural problem is that authorization and inference are coupled. A properly governed system separates these concerns: the inference layer produces candidate actions, the authorization layer determines whether execution is permitted. When both occur in the same layer, there is no independent check on the inference output.

This coupling violates the principle that governance should be verifiable and reproducible independent of model composition or inference provider. The authorization decision should be deterministic and reproducible given the same inputs and state—regardless of which model provides inference.

## References

- ZTG-0b (Observability)
- ZTG-1 (Replayable Authorization)
- ZTG-2 (Deterministic Policy Evaluation)
- SDS.SYS.FAIL-003
- SDS.SYS.FAIL-004

## Related Patterns

- SDS.DX.002 (Prompt-Mediated Governance): Related mechanism with similar consequences
- SDS.FN.005 (Governance Independence from Inference Provider): Further elaboration of this issue