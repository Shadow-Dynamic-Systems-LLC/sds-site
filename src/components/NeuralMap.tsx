"use client";

import { Application, extend } from "@pixi/react";
import GrowingGraphFX from "./GrowingGraphFX";
import mapData from "@/lib/mapData.json";
import * as PIXI from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

extend({ Graphics: PIXI.Graphics, Text: PIXI.Text });

const InteractiveNode = ({ node, canvasContainerRef }) => {
  const router = useRouter();
  const nodeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(0xff4500, 0.5);
    g.drawCircle(0, 0, 10);
    g.endFill();
  }, []);

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

  const handlePointerOver = () => {
    setIsHovered(true);
    if (node.path) {
      router.prefetch(node.path);
    }
    gsap.to(nodeRef.current, {
      pixi: { scale: 1.5, alpha: 1 },
      duration: 0.3,
    });
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    gsap.to(nodeRef.current, {
      pixi: { scale: 1, alpha: 0.5 },
      duration: 0.3,
    });
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
    <pixiGraphics
      ref={nodeRef}
      draw={draw}
      x={(node.x / 100) * window.innerWidth}
      y={(node.y / 100) * window.innerHeight}
      interactive
      pointerover={handlePointerOver}
      pointerout={handlePointerOut}
      click={handleClick}
      alpha={0.5}
    >
      <pixiText text={node.label} anchor={0.5} y={-20} style={textStyle} />
      {isHovered && node.summary && (
        <pixiText
          text={node.summary}
          anchor={0.5}
          y={20}
          style={summaryStyle}
        />
      )}
    </pixiGraphics>
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
            g.lineStyle(1, 0xffd700, 0.3);
            g.moveTo(
              (node.x / 100) * window.innerWidth,
              (node.y / 100) * window.innerHeight
            );
            g.lineTo(
              (linkedNode.x / 100) * window.innerWidth,
              (linkedNode.y / 100) * window.innerHeight
            );
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
        options={{ backgroundAlpha: 0 }}
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
