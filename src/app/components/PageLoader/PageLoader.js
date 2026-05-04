'use client';

import { useState, useEffect } from 'react';

const PageLoader = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 1800ms
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    // Complete after fade animation (600ms)
    const completeTimer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes letterRise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes overlayFade {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .page-loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #060112;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.6s ease;
        }
        .page-loader-overlay.fade-out {
          opacity: 0;
        }
        .loader-text {
          font-family: 'Telma', sans-serif;
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 900;
          letter-spacing: 0.05em;
          color: #ffffff;
        }
        .loader-letter {
          display: inline-block;
          opacity: 0;
          animation: letterRise 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      
      <div className={`page-loader-overlay ${fadeOut ? 'fade-out' : ''}`}>
        <div className="loader-text">
          {'VELVRON'.split('').map((letter, index) => (
            <span
              key={index}
              className="loader-letter"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default PageLoader;
