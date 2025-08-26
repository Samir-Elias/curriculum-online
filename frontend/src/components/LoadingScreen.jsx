import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import lottie from 'lottie-web';
import animationData from '../assets/Progra-Mate.json';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const lottieRef = useRef(null);
  const animationInstance = useRef(null);

  useEffect(() => {
    // Prevenir scroll durante la carga
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Inicializar la animación Lottie
    if (lottieRef.current) {
      animationInstance.current = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: false, // Solo una vez
        autoplay: true,
        animationData: animationData
      });
    }
    
    // Simular tiempo de carga - ajustado para la duración de tu animación
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Restaurar scroll
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      // Esperar un poco más para que termine la animación de salida
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 4000); // Tiempo ajustado para tu animación

    return () => {
      clearTimeout(timer);
      // Limpiar estilos
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      // Destruir la animación Lottie
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
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
            justifyContent: 'center'
          }}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { 
              duration: 0.8,
              ease: "easeInOut"
            }
          }}
        >
          {/* CONTENEDOR PRINCIPAL CENTRADO */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 10
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* ANIMACIÓN LOTTIE DEL MATE */}
            <motion.div
              style={{ 
                width: '200px',
                height: '300px',
                marginBottom: '1rem'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div 
                ref={lottieRef}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </motion.div>

            {/* TEXTO - Aparece después */}
            <motion.div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {/* PrograMate con M verde */}
              <motion.h2 
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))',
                    'drop-shadow(0 0 16px rgba(59, 130, 246, 0.5))',
                    'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
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
                animate={{ opacity: [0.6, 0.9, 0.6] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.3
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
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                100% preparando el mate...
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;