# SDS.DX.004: Authority Inheritance Across Temporal Scope

**Type**: DIAGNOSIS
**Identifier**: SDS.DX.004
**Title**: Authority Inheritance Across Temporal Scope
**Date**: 2026-03-02
**Author**: Jason Crittenden
**Derived From**: "The Coming Age of Goal-Driven Agents" (2025-12-15)

## Summary

Persistent agents operating over extended time horizons accumulate execution authority through implicit inheritance. An authorization granted at task initiation is carried forward across subsequent actions without re-evaluation at each irreversible execution boundary.

## Type Definition

A Diagnosis identifies and classifies a recurring architectural pattern or anti-pattern within AI systems. It abstracts beyond any single implementation and evaluates structural consequences under adversarial modeling. A Diagnosis names the pattern, defines its layer, specifies its capability, and articulates the resulting pathology.

## Disclaimer

A Diagnosis does not assert misuse, inevitability, or intent. They evaluate structural properties of mechanisms and assurance posture under stated assumptions. It does not constitute incident attribution, legal analysis, or empirical claim about deployment behavior.

## Analysis

Authority Inheritance Across Temporal Scope occurs when an initial authorization is used to justify subsequent actions without re-evaluation at each irreversible execution boundary.

The pattern typically manifests in:
- Persistent agents receiving one authorization up front then operating autonomously
- Task decomposition where parent authorization is assumed to extend to all sub-tasks
- Multi-step workflows skipping intermediate governance gates in favor of initial approval
- Long-running agents carrying initial intent across changing contexts

### Structural Properties

**Authorization Persistence**: Authorization granted once persists indefinitely unless explicitly revoked. Initial approval creates a persistent trust relationship across an unbounded time horizon.

**Boundary Skipping**: No boundary check at each irreversible action. The system does not re-evaluate authorization at execution boundaries as context evolves.

**Context Change**: No capability to halt execution when context changes mid-task. The agent cannot distinguish whether actions remain authorized as the situation evolves.

**Authority Accumulation**: Authority accumulates without proportional accountability. Multiple sequential actions multiply exposure without additional authorization checks.

### Consequence

This creates unbounded exposure from a bounded authorization decision. The system cannot prevent an agent from taking actions that would have been rejected if evaluated independently.

The structural issue is treating authorization as a one-time contract rather than an ongoing constraint. Agent systems operating over time encounter changing contexts, new information, and unanticipated situations—a bounded authorization decision cannot adequately constrain unbounded future behavior without re-evaluation.

The pattern violates the principle of temporal integrity in governance: authorization decisions must remain valid throughout execution and must be re-evaluated when irreversibility is encountered. Without boundary checks at each irreversible action, the system has no mechanism to prevent execution when authorization state has become uncertain or invalid.

## References

- ZTG-1 (Replayable Authorization)
- ZTG-3 (Temporal Integrity)
- ZTG-4 (Mechanistic Boundary)
- SDS.SYS.FAIL-001
- SDS.SYS.FAIL-004
- SDS.SYS.FAIL-005

## Related Patterns

- SDS.FN.001 (Authorization Precedes Commit): Clarifies the ordering constraint
- SDS.FN.003 (Observation Is Not Governance): Reinforces boundary enforcement vs. monitoring