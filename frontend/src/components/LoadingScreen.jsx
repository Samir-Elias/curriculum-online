import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevenir scroll durante la carga
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Simular tiempo de carga - aumentado para mostrar toda la animación
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Restaurar scroll
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      // Esperar un poco más para que termine la animación de salida
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 4500); // Aumentado para la nueva animación

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
            background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)',
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
            {/* MATE ANIMADO - FORMA CORRECTA */}
            <div style={{ 
              position: 'relative', 
              marginBottom: '2rem',
              width: '80px',
              height: '120px'
            }}>
              {/* SVG del Mate */}
              <svg 
                width="80" 
                height="120" 
                viewBox="0 0 80 120" 
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              >
                {/* Definiciones */}
                <defs>
                  <clipPath id="mateClip">
                    <rect x="20" y="25" width="40" height="70" rx="12" ry="12"/>
                  </clipPath>
                  <linearGradient id="mateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D2691E" />
                    <stop offset="50%" stopColor="#CD853F" />
                    <stop offset="100%" stopColor="#F4A460" />
                  </linearGradient>
                  <linearGradient id="liquidGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#8B4513" />
                    <stop offset="30%" stopColor="#A0522D" />
                    <stop offset="70%" stopColor="#D2B48C" />
                    <stop offset="100%" stopColor="#F5DEB3" />
                  </linearGradient>
                </defs>

                {/* Cuerpo del mate - cilíndrico como tu imagen */}
                <motion.rect 
                  x="20" 
                  y="25" 
                  width="40" 
                  height="70" 
                  rx="12" 
                  ry="12"
                  fill="url(#mateGradient)"
                  stroke="#8B4513"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />

                {/* Bombilla recta */}
                <motion.line 
                  x1="40" 
                  y1="5" 
                  x2="40" 
                  y2="30"
                  stroke="#C0C0C0"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />

                {/* Punta de la bombilla */}
                <motion.circle
                  cx="40"
                  cy="4"
                  r="2"
                  fill="#E5E5E5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                />

                {/* Gotitas cayendo - Fase 2 */}
                {[...Array(3)].map((_, i) => (
                  <motion.circle
                    key={i}
                    r="1.5"
                    fill="#8B4513"
                    cx={35 + i * 5}
                    cy={15}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [-5, 0, 5, 15],
                    }}
                    transition={{
                      duration: 1,
                      delay: 1.5 + i * 0.15,
                      repeat: 3,
                      repeatType: "loop"
                    }}
                  />
                ))}

                {/* Líquido llenándose - Fase 3 */}
                <motion.rect
                  x="22"
                  y="27"
                  width="36"
                  height="66"
                  rx="10"
                  ry="10"
                  fill="url(#liquidGradient)"
                  clipPath="url(#mateClip)"
                  initial={{ height: 0, y: 93 }}
                  animate={{ 
                    height: [0, 66],
                    y: [93, 27]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 2.5,
                    ease: "easeInOut"
                  }}
                />

                {/* Superficie del líquido */}
                <motion.ellipse
                  cx="40"
                  cy="27"
                  rx="16"
                  ry="2"
                  fill="rgba(245, 222, 179, 0.8)"
                  clipPath="url(#mateClip)"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0, 1],
                    ry: [2, 1.5, 2]
                  }}
                  transition={{ 
                    opacity: { duration: 0.1, delay: 4 },
                    ry: { duration: 2, repeat: Infinity, repeatType: "reverse", delay: 4 }
                  }}
                />

                {/* Símbolo </> - Fase 4 */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0, 0, 1],
                    scale: [0, 0, 0, 1]
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 4.2,
                    ease: "backOut"
                  }}
                >
                  {/* Círculo beige para el símbolo */}
                  <circle 
                    cx="40" 
                    cy="60" 
                    r="12" 
                    fill="#F5DEB3" 
                    stroke="#D2B48C"
                    strokeWidth="1.5"
                  />
                  
                  {/* Símbolo </> */}
                  <text 
                    x="40" 
                    y="64" 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fill="#8B4513" 
                    fontSize="10" 
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    &lt;/&gt;
                  </text>
                </motion.g>
              </svg>
            </div>

            {/* TEXTO - Aparece al final */}
            <motion.div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 0, 0, 1], y: [20, 20, 20, 0] }}
              transition={{ duration: 0.8, delay: 4.2 }}
            >
              {/* PrograMate */}
              <motion.h2 
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                  fontWeight: '700',
                  color: '#4CAF50',
                  marginBottom: '0.5rem',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(76, 175, 80, 0.3)'
                }}
              >
                PrograMate
              </motion.h2>
              
              {/* Nombre */}
              <motion.p 
                style={{
                  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                  color: '#ffffff',
                  marginBottom: '0.25rem',
                  textAlign: 'center'
                }}
              >
                Samir Elias Salatino
              </motion.p>
              
              {/* Subtitle */}
              <motion.p 
                style={{
                  fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  color: '#B0BEC5',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}
              >
                Desarrollador Full-Stack • Freelancer
              </motion.p>
              
              {/* Texto de carga */}
              <motion.p 
                style={{
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  color: '#4CAF50',
                  textAlign: 'center',
                  fontFamily: 'monospace'
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