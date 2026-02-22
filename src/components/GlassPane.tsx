import React from 'react';
import './GlassPane.css';

interface GlassPaneProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const GlassPane: React.FC<GlassPaneProps> = ({ children, className = '', style }) => {
    return (
        <div className={`glass-pane ${className}`} style={style}>
            {children}
        </div>
    );
};
