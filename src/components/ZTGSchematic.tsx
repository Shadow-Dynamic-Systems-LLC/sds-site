/**
 * ZTG Cross-Section Schematic
 *
 * Interactive visualization showing the layered architecture
 * of Zero Trust Governance - geological strata metaphor.
 */

import { useState } from 'react';
import { CrossSection, LAYER_CONFIG, ZTG_INVARIANTS, type ArchitecturalLayer } from './ArchitecturalSystem';
import './ZTGSchematic.css';

interface InvariantMapping {
  layer: ArchitecturalLayer;
  invariants: string[];
}

const LAYER_INVARIANTS: InvariantMapping[] = [
  {
    layer: 'SURFACE',
    invariants: ['ZTG-3']
  },
  {
    layer: 'ENVELOPE',
    invariants: []
  },
  {
    layer: 'INVARIANT',
    invariants: ['ZTG-0a', 'ZTG-0b', 'ZTG-0c', 'ZTG-0d', 'ZTG-0e', 'ZTG-1', 'ZTG-2', 'ZTG-4']
  }
];

export function ZTGSchematic() {
  const [activeLayer, setActiveLayer] = useState<ArchitecturalLayer | null>(null);
  const [hoveredInvariant, setHoveredInvariant] = useState<string | null>(null);

  const activeInvariants = activeLayer
    ? LAYER_INVARIANTS.find(l => l.layer === activeLayer)?.invariants || []
    : [];

  return (
    <div className="ztg-schematic">
      <div className="ztg-schematic__header">
        <div className="ztg-schematic__title">
          <span className="ztg-schematic__label">CROSS-SECTION</span>
          <h4>ZTG Architectural Layers</h4>
        </div>
        <div className="ztg-schematic__legend">
          {(['INVARIANT', 'ENVELOPE', 'SURFACE'] as ArchitecturalLayer[]).map(layer => (
            <button
              key={layer}
              className={`ztg-schematic__legend-item ${activeLayer === layer ? 'active' : ''}`}
              style={{ '--layer-color': LAYER_CONFIG[layer].color } as React.CSSProperties}
              onClick={() => setActiveLayer(activeLayer === layer ? null : layer)}
            >
              <span className="ztg-schematic__legend-dot" />
              <span className="ztg-schematic__legend-name">{LAYER_CONFIG[layer].name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="ztg-schematic__diagram">
        <CrossSection
          highlightLayer={activeLayer || undefined}
          showLabels={true}
          interactive={true}
        />
      </div>

      {/* Invariant panel */}
      <div className="ztg-schematic__invariants">
        <div className="ztg-schematic__invariants-header">
          <span className="ztg-schematic__invariants-label">INVARIANTS</span>
          {activeLayer && (
            <span
              className="ztg-schematic__invariants-layer"
              style={{ color: LAYER_CONFIG[activeLayer].color }}
            >
              {LAYER_CONFIG[activeLayer].name}
            </span>
          )}
        </div>

        <div className="ztg-schematic__invariants-grid">
          {(activeLayer ? activeInvariants : Object.keys(ZTG_INVARIANTS)).map(inv => {
            const data = ZTG_INVARIANTS[inv];
            if (!data) return null;

            const isHovered = hoveredInvariant === inv;

            return (
              <div
                key={inv}
                className={`ztg-schematic__invariant ${isHovered ? 'hovered' : ''}`}
                style={{ '--inv-color': LAYER_CONFIG[data.layer].color } as React.CSSProperties}
                onMouseEnter={() => setHoveredInvariant(inv)}
                onMouseLeave={() => setHoveredInvariant(null)}
              >
                <div className="ztg-schematic__invariant-header">
                  <span className="ztg-schematic__invariant-code">{inv}</span>
                  <span className="ztg-schematic__invariant-name">{data.label}</span>
                </div>
                {isHovered && (
                  <p className="ztg-schematic__invariant-def">{data.definition}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cut notation */}
      <div className="ztg-schematic__notation">
        <span>Section A-A' · ZTG v0.4</span>
      </div>
    </div>
  );
}
