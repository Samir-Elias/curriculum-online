import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MorphingTransition = ({ children, isLoading, onTransitionComplete }) => {
  const [morphPhase, setMorphPhase] = useState('loading'); // loading, morphing, complete
  const [morphProgress, setMorphProgress] = useState(0);

  useEffect(() => {
    if (!isLoading && morphPhase === 'loading') {
      // Iniciar fase de morphing
      setMorphPhase('morphing');
      
      // Animación de morphing progresivo
      const morphInterval = setInterval(() => {
        setMorphProgress(prev => {
          if (prev >= 100) {
            clearInterval(morphInterval);
            setMorphPhase('complete');
            if (onTransitionComplete) {
              onTransitionComplete();
            }
            return 100;
          }
          return prev + 2;
        });
      }, 20); // 20ms = 2 segundos total

      return () => clearInterval(morphInterval);
    }
  }, [isLoading, morphPhase, onTransitionComplete]);

  const getMorphStyle = () => {
    if (morphPhase === 'loading') {
      return {
        opacity: 1,
        filter: 'blur(0px)',
        transform: 'scale(1)',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)'
      };
    }

    if (morphPhase === 'morphing') {
      const blurAmount = (morphProgress / 100) * 10; // 0 a 10px blur
      const scaleAmount = 1 - (morphProgress / 100) * 0.1; // 1 a 0.9 scale
      const opacityAmount = 1 - (morphProgress / 100) * 0.5; // 1 a 0.5 opacity
      
      return {
        opacity: opacityAmount,
        filter: `blur(${blurAmount}px)`,
        transform: `scale(${scaleAmount})`,
        background: `linear-gradient(135deg, 
          rgba(15, 23, 42, ${1 - morphProgress / 100}) 0%, 
          rgba(30, 58, 138, ${1 - morphProgress / 100}) 50%, 
          rgba(15, 23, 42, ${1 - morphProgress / 100}) 100%)`
      };
    }

    return {
      opacity: 0,
      filter: 'blur(20px)',
      transform: 'scale(0.8)',
      background: 'transparent'
    };
  };

  const getContentStyle = () => {
    if (morphPhase === 'loading') {
      return {
        opacity: 0,
        filter: 'blur(20px)',
        transform: 'scale(0.8)'
      };
    }

    if (morphPhase === 'morphing') {
      const opacityAmount = (morphProgress / 100) * 1; // 0 a 1 opacity
      const blurAmount = 20 - (morphProgress / 100) * 20; // 20 a 0px blur
      const scaleAmount = 0.8 + (morphProgress / 100) * 0.2; // 0.8 a 1 scale
      
      return {
        opacity: opacityAmount,
        filter: `blur(${blurAmount}px)`,
        transform: `scale(${scaleAmount})`
      };
    }

    return {
      opacity: 1,
      filter: 'blur(0px)',
      transform: 'scale(1)'
    };
  };

  return (
    <div className="morphing-transition">
      {/* Overlay de morphing que se desvanece */}
      <AnimatePresence>
        {morphPhase !== 'complete' && (
          <motion.div
            className="morphing-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...getMorphStyle()
            }}
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
          >
            {/* Contenido del loading que se morpha */}
            <div className="morphing-content">
              <div className="mate-container">
                                 <div className="mate-icon">
                   <svg width="200" height="200" viewBox="0 0 100 100">
                     {/* Sombra del mate */}
                     <defs>
                       <filter id="mateShadow" x="-50%" y="-50%" width="200%" height="200%">
                         <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
                         <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(16, 185, 129, 0.2)"/>
                       </filter>
                     </defs>
                     
                     {/* Círculos con sombra */}
                     <circle cx="50" cy="50" r="45" fill="none" stroke="#10B981" strokeWidth="2" filter="url(#mateShadow)"/>
                     <circle cx="50" cy="50" r="35" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.6" filter="url(#mateShadow)"/>
                     <circle cx="50" cy="50" r="25" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.4" filter="url(#mateShadow)"/>
                   </svg>
                 </div>
                <div className="morphing-text">
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

      {/* Contenido principal que aparece gradualmente */}
      <motion.div
        className="main-content"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          overflowY: 'auto',
          ...getContentStyle(),
          transition: 'all 0.1s ease-out'
        }}
      >
        {children}
      </motion.div>

      <style jsx>{`
        .morphing-transition {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .morphing-content {
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

        .morphing-text h2 {
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

export default MorphingTransition;
