import { Link } from 'react-router-dom';
import { artifactTypeDefs, identifierToSlug, type Artifact } from '../data/artifacts';
import {
    DepthCard,
    LayerIndicator,
    ParsedReferences,
    Timestamp,
    ARTIFACT_DEPTH,
    type ArtifactTypeCode
} from './ArchitecturalSystem';

interface ArtifactCardProps {
    artifact: Artifact;
    viewMode: 'cards' | 'list';
    onQuickView: () => void;
    frozen?: boolean;
}

// Map artifact types to type codes
function getTypeCode(type: Artifact['type']): ArtifactTypeCode {
    switch (type) {
        case 'DIAGNOSIS': return 'DX';
        case 'PRESCRIPTION': return 'RX';
        case 'CASE STUDY': return 'CS';
        case 'FIELD NOTE': return 'FN';
        case 'RESEARCH PAPER': return 'RP';
        default: return 'FN';
    }
}

export function ArtifactCard({ artifact, viewMode, onQuickView, frozen = false }: ArtifactCardProps) {
    const typeDef = artifactTypeDefs[artifact.type];
    const typeCode = getTypeCode(artifact.type);
    const depthConfig = ARTIFACT_DEPTH[typeCode];

    if (viewMode === 'list') {
        return (
            <div className={`artifact-list-item artifact-list-item--${depthConfig.layer.toLowerCase()}`}>
                <div className="artifact-list-meta">
                    <LayerIndicator layer={depthConfig.layer} compact showLabel={false} />
                    <span className="artifact-list-type">{typeDef.label}</span>
                    <span className="artifact-list-id">{artifact.identifier}</span>
                    {artifact.status && <span className="artifact-list-status">{artifact.status}</span>}
                </div>
                <Link to={`/dx/${identifierToSlug(artifact.identifier)}`} className="artifact-list-link">
                    <h3 className="artifact-list-title">{artifact.title}</h3>
                </Link>
                <p className="artifact-list-summary">{artifact.summary}</p>
                <div className="artifact-list-footer">
                    <Timestamp date={artifact.date} precision="date" />
                    <span className="artifact-list-author">{artifact.author}</span>
                    {artifact.references && artifact.references.length > 0 && (
                        <div className="artifact-list-refs">
                            <ParsedReferences references={artifact.references.slice(0, 3)} />
                        </div>
                    )}
                    <button
                        className="artifact-list-quickview"
                        onClick={(e) => {
                            e.preventDefault();
                            onQuickView();
                        }}
                        title="Quick view"
                    >
                        INSPECT
                    </button>
                </div>
            </div>
        );
    }

    return (
        <DepthCard
            typeCode={typeCode}
            frozen={frozen && (typeCode === 'DX' || typeCode === 'RX')}
            className="manifest-card"
        >
            <Link to={`/dx/${identifierToSlug(artifact.identifier)}`} className="manifest-card-link">
                <div className="manifest-card-header">
                    <div className="manifest-card-badges">
                        <LayerIndicator layer={depthConfig.layer} compact />
                        <span className="diagnosis-badge manifest-badge manifest-badge--type">
                            {typeDef.label}
                        </span>
                        <span className="diagnosis-badge manifest-badge manifest-badge--id">
                            {artifact.identifier}
                        </span>
                    </div>
                    {artifact.status && (
                        <span className="diagnosis-badge manifest-badge ui-status">
                            {artifact.status}
                        </span>
                    )}
                </div>

                <div className="manifest-card-body">
                    <h3 className="manifest-card-title">{artifact.title}</h3>
                    <p className="manifest-card-summary">{artifact.summary}</p>
                </div>

                {artifact.references && artifact.references.length > 0 && (
                    <div className="manifest-card-references">
                        <ParsedReferences references={artifact.references.slice(0, 4)} />
                    </div>
                )}

                <div className="manifest-card-footer">
                    <div className="manifest-card-meta">
                        <Timestamp date={artifact.date} precision="date" />
                        <span className="manifest-card-author">{artifact.author}</span>
                    </div>
                    <button
                        className="card-modal-trigger manifest-trigger"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onQuickView();
                        }}
                        title="Quick view"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" />
                        </svg>
                    </button>
                </div>
            </Link>
        </DepthCard>
    );
}
