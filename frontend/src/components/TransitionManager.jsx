import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionManager = ({ children, isLoading, onTransitionComplete }) => {
  const [transitionPhase, setTransitionPhase] = useState('loading'); // loading, distort-out, distort-in, complete
  const [distortionLevel, setDistortionLevel] = useState(0);

  useEffect(() => {
    if (!isLoading && transitionPhase === 'loading') {
      // Iniciar transición de distorsión
      setTransitionPhase('distort-out');
      
      // Efecto de distorsión hacia afuera
      const distortOutInterval = setInterval(() => {
        setDistortionLevel(prev => {
          if (prev >= 20) {
            clearInterval(distortOutInterval);
            setTransitionPhase('distort-in');
            return 20;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(distortOutInterval);
    }
  }, [isLoading, transitionPhase]);

  useEffect(() => {
    if (transitionPhase === 'distort-in') {
      // Efecto de distorsión hacia adentro
      const distortInInterval = setInterval(() => {
        setDistortionLevel(prev => {
          if (prev <= 0) {
            clearInterval(distortInInterval);
            setTransitionPhase('complete');
            if (onTransitionComplete) {
              onTransitionComplete();
            }
            return 0;
          }
          return prev - 2;
        });
      }, 50);

      return () => clearInterval(distortInInterval);
    }
  }, [transitionPhase, onTransitionComplete]);

  const getDistortionStyle = () => {
    if (transitionPhase === 'loading') {
      return {
        filter: 'blur(0px)',
        transform: 'scale(1)',
        opacity: 1
      };
    }

    const blurAmount = Math.abs(distortionLevel) * 0.5;
    const scaleAmount = 1 + (Math.abs(distortionLevel) * 0.02);
    const opacityAmount = 1 - (Math.abs(distortionLevel) * 0.03);

    return {
      filter: `blur(${blurAmount}px)`,
      transform: `scale(${scaleAmount})`,
      opacity: Math.max(0.1, opacityAmount),
      transition: 'all 0.1s ease-out'
    };
  };

  return (
    <div className="transition-manager">
      <AnimatePresence mode="wait">
        {transitionPhase !== 'complete' && (
          <motion.div
            className="transition-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...getDistortionStyle()
            }}
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
          >
            {/* Contenido estático durante la transición */}
            <div className="transition-content">
              <div className="mate-container">
                <div className="mate-icon">
                  <svg width="200" height="200" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#10B981" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.6"/>
                    <circle cx="50" cy="50" r="25" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.4"/>
                  </svg>
                </div>
                <div className="transition-text">
                  <h2 style={{ color: '#E2E8F0', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    <span>Progra</span>
                    <span style={{ color: '#10B981' }}>M</span>
                    <span>ate</span>
                  </h2>
                  <p style={{ color: '#94A3B8', fontSize: '1rem' }}>
                    Samir Elias Salatino
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal con transición suave */}
      <motion.div
        className="main-content"
        style={{
          opacity: transitionPhase === 'complete' ? 1 : 0,
          filter: transitionPhase === 'complete' ? 'blur(0px)' : 'blur(10px)',
          transform: transitionPhase === 'complete' ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.8s ease-in-out'
        }}
      >
        {children}
      </motion.div>

      <style jsx>{`
        .transition-manager {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .transition-content {
          text-align: center;
          transform: translateY(-10vh);
        }

        .mate-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .mate-icon {
          animation: pulse 2s infinite;
        }

        .transition-text h2 {
          animation: glow 2s infinite alternate;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes glow {
          from { text-shadow: 0 0 5px rgba(16, 185, 129, 0.5); }
          to { text-shadow: 0 0 20px rgba(16, 185, 129, 0.8); }
        }
      `}</style>
    </div>
  );
};

export default TransitionManager;
