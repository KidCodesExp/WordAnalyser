'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function GlassOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.12;
      ref.current.rotation.x += d * 0.04;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 6]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          metalness={0}
          transmission={0.95}
          thickness={1.2}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.08}
          attenuationColor="#f2f2f4"
          attenuationDistance={2}
        />
      </mesh>
    </Float>
  );
}

function FloatingNodes() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.05;
  });

  return (
    <group ref={group}>
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        const r = 2.2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * r,
              Math.sin(angle * 1.7) * 0.6,
              Math.sin(angle) * r,
            ]}
          >
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#1a1a1a" transparent opacity={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={0.8} />
        <GlassOrb />
        <FloatingNodes />
        <Environment resolution={128}>
          <Lightformer intensity={2.2} position={[0, 4, 3]} scale={[10, 10, 1]} />
          <Lightformer intensity={1.2} position={[-4, 0, 3]} scale={[6, 6, 1]} />
          <Lightformer intensity={1.4} position={[4, -1, 2]} scale={[6, 6, 1]} color="#e8e8ec" />
          <Lightformer intensity={0.8} position={[0, -4, 2]} scale={[8, 8, 1]} color="#f4f4f6" />
        </Environment>
      </Canvas>
    </div>
  );
}
