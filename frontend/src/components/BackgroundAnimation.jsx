import React, { useRef, useMemo, useState, useEffect } from 'react'
import { 
  ReactIcon, 
  NodeIcon, 
  JavaScriptIcon, 
  CSS3Icon, 
  HTML5Icon, 
  TailwindIcon, 
  MongoIcon, 
  FirebaseIcon, 
  JavaIcon, 
  SpringIcon, 
  MySQLIcon, 
  AndroidIcon, 
  BootstrapIcon, 
  PythonIcon, 
  FastAPIIcon 
} from '../icons/TechIcons'

const BackgroundAnimation = ({ isMobile = false, isPaused = false }) => {
  const containerRef = useRef(null)
  const [isMobileState, setIsMobileState] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileState(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Configuración del fondo con gradiente gradual
  const config = {
    primaryColor: '#0f172a', // Oscuro en la parte superior
    secondaryColor: '#1e3a8a', // Medio en el centro
    tertiaryColor: '#3b82f6'   // Claro en la parte inferior
  }

  // Array de iconos de tecnologías
  const techIcons = [
    ReactIcon, NodeIcon, JavaScriptIcon, CSS3Icon, HTML5Icon, 
    TailwindIcon, MongoIcon, FirebaseIcon, JavaIcon, SpringIcon, 
    MySQLIcon, AndroidIcon, BootstrapIcon, PythonIcon, FastAPIIcon
  ]

  // Generar iconos fijos - Tamaño aumentado y ubicados en laterales
  // Estrategia de posicionamiento: Los iconos se colocan en los bordes extremos
  // para evitar cualquier superposición con el contenido del hero (centro 20-80% del viewport)
  const floatingIcons = useMemo(() => {
    const isMobileView = isMobile || isMobileState;
    
    if (isMobileView) {
      // Configuración específica para móviles - iconos más pequeños y mejor distribuidos
      // Zona segura: centro 30-70% del viewport está libre de iconos
      return [
        // Laterales izquierdos - más compactos y alejados del centro
        { id: 0, Icon: ReactIcon, x: 2, y: 15, size: 60, speed: 25 },
        { id: 1, Icon: JavaScriptIcon, x: 5, y: 35, size: 55, speed: 28 },
        { id: 2, Icon: JavaIcon, x: 1, y: 55, size: 62, speed: 26 },
        { id: 3, Icon: MongoIcon, x: 4, y: 75, size: 58, speed: 27 },
        
        // Laterales derechos - más compactos y alejados del centro
        { id: 4, Icon: NodeIcon, x: 95, y: 20, size: 65, speed: 32 },
        { id: 5, Icon: CSS3Icon, x: 98, y: 40, size: 52, speed: 35 },
        { id: 6, Icon: SpringIcon, x: 94, y: 60, size: 64, speed: 31 },
        { id: 7, Icon: FirebaseIcon, x: 97, y: 80, size: 56, speed: 33 },
        
        // Centros laterales (izquierda y derecha) - más compactos y alejados
        { id: 8, Icon: HTML5Icon, x: 8, y: 45, size: 68, speed: 23 },
        { id: 9, Icon: TailwindIcon, x: 90, y: 70, size: 54, speed: 30 }
      ];
    } else {
      // Configuración original para desktop - ajustada para evitar superposición con texto
      // Zona segura: centro 25-75% del viewport está libre de iconos
      return [
        // Laterales izquierdos - movidos más hacia la izquierda (0-20% del viewport)
        { id: 0, Icon: ReactIcon, x: 2, y: 10, size: 90, speed: 35 },
        { id: 1, Icon: JavaScriptIcon, x: 4, y: 30, size: 85, speed: 38 },
        { id: 2, Icon: JavaIcon, x: 1, y: 50, size: 92, speed: 36 },
        { id: 3, Icon: MongoIcon, x: 3, y: 70, size: 88, speed: 37 },
        { id: 4, Icon: PythonIcon, x: 0, y: 85, size: 89, speed: 44 },
        
        // Laterales derechos - movidos más hacia la derecha (80-100% del viewport)
        { id: 5, Icon: NodeIcon, x: 96, y: 15, size: 95, speed: 42 },
        { id: 6, Icon: CSS3Icon, x: 98, y: 35, size: 82, speed: 45 },
        { id: 7, Icon: SpringIcon, x: 95, y: 55, size: 94, speed: 41 },
        { id: 8, Icon: FirebaseIcon, x: 97, y: 75, size: 86, speed: 43 },
        { id: 9, Icon: MySQLIcon, x: 94, y: 90, size: 91, speed: 39 },
        
        // Centros laterales (izquierda y derecha) - movidos más hacia los bordes
        { id: 10, Icon: HTML5Icon, x: 8, y: 40, size: 98, speed: 33 },
        { id: 11, Icon: TailwindIcon, x: 90, y: 65, size: 84, speed: 40 }
      ];
    }
  }, [isMobile, isMobileState])

  return (
    <div 
      ref={containerRef}
      className="background-animation-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      {/* Fondo con gradiente */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
          zIndex: 0
        }}
      />

      {/* Iconos de tecnologías flotantes */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          zIndex: 1,
          filter: isPaused ? 'blur(8px)' : 'none',
          transition: 'filter 0.3s ease'
        }}
      >
        {floatingIcons.map((icon) => (
          <div
            key={`bg-icon-${icon.id}-${icon.x}-${icon.y}`}
            className="floating-tech-icon"
            style={{
              position: 'absolute',
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              width: `${icon.size}px`,
              height: `${icon.size}px`,
              animation: `float ${icon.speed}s infinite ease-in-out`,
              '--rotation-speed': `${icon.speed}s`
            }}
          >
            <div style={{ 
              width: `${icon.size}px`, 
              height: `${icon.size}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${icon.size / 25})`,
              opacity: icon.Icon === NodeIcon ? 1.0 : 0.6,
              filter: icon.Icon === NodeIcon ? 'brightness(3.0) contrast(1.5) drop-shadow(0 0 20px rgba(16, 185, 129, 1.0)) hue-rotate(0deg) saturate(2.0)' : 'none',
              color: icon.Icon === NodeIcon ? '#10b981' : 'inherit',
              animation: `rotate ${icon.speed}s linear infinite`
            }}>
              {React.createElement(icon.Icon)}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes rotate {
          from { transform: scale(${floatingIcons[0]?.size / 25}) rotate(0deg); }
          to { transform: scale(${floatingIcons[0]?.size / 25}) rotate(360deg); }
        }
        
        .floating-tech-icon {
          transition: all 0.3s ease;
          /* Asegurar que los iconos estén detrás del contenido del hero */
          z-index: -1;
          pointer-events: none;
        }
        
        .floating-tech-icon:hover {
          transform: scale(1.1);
          opacity: 0.8 !important;
        }
        
        /* Zona segura para el contenido del hero */
        .background-animation-container {
          z-index: -2;
        }
      `}</style>
    </div>
  )
}

export default BackgroundAnimation
