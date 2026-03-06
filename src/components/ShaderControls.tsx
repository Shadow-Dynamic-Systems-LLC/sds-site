import { useState } from 'react';

export type SdsMode = 'fracture' | 'flow';

interface ShaderControlsProps {
  mode: SdsMode;
  intensity: number;
  paused: boolean;
  onModeChange: (mode: SdsMode) => void;
  onIntensityChange: (intensity: number) => void;
  onPausedChange: (paused: boolean) => void;
}

export function ShaderControls({
  mode,
  intensity,
  paused,
  onModeChange,
  onIntensityChange,
  onPausedChange,
}: ShaderControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          padding: '12px 16px',
          backgroundColor: 'rgba(255, 215, 0, 0.9)',
          color: '#111',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontFamily: 'Roboto Mono, monospace',
          fontWeight: 700,
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {isOpen ? '✕' : '🎨'} Shader Controls
      </button>

      {/* Control Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 9999,
            padding: '20px',
            backgroundColor: 'rgba(26, 26, 26, 0.95)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '8px',
            minWidth: '280px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            fontFamily: 'Inter, sans-serif',
            color: '#e0e0e0',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffd700',
              fontFamily: 'Roboto Mono, monospace',
            }}
          >
            Shader Admin Panel
          </h3>

          {/* Mode Selection */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#aaa',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Mode
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onModeChange('fracture')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  backgroundColor: mode === 'fracture' ? '#ffd700' : '#2a2a2a',
                  color: mode === 'fracture' ? '#111' : '#e0e0e0',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 700,
                  transition: 'all 0.2s',
                }}
              >
                ⚡ Fracture
              </button>
              <button
                onClick={() => onModeChange('flow')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  backgroundColor: mode === 'flow' ? '#ffd700' : '#2a2a2a',
                  color: mode === 'flow' ? '#111' : '#e0e0e0',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 700,
                  transition: 'all 0.2s',
                }}
              >
                🌊 Flow
              </button>
            </div>
          </div>

          {/* Intensity Slider */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#aaa',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Intensity: {intensity.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={intensity}
              onChange={(e) => onIntensityChange(parseFloat(e.target.value))}
              style={{
                width: '100%',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#666', marginTop: '4px' }}>
              <span>0.00</span>
              <span>1.00</span>
            </div>
          </div>

          {/* Pause/Play Toggle */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700,
                color: '#aaa',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              <input
                type="checkbox"
                checked={paused}
                onChange={(e) => onPausedChange(e.target.checked)}
                style={{
                  marginRight: '8px',
                  cursor: 'pointer',
                }}
              />
              {paused ? '⏸️' : '▶️'} Paused
            </label>
          </div>

          {/* Info */}
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '4px',
              fontSize: '11px',
              color: '#aaa',
              lineHeight: 1.4,
            }}
          >
            <strong style={{ color: '#ffd700' }}>Dev Mode Only</strong>
            <br />
            This panel is hidden in production builds.
          </div>
        </div>
      )}
    </>
  );
}
