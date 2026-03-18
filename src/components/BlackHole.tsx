"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from 'three';

interface ModelProps {
  modelPath: string;
  scale?: number;
}

function Model({ modelPath, scale = 1 }: ModelProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3; // Continuous Y axis rotation
    }
  });

  return (
    <group 
      ref={groupRef} 
      scale={scale}
      // Flipped on X-axis (Math.PI) to show bottom as front, plus tilt (0.5)
      rotation={[Math.PI + 0.5, 0, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function BlackHole({ modelPath, scale = 1 }: ModelProps) {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        <Environment preset="studio" />

        <Model modelPath={modelPath} scale={scale} />
      </Suspense>
    </Canvas>
  );
}

// Preload the current model
useGLTF.preload("/blackholefire.glb");