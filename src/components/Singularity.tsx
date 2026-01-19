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
  const frontDiskRef = useRef(null); // The flat bar in front
  const lensedTopRef = useRef(null);  // The arch over the top
  const lensedBottomRef = useRef(null); // The arch under the bottom
  const photonRingRef = useRef(null);
  const particlesRef = useRef(null);

  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  // Increase BH size slightly for impact
  const eventHorizonRadius = viewportHeight * 0.15;

  // Gargantua-like proportions: Tighter gap
  const diskInnerR = eventHorizonRadius * 1.5;
  const diskOuterR = eventHorizonRadius * 5.0;

  const drawShadow = useCallback((g: PIXI.Graphics) => {
    g.clear();
    // Pure black event horizon
    g.circle(0, 0, eventHorizonRadius);
    g.fill({ color: 0x000000, alpha: 1.0 });
  }, [eventHorizonRadius]);

  const drawPhotonRing = useCallback((g: PIXI.Graphics) => {
    g.clear();
    const segments = 120;
    // Just outside the shadow
    const ringRadius = eventHorizonRadius * 1.02;

    // Multi-pass stroke for glow
    for (let w = 0; w < 3; w++) {
      const width = eventHorizonRadius * (w === 0 ? 0.05 : (w === 1 ? 0.02 : 0.01));
      const baseAlpha = w === 0 ? 0.2 : (w === 1 ? 0.5 : 1.0);

      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const nextAngle = ((i + 1) / segments) * Math.PI * 2;

        const p1 = { x: Math.cos(angle) * ringRadius, y: Math.sin(angle) * ringRadius };
        const p2 = { x: Math.cos(nextAngle + 0.01) * ringRadius, y: Math.sin(nextAngle + 0.01) * ringRadius };

        const cosA = Math.cos(angle);
        const alpha = (0.7 - 0.4 * cosA) * baseAlpha;

        g.moveTo(p1.x, p1.y);
        g.lineTo(p2.x, p2.y);
        g.stroke({ width, color: 0xFFFFFF, alpha, cap: 'round' });
      }
    }
  }, [eventHorizonRadius]);

  // Helper to draw a distorted disk segment
  const drawDiskSegment = useCallback((g: PIXI.Graphics, lensType: 'front' | 'top' | 'bottom') => {
    g.clear();

    const layers = 100; // Ultra high resolution geometry
    const segments = 120; // Smooth curve

    const isFront = lensType === 'front';
    const angularOverlap = 0.02;
    const startAngle = isFront ? -angularOverlap : Math.PI - angularOverlap;
    const endAngle = isFront ? Math.PI + angularOverlap : Math.PI * 2 + angularOverlap;
    const totalAngle = endAngle - startAngle;

    const flatScale = 0.12;

    for (let j = 0; j < layers; j++) {
      const t = j / (layers - 1);
      const radius = diskInnerR + t * (diskOuterR - diskInnerR);

      // Color Palette: Smoother gradient
      let r, gVal, b;
      if (t < 0.15) {
        // White -> Golden Yellow
        r = 255; gVal = 255 - t * 6 * 40; b = 255 - t * 6 * 255;
      } else if (t < 0.5) {
        // Yellow -> Deep Orange
        r = 255; gVal = 215 - (t - 0.15) * 2.8 * 140; b = 0;
      } else {
        // Orange -> Reddish Brown
        r = 255 - (t - 0.5) * 2.0 * 180; gVal = 75 - (t - 0.5) * 2.0 * 75; b = 0;
      }
      r = Math.max(0, Math.min(255, r));
      gVal = Math.max(0, Math.min(255, gVal));
      b = Math.max(0, Math.min(255, b));
      const color = (Math.floor(r) << 16) | (Math.floor(gVal) << 8) | Math.floor(b);

      // Exact radial coverage
      const step = (diskOuterR - diskInnerR) / layers;
      const bandWidth = step + 1.0; // +1px overlap to seal radial gaps

      for (let i = 0; i < segments; i++) {
        const p = i / segments;
        const pNext = (i + 1) / segments;

        const angle = startAngle + p * totalAngle;
        const nextAngle = startAngle + pNext * totalAngle;

        // Calculate Point Function
        const calcPoint = (a: number) => {
          const x = Math.cos(a) * radius;
          const sinA = Math.sin(a);
          let y: number;

          if (lensType === 'front') {
            y = radius * sinA * flatScale;
          } else {
            const hump = Math.abs(sinA);

            // Distortion Smoother
            const shapeExponent = 2.0;
            const maxScale = 0.90;

            const dynamicScale = flatScale + (maxScale - flatScale) * Math.pow(hump, shapeExponent);

            y = radius * sinA * dynamicScale;
            if (lensType === 'bottom') y = -y;
          }
          return { x, y };
        };

        const p1 = calcPoint(angle);
        const p2 = calcPoint(nextAngle);

        const cosA = Math.cos(angle);

        // Doppler: Left Bright, Right Dim
        const doppler = 0.65 - 0.35 * cosA;

        // Uniform max alpha to avoid seams at equator
        let maxAlpha = 1.0;
        if (lensType !== 'front') maxAlpha = 0.85;

        g.moveTo(p1.x, p1.y);
        g.lineTo(p2.x, p2.y);

        // 'butt' cap connection
        g.stroke({ width: bandWidth, color, alpha: doppler * maxAlpha, cap: 'butt', join: 'bevel' });
      }
    }
  }, [diskInnerR, diskOuterR]);

  const drawParticles = useCallback((g: PIXI.Graphics) => {
    g.clear();
    const time = Date.now() * 0.001;
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      // Spiral orbital paths
      const seed = i * 123.4;
      const rNorm = i / particleCount;
      const radius = diskInnerR + rNorm * (diskOuterR - diskInnerR);
      const speed = 200 / radius;

      const angle = seed + time * speed;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.12;

      // Cull back particles behind shadow roughly
      const isBehind = Math.sin(angle) < 0;
      if (isBehind && Math.abs(x) < eventHorizonRadius) continue;

      g.circle(x, y, 1.2);
      g.fill({ color: 0xFFFFFF, alpha: Math.random() * 0.6 });
    }
  }, [diskInnerR, diskOuterR, eventHorizonRadius]);

  useEffect(() => {
    let ani: number;
    const animate = () => {
      if (frontDiskRef.current) frontDiskRef.current.dirty = true;
      if (lensedTopRef.current) lensedTopRef.current.dirty = true;
      if (lensedBottomRef.current) lensedBottomRef.current.dirty = true;
      if (particlesRef.current) particlesRef.current.dirty = true;
      ani = requestAnimationFrame(animate);
    };
    ani = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ani);
  }, []);

  return (
    <pixiContainer x={centerX} y={centerY}>
      {/* 1. Lensed Bottom Arch (Underneath phantom) - behind everything */}
      <pixiGraphics ref={lensedBottomRef} draw={(g) => drawDiskSegment(g, 'bottom')} blendMode="add" />

      {/* 2. Lensed Top Arch (The main Gargantua Halo) */}
      <pixiGraphics ref={lensedTopRef} draw={(g) => drawDiskSegment(g, 'top')} blendMode="add" />

      {/* 3. Shadow (Event Horizon) */}
      <pixiGraphics ref={singularityRef} draw={drawShadow} />

      {/* 4. Photon Ring */}
      <pixiGraphics ref={photonRingRef} draw={drawPhotonRing} blendMode="add" />

      {/* 5. Front Disk (The Bar) - Sits in front of everything */}
      <pixiGraphics ref={frontDiskRef} draw={(g) => drawDiskSegment(g, 'front')} blendMode="add" />

      <pixiGraphics ref={particlesRef} draw={drawParticles} blendMode="add" />
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
