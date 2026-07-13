/**
 * Naturalist glyph hand — hand-crafted icon-scale SVGs for CORE_GOVERNANCE
 * concepts, following the SDS Forge Glyph Specimens doctrine: graphite
 * (#423f39) stroke, round linecap/linejoin (the "drawn by hand" touch —
 * precise geometry, not jitter), no leader-lines or Latin binomials at
 * this small inline-UI scale (those are reserved for documentation
 * specimen plates). viewBox follows the spec's Utility Set convention
 * (24x24, stroke-width ~2).
 *
 * This is a first pass covering five of the six CORE_GOVERNANCE glyphs
 * (Boundary, Policy, Authority, Evidence, Surface). Containment is left
 * as its plain Unicode notation glyph pending a decision on bringing in
 * a specialist illustrator for the rest of the category.
 *
 * The formal Unicode notation in data/glyphs.ts is unchanged and still
 * canonical wherever glyphs appear as dense inline notation (doctrine
 * text, nav, artifact-type tags) — these icons are for the few places a
 * glyph is used illustratively rather than as notation (currently: the
 * Services section cards).
 */

interface GlyphIconProps {
  size?: number;
  className?: string;
}

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'var(--graphite)',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Boundary — the gate: a threshold barrier prior to execution. */
export function BoundaryGlyph({ size = 28, className }: GlyphIconProps) {
  return (
    <svg width={size} height={size} className={className} {...ICON_PROPS}>
      <line x1="6" y1="4" x2="6" y2="20" />
      <line x1="18" y1="4" x2="18" y2="20" />
      <line x1="6" y1="12" x2="18" y2="12" />
    </svg>
  );
}

/** Policy — the fork: one deterministic path taken, given identical input. */
export function PolicyGlyph({ size = 28, className }: GlyphIconProps) {
  return (
    <svg width={size} height={size} className={className} {...ICON_PROPS}>
      <path d="M12,3 L12,10" />
      <path d="M12,10 L6,20" />
      <path d="M12,10 L18,20" />
    </svg>
  );
}

/** Authority — the seal: execution rights resolved to an identifiable actor. */
export function AuthorityGlyph({ size = 28, className }: GlyphIconProps) {
  return (
    <svg width={size} height={size} className={className} {...ICON_PROPS}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="1.8" fill="var(--graphite)" stroke="none" />
    </svg>
  );
}

/** Evidence — the coupled record: effect and evidence, two pages bound together. */
export function EvidenceGlyph({ size = 28, className }: GlyphIconProps) {
  return (
    <svg width={size} height={size} className={className} {...ICON_PROPS}>
      <rect x="5" y="7" width="12" height="14" rx="1" />
      <rect x="9" y="3" width="12" height="14" rx="1" />
    </svg>
  );
}

/** Surface — the addressable plate: a registered, governance-visible interface. */
export function SurfaceGlyph({ size = 28, className }: GlyphIconProps) {
  return (
    <svg width={size} height={size} className={className} {...ICON_PROPS}>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <circle cx="20" cy="12" r="1.6" fill="var(--graphite)" stroke="none" />
    </svg>
  );
}
