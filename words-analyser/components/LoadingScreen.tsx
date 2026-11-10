'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uProgress;
  void main() {
    vec2 c = vUv - 0.5;
    float r = length(c);
    float ring = smoothstep(0.40, 0.43, r) - smoothstep(0.47, 0.50, r);
    float angle = atan(c.x, -c.y) / 6.2831853 + 0.5;
    float filled = step(angle, uProgress);
    vec3 base = vec3(0.88);
    vec3 acc = vec3(0.10);
    vec3 col = mix(base, acc, filled);
    gl_FragColor = vec4(col, ring);
  }
`;

function ProgressRing({ onDone }: { onDone: () => void }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const startRef = useRef<number>(0);
  const doneRef = useRef(false);

  useEffect(() => {
    startRef.current = performance.now();
  }, []);

  useFrame(() => {
    if (!matRef.current) return;
    const t = (performance.now() - startRef.current) / 1800;
    const p = Math.min(1, t);
    matRef.current.uniforms.uProgress.value = p;
    if (p >= 1 && !doneRef.current) {
      doneRef.current = true;
      setTimeout(onDone, 220);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[1.8, 1.8]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uProgress: { value: 0 } }}
        transparent
      />
    </mesh>
  );
}

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-paper"
    >
      <div className="h-44 w-44 sm:h-56 sm:w-56">
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 2], fov: 50 }}>
          <ProgressRing
            onDone={() => {
              setDone(true);
              setTimeout(onDone, 260);
            }}
          />
        </Canvas>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-6 text-center"
      >
        <p className="text-fluid-base font-medium tracking-tight">Words Analyser</p>
        <p className="text-fluid-sm text-ink/45 mt-1">Calibrating</p>
      </motion.div>
    </motion.div>
  );
}
