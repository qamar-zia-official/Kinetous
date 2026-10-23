"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Decorative animated "silk" shader background.
 *
 * Reconstructed after the original Silk.jsx was lost during the monorepo
 * migration (it was untracked). Behaviour: a slowly waving colour-field
 * rendered on a full-bleed canvas. Pass `color` to tint the silk.
 */
export default function Silk({
    color = "#07164F",
    speed = 1,
    scale = 1,
    className,
}: {
    color?: string;
    speed?: number;
    scale?: number;
    className?: string;
}) {
    return (
        <div className={className} aria-hidden="true">
            <Canvas
                dpr={1}
                gl={{ antialias: false, alpha: true }}
                camera={{ position: [0, 0, 1], fov: 75 }}
            >
                <SilkPlane color={color} speed={speed} scale={scale} />
            </Canvas>
        </div>
    );
}

const vertexShader = /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uScale;

    void main() {
        vUv = uv;
        vec3 pos = position;
        pos.z += sin(pos.x * 3.0 + uTime) * 0.05 * uScale;
        pos.z += cos(pos.y * 4.0 + uTime * 0.8) * 0.04 * uScale;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const fragmentShader = /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;

    void main() {
        vec2 uv = vUv;
        float wave1 = sin(uv.x * 6.0 + uTime) * 0.5 + 0.5;
        float wave2 = sin(uv.y * 5.0 - uTime * 0.7 + wave1) * 0.5 + 0.5;
        float wave3 = sin((uv.x + uv.y) * 4.0 + uTime * 0.5) * 0.5 + 0.5;

        float shade = mix(0.6, 1.2, wave1 * wave2 * wave3);
        vec3 color = uColor * shade;
        gl_FragColor = vec4(color, 1.0);
    }
`;

function SilkPlane({
    color,
    speed,
    scale,
}: {
    color: string;
    speed: number;
    scale: number;
}) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(color) },
            uScale: { value: scale },
        }),
        [color, scale],
    );

    useFrame((_, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime!.value += delta * speed;
            (materialRef.current.uniforms.uColor!.value as THREE.Color).set(
                color,
            );
        }
    });

    return (
        <mesh>
            <planeGeometry args={[4, 4]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}
