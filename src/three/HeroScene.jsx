/**
 * HeroScene — Floating wireframe icosahedron, orbiting code-symbol particles,
 * and a slow-rotating holographic grid. Reacts to mouse movement.
 * Lazy-loaded; falls back gracefully on low-power/mobile/reduced-motion.
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/* ── Code-symbol particles ── */
const SYMBOLS = ['{', '}', '</', '>', '01', '+', '()', '=>'];

function CodeParticle({ symbol, position, speed, radius }) {
  const ref = useRef();
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset.current;
    ref.current.position.x = position[0] + Math.cos(t) * 0.3;
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.3;
    ref.current.position.z = position[2] + Math.sin(t) * 0.2;
    ref.current.material.opacity = 0.35 + Math.sin(t * 1.3) * 0.2;
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.18}
      color="#c084fc"
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={0.5}
    >
      {symbol}
    </Text>
  );
}

/* ── Holographic grid ── */
function HoloGrid() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * 0.02;
    ref.current.material.opacity = 0.08 + Math.sin(clock.getElapsedTime() * 0.5) * 0.03;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[20, 20, 30, 30]} />
      <meshBasicMaterial
        color="#7c3aed"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

/* ── Wireframe icosahedron ── */
function WireIcosahedron({ mouse }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.12 + mouse.y * 0.15;
    ref.current.rotation.y = t * 0.18 + mouse.x * 0.15;
    // Subtle float
    ref.current.position.y = Math.sin(t * 0.5) * 0.12;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

/* ── Neural network node dots ── */
function NodeGraph() {
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      arr.push(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4
      );
    }
    return new Float32Array(arr);
  }, []);

  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={points}
          count={points.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c084fc"
        size={0.06}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Main exported scene ── */
export default function HeroScene({ mouse }) {
  // Generate particle data once
  const particles = useMemo(
    () =>
      SYMBOLS.map((sym, i) => ({
        symbol: sym,
        position: [
          Math.cos((i / SYMBOLS.length) * Math.PI * 2) * 3.2,
          Math.sin((i / SYMBOLS.length) * Math.PI * 2) * 2.2,
          (Math.random() - 0.5) * 1.5,
        ],
        speed: 0.18 + i * 0.03,
        radius: 0.3,
      })),
    []
  );

  return (
    <>
      {/* Ambient + point lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#a855f7" />
      <pointLight position={[-3, -2, -3]} intensity={0.8} color="#7c3aed" />

      <HoloGrid />
      <WireIcosahedron mouse={mouse} />
      <NodeGraph />

      {particles.map((p) => (
        <CodeParticle key={p.symbol + p.position[0]} {...p} />
      ))}
    </>
  );
}
