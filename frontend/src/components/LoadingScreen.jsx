import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MateIcon from './MateIcon';
import BackgroundIcons from './BackgroundAnimation';

const LoadingScreen = ({ onLoadingComplete, showLoading }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [writingComplete, setWritingComplete] = useState(false);
  const [dotsCount, setDotsCount] = useState(0);
  const [dotsCycles, setDotsCycles] = useState(0);
  const [processingState, setProcessingState] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const promptText = "Preparar mate con yerba, agua a 80°C y azúcar";
  
  const processingStates = [
    "Preparando mate...",
    "Analizando prompt...",
    "¡Listo para tomar!"
  ];

  // Detectar si es móvil
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Efecto para la escritura del prompt
  useEffect(() => {
    if (writingComplete) return; // Si ya terminó, no hacer nada
    
    const startWriting = setTimeout(() => {
      const writeNextChar = (index) => {
        if (index < promptText.length) {
          setDisplayedText(promptText.slice(0, index + 1));
          setCurrentIndex(index + 1);
          setTimeout(() => writeNextChar(index + 1), 60); // Velocidad más lenta
        } else {
          // La escritura terminó
          setWritingComplete(true);
        }
      };
      
      writeNextChar(currentIndex);
    }, 800); // Empezar después de 0.8 segundos

    return () => clearTimeout(startWriting);
  }, [writingComplete]); // Solo depende de writingComplete

  // Efecto para cambiar estados de procesamiento después de que termine la escritura
  useEffect(() => {
    if (writingComplete) {
      const processingTimer = setTimeout(() => {
        if (processingState < processingStates.length - 1) {
          setProcessingState(processingState + 1);
        } else {
          // Terminar inmediatamente después del último estado
          setIsLoading(false);
          // Restaurar scroll
          document.body.style.overflow = 'auto';
          document.documentElement.style.overflow = 'auto';
          // Llamar inmediatamente a onLoadingComplete
          onLoadingComplete();
        }
              }, 1200); // Cada estado de procesamiento dura 1.2 segundos

      return () => clearTimeout(processingTimer);
    }
  }, [writingComplete, processingState]);

  useEffect(() => {
    // Prevenir scroll durante la carga
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // Limpiar estilos
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {showLoading && isLoading && (
        <motion.div
          className="loading-screen-fixed"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            maxHeight: '100vh',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 0,
            paddingRight: 0
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)',
            transition: { 
              duration: 0.8,
              ease: "easeInOut"
            }
          }}
        >
          {/* BackgroundIcons para todos los dispositivos (estático) */}
          <BackgroundIcons isMobile={isMobile} />
          
                        {/* CONTENEDOR FLEXBOX PRINCIPAL */}
            <motion.div
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh',
                position: 'relative',
                padding: '20px',
                boxSizing: 'border-box',
                transform: 'translateY(-8vh)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: writingComplete && processingState >= processingStates.length - 1 ? 0.8 : 1,
                filter: writingComplete && processingState >= processingStates.length - 1 ? 'blur(10px)' : 'blur(0px)'
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                scale: { duration: 1, ease: "easeInOut" },
                filter: { duration: 1, ease: "easeInOut" }
              }}
            >
                {/* Iconos estáticos de fondo para todos los dispositivos */}



                                  {/* Mate icon */}
                  <div
                    style={{
                      zIndex: 2, 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px',
                      filter: 'drop-shadow(8px 4px 12px rgba(0, 0, 0, 0.6)) drop-shadow(4px 2px 8px rgba(0, 0, 0, 0.4))'
                    }}
                  >
                    <MateIcon width={400} height={400} />
                  </div>

                                {/* TEXTO */}
                <motion.div
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                                         gap: '8px',
                     marginTop: '0px'
                  }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.8, delay: 1.2 }}
            >
              {/* PrograMate que aparece desde abajo */}
              <motion.h2 
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  textAlign: 'center',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                }}
                initial={{ 
                  opacity: 0,
                  y: 100
                }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  filter: [
                    'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))',
                    'drop-shadow(0 0 16px rgba(59, 130, 246, 0.5))',
                    'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))'
                  ]
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.5 },
                  y: { duration: 0.8, delay: 0.5, ease: "easeOut" },
                  filter: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <span style={{ color: '#E2E8F0' }}>Progra</span>
                <span style={{ 
                  color: '#10B981',
                  textShadow: '0 0 12px rgba(16, 185, 129, 0.6)'
                }}>M</span>
                <span style={{ color: '#E2E8F0' }}>ate</span>
              </motion.h2>
                
                {/* Nombre */}
              <motion.p 
                style={{
                  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                  color: '#F1F5F9',
                  marginBottom: '0.25rem',
                  textAlign: 'center',
                  fontWeight: '500'
                }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Samir Elias Salatino
              </motion.p>
              
              {/* Subtitle */}
              <motion.p 
                style={{
                  fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  color: '#94A3B8',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  fontWeight: '400'
                }}
                animate={{ opacity: [0.7, 0.9, 0.7] }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.3,
                  ease: "easeInOut"
                }}
              >
                Desarrollador Full-Stack • Freelancer
              </motion.p>
              
              {/* Texto de carga */}
              <motion.p 
                style={{
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  color: '#10B981',
                  textAlign: 'center',
                  fontFamily: 'monospace',
                  fontWeight: '500'
                }}
                animate={{
                  opacity: [1, 0.6, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                {writingComplete ? processingStates[processingState] : `Esperando indicaciones${'.'.repeat(dotsCount)}`}
              </motion.p>
              
              {/* Prompt de IA */}
              <motion.div
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  width: 'fit-content',
                  minWidth: '300px',
                  maxWidth: '500px',
                  height: '32px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.p
                  style={{
                    fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                    color: '#10B981',
                    fontFamily: 'monospace',
                    fontWeight: '400',
                    margin: 0,
                    lineHeight: '1',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <span style={{ color: '#94A3B8' }}>Prompt:</span> "{displayedText}<span style={{ animation: 'blink 1s infinite' }}>|</span>"
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default LoadingScreen;