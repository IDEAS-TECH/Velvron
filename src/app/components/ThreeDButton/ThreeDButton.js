'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

// 3D animated button component
function AnimatedButton3D({ type = 'box', color = '#977DFF' }) {
  const meshRef = React.useRef();

  return (
    <mesh ref={meshRef}>
      {type === 'box' && <Box args={[1, 1, 1]} />}
      {type === 'sphere' && <Sphere args={[0.6, 32, 32]} />}
      {type === 'torus' && <Torus args={[0.5, 0.2, 16, 100]} />}
      <meshStandardMaterial 
        color={color} 
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Main 3D button wrapper
export default function ThreeDButton({ 
  children, 
  onClick, 
  className = "", 
  threeDType = 'torus',
  threeDColor = '#977DFF',
  ...props 
}) {
  return (
    <motion.button
      className={`relative overflow-hidden group ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedButton3D type={threeDType} color={threeDColor} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={2}
          />
        </Canvas>
      </div>
      
      {/* Button Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </motion.button>
  );
}
