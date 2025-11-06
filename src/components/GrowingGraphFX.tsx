"use client";

import { useTick, extend } from "@pixi/react";
import { useCallback, useState } from "react";
import * as PIXI from "pixi.js";

extend({ Graphics: PIXI.Graphics });

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
}

const GrowingGraphFX = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useTick((delta) => {
    // Add new particles
    if (Math.random() > 0.5) {
      const newParticle = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        alpha: 0.3,
      };
      setParticles((prev) => [...prev, newParticle]);
    }

    // Update and filter particles
    setParticles((prev) =>
      prev
        .map((p) => ({
          ...p,
          x: p.x + p.vx * delta,
          y: p.y + p.vy * delta,
          alpha: p.alpha - 0.001 * delta,
        }))
        .filter(
          (p) =>
            p.alpha > 0 &&
            p.x > 0 &&
            p.x < window.innerWidth &&
            p.y > 0 &&
            p.y < window.innerHeight
        )
    );
  });

  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    particles.forEach((p) => {
      g.beginFill(0xffd700, p.alpha);
      g.drawCircle(p.x, p.y, 2);
      g.endFill();
    });
  }, [particles]);

  return <pixiGraphics draw={draw} />;
};

export default GrowingGraphFX;
