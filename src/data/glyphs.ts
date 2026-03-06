/**
 * SDS Glyph Registry
 *
 * Formal visual language for governance primitives.
 * These symbols describe the mechanics of safe execution.
 */

// ============================================================================
// CORE GOVERNANCE
// ============================================================================

export const CORE_GOVERNANCE = {
  BOUNDARY: { glyph: '∂', label: 'Execution Boundary', description: 'Mechanistic gate prior to execution' },
  POLICY: { glyph: 'λ', label: 'Deterministic Policy', description: 'Rule-bound, reproducible authorization' },
  AUTHORITY: { glyph: '§', label: 'Authority Attribution', description: 'Execution rights resolve to identifiable actors' },
  EVIDENCE: { glyph: '⧉', label: 'Evidence-Coupled', description: 'No effect without simultaneous durable evidence' },
  SURFACE: { glyph: '⊡', label: 'Effect Surface', description: 'Registered, governance-addressable interface' },
  CONTAINMENT: { glyph: '⛶', label: 'Graduated Containment', description: 'Proportional freeze mechanisms' }
} as const;

// ============================================================================
// AUTHORITY & IDENTITY
// ============================================================================

export const AUTHORITY_IDENTITY = {
  VALIDATION: { glyph: '⊨', label: 'Authority Validation', description: 'Cryptographically or procedurally verified claim' },
  BINDING: { glyph: '⌁', label: 'Identity Binding', description: 'Execution linked to specific actor' },
  JURISDICTION: { glyph: '⚖', label: 'Jurisdiction Scope', description: 'Decision falls under specific governance domain' }
} as const;

// ============================================================================
// EVIDENCE & LOGGING
// ============================================================================

export const EVIDENCE_LOGGING = {
  ARTIFACT: { glyph: '⧈', label: 'Evidence Artifact', description: 'Immutable record generated' },
  REPLAY: { glyph: '⟲', label: 'Deterministic Replay', description: 'Action can be reconstructed exactly' },
  TEMPORAL: { glyph: '⧗', label: 'Temporal Ordering', description: 'Event anchored in monotonic timeline' }
} as const;

// ============================================================================
// GOVERNANCE STATE
// ============================================================================

export const GOVERNANCE_STATE = {
  PROPOSED: { glyph: '◇', label: 'Proposed Rule', description: 'Not yet enforced' },
  FROZEN: { glyph: '◆', label: 'Frozen Invariant', description: 'Immutable rule' },
  VIOLATION: { glyph: '‼', label: 'Invariant Violation', description: 'Critical governance breach' },
  DEGRADED: { glyph: '⚠', label: 'Governance Degradation', description: 'Fallback mode active' }
} as const;

// ============================================================================
// EXECUTION STATE
// ============================================================================

export const EXECUTION_STATE = {
  INITIATED: { glyph: '▶', label: 'Execution Initiated', description: 'Runtime started' },
  SUSPENDED: { glyph: '⏸', label: 'Execution Suspended', description: 'Temporarily paused' },
  HALTED: { glyph: '■', label: 'Execution Halted', description: 'Stopped' },
  VERIFIED: { glyph: '✔', label: 'Execution Verified', description: 'Completed with verification' }
} as const;

// ============================================================================
// CONTAINMENT ESCALATION
// ============================================================================

export const CONTAINMENT_ESCALATION = {
  SURFACE_FREEZE: { glyph: '⊠', label: 'Surface Freeze', description: 'Stop one interface' },
  SUBSYSTEM_FREEZE: { glyph: '⧄', label: 'Subsystem Freeze', description: 'Freeze subsystem' },
  SYSTEM_CONTAINMENT: { glyph: '⛶', label: 'System Containment', description: 'System-level containment' },
  FULL_STASIS: { glyph: '⬛', label: 'Full System Stasis', description: 'Complete halt' }
} as const;

// ============================================================================
// ZTG SERVICE GLYPHS (for Services section)
// ============================================================================

export const ZTG_SERVICE_GLYPHS = [
  { ...CORE_GOVERNANCE.BOUNDARY, title: 'Execution Boundary Enforcement' },
  { ...CORE_GOVERNANCE.POLICY, title: 'Deterministic Policy Evaluation' },
  { ...CORE_GOVERNANCE.AUTHORITY, title: 'Authority Attribution' },
  { ...CORE_GOVERNANCE.EVIDENCE, title: 'Evidence-Coupled Execution' },
  { ...CORE_GOVERNANCE.SURFACE, title: 'Governed Effect Surfaces' },
  { ...CORE_GOVERNANCE.CONTAINMENT, title: 'Graduated Containment' }
] as const;

// ============================================================================
// ARTIFACT TYPE GLYPHS
// ============================================================================

export const ARTIFACT_TYPE_GLYPHS = {
  DIAGNOSIS: { glyph: '⊗', label: 'DX', description: 'Structural anti-pattern identified' },
  PRESCRIPTION: { glyph: '⊕', label: 'RX', description: 'Counter-pattern proposed' },
  CASE_STUDY: { glyph: '⊙', label: 'CS', description: 'Instance examined' },
  FIELD_NOTE: { glyph: '⊘', label: 'FN', description: 'Observation recorded' },
  RESEARCH_PAPER: { glyph: '⊜', label: 'RP', description: 'Empirical analysis' }
} as const;

// ============================================================================
// LAYER GLYPHS
// ============================================================================

export const LAYER_GLYPHS = {
  INVARIANT: { glyph: '▼', label: 'System Invariant', description: 'Foundational governance constraints' },
  ENVELOPE: { glyph: '◈', label: 'Envelope', description: 'Model capabilities and training' },
  SURFACE: { glyph: '△', label: 'Effect Surface', description: 'External interfaces' }
} as const;

// ============================================================================
// FULL REGISTRY (for documentation/legend display)
// ============================================================================

export const GLYPH_REGISTRY = {
  'Core Governance': CORE_GOVERNANCE,
  'Authority & Identity': AUTHORITY_IDENTITY,
  'Evidence & Logging': EVIDENCE_LOGGING,
  'Governance State': GOVERNANCE_STATE,
  'Execution State': EXECUTION_STATE,
  'Containment Escalation': CONTAINMENT_ESCALATION,
  'Artifact Types': ARTIFACT_TYPE_GLYPHS,
  'Architectural Layers': LAYER_GLYPHS
} as const;
