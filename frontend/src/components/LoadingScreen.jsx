import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevenir scroll durante la carga
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Restaurar scroll
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      // Esperar un poco más para que termine la animación de salida
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 3000);

    return () => {
      clearTimeout(timer);
      // Limpiar estilos
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
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
          {/* Partículas de fondo */}
          <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  backgroundColor: 'rgba(59, 130, 246, 0.15)',
                  borderRadius: '50%',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{ opacity: 0 }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 3
                }}
              />
            ))}
          </div>

          {/* CONTENEDOR PRINCIPAL CENTRADO COMO UN BLOQUE */}
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
            {/* LOGO CON HEXÁGONO Y ANILLOS */}
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              {/* Anillos de pulso */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    border: '2px solid rgba(59, 130, 246, 0.2)',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.5, 2],
                    opacity: [0.6, 0.3, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: i * 0.8 + 0.8
                  }}
                />
              ))}

              {/* Hexágono SVG */}
              <motion.svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                style={{ display: 'block', position: 'relative', zIndex: 2 }}
              >
                <defs>
                  <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#1d4ed8" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Hexágono principal */}
                <motion.path
                  d="M60 15 L95 37.5 L95 82.5 L60 105 L25 82.5 L25 37.5 Z"
                  fill="none"
                  stroke="url(#hexGradient)"
                  strokeWidth="3"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: 1,
                  }}
                  transition={{ 
                    duration: 2,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                
                {/* Fondo del hexágono */}
                <motion.path
                  d="M60 15 L95 37.5 L95 82.5 L60 105 L25 82.5 L25 37.5 Z"
                  fill="url(#hexGradient)"
                  opacity="0.1"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 0.15,
                  }}
                  style={{ transformOrigin: '60px 60px' }}
                  transition={{ 
                    duration: 1,
                    ease: "easeOut",
                    delay: 1.5
                  }}
                />
                
                {/* Líneas internas */}
                <motion.g
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: 0.4,
                  }}
                  transition={{ 
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  <path d="M25 37.5 L95 82.5" stroke="url(#hexGradient)" strokeWidth="1" opacity="0.3"/>
                  <path d="M95 37.5 L25 82.5" stroke="url(#hexGradient)" strokeWidth="1" opacity="0.3"/>
                  <path d="M60 15 L60 105" stroke="url(#hexGradient)" strokeWidth="1" opacity="0.3"/>
                </motion.g>
              </motion.svg>

              {/* Letra S centrada - VERSIÓN MEJORADA */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                initial={{ 
                  scale: 0, 
                  opacity: 0,
                  rotateY: 360,
                  rotateX: 180
                }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  rotateY: 0,
                  rotateX: 0
                }}
                transition={{ 
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 2.5,
                  type: "spring",
                  stiffness: 100
                }}
              >
                {/* Efecto de resplandor detrás de la S */}
                <motion.div
                  style={{
                    position: 'absolute',
                    width: '100px', // Más grande para acompañar la S más grande
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(25px)'
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3],
                    // El resplandor también cambia de azul a blanco
                    background: [
                      'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(219, 234, 254, 0.25) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)'
                    ]
                  }}
                  transition={{
                    scale: {
                      duration: 3.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    },
                    opacity: {
                      duration: 3.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    },
                    background: {
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 3.5,
                      ease: "easeInOut"
                    }
                  }}
                />
                
                {/* La letra S con efectos múltiples - ARREGLADA */}
                <motion.span 
                  style={{
                    fontSize: '4.5rem',
                    fontWeight: '800',
                    lineHeight: 1,
                    position: 'relative',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                  initial={{
                    color: '#3b82f6',
                    textShadow: '0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4)'
                  }}
                  animate={{
                    // Transición de color más simple pero efectiva
                    color: [
                      '#3b82f6', // Azul inicial
                      '#3b82f6', // Mantiene azul
                      '#60a5fa', // Azul claro
                      '#93c5fd', // Azul más claro
                      '#dbeafe', // Azul muy claro
                      '#ffffff'  // Blanco
                    ],
                    textShadow: [
                      '0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4)',
                      '0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4)',
                      '0 0 15px rgba(96, 165, 250, 0.7), 0 0 25px rgba(59, 130, 246, 0.3)',
                      '0 0 12px rgba(147, 197, 253, 0.6), 0 0 20px rgba(96, 165, 250, 0.2)',
                      '0 0 10px rgba(219, 234, 254, 0.5), 0 0 15px rgba(147, 197, 253, 0.2)',
                      '0 0 20px rgba(255, 255, 255, 0.8), 0 0 35px rgba(255, 255, 255, 0.4)'
                    ],
                    // Efecto de pulso sutil
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    color: {
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 3.5,
                      ease: "easeInOut"
                    },
                    textShadow: {
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 3.5,
                      ease: "easeInOut"
                    },
                    scale: {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 4
                    }
                  }}
                >
                  S
                </motion.span>

                {/* Partículas orbitando alrededor de la S */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '3px',
                      height: '3px',
                      backgroundColor: '#60a5fa',
                      borderRadius: '50%',
                      left: '50%',
                      top: '50%'
                    }}
                    animate={{
                      x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                      y: [0, Math.sin(i * 60 * Math.PI / 180) * 40],
                      rotate: 360,
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 3.5 + (i * 0.2)
                    }}
                  />
                ))}

                {/* Anillo interno que se expande */}
                <motion.div
                  style={{
                    position: 'absolute',
                    width: '60px',
                    height: '60px',
                    border: '2px solid rgba(96, 165, 250, 0.3)',
                    borderRadius: '50%',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 0],
                    rotate: 360,
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 4
                  }}
                />
              </motion.div>
            </div>

            {/* TEXTO Y BARRA - TODO JUNTO */}
            <motion.div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {/* Nombre */}
              <motion.h2 
                style={{
                  fontSize: 'clamp(1.25rem, 5vw, 1.75rem)',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Samir Elias Salatino
              </motion.h2>
              
              {/* Subtitle */}
              <motion.p 
                style={{
                  fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
                  color: '#93c5fd',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.3
                }}
              >
                Desarrollador Full-Stack
              </motion.p>
              
              {/* Barra de progreso */}
              <div 
                style={{
                  width: 'clamp(200px, 60vw, 300px)',
                  height: '3px',
                  backgroundColor: 'rgba(30, 58, 138, 0.4)',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%)',
                    borderRadius: '9999px'
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: 2.8,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;