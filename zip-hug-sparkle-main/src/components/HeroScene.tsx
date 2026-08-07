import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#4dd8b0"
          roughness={0.15}
          metalness={0.9}
          distort={0.35}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#4dd8b0"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingRing({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = rotation[0] + state.clock.elapsedTime * 0.3;
      ringRef.current.rotation.z = rotation[2] + state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} transparent opacity={0.6} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#4dd8b0" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#a855f7" />
        <AnimatedSphere />
        <Particles />
        <FloatingRing position={[3, 1, -2]} rotation={[0.5, 0, 0.3]} />
        <FloatingRing position={[-3, -1, -3]} rotation={[0.8, 0, 0.6]} />
      </Canvas>
    </div>
  );
}
