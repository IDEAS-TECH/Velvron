'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Animated floating particles
function FloatingParticles({ count = 50 }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ],
        scale: Math.random() * 0.1 + 0.05,
        speed: Math.random() * 0.01 + 0.005
      });
    }
    return temp;
  }, [count]);

  return particles.map((particle, i) => (
    <Particle key={i} {...particle} />
  ));
}

function Particle({ position, scale, speed }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 10) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[scale, 16, 16]} />
      <meshStandardMaterial 
        color="#977DFF" 
        emissive="#977DFF" 
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

// Animated 3D geometric text replacement
function AnimatedLogo({ position, type = "box" }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case "cone":
        return <coneGeometry args={[1, 2, 32]} />;
      case "sphere":
        return <sphereGeometry args={[1, 32, 32]} />;
      default:
        return <boxGeometry args={[2, 2, 2]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {getGeometry()}
        <meshStandardMaterial 
          color="#F2E6EE" 
          metalness={0.9}
          roughness={0.1}
          emissive="#977DFF"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Main 3D scene component
function Scene({ mousePosition }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#977DFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#F2E6EE" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.6} color="#977DFF" />
      
      <Stars radius={50} depth={25} count={1000} factor={2} saturation={0} fade speed={1} />
      <FloatingParticles count={15} />
      
      <AnimatedLogo position={[0, 1, 0]} type="torus" />
      <AnimatedLogo position={[0, -1, 0]} type="sphere" />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        maxPolarAngle={Math.PI * 0.45}
        minPolarAngle={Math.PI * 0.45}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Canvas wrapper component
export default function ThreeScene({ mousePosition }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        className="opacity-90"
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
