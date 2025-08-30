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

const BackgroundIcons = ({ isMobile = false }) => {
  const containerRef = useRef(null)
  const [isMobileState, setIsMobileState] = useState(false)
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileState(window.innerWidth <= 768);
    };

    const checkPerformance = () => {
      // Detectar dispositivos con menor rendimiento
      const isLowEnd = window.navigator.hardwareConcurrency <= 4 || 
                      window.innerWidth <= 480 ||
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsLowPerformance(isLowEnd);
    };

    checkScreenSize();
    checkPerformance();
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

  // Array de iconos de IA (más grandes)
  const aiIcons = [
    OpenAIIcon, ClaudeIcon, GeminiIcon, GitHubCopilotIcon, CursorIcon
  ]

  // Generar iconos fijos - Optimizado para rendimiento
  const floatingIcons = useMemo(() => {
    const isMobileView = isMobile || isMobileState;
    
    if (isLowPerformance) {
      // Configuración para dispositivos de bajo rendimiento - optimizada para móviles
      return [
        // Lado izquierdo - Iconos de IA más grandes
        { id: 0, Icon: OpenAIIcon, x: 1, y: 10, size: 140, speed: 0 },
        { id: 1, Icon: ClaudeIcon, x: 1, y: 35, size: 130, speed: 0 },
        { id: 2, Icon: GeminiIcon, x: 1, y: 60, size: 135, speed: 0 },
        { id: 3, Icon: GitHubCopilotIcon, x: 1, y: 85, size: 125, speed: 0 },
        
        // Lado derecho - Iconos de tech regulares
        { id: 4, Icon: ReactIcon, x: 95, y: 15, size: 70, speed: 0 },
        { id: 5, Icon: JavaScriptIcon, x: 95, y: 40, size: 65, speed: 0 },
        { id: 6, Icon: JavaIcon, x: 95, y: 65, size: 72, speed: 0 },
        { id: 7, Icon: NodeIcon, x: 95, y: 90, size: 68, speed: 0 },
        
        // Esquinas superiores
        { id: 8, Icon: CSS3Icon, x: 15, y: 2, size: 60, speed: 0 },
        { id: 9, Icon: SpringIcon, x: 85, y: 2, size: 64, speed: 0 }
      ];
    } else if (isMobileView) {
      // Configuración móvil optimizada - iconos más grandes y mejor distribuidos
      return [
        // Lado izquierdo - Iconos de IA más grandes y espaciados
        { id: 0, Icon: OpenAIIcon, x: 1, y: 8, size: 130, speed: 0 },
        { id: 1, Icon: ClaudeIcon, x: 1, y: 28, size: 125, speed: 0 },
        { id: 2, Icon: GeminiIcon, x: 1, y: 48, size: 135, speed: 0 },
        { id: 3, Icon: GitHubCopilotIcon, x: 1, y: 68, size: 120, speed: 0 },
        { id: 4, Icon: CursorIcon, x: 1, y: 88, size: 115, speed: 0 },
        
        // Lado derecho - Iconos de IA más grandes y espaciados
        { id: 5, Icon: OpenAIIcon, x: 95, y: 8, size: 130, speed: 0 },
        { id: 6, Icon: ClaudeIcon, x: 95, y: 28, size: 125, speed: 0 },
        { id: 7, Icon: GeminiIcon, x: 95, y: 48, size: 135, speed: 0 },
        { id: 8, Icon: GitHubCopilotIcon, x: 95, y: 68, size: 120, speed: 0 },
        { id: 9, Icon: CursorIcon, x: 95, y: 88, size: 115, speed: 0 },
        
        // Esquinas superiores - Iconos de tech regulares
        { id: 10, Icon: ReactIcon, x: 8, y: 1, size: 70, speed: 0 },
        { id: 11, Icon: JavaScriptIcon, x: 25, y: 1, size: 65, speed: 0 },
        { id: 12, Icon: JavaIcon, x: 42, y: 1, size: 72, speed: 0 },
        { id: 13, Icon: NodeIcon, x: 59, y: 1, size: 68, speed: 0 },
        { id: 14, Icon: CSS3Icon, x: 76, y: 1, size: 60, speed: 0 },
        
        // Esquinas inferiores - Iconos de tech regulares
        { id: 15, Icon: SpringIcon, x: 8, y: 95, size: 70, speed: 0 },
        { id: 16, Icon: FirebaseIcon, x: 25, y: 95, size: 65, speed: 0 },
        { id: 17, Icon: PythonIcon, x: 42, y: 95, size: 72, speed: 0 },
        { id: 18, Icon: TypeScriptIcon, x: 59, y: 95, size: 68, speed: 0 },
        { id: 19, Icon: ViteIcon, x: 76, y: 95, size: 60, speed: 0 }
      ];
    } else {
      // Configuración desktop - Muchos iconos estáticos en bordes exteriores
      return [
        // Lado izquierdo - Columna 1 (Iconos de IA más grandes)
        { id: 0, Icon: OpenAIIcon, x: 2, y: 5, size: 140, speed: 0 },
        { id: 1, Icon: ClaudeIcon, x: 2, y: 20, size: 130, speed: 0 },
        { id: 2, Icon: GeminiIcon, x: 2, y: 35, size: 135, speed: 0 },
        { id: 3, Icon: GitHubCopilotIcon, x: 2, y: 50, size: 125, speed: 0 },
        { id: 4, Icon: CursorIcon, x: 2, y: 65, size: 120, speed: 0 },
        { id: 5, Icon: ReactIcon, x: 2, y: 80, size: 85, speed: 0 },
        { id: 6, Icon: JavaScriptIcon, x: 2, y: 95, size: 80, speed: 0 },
        
        // Lado izquierdo - Columna 2
        { id: 10, Icon: GeminiIcon, x: 8, y: 8, size: 82, speed: 0 },
        { id: 11, Icon: GitHubCopilotIcon, x: 8, y: 18, size: 78, speed: 0 },
        { id: 12, Icon: TypeScriptIcon, x: 8, y: 28, size: 80, speed: 0 },
        { id: 13, Icon: ViteIcon, x: 8, y: 38, size: 76, speed: 0 },
        { id: 14, Icon: HTML5Icon, x: 8, y: 48, size: 84, speed: 0 },
        { id: 15, Icon: TailwindIcon, x: 8, y: 58, size: 86, speed: 0 },
        { id: 16, Icon: PythonIcon, x: 8, y: 68, size: 88, speed: 0 },
        { id: 17, Icon: FastAPIIcon, x: 8, y: 78, size: 82, speed: 0 },
        { id: 18, Icon: MySQLIcon, x: 8, y: 88, size: 80, speed: 0 },
        { id: 19, Icon: AndroidIcon, x: 8, y: 98, size: 84, speed: 0 },
        
        // Lado derecho - Columna 1 (Iconos de IA más grandes)
        { id: 20, Icon: OpenAIIcon, x: 92, y: 5, size: 140, speed: 0 },
        { id: 21, Icon: ClaudeIcon, x: 92, y: 20, size: 130, speed: 0 },
        { id: 22, Icon: GeminiIcon, x: 92, y: 35, size: 135, speed: 0 },
        { id: 23, Icon: GitHubCopilotIcon, x: 92, y: 50, size: 125, speed: 0 },
        { id: 24, Icon: CursorIcon, x: 92, y: 65, size: 120, speed: 0 },
        { id: 25, Icon: BootstrapIcon, x: 92, y: 80, size: 86, speed: 0 },
        { id: 26, Icon: PythonIcon, x: 92, y: 95, size: 84, speed: 0 },
        
        // Lado derecho - Columna 2
        { id: 30, Icon: JavaScriptIcon, x: 98, y: 8, size: 82, speed: 0 },
        { id: 31, Icon: JavaIcon, x: 98, y: 18, size: 78, speed: 0 },
        { id: 32, Icon: NodeIcon, x: 98, y: 28, size: 80, speed: 0 },
        { id: 33, Icon: CSS3Icon, x: 98, y: 38, size: 76, speed: 0 },
        { id: 34, Icon: SpringIcon, x: 98, y: 48, size: 84, speed: 0 },
        
        // Esquinas superiores (Iconos de IA más grandes)
        { id: 35, Icon: OpenAIIcon, x: 5, y: 2, size: 110, speed: 0 },
        { id: 36, Icon: ClaudeIcon, x: 20, y: 2, size: 105, speed: 0 },
        { id: 37, Icon: GeminiIcon, x: 35, y: 2, size: 115, speed: 0 },
        { id: 38, Icon: GitHubCopilotIcon, x: 50, y: 2, size: 100, speed: 0 },
        { id: 39, Icon: CursorIcon, x: 65, y: 2, size: 95, speed: 0 },
        { id: 40, Icon: ReactIcon, x: 80, y: 2, size: 70, speed: 0 },
        { id: 41, Icon: JavaScriptIcon, x: 95, y: 2, size: 68, speed: 0 },
        
        // Esquinas inferiores (Iconos de IA más grandes)
        { id: 44, Icon: OpenAIIcon, x: 5, y: 98, size: 110, speed: 0 },
        { id: 45, Icon: ClaudeIcon, x: 20, y: 98, size: 105, speed: 0 },
        { id: 46, Icon: GeminiIcon, x: 35, y: 98, size: 115, speed: 0 },
        { id: 47, Icon: GitHubCopilotIcon, x: 50, y: 98, size: 100, speed: 0 },
        { id: 48, Icon: CursorIcon, x: 65, y: 98, size: 95, speed: 0 },
        { id: 49, Icon: TypeScriptIcon, x: 80, y: 98, size: 72, speed: 0 },
        { id: 50, Icon: ViteIcon, x: 95, y: 98, size: 74, speed: 0 },
        
        // Distribución adicional en bordes (Iconos de IA más grandes)
        { id: 53, Icon: OpenAIIcon, x: 95, y: 12, size: 120, speed: 0 },
        { id: 54, Icon: ClaudeIcon, x: 95, y: 27, size: 115, speed: 0 },
        { id: 55, Icon: GeminiIcon, x: 95, y: 42, size: 125, speed: 0 },
        { id: 56, Icon: GitHubCopilotIcon, x: 95, y: 57, size: 110, speed: 0 },
        { id: 57, Icon: CursorIcon, x: 95, y: 72, size: 105, speed: 0 },
        { id: 58, Icon: BootstrapIcon, x: 95, y: 87, size: 72, speed: 0 },
        { id: 59, Icon: PythonIcon, x: 95, y: 95, size: 70, speed: 0 }
      ];
    }
  }, [isMobile, isMobileState, isLowPerformance])

  return (
    <div 
      ref={containerRef}
      className="background-icons-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#0f172a',
        backgroundAttachment: 'scroll',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Iconos de tecnologías estáticos - Solo en bordes exteriores */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          zIndex: 1
        }}
      >
        {floatingIcons.map((icon) => (
          <div
            key={`bg-icon-${icon.id}-${icon.x}-${icon.y}`}
            className="static-tech-icon"
            style={{
              position: 'absolute',
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              width: `${icon.size}px`,
              height: `${icon.size}px`
            }}
          >
            <div 
              className="icon-static-container"
              style={{ 
                width: `${icon.size}px`, 
                height: `${icon.size}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${icon.size / 25})`,
                opacity: icon.Icon === NodeIcon ? 1.0 : 0.4,
                filter: icon.Icon === NodeIcon ? 'brightness(2.0) contrast(1.2) drop-shadow(0 0 15px rgba(16, 185, 129, 0.8))' : 'none',
                color: icon.Icon === NodeIcon ? '#10b981' : 'inherit',
                transformOrigin: 'center center'
              }}
            >
              {React.createElement(icon.Icon)}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .static-tech-icon {
          z-index: -1;
          pointer-events: none;
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translateZ(0);
        }
        
        .icon-static-container {
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        
        .static-tech-icon:hover .icon-static-container {
          opacity: 0.6 !important;
        }
        
        .background-icons-container {
          z-index: -2;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
}

export default BackgroundIcons
