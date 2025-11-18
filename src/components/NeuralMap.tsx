"use client";

import { Application, extend } from "@pixi/react";
import GrowingGraphFX from "./GrowingGraphFX";
import mapData from "@/lib/mapData.json";
import * as PIXI from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

extend({ Graphics: PIXI.Graphics, Text: PIXI.Text, Container: PIXI.Container });

const InteractiveNode = ({ node, canvasContainerRef }) => {
  const router = useRouter();
  const containerRef = useRef(null);
  const nodeRef = useRef(null);
  const hoverRingRef = useRef(null);
  const raysRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Set up interactive hit area
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.eventMode = 'static';
      containerRef.current.cursor = 'pointer';
      containerRef.current.hitArea = new PIXI.Circle(0, 0, 40);
    }
  }, []);

  // Sizes increased by 30% with more glow layers
  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Outermost glow (very faint) - 30px
    g.circle(0, 0, 30);
    g.fill({ color: 0xff4500, alpha: 0.08 });

    // Outer glow layer (faint orange) - 23.4px
    g.circle(0, 0, 23.4);
    g.fill({ color: 0xff4500, alpha: 0.25 });

    // Middle glow layer (orange) - 18.2px
    g.circle(0, 0, 18.2);
    g.fill({ color: 0xff6a00, alpha: 0.6 });

    // Inner bright core (molten gold) - 13px
    g.circle(0, 0, 13);
    g.fill({ color: 0xffd700, alpha: 0.95 });

    // Central hot spot (white-gold) - 6.5px
    g.circle(0, 0, 6.5);
    g.fill({ color: 0xffeb99, alpha: 1.0 });

    // Core white center - 3px
    g.circle(0, 0, 3);
    g.fill({ color: 0xffffff, alpha: 0.9 });
  }, []);

  const drawRays = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Draw 12 rays for smoother coverage
    const numRays = 12;
    const rayLength = 60;

    for (let i = 0; i < numRays; i++) {
      const angle = (i * Math.PI * 2) / numRays;
      const x1 = Math.cos(angle) * 25;
      const y1 = Math.sin(angle) * 25;
      const x2 = Math.cos(angle) * rayLength;
      const y2 = Math.sin(angle) * rayLength;

      // Multi-segment gradient effect
      // Segment 1: Bright start
      g.moveTo(x1, y1);
      g.lineTo(x2 * 0.3, y2 * 0.3);
      g.stroke({ width: 3, color: 0xffd700, alpha: 0.9, cap: 'round' });

      // Segment 2: Medium
      g.lineTo(x2 * 0.6, y2 * 0.6);
      g.stroke({ width: 2.5, color: 0xffd700, alpha: 0.6, cap: 'round' });

      // Segment 3: Fading
      g.lineTo(x2 * 0.85, y2 * 0.85);
      g.stroke({ width: 2, color: 0xffd700, alpha: 0.3, cap: 'round' });

      // Segment 4: Very faint tip
      g.lineTo(x2, y2);
      g.stroke({ width: 1, color: 0xffd700, alpha: 0.1, cap: 'round' });
    }
  }, []);

  const drawHoverRing = useCallback((g: PIXI.Graphics) => {
    g.clear();
    if (isHovered) {
      // Multi-layered golden ring with smooth glow
      // Outer glow
      g.circle(0, 0, 45);
      g.stroke({ width: 2, color: 0xffd700, alpha: 0.2, cap: 'round' });

      g.circle(0, 0, 40);
      g.stroke({ width: 2, color: 0xffd700, alpha: 0.4, cap: 'round' });

      // Main ring
      g.circle(0, 0, 35);
      g.stroke({ width: 3, color: 0xffd700, alpha: 0.9, cap: 'round' });

      // Inner highlight
      g.circle(0, 0, 32);
      g.stroke({ width: 2, color: 0xffeb99, alpha: 0.7, cap: 'round' });
    }
  }, [isHovered]);

  // Force re-render of hover ring when hover state changes
  useEffect(() => {
    if (hoverRingRef.current) {
      drawHoverRing(hoverRingRef.current);
    }
  }, [isHovered, drawHoverRing]);

  const textStyle = new PIXI.TextStyle({
    fontFamily: "Tomorrow, sans-serif",
    fontSize: 14,
    fill: "white",
  });

  const summaryStyle = new PIXI.TextStyle({
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 12,
    fill: "white",
    wordWrap: true,
    wordWrapWidth: 200,
  });

  // Subtle pulsing animation
  useEffect(() => {
    if (nodeRef.current && raysRef.current) {
      // Pulse the sun core
      gsap.to(nodeRef.current.scale, {
        x: 1.08,
        y: 1.08,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Rotate rays slowly
      gsap.to(raysRef.current, {
        rotation: Math.PI * 2,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // Pulse ray opacity between 0.5 and 0.9
      gsap.fromTo(
        raysRef.current,
        { alpha: 0.5 },
        {
          alpha: 0.9,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }
      );
    }
  }, []);

  const handlePointerOver = () => {
    setIsHovered(true);
    if (node.path) {
      router.prefetch(node.path);
    }
    // Enhanced sun pulse on hover
    gsap.to(nodeRef.current.scale, {
      x: 1.3,
      y: 1.3,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(nodeRef.current, {
      alpha: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    // Animate golden ring expansion
    if (hoverRingRef.current) {
      gsap.to(hoverRingRef.current.scale, {
        x: 1.15,
        y: 1.15,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(hoverRingRef.current, {
        alpha: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
    // Brighten rays on hover
    if (raysRef.current) {
      gsap.to(raysRef.current, {
        alpha: 0.9,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(raysRef.current.scale, {
        x: 1.1,
        y: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    gsap.to(nodeRef.current.scale, {
      x: 1.08,
      y: 1.08,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(nodeRef.current, {
      alpha: 0.9,
      duration: 0.3,
      ease: "power2.out",
    });
    // Fade out golden ring
    if (hoverRingRef.current) {
      gsap.to(hoverRingRef.current.scale, {
        x: 1,
        y: 1,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(hoverRingRef.current, {
        alpha: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
    // Restore rays
    if (raysRef.current) {
      gsap.to(raysRef.current, {
        alpha: 0.6,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(raysRef.current.scale, {
        x: 1,
        y: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleClick = () => {
    if (node.path) {
      const tl = gsap.timeline();
      tl.to(canvasContainerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "quint-out",
      });
      tl.call(() => router.push(node.path));
    }
  };

  return (
    <pixiContainer
      ref={containerRef}
      x={(node.x / 100) * window.innerWidth}
      y={(node.y / 100) * window.innerHeight}
      pointerover={handlePointerOver}
      pointerout={handlePointerOut}
      pointertap={handleClick}
    >
      {/* Rays layer - behind everything */}
      <pixiGraphics ref={raysRef} draw={drawRays} alpha={0.5} />
      {/* Hover ring - rendered behind the sun */}
      <pixiGraphics ref={hoverRingRef} draw={drawHoverRing} alpha={0} />
      {/* Sun node */}
      <pixiGraphics ref={nodeRef} draw={draw} alpha={0.9} />
      {/* Label text */}
      <pixiText text={node.label} anchor={0.5} y={-45} style={textStyle} />
      {/* Summary text on hover */}
      {isHovered && node.summary && (
        <pixiText
          text={node.summary}
          anchor={0.5}
          y={45}
          style={summaryStyle}
        />
      )}
    </pixiContainer>
  );
};

const NeuralMap = () => {
  const canvasContainerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const drawLines = useCallback((g: PIXI.Graphics) => {
    g.clear();
    mapData.forEach((node) => {
      if (node.linksTo) {
        node.linksTo.forEach((linkId) => {
          const linkedNode = mapData.find((n) => n.id === linkId);
          if (linkedNode) {
            g.moveTo(
              (node.x / 100) * window.innerWidth,
              (node.y / 100) * window.innerHeight
            );
            g.lineTo(
              (linkedNode.x / 100) * window.innerWidth,
              (linkedNode.y / 100) * window.innerHeight
            );
            g.stroke({ width: 2, color: 0xffd700, alpha: 0.4, cap: 'round' });
          }
        });
      }
    });
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={canvasContainerRef}
      className="absolute top-0 left-0 w-full h-full"
    >
      <Application
        width={window.innerWidth}
        height={window.innerHeight}
        options={{
          backgroundAlpha: 0,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        }}
        className="particle-background-canvas"
      >
        <GrowingGraphFX />
        <pixiGraphics draw={drawLines} />
        {mapData.map((node) => (
          <InteractiveNode
            key={node.id}
            node={node}
            canvasContainerRef={canvasContainerRef}
          />
        ))}
      </Application>
    </div>
  );
};

export default NeuralMap;
