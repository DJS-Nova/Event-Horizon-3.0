"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Starfield({ count = 4000 }) {
    const points = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const radius = 200;

            arr[i * 3] = (Math.random() - 0.5) * radius;
            arr[i * 3 + 1] = (Math.random() - 0.5) * radius;
            arr[i * 3 + 2] = -Math.random() * radius;
        }

        return arr;
    }, [count]);

    useFrame((_, delta) => {
        if (!points.current) return;

        points.current.rotation.y += delta * 0.01;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                size={0.7}
                color="#ffffff"
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}