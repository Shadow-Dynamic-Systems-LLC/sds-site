import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial, useTexture, ScreenQuad } from '@react-three/drei';
import * as THREE from 'three';

import { crackTextureVert, crackTextureFrag } from './shaders/crackTexture';

// Import all crack images from assets folder at build time
const crackImages = import.meta.glob('/public/assets/cracks/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const crackPaths = Object.values(crackImages).map(url => url.replace('/public', ''));

export interface CrackBackgroundProps {
    paused?: boolean;
    timeScale?: number; // For testing: set to 60 to make 1 real second = 1 shader minute
}

// Seeded random for consistent positions per session
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Pick n random items from array using seed
function pickRandom<T>(arr: T[], n: number, seed: number): T[] {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(seed + i) * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, n);
}

// Generate edge position avoiding center (0.3-0.7 zone)
function edgePosition(r1: number, r2: number): THREE.Vector2 {
    // Pick which edge: 0=left, 1=right, 2=top, 3=bottom
    const edge = Math.floor(r1 * 4);
    let x: number, y: number;

    switch (edge) {
        case 0: // left edge
            x = 0.05 + r2 * 0.2; // 0.05 - 0.25
            y = 0.1 + r1 * 0.8;  // full height
            break;
        case 1: // right edge
            x = 0.75 + r2 * 0.2; // 0.75 - 0.95
            y = 0.1 + r1 * 0.8;
            break;
        case 2: // top edge
            x = 0.1 + r1 * 0.8;
            y = 0.05 + r2 * 0.2; // 0.05 - 0.25
            break;
        default: // bottom edge
            x = 0.1 + r1 * 0.8;
            y = 0.75 + r2 * 0.2; // 0.75 - 0.95
            break;
    }
    return new THREE.Vector2(x, y);
}

function generateCrackTransforms(seed: number) {
    // Generate random positions, scales, rotations for 3 cracks
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + 1);
    const r3 = seededRandom(seed + 2);
    const r4 = seededRandom(seed + 3);
    const r5 = seededRandom(seed + 4);
    const r6 = seededRandom(seed + 5);
    const r7 = seededRandom(seed + 6);
    const r8 = seededRandom(seed + 7);
    const r9 = seededRandom(seed + 8);

    return {
        pos1: edgePosition(r1, r2),
        pos2: edgePosition(r3, r4),
        pos3: edgePosition(r5, r6),
        scale1: 0.15 + r7 * 0.15,
        scale2: 0.15 + r8 * 0.15,
        scale3: 0.15 + r9 * 0.15,
        rot1: r1 * Math.PI * 2,
        rot2: r3 * Math.PI * 2,
        rot3: r5 * Math.PI * 2,
    };
}

// Create the shader material
const CrackMaterial = shaderMaterial(
    {
        u_crack1: null,
        u_crack2: null,
        u_crack3: null,
        u_time: 0,
        u_res: new THREE.Vector2(1, 1),
        u_pos1: new THREE.Vector2(0.5, 0.5),
        u_pos2: new THREE.Vector2(0.3, 0.7),
        u_pos3: new THREE.Vector2(0.7, 0.3),
        u_scale1: 0.5,
        u_scale2: 0.5,
        u_scale3: 0.5,
        u_rot1: 0,
        u_rot2: 0,
        u_rot3: 0,
    },
    crackTextureVert,
    crackTextureFrag
);

extend({ CrackMaterial });

declare module '@react-three/fiber' {
    interface ThreeElements {
        crackMaterial: any;
    }
}

export function CrackBackground({ paused = false, timeScale = 1 }: CrackBackgroundProps) {
    const { size } = useThree();
    const matRef = useRef<any>(null);
    const timeRef = useRef(0);

    // Generate session seed and select random images
    const sessionSeed = useMemo(() => Math.random() * 10000, []);
    const selectedPaths = useMemo(() => pickRandom(crackPaths, 3, sessionSeed), [sessionSeed]);
    const transforms = useMemo(() => generateCrackTransforms(sessionSeed), [sessionSeed]);

    // Load crack textures - randomly selected from available images
    const [crack1, crack2, crack3] = useTexture(selectedPaths);

    // Set texture wrapping
    useEffect(() => {
        [crack1, crack2, crack3].forEach(tex => {
            tex.wrapS = THREE.ClampToEdgeWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
        });
    }, [crack1, crack2, crack3]);

    useFrame((_, delta) => {
        if (paused) return;

        timeRef.current += delta * timeScale;

        if (matRef.current) {
            matRef.current.uniforms.u_time.value = timeRef.current;
            matRef.current.uniforms.u_res.value.set(size.width, size.height);

            // Set textures
            matRef.current.uniforms.u_crack1.value = crack1;
            matRef.current.uniforms.u_crack2.value = crack2;
            matRef.current.uniforms.u_crack3.value = crack3;

            // Set transforms
            matRef.current.uniforms.u_pos1.value = transforms.pos1;
            matRef.current.uniforms.u_pos2.value = transforms.pos2;
            matRef.current.uniforms.u_pos3.value = transforms.pos3;
            matRef.current.uniforms.u_scale1.value = transforms.scale1;
            matRef.current.uniforms.u_scale2.value = transforms.scale2;
            matRef.current.uniforms.u_scale3.value = transforms.scale3;
            matRef.current.uniforms.u_rot1.value = transforms.rot1;
            matRef.current.uniforms.u_rot2.value = transforms.rot2;
            matRef.current.uniforms.u_rot3.value = transforms.rot3;
        }
    });

    return (
        <ScreenQuad>
            <crackMaterial ref={matRef} />
        </ScreenQuad>
    );
}
