import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  NodeIcon, ReactIcon, JavaScriptIcon, PythonIcon, GitHubIcon, CSS3Icon, HTML5Icon, TailwindIcon, 
  MongoIcon, FirebaseIcon, JavaIcon, SpringIcon, MySQLIcon, AndroidIcon, BootstrapIcon, PostgreSQLIcon,
  OpenAIIcon, ClaudeIcon, GeminiIcon, GitHubCopilotIcon, ViteIcon, TypeScriptIcon, CursorIcon, N8NIcon
} from '../icons/TechIcons';

const FallingIconsAnimation = ({ isAnimating = true }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Si es móvil, no renderizar los falling icons
  if (isMobile) {
    return null;
  }

  // Configuración base de iconos - 3 filas lineales con zigzag organizado
  const baseIcons = [
    // Fila 1 - Tecnologías principales (izquierda a derecha)
    { Icon: ReactIcon, baseLeft: '10%', delay: 0, rotationDuration: 8, size: 110 },
    { Icon: JavaScriptIcon, baseLeft: '30%', delay: 0.5, rotationDuration: 9, size: 105 },
    { Icon: TypeScriptIcon, baseLeft: '50%', delay: 1, rotationDuration: 7, size: 108 },
    { Icon: NodeIcon, baseLeft: '70%', delay: 1.5, rotationDuration: 8, size: 112 },
    { Icon: PythonIcon, baseLeft: '90%', delay: 2, rotationDuration: 6, size: 106 },
    
    // Fila 2 - IA y herramientas (derecha a izquierda)
    { Icon: OpenAIIcon, baseLeft: '85%', delay: 2.5, rotationDuration: 8, size: 100 },
    { Icon: ClaudeIcon, baseLeft: '65%', delay: 3, rotationDuration: 7, size: 102 },
    { Icon: GeminiIcon, baseLeft: '45%', delay: 3.5, rotationDuration: 9, size: 98 },
    { Icon: GitHubCopilotIcon, baseLeft: '25%', delay: 4, rotationDuration: 6, size: 104 },
    { Icon: CursorIcon, baseLeft: '5%', delay: 4.5, rotationDuration: 8, size: 96 },
    
    // Fila 3 - Frameworks y bases de datos (izquierda a derecha)
    { Icon: SpringIcon, baseLeft: '15%', delay: 5, rotationDuration: 7, size: 108 },
    { Icon: TailwindIcon, baseLeft: '35%', delay: 5.5, rotationDuration: 8, size: 102 },
    { Icon: ViteIcon, baseLeft: '55%', delay: 6, rotationDuration: 6, size: 106 },
    { Icon: MongoIcon, baseLeft: '75%', delay: 6.5, rotationDuration: 9, size: 104 },
    { Icon: MySQLIcon, baseLeft: '95%', delay: 7, rotationDuration: 7, size: 110 },
    
    // Fila 4 - Herramientas adicionales (derecha a izquierda)
    { Icon: FirebaseIcon, baseLeft: '80%', delay: 7.5, rotationDuration: 6, size: 100 },
    { Icon: GitHubIcon, baseLeft: '60%', delay: 8, rotationDuration: 8, size: 98 },
    { Icon: CSS3Icon, baseLeft: '40%', delay: 8.5, rotationDuration: 7, size: 102 },
    { Icon: HTML5Icon, baseLeft: '20%', delay: 9, rotationDuration: 9, size: 104 },
    { Icon: BootstrapIcon, baseLeft: '0%', delay: 9.5, rotationDuration: 6, size: 106 }
  ];

  // Función para ajustar posiciones según el tamaño de pantalla
  const getResponsiveLeft = (baseLeft) => {
    if (isMobile) {
      // En móviles, distribuir los iconos en 3 columnas para mejor rendimiento
      const leftValue = parseFloat(baseLeft);
      if (leftValue <= 30) {
        // Primera columna: 20% desde el borde izquierdo
        return '20%';
      } else if (leftValue <= 60) {
        // Segunda columna: 50% desde el borde izquierdo
        return '50%';
      } else {
        // Tercera columna: 80% desde el borde izquierdo
        return '80%';
      }
    }
    return baseLeft;
  };

  // Aplicar posiciones responsive
  const icons = baseIcons.map(icon => ({
    ...icon,
    left: getResponsiveLeft(icon.baseLeft)
  }));

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: 1, 
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      {icons.map(({ Icon, left, delay, rotationDuration, size }, index) => (
        <motion.div
          key={index}
          style={{
            position: 'fixed',
            top: '-300px',
            left: left,
            width: '400px',
            height: '400px',
            zIndex: 1,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
                     animate={isAnimating ? {
             y: ['0vh', '120vh']
           } : {
             y: '120vh'
           }}
                       transition={{
              duration: 6,
              repeat: isAnimating ? Infinity : 0,
              ease: "linear",
              delay: delay,
              type: "tween"
            }}
        >
          <div 
            className="falling-icon"
            style={{ 
              width: `${size}px`, 
              height: `${size}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${size / 40})`,
              animation: isAnimating ? `rotate ${rotationDuration}s linear infinite` : 'none'
            }}
          >
            {React.createElement(Icon)}
          </div>
        </motion.div>
      ))}
      
      <style>{`
        @keyframes rotate {
          from {
            transform: scale(${icons[0].size / 40}) rotate(0deg);
          }
          to {
            transform: scale(${icons[0].size / 40}) rotate(360deg);
          }
        }
        
        .falling-icon {
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default FallingIconsAnimation;
