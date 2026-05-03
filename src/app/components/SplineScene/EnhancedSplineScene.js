'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Enhanced Spline scene with interactive features
const EnhancedSplineScene = ({ 
  sceneUrl, 
  className = '', 
  enableScroll = true,
  scrollSpeed = 0.5,
  rotationSpeed = 0.001,
  autoRotate = true,
  ...props 
}) => {
  const splineRef = useRef();
  const containerRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  // Handle Spline scene events
  const handleSplineLoad = (splineApp) => {
    setIsLoading(false);
    splineRef.current = splineApp;
    
    // Enable scroll-based animations if requested
    if (enableScroll && containerRef.current) {
      setupScrollAnimations(splineApp);
    }

    // Setup interactive elements
    setupInteractiveElements(splineApp);
  };

  const setupScrollAnimations = (splineApp) => {
    // Find 3D objects in the scene
    const objects = splineApp.getAllObjects();
    
    objects.forEach((obj, index) => {
      // Create parallax effect for different objects
      gsap.fromTo(obj, 
        { position: obj.position },
        {
          position: {
            x: obj.position.x,
            y: obj.position.y + (index % 3) * 20,
            z: obj.position.z
          },
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              // Smooth rotation based on scroll
              if (obj.rotation) {
                obj.rotation.y += rotationSpeed * self.direction;
              }
            }
          }
        }
      );
    });
  };

  const setupInteractiveElements = (splineApp) => {
    // Find interactive objects (those with event listeners)
    const interactiveObjects = splineApp.getAllObjects().filter(obj => {
      return obj.name && (obj.name.includes('button') || obj.name.includes('interactive'));
    });

    interactiveObjects.forEach(obj => {
      // Add hover effects
      obj.addEventListener('mouseDown', () => {
        gsap.to(obj.scale, {
          x: 0.95,
          y: 0.95,
          z: 0.95,
          duration: 0.1,
          ease: 'power2.inOut'
        });
      });

      obj.addEventListener('mouseUp', () => {
        gsap.to(obj.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: 'elastic.out(1, 0.3)'
        });
      });

      obj.addEventListener('mouseHover', () => {
        gsap.to(obj.scale, {
          x: 1.05,
          y: 1.05,
          z: 1.05,
          duration: 0.2,
          ease: 'power2.inOut'
        });
      });
    });
  };

  const handleSplineError = (err) => {
    console.error('Spline scene loading error:', err);
    setError(err);
    setIsLoading(false);
  };

  // Fallback 3D scene if Spline fails
  const FallbackScene = () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center text-white/60">
        <div className="text-4xl mb-4">✨</div>
        <p>3D Scene Loading...</p>
      </div>
    </div>
  );

  if (error) {
    return <FallbackScene />;
  }

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full relative ${className}`}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#080D2E]/80 to-[#080D2E]/40 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-[#977DFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/80 text-sm">Loading 3D Experience...</p>
          </div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 100], fov: 50 }}
        className="w-full h-full"
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#977DFF" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#F2E6EE" />
        
        <Suspense fallback={null}>
          <Spline
            scene={sceneUrl}
            onLoad={handleSplineLoad}
            onError={handleSplineError}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI * 0.45}
          minPolarAngle={Math.PI * 0.45}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
        />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

// Interactive Spline component with custom controls
export const InteractiveSplineObject = ({ 
  sceneUrl, 
  objectName,
  onInteraction,
  className = '',
  ...props 
}) => {
  const splineRef = useRef();
  const [objectFound, setObjectFound] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  const handleSplineLoad = (splineApp) => {
    splineRef.current = splineApp;
    
    // Find specific object by name
    const targetObject = splineApp.findObjectByName(objectName);
    
    if (targetObject) {
      setObjectFound(true);
      
      // Add interaction listeners
      targetObject.addEventListener('mouseDown', () => {
        if (onInteraction) onInteraction('click', targetObject);
        
        // Visual feedback
        gsap.to(targetObject.scale, {
          x: 0.9,
          y: 0.9,
          z: 0.9,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        });
      });

      targetObject.addEventListener('mouseHover', () => {
        if (onInteraction) onInteraction('hover', targetObject);
        
        gsap.to(targetObject.scale, {
          x: 1.1,
          y: 1.1,
          z: 1.1,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      });
    } else {
      console.warn(`Object "${objectName}" not found in Spline scene`);
    }
  };

  return (
    <div className={`w-full h-full ${className}`} {...props}>
      <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#977DFF" />
        
        <Suspense fallback={null}>
          <Spline
            scene={sceneUrl}
            onLoad={handleSplineLoad}
          />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxDistance={100}
          minDistance={20}
        />
      </Canvas>
    </div>
  );
};

export default EnhancedSplineScene;
