import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NodeIcon, ReactIcon, JavaScriptIcon, PythonIcon, GitHubIcon, CSS3Icon, HTML5Icon, TailwindIcon, MongoIcon, FirebaseIcon, JavaIcon, SpringIcon, MySQLIcon, AndroidIcon, BootstrapIcon, PostgreSQLIcon } from '../icons/TechIcons';

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

  // Configuración base de iconos
  const baseIcons = [
    { Icon: ReactIcon, baseLeft: '0%', delay: 0, rotationDuration: 6, size: 120 },
    { Icon: JavaIcon, baseLeft: '4%', delay: 1.6, rotationDuration: 5.5, size: 125 },
    { Icon: MySQLIcon, baseLeft: '0%', delay: 3.2, rotationDuration: 7, size: 118 },
    { Icon: GitHubIcon, baseLeft: '4%', delay: 4.8, rotationDuration: 5.8, size: 122 },
    { Icon: JavaScriptIcon, baseLeft: '18%', delay: 0.8, rotationDuration: 6.2, size: 115 },
    { Icon: SpringIcon, baseLeft: '22%', delay: 2.4, rotationDuration: 7.5, size: 124 },
    { Icon: MongoIcon, baseLeft: '18%', delay: 4.0, rotationDuration: 5.2, size: 116 },
    { Icon: TailwindIcon, baseLeft: '22%', delay: 5.6, rotationDuration: 6.8, size: 123 },
    { Icon: HTML5Icon, baseLeft: '54%', delay: 0.4, rotationDuration: 6.5, size: 128 },
    { Icon: NodeIcon, baseLeft: '58%', delay: 2.0, rotationDuration: 5.4, size: 117 },
    { Icon: PostgreSQLIcon, baseLeft: '54%', delay: 3.6, rotationDuration: 7.2, size: 119 },
    { Icon: BootstrapIcon, baseLeft: '58%', delay: 5.2, rotationDuration: 6.1, size: 121 },
    { Icon: CSS3Icon, baseLeft: '76%', delay: 1.2, rotationDuration: 5.6, size: 114 },
    { Icon: PythonIcon, baseLeft: '80%', delay: 2.8, rotationDuration: 6.4, size: 126 },
    { Icon: FirebaseIcon, baseLeft: '76%', delay: 4.4, rotationDuration: 5.8, size: 120 },
    { Icon: AndroidIcon, baseLeft: '80%', delay: 6.0, rotationDuration: 4.2, size: 127 }
  ];

  // Función para ajustar posiciones según el tamaño de pantalla
  const getResponsiveLeft = (baseLeft) => {
    if (isMobile) {
      // En móviles, distribuir los iconos horizontalmente en una fila centrada
      const leftValue = parseFloat(baseLeft);
      if (leftValue <= 4) {
        // Primera columna: 20% desde el borde izquierdo
        return '20%';
      } else if (leftValue <= 22) {
        // Segunda columna: 40% desde el borde izquierdo
        return '40%';
      } else if (leftValue <= 58) {
        // Tercera columna: 60% desde el borde izquierdo
        return '60%';
      } else {
        // Cuarta columna: 80% desde el borde izquierdo
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
              duration: 6.5,
              repeat: isAnimating ? Infinity : 0,
              ease: "linear",
              delay: delay
            }}
        >
          <div 
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
      
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: scale(${icons[0].size / 40}) rotate(0deg);
          }
          to {
            transform: scale(${icons[0].size / 40}) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FallingIconsAnimation;
