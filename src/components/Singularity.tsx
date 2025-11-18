"use client";

import { Application, extend } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import mapData from "@/lib/mapData.json";

extend({ Graphics: PIXI.Graphics, Text: PIXI.Text, Container: PIXI.Container });

// Orbital configuration - well outside disk (disk ends at 14% radius)
// Positioned at 35%, 45%, 60% of viewport for clean separation
const getOrbitalRadius = (percentage: number) => {
  if (typeof window === 'undefined') return percentage * 8; // Default for SSR
  return window.innerHeight * percentage;
};

const ORBITAL_CONFIG = [
  // Inner ring - 3 nodes, fastest orbit (35% of viewport = 35 units)
  { ring: 0, radius: 0.35, speed: 0.035, phase: 0 },
  { ring: 0, radius: 0.35, speed: 0.035, phase: (Math.PI * 2) / 3 },
  { ring: 0, radius: 0.35, speed: 0.035, phase: (Math.PI * 4) / 3 },

  // Middle ring - 3 nodes, medium orbit (45% of viewport = 45 units)
  { ring: 1, radius: 0.45, speed: 0.022, phase: Math.PI / 6 },
  { ring: 1, radius: 0.45, speed: 0.022, phase: Math.PI / 6 + (Math.PI * 2) / 3 },
  { ring: 1, radius: 0.45, speed: 0.022, phase: Math.PI / 6 + (Math.PI * 4) / 3 },

  // Outer ring - 3 nodes, slowest orbit (60% of viewport = 60 units)
  { ring: 2, radius: 0.60, speed: 0.014, phase: Math.PI / 3 },
  { ring: 2, radius: 0.60, speed: 0.014, phase: Math.PI / 3 + (Math.PI * 2) / 3 },
  { ring: 2, radius: 0.60, speed: 0.014, phase: Math.PI / 3 + (Math.PI * 4) / 3 },
];

const StarField = ({ centerX, centerY }) => {
  const drawStars = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Simple starfield - not too bright
    for (let i = 0; i < 200; i++) {
      const x = (Math.random() - 0.5) * window.innerWidth;
      const y = (Math.random() - 0.5) * window.innerHeight;
      const size = Math.random() * 1.2 + 0.3;
      const alpha = Math.random() * 0.5 + 0.3;

      g.circle(x, y, size);
      g.fill({ color: 0xFFFFFF, alpha });
    }
  }, []);

  return <pixiGraphics draw={drawStars} x={centerX} y={centerY} />;
};

const SingularityCore = ({ centerX, centerY }) => {
  const singularityRef = useRef(null);
  const distortionRef = useRef(null);
  const innerRingRef = useRef(null);
  const mainRingRef = useRef(null);
  const outerPlumeRef = useRef(null);
  const lensedRingRef = useRef(null);
  const particlesRef = useRef(null);
  const amberBloomRef = useRef(null);
  const debrisRef = useRef(null);
  const upperLensingArcRef = useRef(null);
  const radialInflowRef = useRef(null);

  // Viewport = 100 units reference scale (total diameter = 28% of viewport)
  // Event horizon radius = 12 units → 6% of viewport height
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const singularityRadius = viewportHeight * 0.06;

  const drawSingularity = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Subtle glow layers around photon sphere (limited range, diffusive)
    // Inner glow (inside event horizon)
    for (let i = 0; i < 3; i++) {
      const glowRadius = singularityRadius - (i + 1) * 1.5;
      const alpha = 0.15 - i * 0.05; // 0.15, 0.10, 0.05
      g.circle(0, 0, glowRadius);
      g.stroke({ width: 1.5, color: 0xFFFFFF, alpha });
    }

    // Outer glow (just outside event horizon)
    for (let i = 0; i < 3; i++) {
      const glowRadius = singularityRadius + (i + 1) * 1.5;
      const alpha = 0.12 - i * 0.04; // 0.12, 0.08, 0.04
      g.circle(0, 0, glowRadius);
      g.stroke({ width: 1.5, color: 0xFFFFFF, alpha });
    }

    // Bright white photon sphere at event horizon edge
    g.circle(0, 0, singularityRadius);
    g.stroke({ width: 2, color: 0xFFFFFF, alpha: 0.9 });

    // Pure black void - no gradient, no stroke
    g.circle(0, 0, singularityRadius);
    g.fill({ color: 0x000000, alpha: 1.0 });
  }, [singularityRadius, viewportHeight]);

  const drawRadialInflow = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Radial streaks showing matter being pulled into event horizon
    const time = Date.now() * 0.001;
    const streakCount = 24;
    const maxRadius = singularityRadius + viewportHeight * 0.015; // Start just outside photon sphere

    for (let i = 0; i < streakCount; i++) {
      const baseAngle = (i / streakCount) * Math.PI * 2;
      // Add some angular variation for organic feel
      const angle = baseAngle + Math.sin(time * 0.5 + i * 0.3) * 0.1;

      // Each streak cycles inward over time
      const cycleSpeed = 1.5 + (i % 3) * 0.3; // Varied speeds
      const cycleProgress = ((time * cycleSpeed + i * 0.2) % 1.0);

      // Start from outside, move inward toward event horizon
      const outerRadius = maxRadius;
      const innerRadius = singularityRadius + 2; // Stop at photon sphere edge
      const currentRadius = outerRadius - cycleProgress * (outerRadius - innerRadius);

      // Streak length based on distance (longer further out, shorter close in)
      const streakLength = 8 + (currentRadius - innerRadius) / (outerRadius - innerRadius) * 12;

      // Calculate positions
      const x1 = Math.cos(angle) * currentRadius;
      const y1 = Math.sin(angle) * currentRadius;
      const x2 = Math.cos(angle) * (currentRadius - streakLength);
      const y2 = Math.sin(angle) * (currentRadius - streakLength);

      // Fade in/out during cycle (brightest in middle of journey)
      const fadeProgress = Math.sin(cycleProgress * Math.PI);
      const alpha = 0.15 * fadeProgress;

      // Subtle white/pale blue color
      const color = 0xE8F4FF;

      g.moveTo(x1, y1);
      g.lineTo(x2, y2);
      g.stroke({ width: 0.8, color, alpha, cap: 'round' });
    }
  }, [singularityRadius, viewportHeight]);

  const drawDistortionHalo = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Subtle refraction effect - light, not blurry
    for (let i = 0; i < 6; i++) {
      const radius = singularityRadius + 2 + i * 3;
      const alpha = 0.08 - i * 0.012;

      g.circle(0, 0, radius);
      g.fill({ color: 0x1a1a1a, alpha });
    }
  }, [singularityRadius, viewportHeight]);

  const drawInnerHotRing = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // PERFECT CIRCULAR INNER RING
    // Exact specification: 1px white rim + 2-3px pale gold
    // Total width: 0.005 viewport (razor-thin)
    // Alpha: white 0.20, gold 0.15
    const innerRadius = singularityRadius;
    const ringWidth = viewportHeight * 0.005;

    // 1px white rim on inner edge
    g.circle(0, 0, innerRadius + 1);
    g.stroke({ width: 1, color: 0xFFFFFF, alpha: 0.20 });

    // 2-3px pale gold layer outside white rim
    g.circle(0, 0, innerRadius + ringWidth / 2);
    g.stroke({ width: ringWidth, color: 0xF6E6B8, alpha: 0.15 });
  }, [singularityRadius, viewportHeight]);

  const drawMainGoldBand = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // TILTED RELATIVISTIC ACCRETION DISK
    // Circular outline, but with top/bottom brightness asymmetry
    // Vertical foreshortening on inner texture only
    const innerRadius = singularityRadius + viewportHeight * 0.006;
    const ringWidth = viewportHeight * 0.033;
    const time = Date.now() * 0.001;

    const segments = 128; // Increased for smooth flow
    const layers = 10; // Reduced radial subdivisions
    const verticalScale = 0.68; // Elliptical disk plane (horizontal stretching)
    const baseStroke = 3;
    const strokeWidth = baseStroke / verticalScale; // Uniform visual thickness

    for (let seg = 0; seg < segments; seg++) {
      const angle = (seg / segments) * Math.PI * 2;
      const nextAngle = ((seg + 1) / segments) * Math.PI * 2;

      // Top/bottom brightness asymmetry (angle 0 = right, π/2 = top)
      const hemisphere = Math.sin(angle); // +1 at top, -1 at bottom
      const heat = 0.5 + 0.5 * Math.max(0, hemisphere);   // 0.5 bottom → 1.0 top (enhanced)
      const opacity = 0.4 + 0.3 * Math.max(0, hemisphere); // 0.4 bottom → 0.7 top

      // Subtle flowing turbulence (not cogwheel teeth)
      const flicker = 0.2 * Math.sin(angle * 5.0 + time * 1.3);

      for (let i = 0; i < layers; i++) {
        const progress = i / layers;

        const baseRadius = innerRadius + i * (ringWidth / layers);
        const radius = baseRadius;

        // Radial gradient: Gold → Amber → Chocolate
        const baseR = 255 - progress * 115;
        const baseG = 220 - progress * 130;
        const baseB = 140 - progress * 90;

        // Apply heat factor to color intensity
        const r = Math.max(0, Math.min(255, Math.floor(baseR * heat)));
        const g_val = Math.max(0, Math.min(255, Math.floor(baseG * heat)));
        const b = Math.max(0, Math.min(255, Math.floor(baseB * heat)));
        const color = (r << 16) | (g_val << 8) | b;

        // Alpha: stronger in middle, modulated by opacity and flicker
        const baseAlpha = 0.4 + (1 - Math.abs(progress - 0.5) * 2) * 0.3;
        const alpha = baseAlpha * opacity * (1.0 + flicker);

        // Apply vertical foreshortening to coordinates
        const x1 = Math.cos(angle) * radius;
        const y1 = Math.sin(angle) * radius * verticalScale;
        const x2 = Math.cos(nextAngle) * radius;
        const y2 = Math.sin(nextAngle) * radius * verticalScale;

        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke({
          width: strokeWidth,
          color,
          alpha: Math.max(0.2, Math.min(0.8, alpha)),
          cap: 'round'
        });
      }
    }
  }, [singularityRadius, viewportHeight]);

  const drawOuterAmberPlume = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // OUTER PLUME AS HORIZONTAL ELLIPSE: Disk plane atmosphere
    // Elliptical geometry for tilted disk appearance
    const innerRadius = singularityRadius + viewportHeight * 0.042;
    const plumeWidth = viewportHeight * 0.03;
    const verticalScale = 0.68; // Horizontal stretching
    const segments = 96;
    const baseStroke = 4;
    const strokeWidth = baseStroke / verticalScale; // Compensate for uniform thickness

    for (let i = 0; i < 20; i++) {
      const radius = innerRadius + i * (plumeWidth / 20);
      const progress = i / 20;

      // Warm amber → dark brown gradient
      const r = Math.floor(200 - progress * 110);
      const g_val = Math.floor(130 - progress * 80);
      const b = Math.floor(60 - progress * 35);
      const color = (r << 16) | (g_val << 8) | b;

      // Gentle radial fade
      const alpha = 0.2 * (1 - progress * 1.5);

      // Draw as ellipse (horizontal plane)
      for (let seg = 0; seg < segments; seg++) {
        const angle = (seg / segments) * Math.PI * 2;
        const nextAngle = ((seg + 1) / segments) * Math.PI * 2;

        const x1 = Math.cos(angle) * radius;
        const y1 = Math.sin(angle) * radius * verticalScale;
        const x2 = Math.cos(nextAngle) * radius;
        const y2 = Math.sin(nextAngle) * radius * verticalScale;

        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke({ width: strokeWidth, color, alpha: Math.max(0, alpha), cap: 'round' });
      }
    }
  }, [singularityRadius, viewportHeight]);

  const drawLensedRing = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // INNER TURBULENT PLASMA - Aggressive ellipse for deep disk plane
    // Strong vertical compression to create thin plasma layer
    const innerRadius = singularityRadius + viewportHeight * 0.015;
    const ringWidth = viewportHeight * 0.025;
    const horizontalScale = 1.0; // Full horizontal radius
    const verticalScale = 0.55;   // Aggressive vertical compression
    const yOffset = 0; // Centered
    const segments = 96; // Smooth ellipse
    const baseStroke = 4;
    const strokeWidth = baseStroke / verticalScale; // Compensate for uniform thickness

    for (let i = 0; i < 16; i++) {
      const radius = innerRadius + i * (ringWidth / 16);
      const progress = i / 16;

      // Gradient
      const baseR = 255 - progress * 115;
      const baseG = 220 - progress * 130;
      const baseB = 140 - progress * 90;

      // Alpha fade
      const alpha = (0.25 - progress * 0.15) * 0.35;

      // Chromatic aberration offset (subtle)
      const chromaticOffset = 0.5;

      // Colors
      const redR = Math.max(0, Math.min(255, Math.floor(baseR * 1.15)));
      const redG = Math.max(0, Math.min(255, Math.floor(baseG * 0.85)));
      const redB = Math.max(0, Math.min(255, Math.floor(baseB * 0.7)));
      const redColor = (redR << 16) | (redG << 8) | redB;

      const mainR = Math.max(0, Math.min(255, Math.floor(baseR)));
      const mainG = Math.max(0, Math.min(255, Math.floor(baseG)));
      const mainB = Math.max(0, Math.min(255, Math.floor(baseB)));
      const mainColor = (mainR << 16) | (mainG << 8) | mainB;

      const blueR = Math.max(0, Math.min(255, Math.floor(baseR * 0.7)));
      const blueG = Math.max(0, Math.min(255, Math.floor(baseG * 0.9)));
      const blueB = Math.max(0, Math.min(255, Math.floor(baseB * 1.2)));
      const blueColor = (blueR << 16) | (blueG << 8) | blueB;

      // Draw true ellipses point by point (3 chromatic layers)
      // Red layer
      for (let seg = 0; seg < segments; seg++) {
        const angle = (seg / segments) * Math.PI * 2;
        const nextAngle = ((seg + 1) / segments) * Math.PI * 2;

        const x1 = chromaticOffset + Math.cos(angle) * radius * horizontalScale;
        const y1 = yOffset + Math.sin(angle) * radius * verticalScale;
        const x2 = chromaticOffset + Math.cos(nextAngle) * radius * horizontalScale;
        const y2 = yOffset + Math.sin(nextAngle) * radius * verticalScale;

        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke({ width: strokeWidth, color: redColor, alpha: alpha * 0.3, cap: 'round' });
      }

      // Main layer
      for (let seg = 0; seg < segments; seg++) {
        const angle = (seg / segments) * Math.PI * 2;
        const nextAngle = ((seg + 1) / segments) * Math.PI * 2;

        const x1 = Math.cos(angle) * radius * horizontalScale;
        const y1 = yOffset + Math.sin(angle) * radius * verticalScale;
        const x2 = Math.cos(nextAngle) * radius * horizontalScale;
        const y2 = yOffset + Math.sin(nextAngle) * radius * verticalScale;

        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke({ width: strokeWidth, color: mainColor, alpha, cap: 'round' });
      }

      // Blue layer
      for (let seg = 0; seg < segments; seg++) {
        const angle = (seg / segments) * Math.PI * 2;
        const nextAngle = ((seg + 1) / segments) * Math.PI * 2;

        const x1 = -chromaticOffset + Math.cos(angle) * radius * horizontalScale;
        const y1 = yOffset + Math.sin(angle) * radius * verticalScale;
        const x2 = -chromaticOffset + Math.cos(nextAngle) * radius * horizontalScale;
        const y2 = yOffset + Math.sin(nextAngle) * radius * verticalScale;

        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke({ width: strokeWidth, color: blueColor, alpha: alpha * 0.3, cap: 'round' });
      }
    }
  }, [singularityRadius, viewportHeight]);

  const drawParticles = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Particles following spiral inflow - matches disk spiral
    const particleCount = 300;
    const diskOuterRadius = singularityRadius + viewportHeight * 0.08;
    const time = Date.now() * 0.001;

    // Spiral parameters matching disk
    const spiralPhase = time * 0.12;

    for (let i = 0; i < particleCount; i++) {
      // Favor density near disk, turbulent clustering
      // Start particles OUTSIDE the inner ring to prevent white center
      const baseAngle = Math.random() * Math.PI * 2;
      const particleMinRadius = singularityRadius + viewportHeight * 0.012; // Start beyond inner ring
      const distFromCenter = particleMinRadius + Math.pow(Math.random(), 1.5) * (diskOuterRadius - particleMinRadius);

      // Apply spiral offset based on radius (stronger further out)
      const spiralInfluence = (distFromCenter - singularityRadius) / (diskOuterRadius - singularityRadius);
      const spiralAngleOffset = Math.sin(baseAngle * 2 - spiralPhase) * 0.8 * spiralInfluence; // Doubled from 0.4

      // Turbulent clustering - group particles
      const angle = baseAngle + spiralAngleOffset + (Math.random() - 0.5) * 0.3;

      const x = Math.cos(angle) * distFromCenter;
      const y = Math.sin(angle) * distFromCenter;

      // Size variation 0.5-2.5px
      const size = 0.5 + Math.random() * 2.0;

      // Color variation - warmer near center, cooler further out
      const colorTemp = 1.0 - spiralInfluence * 0.3;
      const r = Math.max(0, Math.min(255, Math.floor(255 * colorTemp)));
      const g_val = Math.max(0, Math.min(255, Math.floor(215 * colorTemp)));
      const b = 0;
      const color = (r << 16) | (g_val << 8) | b;

      // Radially symmetric brightness (no directional bias)
      // Alpha with spiral brightness variation only
      const spiralBrightness = 1.0 + Math.sin(baseAngle * 2 - spiralPhase) * 0.3;
      const alpha = (0.15 + Math.random() * 0.35) * spiralBrightness;

      // Uniform particle size (no directional enhancement)
      const enhancedSize = size;

      // Radial motion blur - particles leave trails in direction of rotation
      const rotationDirection = angle + Math.PI / 2; // Perpendicular to radius = tangent
      const blurSteps = 3;
      const blurLength = enhancedSize * 1.5;

      for (let b = 0; b < blurSteps; b++) {
        const blurProgress = b / blurSteps;
        const blurAlpha = alpha * (1 - blurProgress * 0.7);
        const blurX = x - Math.cos(rotationDirection) * blurProgress * blurLength;
        const blurY = y - Math.sin(rotationDirection) * blurProgress * blurLength;
        const blurSize = enhancedSize * (1 - blurProgress * 0.4);

        g.circle(blurX, blurY, blurSize);
        g.fill({ color, alpha: blurAlpha });
      }

      // Increased streaking (1 in 5 particles) following spiral curves
      // Uniform streaking probability across all angles
      const streakChance = 0.2;
      if (Math.random() < streakChance) {
        // Stretch particle along spiral curve with motion blur
        const stretchLength = 3 + Math.random() * 4;
        const spiralTangent = angle - spiralAngleOffset * 0.5;
        const endX = x + Math.cos(spiralTangent + Math.PI) * stretchLength;
        const endY = y + Math.sin(spiralTangent + Math.PI) * stretchLength;

        g.moveTo(x, y);
        g.lineTo(endX, endY);
        g.stroke({ width: enhancedSize * 0.8, color, alpha: alpha * 0.7, cap: 'round' });
      }
    }
  }, [singularityRadius, viewportHeight]);

  const drawAmberBloom = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // BONUS: Soft amber turbulence bloom outside disk
    // Subtle atmospheric depth - MUST stay compact
    const bloomStart = singularityRadius + viewportHeight * 0.08; // Start at outer edge (14%)
    const bloomWidth = viewportHeight * 0.04; // Minimal width to 18% total
    const time = Date.now() * 0.001;
    const segments = 40;

    for (let seg = 0; seg < segments; seg++) {
      const segmentAngle = (seg / segments) * Math.PI * 2;

      // Turbulent noise - makes it atmospheric not uniform
      const turbulence = Math.sin(segmentAngle * 2.7 + time * 0.8) * 0.5 +
                        Math.cos(segmentAngle * 4.1 + time * 0.6) * 0.3;

      for (let i = 0; i < 30; i++) {
        const radius = bloomStart + i * (bloomWidth / 30);
        const progress = i / 30;

        // Deep warm amber → brown gradient
        // RGB(180, 100, 40) → RGB(80, 40, 20)
        const r = Math.max(0, Math.min(255, Math.floor(180 - progress * 100)));
        const g_val = Math.max(0, Math.min(255, Math.floor(100 - progress * 60)));
        const b = Math.max(0, Math.min(255, Math.floor(40 - progress * 20)));
        const color = (r << 16) | (g_val << 8) | b;

        // Very subtle atmospheric depth
        const baseAlpha = 0.08 * Math.pow(1 - progress, 1.8);
        const alpha = baseAlpha * (1 + turbulence * 0.25);

        // Soft, minimal strokes
        g.circle(0, 0, radius);
        g.stroke({
          width: 5 + turbulence * 2,
          color,
          alpha: Math.max(0, Math.min(0.12, alpha)),
          cap: 'round'
        });
      }
    }
  }, [singularityRadius, viewportHeight]);

  const drawTopLensingArc = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // ELLIPTICAL TOP LENSING ARC - Signature Interstellar-style effect
    // Wide horizontal ellipse visible only on top
    const mainBandOuter = singularityRadius + viewportHeight * 0.006 + viewportHeight * 0.033;
    const arcRadius = mainBandOuter + viewportHeight * 0.008; // Slightly larger
    const verticalScale = 0.65; // Elliptical compression (wide horizontal arc)
    const segments = 80;
    const baseStroke = 1.8; // Thin stroke
    const strokeWidth = baseStroke / verticalScale; // Compensate for uniform thickness

    // Draw arc from -115° to +115° (centered at π/2, which is top)
    const startAngle = (Math.PI / 2) - (115 * Math.PI / 180); // π/2 - 115° (extended)
    const endAngle = (Math.PI / 2) + (115 * Math.PI / 180);   // π/2 + 115° (extended)
    const arcSpan = endAngle - startAngle;

    for (let seg = 0; seg < segments; seg++) {
      const progress = seg / segments;
      const angle = startAngle + progress * arcSpan;
      const nextAngle = startAngle + ((seg + 1) / segments) * arcSpan;

      // Bright gold → pale white gradient along arc
      const colorProgress = Math.abs(progress - 0.5) * 2; // 0 at center, 1 at edges
      const r = Math.floor(255 - colorProgress * 50);
      const g_val = Math.floor(215 - colorProgress * 30);
      const b = Math.floor(140 + colorProgress * 115);
      const color = (r << 16) | (g_val << 8) | b;

      // Fade at edges of arc
      const edgeFade = 1.0 - Math.pow(Math.abs(progress - 0.5) * 2, 2);
      const alpha = 0.7 * edgeFade; // Increased from 0.5 to 0.7 for more prominence

      // Apply elliptical geometry (horizontal stretching)
      const x1 = Math.cos(angle) * arcRadius;
      const y1 = Math.sin(angle) * arcRadius * verticalScale;
      const x2 = Math.cos(nextAngle) * arcRadius;
      const y2 = Math.sin(nextAngle) * arcRadius * verticalScale;

      g.moveTo(x1, y1);
      g.lineTo(x2, y2);
      g.stroke({ width: strokeWidth, color, alpha, cap: 'round' });
    }
  }, [singularityRadius, viewportHeight]);

  const drawDebris = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Enhanced debris field - larger chunks showing orbital motion and tumbling
    // Creates visual texture and breaks up disk uniformity
    const debrisCount = 120; // Increased for more texture
    const diskInnerRadius = singularityRadius + viewportHeight * 0.01;
    const diskOuterRadius = singularityRadius + viewportHeight * 0.12;
    const time = Date.now() * 0.001;

    // Spiral parameters matching disk
    const spiralPhase = time * 0.12;

    for (let i = 0; i < debrisCount; i++) {
      // Each debris chunk has persistent properties (using i as seed)
      const seed = i * 0.1;
      const orbitRadius = diskInnerRadius + (Math.sin(seed * 7.3) * 0.5 + 0.5) * (diskOuterRadius - diskInnerRadius);
      const orbitSpeed = 0.15 / Math.sqrt(orbitRadius / singularityRadius); // Keplerian orbit
      const baseAngle = (seed * 13.7 % (Math.PI * 2)) + time * orbitSpeed;

      // Apply spiral offset
      const spiralInfluence = (orbitRadius - diskInnerRadius) / (diskOuterRadius - diskInnerRadius);
      const spiralAngleOffset = Math.sin(baseAngle * 2 - spiralPhase) * 0.5 * spiralInfluence;
      const angle = baseAngle + spiralAngleOffset;

      const x = Math.cos(angle) * orbitRadius;
      const y = Math.sin(angle) * orbitRadius;

      // Enhanced debris size variation - more texture with varied sizes (3-18px)
      const size = 3 + (Math.sin(seed * 11.3) * 0.5 + 0.5) * 15;

      // Tumbling rotation - each chunk rotates at different rate
      const tumbleSpeed = 0.5 + (Math.sin(seed * 19.7) * 0.5 + 0.5) * 2.0;
      const rotation = time * tumbleSpeed + seed * Math.PI;

      // Shape variation - some rectangular, some irregular
      const shapeType = Math.floor((Math.sin(seed * 23.1) * 0.5 + 0.5) * 3);

      // Color based on temperature/distance - hotter near center
      const tempFactor = 1.0 - spiralInfluence * 0.5;
      const baseR = 180 + tempFactor * 75;
      const baseG = 120 + tempFactor * 100;
      const baseB = 40 + tempFactor * 20;

      // Brightness variation from spiral
      const spiralBrightness = 1.0 + Math.sin(baseAngle * 2 - spiralPhase) * 0.3;

      const r = Math.max(0, Math.min(255, Math.floor(baseR * spiralBrightness)));
      const g_val = Math.max(0, Math.min(255, Math.floor(baseG * spiralBrightness)));
      const b = Math.max(0, Math.min(255, Math.floor(baseB * spiralBrightness)));
      const color = (r << 16) | (g_val << 8) | b;

      // Enhanced alpha for better visibility - depth perception
      const depthFactor = Math.abs(Math.sin(angle));
      const depthHaze = 1.0 - depthFactor * 0.3;
      const alpha = (0.4 + Math.sin(seed * 31.1) * 0.25) * depthHaze;

      // Helper function to rotate point around origin
      const rotatePoint = (px: number, py: number, rot: number) => {
        const cos = Math.cos(rot);
        const sin = Math.sin(rot);
        return {
          x: px * cos - py * sin + x,
          y: px * sin + py * cos + y
        };
      };

      // Draw debris chunk with rotation
      if (shapeType === 0) {
        // Rectangular chunk
        const width = size;
        const height = size * (0.6 + Math.sin(seed * 29.3) * 0.4);
        const points: number[] = [];

        // Four corners of rectangle
        const corners = [
          { x: -width / 2, y: -height / 2 },
          { x: width / 2, y: -height / 2 },
          { x: width / 2, y: height / 2 },
          { x: -width / 2, y: height / 2 }
        ];

        for (const corner of corners) {
          const rotated = rotatePoint(corner.x, corner.y, rotation);
          points.push(rotated.x, rotated.y);
        }

        g.poly(points);
        g.fill({ color, alpha: alpha * 0.7 });
        g.stroke({ width: 0.5, color: 0xffffff, alpha: alpha * 0.3 });
      } else if (shapeType === 1) {
        // Triangular chunk
        const localPoints = [
          { x: -size * 0.5, y: size * 0.4 },
          { x: size * 0.5, y: size * 0.4 },
          { x: 0, y: -size * 0.6 }
        ];
        const points: number[] = [];

        for (const point of localPoints) {
          const rotated = rotatePoint(point.x, point.y, rotation);
          points.push(rotated.x, rotated.y);
        }

        g.poly(points);
        g.fill({ color, alpha: alpha * 0.7 });
        g.stroke({ width: 0.5, color: 0xffffff, alpha: alpha * 0.3 });
      } else {
        // Irregular polygon chunk
        const sides = 5 + Math.floor(Math.sin(seed * 37.1) * 2);
        const points: number[] = [];

        for (let s = 0; s < sides; s++) {
          const sAngle = (s / sides) * Math.PI * 2;
          const sRadius = size * (0.7 + Math.sin(seed * 41.1 + s) * 0.3);
          const localX = Math.cos(sAngle) * sRadius;
          const localY = Math.sin(sAngle) * sRadius;
          const rotated = rotatePoint(localX, localY, rotation);
          points.push(rotated.x, rotated.y);
        }

        g.poly(points);
        g.fill({ color, alpha: alpha * 0.7 });
        g.stroke({ width: 0.5, color: 0xffffff, alpha: alpha * 0.3 });
      }

      // Add subtle motion blur trail for some chunks
      if (Math.sin(seed * 43.7) > 0.5) {
        const trailLength = size * 1.5;
        const trailAngle = angle + Math.PI / 2; // Tangent to orbit
        const trailEndX = x - Math.cos(trailAngle) * trailLength;
        const trailEndY = y - Math.sin(trailAngle) * trailLength;

        g.moveTo(x, y);
        g.lineTo(trailEndX, trailEndY);
        g.stroke({ width: size * 0.3, color, alpha: alpha * 0.3, cap: 'round' });
      }
    }
  }, [singularityRadius, viewportHeight]);

  useEffect(() => {
    // Animation loop for time-based effects
    let animationFrameId: number;

    const animate = () => {
      // Force re-render of time-dependent graphics
      if (innerRingRef.current) {
        innerRingRef.current.dirty = true;
      }
      if (mainRingRef.current) {
        mainRingRef.current.dirty = true;
      }
      if (lensedRingRef.current) {
        lensedRingRef.current.dirty = true;
      }
      if (amberBloomRef.current) {
        amberBloomRef.current.dirty = true;
      }
      if (debrisRef.current) {
        debrisRef.current.dirty = true;
      }
      if (upperLensingArcRef.current) {
        upperLensingArcRef.current.dirty = true;
      }
      if (radialInflowRef.current) {
        radialInflowRef.current.dirty = true;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Gentle pulse on main ring (5-10% brightness, ~12 seconds)
    if (mainRingRef.current) {
      gsap.to(mainRingRef.current, {
        alpha: 0.9,
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Subtle distortion pulsing
    if (distortionRef.current) {
      gsap.to(distortionRef.current, {
        alpha: 0.6,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Lensed ring shimmer - increased base alpha
    if (lensedRingRef.current) {
      gsap.to(lensedRingRef.current, {
        alpha: 0.6,
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <pixiContainer x={centerX} y={centerY}>
      {/* Ambient amber bloom */}
      <pixiGraphics
        ref={amberBloomRef}
        draw={drawAmberBloom}
        alpha={0.15}
        blendMode="add"
      />

      {/* Outer amber plume */}
      <pixiGraphics
        ref={outerPlumeRef}
        draw={drawOuterAmberPlume}
        alpha={0.8}
        blendMode="add"
      />

      {/* Lensed ring */}
      <pixiGraphics
        ref={lensedRingRef}
        draw={drawLensedRing}
        alpha={1.0}
        blendMode="add"
      />

      {/* Top lensing arc - only visible above disk to sell tilted appearance */}
      <pixiGraphics
        ref={upperLensingArcRef}
        draw={drawTopLensingArc}
        alpha={0.6}
        blendMode="add"
      />

      {/* Main gold band */}
      <pixiGraphics
        ref={mainRingRef}
        draw={drawMainGoldBand}
        alpha={1.0}
        blendMode="add"
      />

      {/* Particles */}
      <pixiGraphics
        ref={particlesRef}
        draw={drawParticles}
        alpha={0.5}
        blendMode="add"
      />

      {/* Debris field - enhanced texture with larger chunks showing motion and dynamics */}
      <pixiGraphics
        ref={debrisRef}
        draw={drawDebris}
        alpha={0.55}
        blendMode="add"
      />

      {/* Inner ring - normal blend, rendered AFTER particles/debris to sit on top */}
      <pixiGraphics
        ref={innerRingRef}
        draw={drawInnerHotRing}
        alpha={1.0}
        blendMode="normal"
      />

      {/* Distortion halo */}
      <pixiGraphics
        ref={distortionRef}
        draw={drawDistortionHalo}
        alpha={0.35}
      />

      {/* Radial inflow - matter being pulled toward event horizon */}
      <pixiGraphics
        ref={radialInflowRef}
        draw={drawRadialInflow}
        alpha={1.0}
        blendMode="add"
      />

      {/* Pure black singularity (rendered on top) */}
      <pixiGraphics
        ref={singularityRef}
        draw={drawSingularity}
        alpha={1.0}
      />
    </pixiContainer>
  );
};

const DomainSun = ({ config, index, centerX, centerY, onPositionUpdate }) => {
  const router = useRouter();
  const containerRef = useRef(null);
  const sunRef = useRef(null);
  const coronaRef = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(config.phase);
  const timeRef = useRef(0);

  const node = mapData[index];

  const drawSun = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Bright gold center
    g.circle(0, 0, 18);
    g.fill({ color: 0xff4500, alpha: 0.2 });

    g.circle(0, 0, 13);
    g.fill({ color: 0xff6a00, alpha: 0.5 });

    g.circle(0, 0, 9);
    g.fill({ color: 0xffd700, alpha: 0.9 });

    g.circle(0, 0, 5);
    g.fill({ color: 0xffeb99, alpha: 1.0 });

    g.circle(0, 0, 2);
    g.fill({ color: 0xffffff, alpha: 0.9 });
  }, []);

  const drawCorona = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Corona spikes
    const numSpikes = 8;
    const spikeLength = 22;

    for (let i = 0; i < numSpikes; i++) {
      const angle = (i * Math.PI * 2) / numSpikes;
      const x1 = Math.cos(angle) * 10;
      const y1 = Math.sin(angle) * 10;
      const x2 = Math.cos(angle) * spikeLength;
      const y2 = Math.sin(angle) * spikeLength;

      g.moveTo(x1, y1);
      g.lineTo(x2 * 0.6, y2 * 0.6);
      g.stroke({ width: 2, color: 0xffd700, alpha: 0.8, cap: 'round' });

      g.lineTo(x2, y2);
      g.stroke({ width: 1, color: 0xffd700, alpha: 0.4, cap: 'round' });
    }
  }, []);

  // Stable Keplerian orbit
  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.016;

      const newAngle = config.phase + timeRef.current * config.speed;
      const radius = getOrbitalRadius(config.radius);

      const x = Math.cos(newAngle) * radius;
      const y = Math.sin(newAngle) * radius;

      setAngle(newAngle);
      setPosition({ x, y });
      onPositionUpdate(index, { x, y });

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [config, index, onPositionUpdate]);

  // Corona rotation and flicker
  useEffect(() => {
    if (coronaRef.current) {
      // Slow rotation
      gsap.to(coronaRef.current, {
        rotation: Math.PI * 2,
        duration: 60,
        ease: "none",
        repeat: -1,
      });

      // Small flicker
      gsap.to(coronaRef.current, {
        alpha: 0.5,
        duration: 2 + Math.random() * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  // Setup interactivity
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.eventMode = 'static';
      containerRef.current.cursor = 'pointer';
      containerRef.current.hitArea = new PIXI.Circle(0, 0, 35);
    }
  }, []);

  const handleClick = () => {
    if (node.path) {
      router.push(node.path);
    }
  };

  return (
    <pixiContainer
      ref={containerRef}
      x={centerX + position.x}
      y={centerY + position.y}
      pointertap={handleClick}
    >
      <pixiGraphics ref={coronaRef} draw={drawCorona} alpha={0.6} />
      <pixiGraphics ref={sunRef} draw={drawSun} alpha={0.9} />
      <pixiText
        text={node.label}
        anchor={0.5}
        y={-30}
        style={new PIXI.TextStyle({
          fontFamily: "Tomorrow, sans-serif",
          fontSize: 11,
          fill: "white",
        })}
      />
    </pixiContainer>
  );
};

const Singularity = () => {
  const canvasContainerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [sunPositions, setSunPositions] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePositionUpdate = useCallback((index: number, pos: { x: number; y: number }) => {
    setSunPositions(prev => {
      const newPositions = [...prev];
      newPositions[index] = pos;
      return newPositions;
    });
  }, []);

  if (!mounted) {
    return null;
  }

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  return (
    <div
      ref={canvasContainerRef}
      className="absolute top-0 left-0 w-full h-full bg-black"
    >
      <Application
        width={window.innerWidth}
        height={window.innerHeight}
        options={{
          backgroundAlpha: 1,
          backgroundColor: 0x000000,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        }}
        className="singularity-canvas"
      >
        {/* Starfield background */}
        <StarField centerX={centerX} centerY={centerY} />

        {/* Central singularity with accretion disk */}
        <SingularityCore centerX={centerX} centerY={centerY} />

        {/* 9 orbiting domain suns */}
        {ORBITAL_CONFIG.map((config, index) => (
          <DomainSun
            key={index}
            config={config}
            index={index}
            centerX={centerX}
            centerY={centerY}
            onPositionUpdate={handlePositionUpdate}
          />
        ))}
      </Application>
    </div>
  );
};

export default Singularity;
