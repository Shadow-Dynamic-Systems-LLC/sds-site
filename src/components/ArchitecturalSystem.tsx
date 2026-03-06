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
    color: '#ff6b35', // Deep amber-orange
    depth: 0,
    description: 'Foundational governance constraints. Non-negotiable structural requirements.'
  },
  ENVELOPE: {
    name: 'Envelope',
    color: '#ffd700', // Gold
    depth: 1,
    description: 'Model capabilities, training, fine-tuning. Variable properties.'
  },
  SURFACE: {
    name: 'Effect Surface',
    color: '#7dd3fc', // Light blue
    depth: 2,
    description: 'External interfaces. Where execution meets the world.'
  }
};

export const ARTIFACT_DEPTH: Record<ArtifactTypeCode, { layer: ArchitecturalLayer; shadowIntensity: number }> = {
  DX: { layer: 'INVARIANT', shadowIntensity: 1.0 },    // Diagnoses are foundational
  RX: { layer: 'INVARIANT', shadowIntensity: 0.9 },    // Prescriptions address invariants
  CS: { layer: 'ENVELOPE', shadowIntensity: 0.5 },     // Case studies examine envelopes
  RP: { layer: 'ENVELOPE', shadowIntensity: 0.6 },     // Research papers
  FN: { layer: 'SURFACE', shadowIntensity: 0.2 }       // Field notes are surface observations
};

// ZTG Invariants for reference chips
export const ZTG_INVARIANTS: Record<string, { label: string; definition: string; layer: ArchitecturalLayer }> = {
  'ZTG-0a': {
    label: 'Full Observability',
    definition: 'All state transitions relevant to governance must be observable.',
    layer: 'INVARIANT'
  },
  'ZTG-0b': {
    label: 'Observable Boundaries',
    definition: 'System boundaries and external interfaces must be fully observable.',
    layer: 'INVARIANT'
  },
  'ZTG-1': {
    label: 'Replayable Authorization',
    definition: 'Authorization decisions must be deterministically reproducible from logged state.',
    layer: 'INVARIANT'
  },
  'ZTG-2': {
    label: 'Temporal Integrity',
    definition: 'Governance state must maintain causal ordering guarantees.',
    layer: 'INVARIANT'
  },
  'ZTG-3': {
    label: 'Governed Effect Surfaces',
    definition: 'All external effects occur through registered, classified interfaces.',
    layer: 'SURFACE'
  },
  'ZTG-4': {
    label: 'Mechanistic Boundary',
    definition: 'Authorization boundaries are code-enforced, not intent-interpreted.',
    layer: 'INVARIANT'
  },
  'ZTG-5': {
    label: 'Evidence-Coupled Execution',
    definition: 'No effect without simultaneous durable evidence of authorization.',
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

export function CrossSection({ highlightLayer, showLabels = true, interactive = true }: CrossSectionProps) {
  const [activeLayer, setActiveLayer] = useState<ArchitecturalLayer | null>(highlightLayer || null);

  const layers: ArchitecturalLayer[] = ['SURFACE', 'ENVELOPE', 'INVARIANT'];

  return (
    <div className="cross-section">
      <div className="cross-section__diagram">
        {/* Section cut line */}
        <div className="cross-section__cut-line">
          <span className="cross-section__cut-label">A</span>
          <div className="cross-section__cut-dash" />
          <span className="cross-section__cut-label">A'</span>
        </div>

        {/* Strata layers */}
        <div className="cross-section__strata">
          {layers.map((layer, index) => {
            const config = LAYER_CONFIG[layer];
            const isActive = activeLayer === layer;

            return (
              <div
                key={layer}
                className={`cross-section__layer ${isActive ? 'cross-section__layer--active' : ''}`}
                style={{
                  '--layer-color': config.color,
                  '--layer-index': index
                } as React.CSSProperties}
                onMouseEnter={() => interactive && setActiveLayer(layer)}
                onMouseLeave={() => interactive && !highlightLayer && setActiveLayer(null)}
                onClick={() => interactive && setActiveLayer(layer === activeLayer ? null : layer)}
              >
                <div className="cross-section__layer-fill" />
                <div className="cross-section__layer-edge-top" />
                <div className="cross-section__layer-edge-bottom" />

                {showLabels && (
                  <div className="cross-section__layer-label">
                    <span className="cross-section__layer-code">{layer}</span>
                    <span className="cross-section__layer-name">{config.name}</span>
                  </div>
                )}

                {/* Depth markers */}
                <div className="cross-section__depth-markers">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="cross-section__depth-marker" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout annotations */}
        <div className="cross-section__callouts">
          <div className="cross-section__callout cross-section__callout--surface">
            <div className="cross-section__callout-line" />
            <span>External Effects</span>
          </div>
          <div className="cross-section__callout cross-section__callout--invariant">
            <div className="cross-section__callout-line" />
            <span>Governance Boundary</span>
          </div>
        </div>
      </div>

      {/* Layer detail panel */}
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
