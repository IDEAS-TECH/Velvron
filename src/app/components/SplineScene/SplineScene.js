'use client';

import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

// Loading fallback for Spline
const SplineLoader = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Interactive 3D scene with Spline
export default function SplineScene({ sceneUrl, className = "" }) {
  return (
    <div className={`absolute inset-0 z-10 ${className}`}>
      <Suspense fallback={<SplineLoader />}>
        <Spline
          scene={sceneUrl}
          style={{
            width: '100%',
            height: '100%',
            display: 'block'
          }}
          onLoad={() => console.log('Spline scene loaded')}
          onError={(error) => console.log('Spline error:', error)}
        />
      </Suspense>
    </div>
  );
}

// Alternative 3D scene using React Three Fiber if Spline URL not available
export function Alternative3DScene({ className = "" }) {
  return (
    <div className={`absolute inset-0 z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        {/* Rotating geometric shapes */}
        <mesh rotation={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial 
            color="#4f46e5" 
            metalness={0.8}
            roughness={0.2}
            emissive="#4f46e5"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        <mesh position={[3, 0, 0]} rotation={[0, 0, 0]}>
          <octahedronGeometry args={[1.5]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            metalness={0.8}
            roughness={0.2}
            emissive="#06b6d4"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        <mesh position={[-3, 0, 0]} rotation={[0, 0, 0]}>
          <tetrahedronGeometry args={[1.5]} />
          <meshStandardMaterial 
            color="#10b981" 
            metalness={0.8}
            roughness={0.2}
            emissive="#10b981"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
