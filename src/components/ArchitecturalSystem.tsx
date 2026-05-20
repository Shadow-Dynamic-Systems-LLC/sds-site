/**
 * Architectural Designation System
 *
 * Universal visual language for representing structural depth,
 * layer position, and interconnected governance concepts.
 */

import { useState, useRef, type ReactNode } from 'react';
import './ArchitecturalSystem.css';

// ============================================================================
// TYPES & DATA
// ============================================================================

export type ArchitecturalLayer = 'ENVELOPE' | 'INVARIANT' | 'SURFACE';

export type ArtifactTypeCode = 'DX' | 'CS' | 'FN' | 'RX' | 'RP';

export interface LayerConfig {
  name: string;
  color: string;
  depth: number; // 0 = deepest, higher = closer to surface
  description: string;
}

export const LAYER_CONFIG: Record<ArchitecturalLayer, LayerConfig> = {
  INVARIANT: {
    name: 'System Invariant',
    color: '#ff6b35',
    depth: 0,
    description: 'Foundational mechanical constraints. Non-negotiable. Enforced deterministically, not discretionarily — no component may bypass, reinterpret, or negotiate a boundary at runtime.'
  },
  SURFACE: {
    name: 'Effect Surface',
    color: '#7dd3fc',
    depth: 1,
    description: 'Governed effect surface. All agent-generated effects occur through registered, authorization-addressable interfaces. Because effects are bounded and auditable, insurability begins here.'
  },
  ENVELOPE: {
    name: 'Envelope',
    color: '#ffd700',
    depth: 2,
    description: 'Probabilistic containment that becomes possible once you have a governed surface. Statistical operating bounds — holds under additive conditions. Insufficient alone against non-additive or emergent decisions; the invariant layer exists because the envelope cannot guarantee against catastrophic boundary violations.'
  },
};

export const ARTIFACT_DEPTH: Record<ArtifactTypeCode, { layer: ArchitecturalLayer; shadowIntensity: number }> = {
  DX: { layer: 'INVARIANT', shadowIntensity: 1.0 },    // Diagnoses are foundational
  RX: { layer: 'INVARIANT', shadowIntensity: 0.9 },    // Prescriptions address invariants
  CS: { layer: 'ENVELOPE', shadowIntensity: 0.5 },     // Case studies examine envelopes
  RP: { layer: 'ENVELOPE', shadowIntensity: 0.6 },     // Research papers
  FN: { layer: 'SURFACE', shadowIntensity: 0.2 }       // Field notes are surface observations
};

// ZTG Invariants for reference chips
// Updated structure: ZTG-5 eliminated, graduated containment folded into ZTG-2 (Stasis)
export const ZTG_INVARIANTS: Record<string, { label: string; definition: string; layer: ArchitecturalLayer }> = {
  // Structural Prerequisites (ZTG-0x)
  'ZTG-0a': {
    label: 'Observability',
    definition: 'All governance-relevant state transitions, decision points, and boundary checks must be recorded with sufficient fidelity to support deterministic post-hoc audit.',
    layer: 'INVARIANT'
  },
  'ZTG-0b': {
    label: 'Replayability',
    definition: 'Given identical initial state and identical inputs, the governance system must produce identical governance decisions. Execution nondeterminism is permitted; governance nondeterminism is not.',
    layer: 'INVARIANT'
  },
  'ZTG-0c': {
    label: 'Temporal Integrity',
    definition: 'All components participating in governance evaluation must operate against a synchronized time source with bounded skew. Clock skew exceeding declared tolerance triggers system halt.',
    layer: 'INVARIANT'
  },
  'ZTG-0d': {
    label: 'Identity Integrity',
    definition: 'All cryptographic material used for authorization signing, evidence sealing, and identity binding must be traceable to an explicitly declared trust root. Identity must be unforgeable and non-delegatable.',
    layer: 'INVARIANT'
  },
  'ZTG-0e': {
    label: 'Governance Consistency',
    definition: 'All components participating in governance evaluation must operate against a consistent view of governance state. During inconsistency, the system must deny authorization.',
    layer: 'INVARIANT'
  },
  // System Invariants (ZTG-1 through ZTG-4)
  'ZTG-1': {
    label: 'Mechanistic Boundary',
    definition: 'Governance boundaries are enforced mechanically, not discretionarily. No component may bypass, reinterpret, defer, or negotiate a boundary at runtime. Authorization must occur before irreversible action.',
    layer: 'INVARIANT'
  },
  'ZTG-2': {
    label: 'Stasis',
    definition: 'When the system cannot guarantee its governance invariants hold, it must halt. Stasis operates at graduated scope: surface freeze → subsystem freeze → system-wide stasis. Containment is proportional to failure.',
    layer: 'INVARIANT'
  },
  'ZTG-3': {
    label: 'Governed Effect Surface',
    definition: 'All agent-generated external effects must occur exclusively through registered and governance-addressable surfaces. Each surface formally declares effect type, reversal strategy, and authorization policy.',
    layer: 'SURFACE'
  },
  'ZTG-4': {
    label: 'Evidence-Coupled Execution',
    definition: 'No externally observable effect may exist without simultaneous durable evidence of authorization and execution. The evidence record is constitutive, not documentary.',
    layer: 'INVARIANT'
  },
  'ZTG-5': {
    label: 'Irreversibility of Harm',
    definition: 'Every action a governed system may take must be classified at decision time by the restorability of its harm — Restorable, Mitigable, or Irreversible. Classification is over the harm the action causes, not the action itself. Actions in the Irreversible class must be subject to stricter controls; Mitigable-class actions must record residual harm in decision provenance. Orthogonal to ZTG-3 system-side reversal strategy.',
    layer: 'INVARIANT'
  }
};

// ============================================================================
// LAYER INDICATOR
// ============================================================================

interface LayerIndicatorProps {
  layer: ArchitecturalLayer;
  compact?: boolean;
  showLabel?: boolean;
}

export function LayerIndicator({ layer, compact = false, showLabel = true }: LayerIndicatorProps) {
  const config = LAYER_CONFIG[layer];

  return (
    <div
      className={`layer-indicator ${compact ? 'layer-indicator--compact' : ''}`}
      data-layer={layer}
    >
      <div
        className="layer-indicator__bar"
        style={{ backgroundColor: config.color }}
      />
      {showLabel && (
        <span className="layer-indicator__label" style={{ color: config.color }}>
          {config.name}
        </span>
      )}
      <div className="layer-indicator__depth-marks">
        {[...Array(3 - config.depth)].map((_, i) => (
          <div
            key={i}
            className="layer-indicator__depth-mark"
            style={{ backgroundColor: config.color, opacity: 0.4 + (i * 0.2) }}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// DEPTH CARD WRAPPER
// ============================================================================

interface DepthCardProps {
  typeCode: ArtifactTypeCode;
  children: ReactNode;
  frozen?: boolean;
  className?: string;
  onClick?: () => void;
}

export function DepthCard({ typeCode, children, frozen = false, className = '', onClick }: DepthCardProps) {
  const config = ARTIFACT_DEPTH[typeCode];
  const layerConfig = LAYER_CONFIG[config.layer];
  const isFrozen = frozen && (typeCode === 'DX' || typeCode === 'RX');

  return (
    <article
      className={`
        depth-card
        depth-card--${config.layer.toLowerCase()}
        ${isFrozen ? 'depth-card--frozen' : ''}
        ${className}
      `}
      style={{
        '--layer-color': layerConfig.color,
        '--shadow-intensity': config.shadowIntensity,
        '--depth-level': config.layer === 'INVARIANT' ? 3 : config.layer === 'ENVELOPE' ? 2 : 1
      } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="depth-card__layer-edge" />
      <div className="depth-card__content">
        {children}
      </div>
      {isFrozen && (
        <div className="depth-card__frost-overlay">
          <div className="frost-scanline" />
        </div>
      )}
    </article>
  );
}

// ============================================================================
// REFERENCE CHIP
// ============================================================================

interface ReferenceChipProps {
  reference: string;
  onHover?: (ref: string | null) => void;
}

export function ReferenceChip({ reference, onHover }: ReferenceChipProps) {
  const [expanded, setExpanded] = useState(false);
  const chipRef = useRef<HTMLButtonElement>(null);

  const invariant = ZTG_INVARIANTS[reference];
  const isSDS = reference.startsWith('SDS.');

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const layerColor = invariant ? LAYER_CONFIG[invariant.layer].color :
                     isSDS ? '#ffd700' : '#888';

  return (
    <span className="reference-chip-wrapper">
      <button
        ref={chipRef}
        className={`reference-chip ${expanded ? 'reference-chip--expanded' : ''}`}
        style={{ '--chip-color': layerColor } as React.CSSProperties}
        onClick={handleClick}
        onMouseEnter={() => onHover?.(reference)}
        onMouseLeave={() => onHover?.(null)}
      >
        <span className="reference-chip__code">{reference}</span>
        {invariant && (
          <span className="reference-chip__label">{invariant.label}</span>
        )}
      </button>

      {expanded && invariant && (
        <div className="reference-chip__tooltip">
          <div className="reference-chip__tooltip-header">
            <LayerIndicator layer={invariant.layer} compact />
            <span>{reference}</span>
          </div>
          <p className="reference-chip__tooltip-definition">
            {invariant.definition}
          </p>
        </div>
      )}
    </span>
  );
}

// ============================================================================
// REFERENCE STRING PARSER
// ============================================================================

interface ParsedReferencesProps {
  references: string[];
}

export function ParsedReferences({ references }: ParsedReferencesProps) {
  return (
    <div className="parsed-references">
      {references.map((ref, i) => (
        <ReferenceChip
          key={i}
          reference={ref}
        />
      ))}
    </div>
  );
}

// ============================================================================
// CROSS-SECTION SCHEMATIC
// ============================================================================

interface CrossSectionProps {
  highlightLayer?: ArchitecturalLayer;
  showLabels?: boolean;
  interactive?: boolean;
}

// Stock-chart-like jagged points for the envelope's probabilistic ceiling
// x spans 90–380 across a 400-wide viewBox; y varies between ~12 and ~42
const ENVELOPE_TOP: [number, number][] = [
  [90, 36], [108, 20], [124, 31], [140, 13], [158, 27],
  [174, 19], [192, 34], [208, 15], [226, 29], [244, 21],
  [260, 37], [276, 17], [294, 27], [312, 11], [330, 23],
  [348, 33], [364, 18], [380, 28],
];

const envelopeTopString = ENVELOPE_TOP.map(([x, y]) => `${x},${y}`).join(' ');

const envelopePath = [
  `M ${ENVELOPE_TOP[0][0]},${ENVELOPE_TOP[0][1]}`,
  ...ENVELOPE_TOP.slice(1).map(([x, y]) => `L ${x},${y}`),
  'L 380,105 L 90,105 Z',
].join(' ');

const surfacePath  = 'M 90,105 L 380,105 L 380,175 L 90,175 Z';
const invariantPath = 'M 90,175 L 380,175 L 380,230 L 90,230 Z';

const LAYER_PATHS: Record<ArchitecturalLayer, string> = {
  ENVELOPE: envelopePath,
  SURFACE:  surfacePath,
  INVARIANT: invariantPath,
};

// Vertical midpoint for labels within each layer band
const LABEL_Y: Record<ArchitecturalLayer, number> = {
  ENVELOPE: 68,
  SURFACE:  140,
  INVARIANT: 202,
};

export function CrossSection({ highlightLayer, showLabels = true, interactive = true }: CrossSectionProps) {
  const [activeLayer, setActiveLayer] = useState<ArchitecturalLayer | null>(highlightLayer || null);

  const handleEnter = (layer: ArchitecturalLayer) => {
    if (interactive) setActiveLayer(layer);
  };
  const handleLeave = () => {
    if (interactive && !highlightLayer) setActiveLayer(null);
  };
  const handleClick = (layer: ArchitecturalLayer) => {
    if (interactive) setActiveLayer(layer === activeLayer ? null : layer);
  };

  return (
    <div className="cross-section">
      <div className="cross-section__diagram">
        {/* A-A' cut line overlay */}
        <div className="cross-section__cut-line">
          <span className="cross-section__cut-label">A</span>
          <div className="cross-section__cut-dash" />
          <span className="cross-section__cut-label">A'</span>
        </div>

        <svg
          className="cross-section__svg"
          viewBox="0 0 400 240"
          xmlns="http://www.w3.org/2000/svg"
        >
          {(['INVARIANT', 'SURFACE', 'ENVELOPE'] as ArchitecturalLayer[]).map(layer => {
            const cfg = LAYER_CONFIG[layer];
            const isActive = activeLayer === layer;
            const labelY = LABEL_Y[layer];

            return (
              <g
                key={layer}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                onMouseEnter={() => handleEnter(layer)}
                onMouseLeave={handleLeave}
                onClick={() => handleClick(layer)}
              >
                <path
                  d={LAYER_PATHS[layer]}
                  fill={cfg.color}
                  fillOpacity={isActive ? 0.22 : 0.07}
                  stroke={cfg.color}
                  strokeOpacity={isActive ? 0.6 : 0.25}
                  strokeWidth="1"
                />
                {showLabels && (
                  <>
                    <text x="10" y={labelY - 6} fill={cfg.color} fontSize="6.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5" opacity={isActive ? 1 : 0.5}>{layer}</text>
                    <text x="10" y={labelY + 6} fill="rgba(255,255,255,0.35)" fontSize="5.5" fontFamily="monospace" opacity={isActive ? 0.9 : 0.4}>{cfg.name}</text>
                  </>
                )}
              </g>
            );
          })}

          {/* Envelope jagged ceiling — drawn on top as its own stroke */}
          <polyline
            points={envelopeTopString}
            fill="none"
            stroke={LAYER_CONFIG.ENVELOPE.color}
            strokeWidth={activeLayer === 'ENVELOPE' ? 2 : 1.5}
            strokeOpacity={activeLayer === 'ENVELOPE' ? 0.9 : 0.55}
            strokeLinejoin="round"
          />

          {/* Flat boundary lines */}
          <line x1="90" y1="105" x2="380" y2="105" stroke={LAYER_CONFIG.SURFACE.color} strokeWidth="1" strokeOpacity="0.35" />
          <line x1="90" y1="175" x2="380" y2="175" stroke={LAYER_CONFIG.INVARIANT.color} strokeWidth="1" strokeOpacity="0.35" />
        </svg>
      </div>

      {activeLayer && (
        <div className="cross-section__detail">
          <LayerIndicator layer={activeLayer} />
          <p>{LAYER_CONFIG[activeLayer].description}</p>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// DEPENDENCY GRAPH (MINI)
// ============================================================================

interface DependencyNode {
  id: string;
  type: 'invariant' | 'artifact' | 'failure';
  label: string;
}

interface DependencyEdge {
  from: string;
  to: string;
  type: 'references' | 'derived' | 'addresses';
}

interface DependencyGraphProps {
  nodes: DependencyNode[];
  edges: DependencyEdge[];
  centerNode?: string;
}

export function DependencyGraph({ nodes, edges, centerNode }: DependencyGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Simple circular layout
  const centerX = 150;
  const centerY = 100;
  const radius = 70;

  const nodePositions = nodes.reduce((acc, node, index) => {
    if (node.id === centerNode) {
      acc[node.id] = { x: centerX, y: centerY };
    } else {
      const angle = (index / (nodes.length - (centerNode ? 1 : 0))) * 2 * Math.PI - Math.PI / 2;
      acc[node.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    }
    return acc;
  }, {} as Record<string, { x: number; y: number }>);

  return (
    <div className="dependency-graph">
      <svg ref={svgRef} viewBox="0 0 300 200" className="dependency-graph__svg">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodePositions[edge.from];
          const to = nodePositions[edge.to];
          if (!from || !to) return null;

          const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;

          return (
            <g key={i} className={`dependency-graph__edge dependency-graph__edge--${edge.type}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={isHighlighted ? 'highlighted' : ''}
                markerEnd="url(#arrowhead)"
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = nodePositions[node.id];
          if (!pos) return null;

          const isCenter = node.id === centerNode;
          const isHovered = hoveredNode === node.id;

          return (
            <g
              key={node.id}
              className={`dependency-graph__node dependency-graph__node--${node.type} ${isCenter ? 'center' : ''} ${isHovered ? 'hovered' : ''}`}
              transform={`translate(${pos.x}, ${pos.y})`}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <circle r={isCenter ? 12 : 8} className="dependency-graph__node-circle" />
              <text
                y={isCenter ? 24 : 20}
                textAnchor="middle"
                className="dependency-graph__node-label"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ============================================================================
// DERIVATION CHAIN
// ============================================================================

interface DerivationStep {
  identifier: string;
  title: string;
  date: string;
  type: 'observation' | 'artifact' | 'invariant';
}

interface DerivationChainProps {
  steps: DerivationStep[];
  currentIdentifier?: string;
}

export function DerivationChain({ steps, currentIdentifier }: DerivationChainProps) {
  return (
    <div className="derivation-chain">
      <div className="derivation-chain__label">PROVENANCE</div>
      <div className="derivation-chain__timeline">
        {steps.map((step, index) => {
          const isCurrent = step.identifier === currentIdentifier;

          return (
            <div
              key={step.identifier}
              className={`derivation-chain__step derivation-chain__step--${step.type} ${isCurrent ? 'derivation-chain__step--current' : ''}`}
            >
              <div className="derivation-chain__connector">
                {index > 0 && <div className="derivation-chain__line" />}
                <div className="derivation-chain__node" />
                {index < steps.length - 1 && <div className="derivation-chain__line" />}
              </div>
              <div className="derivation-chain__content">
                <span className="derivation-chain__id">{step.identifier}</span>
                <span className="derivation-chain__title">{step.title}</span>
                <span className="derivation-chain__date">{step.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// VERSION HISTORY
// ============================================================================

interface VersionEntry {
  version: string;
  date: string; // ISO 8601
  changes: string[];
}

interface VersionHistoryProps {
  versions: VersionEntry[];
  currentVersion: string;
  collapsed?: boolean;
}

export function VersionHistory({ versions, currentVersion, collapsed = true }: VersionHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(!collapsed);

  return (
    <div className={`version-history ${isExpanded ? 'version-history--expanded' : ''}`}>
      <button
        className="version-history__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="version-history__current">
          <span className="version-history__label">VERSION</span>
          <span className="version-history__code">{currentVersion}</span>
        </span>
        <span className="version-history__toggle">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {isExpanded && (
        <div className="version-history__changelog">
          {versions.map((v) => (
            <div
              key={v.version}
              className={`version-history__entry ${v.version === currentVersion ? 'version-history__entry--current' : ''}`}
            >
              <div className="version-history__entry-header">
                <span className="version-history__entry-version">{v.version}</span>
                <time className="version-history__entry-date" dateTime={v.date}>
                  {v.date}
                </time>
              </div>
              <ul className="version-history__entry-changes">
                {v.changes.map((change, j) => (
                  <li key={j}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// TIMESTAMP (ISO 8601)
// ============================================================================

interface TimestampProps {
  date: string;
  precision?: 'date' | 'datetime' | 'full';
}

export function Timestamp({ date, precision = 'datetime' }: TimestampProps) {
  const d = new Date(date);

  let formatted: string;
  switch (precision) {
    case 'date':
      formatted = d.toISOString().split('T')[0];
      break;
    case 'datetime':
      formatted = d.toISOString().replace('T', ' ').slice(0, 19) + 'Z';
      break;
    case 'full':
    default:
      formatted = d.toISOString();
  }

  return (
    <time className="timestamp" dateTime={d.toISOString()}>
      {formatted}
    </time>
  );
}

// ============================================================================
// CALLOUT ANNOTATION
// ============================================================================

interface CalloutProps {
  children: ReactNode;
  position?: 'left' | 'right';
  marker?: string;
}

export function Callout({ children, position = 'right', marker }: CalloutProps) {
  return (
    <aside className={`callout callout--${position}`}>
      <div className="callout__line" />
      {marker && <span className="callout__marker">{marker}</span>}
      <div className="callout__content">
        {children}
      </div>
    </aside>
  );
}

// ============================================================================
// SECTION CUT LINE
// ============================================================================

interface SectionCutProps {
  label?: string;
}

export function SectionCut({ label = 'SECTION' }: SectionCutProps) {
  return (
    <div className="section-cut">
      <span className="section-cut__label">{label}</span>
      <div className="section-cut__line" />
    </div>
  );
}
