'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Super animated typewriter with multiple phrases, glitch effects, and cursor animations
const phrases = [
  "We help startups and enterprises build scalable, secure, and user-centric applications with cutting-edge technology.",
  "Transforming ideas into powerful digital experiences that drive growth and innovation.",
  "Building the future with AI, cloud infrastructure, and modern web technologies.",
  "From concept to deployment — we deliver excellence at every step of your journey.",
];

export default function TypewriterText({ className = '' }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);

  const currentPhrase = phrases[currentPhraseIndex];

  // Typing speed configuration
  const TYPING_SPEED = 35; // ms per character
  const DELETING_SPEED = 20; // ms per character when deleting
  const PAUSE_AT_END = 2500; // pause after typing complete
  const PAUSE_BEFORE_DELETE = 1000; // pause before starting to delete
  const GLITCH_CHANCE = 0.03; // 3% chance of glitch per character

  // Glitch characters
  const glitchChars = '!<>-_\\/[]{}—=+*^?#@$%&';

  const getGlitchChar = () => glitchChars[Math.floor(Math.random() * glitchChars.length)];

  const typewriterEffect = useCallback(() => {
    if (isTyping && !isDeleting) {
      // Typing phase
      if (displayText.length < currentPhrase.length) {
        const nextChar = currentPhrase[displayText.length];
        
        // Random glitch effect
        if (Math.random() < GLITCH_CHANCE && displayText.length > 5) {
          setIsGlitching(true);
          setDisplayText(prev => prev + getGlitchChar());
          setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1) + nextChar);
            setIsGlitching(false);
          }, 50);
        } else {
          setDisplayText(prev => prev + nextChar);
        }
      } else {
        // Finished typing - pause then start deleting
        setIsTyping(false);
        setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AT_END);
      }
    } else if (isDeleting) {
      // Deleting phase
      if (displayText.length > 0) {
        setDisplayText(prev => prev.slice(0, -1));
      } else {
        // Finished deleting - move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTimeout(() => {
          setIsTyping(true);
        }, PAUSE_BEFORE_DELETE);
      }
    }
  }, [displayText, currentPhrase, isTyping, isDeleting]);

  // Run typewriter effect
  useEffect(() => {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const timer = setTimeout(typewriterEffect, speed);
    return () => clearTimeout(timer);
  }, [typewriterEffect, isDeleting]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <motion.p 
      className={`${className} relative`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="relative">
        {displayText}
        
        {/* Glitch overlay */}
        <AnimatePresence>
          {isGlitching && (
            <motion.span
              initial={{ opacity: 0, x: -2 }}
              animate={{ opacity: [0, 1, 0, 1, 0], x: [-2, 2, -1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 text-red-400"
              style={{ 
                textShadow: '2px 0 #ff0000, -2px 0 #00ff00',
                clipPath: 'inset(10% 0 30% 0)'
              }}
            >
              {displayText}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      
      {/* Animated cursor */}
      <motion.span
        className="inline-block ml-0.5"
        animate={{ 
          opacity: showCursor ? 1 : 0,
          scaleY: isTyping ? [1, 1.3, 1] : 1,
        }}
        transition={{ 
          opacity: { duration: 0.1 },
          scaleY: { duration: 0.2, repeat: isTyping ? Infinity : 0, repeatDelay: 0.5 }
        }}
      >
        <span 
          className="inline-block w-0.5 h-5 bg-gradient-to-b from-violet-400 to-blue-400 rounded-sm"
          style={{ 
            boxShadow: '0 0 10px rgba(151, 125, 255, 0.8), 0 0 20px rgba(56, 189, 248, 0.5)'
          }}
        />
      </motion.span>

      {/* Hidden full text for accessibility */}
      <span className="sr-only">{currentPhrase}</span>
    </motion.p>
  );
}
