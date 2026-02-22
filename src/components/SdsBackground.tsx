import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { useFBO, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

import { basicVertex } from './shaders/basicVertex';
import { fractureStateFrag } from './shaders/fractureState';
import { fractureRenderFrag } from './shaders/fractureRender';

export interface SdsBackgroundProps {
    intensity?: number;
    paused?: boolean;
}

// 1. Create Shader Materials
const FractureStateMat = shaderMaterial(
    {
        u_prevState: null,
        u_time: 0,
        u_dt: 0,
        u_res: new THREE.Vector2(0, 0),
        u_intensity: 0,
        u_seed: 0
    },
    basicVertex,
    fractureStateFrag
);

const FractureRenderMat = shaderMaterial(
    {
        u_stateTex: null,
        u_res: new THREE.Vector2(0, 0),
        u_time: 0
    },
    basicVertex,
    fractureRenderFrag
);

extend({ FractureStateMat, FractureRenderMat });

// TS Definitions for Intrinsic Elements
declare module '@react-three/fiber' {
    interface ThreeElements {
        fractureStateMat: any;
        fractureRenderMat: any;
    }
}

export function SdsBackground({ intensity = 0.5, paused = false }: SdsBackgroundProps) {
    const { gl, size, clock } = useThree();

    // FBOs
    const opts = useMemo(() => ({
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat, // Need Alpha for heat/crack separate channels
        type: THREE.HalfFloatType,
        stencilBuffer: false,
        depthBuffer: false
    }), []);

    const fboA = useFBO(size.width, size.height, opts);
    const fboB = useFBO(size.width, size.height, opts);

    // Simulation State Refs
    const simState = useRef({
        read: fboA,
        write: fboB
    });

    useEffect(() => {
        simState.current.read = fboA;
        simState.current.write = fboB;
        gl.setRenderTarget(fboA); gl.clear();
        gl.setRenderTarget(fboB); gl.clear();
        gl.setRenderTarget(null);
    }, [fboA, fboB, gl]);

    // Scene/Camera for "State" pass (offscreen)
    const stateScene = useMemo(() => new THREE.Scene(), []);
    const stateCam = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10), []);
    const stateQuad = useMemo(() => new THREE.Mesh(new THREE.PlaneGeometry(2, 2)), []);

    const stateMatRef = useRef<any>(null);
    const renderMatRef = useRef<any>(null);

    useMemo(() => {
        stateScene.add(stateQuad);
    }, [stateScene, stateQuad]);

    const seed = useMemo(() => Math.random() * 100.0, []);

    useFrame((_, delta) => {
        if (paused) return;

        // Clamp DT
        const dt = Math.min(delta, 1 / 30);
        const time = clock.getElapsedTime();

        // 1. UPDATE STATE
        const read = simState.current.read;
        const write = simState.current.write;

        // Bind State Material
        if (stateMatRef.current) {
            stateQuad.material = stateMatRef.current;
            stateMatRef.current.uniforms.u_prevState.value = read.texture;
            stateMatRef.current.uniforms.u_time.value = time;
            stateMatRef.current.uniforms.u_dt.value = dt;
            stateMatRef.current.uniforms.u_res.value.set(size.width, size.height);
            stateMatRef.current.uniforms.u_intensity.value = intensity;
            stateMatRef.current.uniforms.u_seed.value = seed;
        }

        // Render State Logic
        gl.setRenderTarget(write);
        gl.render(stateScene, stateCam);
        gl.setRenderTarget(null);

        // Swap
        const temp = simState.current.read;
        simState.current.read = simState.current.write;
        simState.current.write = temp;

        // 2. RENDER TO SCREEN
        if (renderMatRef.current) {
            renderMatRef.current.uniforms.u_stateTex.value = simState.current.read.texture;
            renderMatRef.current.uniforms.u_res.value.set(size.width, size.height);
            // RenderFrag needs time?
            if (renderMatRef.current.uniforms.u_time) {
                renderMatRef.current.uniforms.u_time.value = time;
            }
        }
    });

    return (
        <>
            <fractureStateMat ref={stateMatRef} />
            <mesh>
                <planeGeometry args={[2, 2]} />
                <fractureRenderMat ref={renderMatRef} />
            </mesh>
        </>
    );
}
