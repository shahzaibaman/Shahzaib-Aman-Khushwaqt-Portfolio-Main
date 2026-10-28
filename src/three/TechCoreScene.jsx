/**
 * TechCoreScene — Interactive 3D tech core with orbiting tech-stack logos.
 * Used in the About section. Supports OrbitControls drag + auto-rotate.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Torus } from '@react-three/drei';

const TECH_LABELS = [
  { label: 'HTML',    color: '#e34c26', angle: 0 },
  { label: 'CSS',     color: '#264de4', angle: (Math.PI * 2) / 7 },
  { label: 'JS',      color: '#f7df1e', angle: (Math.PI * 4) / 7 },
  { label: 'React',   color: '#61dafb', angle: (Math.PI * 6) / 7 },
  { label: 'Node',    color: '#68a063', angle: (Math.PI * 8) / 7 },
  { label: 'MongoDB', color: '#4db33d', angle: (Math.PI * 10) / 7 },
  { label: 'C++',     color: '#00599c', angle: (Math.PI * 12) / 7 },
];

function OrbitingLabel({ label, color, angle, radius = 2.2, speed = 0.3 }) {
  const ref = useRef();
  const offset = angle;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 0.5) * 0.4;
    // Always face camera
    ref.current.rotation.y = -t;
  });

  return (
    <group ref={ref}>
      {/* Small glowing sphere as node */}
      <mesh>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      <Text
        position={[0, 0.25, 0]}
        fontSize={0.2}
        color={color}
        anchorX="center"
        anchorY="bottom"
        outlineColor="#000"
        outlineWidth={0.01}
      >
        {label}
      </Text>
    </group>
  );
}

function CoreSphere() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.4;
    ref.current.rotation.x = clock.getElapsedTime() * 0.15;
  });

  return (
    <group ref={ref}>
      {/* Inner solid core */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color="#c084fc"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

function OrbitRing() {
  return (
    <Torus args={[2.2, 0.012, 8, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} />
    </Torus>
  );
}

export default function TechCoreScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#a855f7" />
      <pointLight position={[-3, -3, -3]} intensity={1} color="#7c3aed" />

      <CoreSphere />
      <OrbitRing />

      {TECH_LABELS.map((t) => (
        <OrbitingLabel key={t.label} {...t} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
      />
    </>
  );
}
