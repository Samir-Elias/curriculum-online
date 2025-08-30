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
  FastAPIIcon,
  OpenAIIcon,
  ClaudeIcon,
  GeminiIcon,
  GitHubCopilotIcon,
  ViteIcon,
  TypeScriptIcon,
  CursorIcon,
  N8NIcon
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
    MySQLIcon, AndroidIcon, BootstrapIcon, PythonIcon, FastAPIIcon,
    OpenAIIcon, ClaudeIcon, GeminiIcon, GitHubCopilotIcon, ViteIcon, 
    TypeScriptIcon, CursorIcon, N8NIcon
  ]

  // Generar iconos fijos - Optimizado para rendimiento
  const floatingIcons = useMemo(() => {
    const isMobileView = isMobile || isMobileState;
    
    if (isMobileView) {
      // Configuración móvil - menos iconos para mejor rendimiento
      return [
        { id: 0, Icon: ReactIcon, x: 2, y: 15, size: 60, speed: 30 },
        { id: 1, Icon: JavaScriptIcon, x: 5, y: 35, size: 55, speed: 35 },
        { id: 2, Icon: JavaIcon, x: 1, y: 55, size: 62, speed: 32 },
        { id: 3, Icon: NodeIcon, x: 95, y: 20, size: 65, speed: 38 },
        { id: 4, Icon: CSS3Icon, x: 98, y: 40, size: 52, speed: 40 },
        { id: 5, Icon: SpringIcon, x: 94, y: 60, size: 64, speed: 36 }
      ];
    } else {
      // Configuración desktop - solo iconos originales de tecnologías
      return [
        { id: 0, Icon: ReactIcon, x: 2, y: 10, size: 90, speed: 40 },
        { id: 1, Icon: JavaScriptIcon, x: 4, y: 30, size: 85, speed: 45 },
        { id: 2, Icon: JavaIcon, x: 1, y: 50, size: 92, speed: 42 },
        { id: 3, Icon: MongoIcon, x: 3, y: 70, size: 88, speed: 44 },
        { id: 4, Icon: NodeIcon, x: 96, y: 15, size: 95, speed: 48 },
        { id: 5, Icon: CSS3Icon, x: 98, y: 35, size: 82, speed: 50 },
        { id: 6, Icon: SpringIcon, x: 95, y: 55, size: 94, speed: 46 },
        { id: 7, Icon: FirebaseIcon, x: 97, y: 75, size: 86, speed: 49 },
        { id: 8, Icon: OpenAIIcon, x: 85, y: 85, size: 78, speed: 43 },
        { id: 9, Icon: ClaudeIcon, x: 15, y: 85, size: 76, speed: 47 },
        { id: 10, Icon: GeminiIcon, x: 75, y: 25, size: 80, speed: 41 },
        { id: 11, Icon: GitHubCopilotIcon, x: 25, y: 25, size: 74, speed: 39 },
        { id: 12, Icon: TypeScriptIcon, x: 45, y: 65, size: 72, speed: 51 },
        { id: 13, Icon: ViteIcon, x: 55, y: 45, size: 70, speed: 53 }
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(90deg); }
        }
        
        @keyframes rotate {
          from { transform: scale(${floatingIcons[0]?.size / 25}) rotate(0deg); }
          to { transform: scale(${floatingIcons[0]?.size / 25}) rotate(360deg); }
        }
        
        .floating-tech-icon {
          transition: all 0.5s ease;
          z-index: -1;
          pointer-events: none;
          will-change: transform;
        }
        
        .floating-tech-icon:hover {
          transform: scale(1.05);
          opacity: 0.8 !important;
        }
        
        .background-animation-container {
          z-index: -2;
        }
      `}</style>
    </div>
  )
}

export default BackgroundAnimation
