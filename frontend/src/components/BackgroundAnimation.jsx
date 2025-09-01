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
  N8NIcon,
  DeepSeekIcon,
  MistralIcon,
  PerplexityIcon,
  MetaIcon,
  FigmaIcon,
  GitHubIcon,
  PostgreSQLIcon
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

  // Array completo de iconos de IA y tecnologías (más diverso)
  const allIcons = [
    // Iconos de IA principales
    OpenAIIcon, ClaudeIcon, GeminiIcon, GitHubCopilotIcon, CursorIcon,
    DeepSeekIcon, MistralIcon, PerplexityIcon, MetaIcon,
    
    // Iconos de tecnologías
    ReactIcon, NodeIcon, JavaScriptIcon, CSS3Icon, HTML5Icon, 
    TailwindIcon, MongoIcon, FirebaseIcon, JavaIcon, SpringIcon, 
    MySQLIcon, AndroidIcon, BootstrapIcon, PythonIcon, FastAPIIcon,
    ViteIcon, TypeScriptIcon, N8NIcon, FigmaIcon, GitHubIcon, PostgreSQLIcon
  ]

  // Generar iconos en patrón zigzag - Optimizado para rendimiento
  const floatingIcons = useMemo(() => {
    const isMobileView = isMobile || isMobileState;
    const chatGptSize = 140; // Tamaño del icono de ChatGPT como referencia
    
    if (isLowPerformance) {
      // Configuración para dispositivos de bajo rendimiento - zigzag simplificado con más variedad
      return [
        // Zigzag izquierdo - Iconos de IA
        { id: 0, Icon: OpenAIIcon, x: 5, y: 5, size: chatGptSize, speed: 0 },
        { id: 1, Icon: ClaudeIcon, x: 15, y: 20, size: chatGptSize, speed: 0 },
        { id: 2, Icon: GeminiIcon, x: 5, y: 35, size: chatGptSize, speed: 0 },
        { id: 3, Icon: DeepSeekIcon, x: 15, y: 50, size: chatGptSize, speed: 0 },
        { id: 4, Icon: MistralIcon, x: 5, y: 65, size: chatGptSize, speed: 0 },
        { id: 5, Icon: PerplexityIcon, x: 15, y: 80, size: chatGptSize, speed: 0 },

        
        // Zigzag derecho - Iconos de tech
        { id: 7, Icon: MetaIcon, x: 85, y: 10, size: chatGptSize, speed: 0 },
        { id: 8, Icon: NodeIcon, x: 95, y: 25, size: chatGptSize, speed: 0 },
        { id: 9, Icon: JavaScriptIcon, x: 85, y: 40, size: chatGptSize, speed: 0 },
        { id: 10, Icon: TypeScriptIcon, x: 95, y: 55, size: chatGptSize, speed: 0 },
        { id: 11, Icon: ViteIcon, x: 85, y: 70, size: chatGptSize, speed: 0 },
        { id: 12, Icon: FigmaIcon, x: 95, y: 85, size: chatGptSize, speed: 0 }
      ];
    } else if (isMobileView) {
      // Configuración móvil optimizada - zigzag más denso con mucha variedad
      return [
        // Zigzag izquierdo - columna 1 (Iconos de IA)
        { id: 0, Icon: OpenAIIcon, x: 3, y: 3, size: chatGptSize, speed: 0 },
        { id: 1, Icon: ClaudeIcon, x: 12, y: 12, size: chatGptSize, speed: 0 },
        { id: 2, Icon: GeminiIcon, x: 3, y: 21, size: chatGptSize, speed: 0 },
        { id: 3, Icon: DeepSeekIcon, x: 12, y: 30, size: chatGptSize, speed: 0 },
        { id: 4, Icon: MistralIcon, x: 3, y: 39, size: chatGptSize, speed: 0 },
        { id: 5, Icon: PerplexityIcon, x: 12, y: 48, size: chatGptSize, speed: 0 },

        { id: 7, Icon: GitHubCopilotIcon, x: 12, y: 66, size: chatGptSize, speed: 0 },
        { id: 8, Icon: CursorIcon, x: 3, y: 75, size: chatGptSize, speed: 0 },
        { id: 9, Icon: OpenAIIcon, x: 12, y: 84, size: chatGptSize, speed: 0 },
        { id: 10, Icon: ClaudeIcon, x: 3, y: 93, size: chatGptSize, speed: 0 },
        { id: 11, Icon: GeminiIcon, x: 12, y: 102, size: chatGptSize, speed: 0 },
        
        // Zigzag derecho - columna 2 (Iconos de tech)
        { id: 12, Icon: MetaIcon, x: 88, y: 6, size: chatGptSize, speed: 0 },
        { id: 13, Icon: NodeIcon, x: 97, y: 15, size: chatGptSize, speed: 0 },
        { id: 14, Icon: JavaScriptIcon, x: 88, y: 24, size: chatGptSize, speed: 0 },
        { id: 15, Icon: TypeScriptIcon, x: 97, y: 33, size: chatGptSize, speed: 0 },
        { id: 16, Icon: ViteIcon, x: 88, y: 42, size: chatGptSize, speed: 0 },
        { id: 17, Icon: FigmaIcon, x: 97, y: 51, size: chatGptSize, speed: 0 },
        { id: 18, Icon: GitHubIcon, x: 88, y: 60, size: chatGptSize, speed: 0 },
        { id: 19, Icon: PostgreSQLIcon, x: 97, y: 69, size: chatGptSize, speed: 0 },
        { id: 20, Icon: JavaIcon, x: 88, y: 78, size: chatGptSize, speed: 0 },
        { id: 21, Icon: SpringIcon, x: 97, y: 87, size: chatGptSize, speed: 0 },
        { id: 22, Icon: PythonIcon, x: 88, y: 96, size: chatGptSize, speed: 0 }
      ];
    } else {
      // Configuración desktop - zigzag completo a lo largo de toda la página con máxima variedad
      return [
        // Zigzag izquierdo - columna 1 (Iconos de IA)
        { id: 0, Icon: OpenAIIcon, x: 2, y: 2, size: chatGptSize, speed: 0 },
        { id: 1, Icon: ClaudeIcon, x: 8, y: 8, size: chatGptSize, speed: 0 },
        { id: 2, Icon: GeminiIcon, x: 2, y: 14, size: chatGptSize, speed: 0 },
        { id: 3, Icon: DeepSeekIcon, x: 8, y: 20, size: chatGptSize, speed: 0 },
        { id: 4, Icon: MistralIcon, x: 2, y: 26, size: chatGptSize, speed: 0 },
        { id: 5, Icon: PerplexityIcon, x: 8, y: 32, size: chatGptSize, speed: 0 },

        { id: 7, Icon: GitHubCopilotIcon, x: 8, y: 44, size: chatGptSize, speed: 0 },
        { id: 8, Icon: CursorIcon, x: 2, y: 50, size: chatGptSize, speed: 0 },
        { id: 9, Icon: OpenAIIcon, x: 8, y: 56, size: chatGptSize, speed: 0 },
        { id: 10, Icon: ClaudeIcon, x: 2, y: 62, size: chatGptSize, speed: 0 },
        { id: 11, Icon: GeminiIcon, x: 8, y: 68, size: chatGptSize, speed: 0 },
        { id: 12, Icon: DeepSeekIcon, x: 2, y: 74, size: chatGptSize, speed: 0 },
        { id: 13, Icon: MistralIcon, x: 8, y: 80, size: chatGptSize, speed: 0 },
        { id: 14, Icon: PerplexityIcon, x: 2, y: 86, size: chatGptSize, speed: 0 },
        { id: 15, Icon: GitHubCopilotIcon, x: 8, y: 92, size: chatGptSize, speed: 0 },
        { id: 16, Icon: CursorIcon, x: 2, y: 98, size: chatGptSize, speed: 0 },
        
        // Zigzag izquierdo - columna 2 (Iconos de tech)
        { id: 17, Icon: MetaIcon, x: 15, y: 5, size: chatGptSize, speed: 0 },
        { id: 18, Icon: NodeIcon, x: 21, y: 11, size: chatGptSize, speed: 0 },
        { id: 19, Icon: JavaScriptIcon, x: 15, y: 17, size: chatGptSize, speed: 0 },
        { id: 20, Icon: TypeScriptIcon, x: 21, y: 23, size: chatGptSize, speed: 0 },
        { id: 21, Icon: ViteIcon, x: 15, y: 29, size: chatGptSize, speed: 0 },
        { id: 22, Icon: FigmaIcon, x: 21, y: 35, size: chatGptSize, speed: 0 },
        { id: 23, Icon: GitHubIcon, x: 15, y: 41, size: chatGptSize, speed: 0 },
        { id: 24, Icon: PostgreSQLIcon, x: 21, y: 47, size: chatGptSize, speed: 0 },
        { id: 25, Icon: JavaIcon, x: 15, y: 53, size: chatGptSize, speed: 0 },
        { id: 26, Icon: SpringIcon, x: 21, y: 59, size: chatGptSize, speed: 0 },
        { id: 27, Icon: PythonIcon, x: 15, y: 65, size: chatGptSize, speed: 0 },
        { id: 28, Icon: FastAPIIcon, x: 21, y: 71, size: chatGptSize, speed: 0 },
        { id: 29, Icon: CSS3Icon, x: 15, y: 77, size: chatGptSize, speed: 0 },
        { id: 30, Icon: HTML5Icon, x: 21, y: 83, size: chatGptSize, speed: 0 },
        { id: 31, Icon: TailwindIcon, x: 15, y: 89, size: chatGptSize, speed: 0 },
        { id: 32, Icon: BootstrapIcon, x: 21, y: 95, size: chatGptSize, speed: 0 },
        
        // Zigzag derecho - columna 1 (Iconos de IA)
        { id: 33, Icon: CursorIcon, x: 79, y: 3, size: chatGptSize, speed: 0 },
        { id: 34, Icon: OpenAIIcon, x: 85, y: 9, size: chatGptSize, speed: 0 },
        { id: 35, Icon: ClaudeIcon, x: 79, y: 15, size: chatGptSize, speed: 0 },
        { id: 36, Icon: GeminiIcon, x: 85, y: 21, size: chatGptSize, speed: 0 },
        { id: 37, Icon: DeepSeekIcon, x: 79, y: 27, size: chatGptSize, speed: 0 },
        { id: 38, Icon: MistralIcon, x: 85, y: 33, size: chatGptSize, speed: 0 },
        { id: 39, Icon: PerplexityIcon, x: 79, y: 39, size: chatGptSize, speed: 0 },
        { id: 40, Icon: GitHubCopilotIcon, x: 85, y: 45, size: chatGptSize, speed: 0 },
        { id: 41, Icon: CursorIcon, x: 79, y: 51, size: chatGptSize, speed: 0 },
        { id: 42, Icon: OpenAIIcon, x: 85, y: 57, size: chatGptSize, speed: 0 },
        { id: 43, Icon: ClaudeIcon, x: 79, y: 63, size: chatGptSize, speed: 0 },
        { id: 44, Icon: GeminiIcon, x: 85, y: 69, size: chatGptSize, speed: 0 },
        { id: 45, Icon: DeepSeekIcon, x: 79, y: 75, size: chatGptSize, speed: 0 },
        { id: 46, Icon: MistralIcon, x: 85, y: 81, size: chatGptSize, speed: 0 },
        { id: 47, Icon: PerplexityIcon, x: 79, y: 87, size: chatGptSize, speed: 0 },
        { id: 48, Icon: GitHubCopilotIcon, x: 85, y: 93, size: chatGptSize, speed: 0 },
        { id: 49, Icon: CursorIcon, x: 79, y: 99, size: chatGptSize, speed: 0 },
        
        // Zigzag derecho - columna 2 (Iconos de tech)
        { id: 50, Icon: MetaIcon, x: 92, y: 6, size: chatGptSize, speed: 0 },
        { id: 51, Icon: NodeIcon, x: 98, y: 12, size: chatGptSize, speed: 0 },
        { id: 52, Icon: JavaScriptIcon, x: 92, y: 18, size: chatGptSize, speed: 0 },
        { id: 53, Icon: TypeScriptIcon, x: 98, y: 24, size: chatGptSize, speed: 0 },
        { id: 54, Icon: ViteIcon, x: 92, y: 30, size: chatGptSize, speed: 0 },
        { id: 55, Icon: FigmaIcon, x: 98, y: 36, size: chatGptSize, speed: 0 },
        { id: 56, Icon: GitHubIcon, x: 92, y: 42, size: chatGptSize, speed: 0 },
        { id: 57, Icon: PostgreSQLIcon, x: 98, y: 48, size: chatGptSize, speed: 0 },
        { id: 58, Icon: JavaIcon, x: 92, y: 54, size: chatGptSize, speed: 0 },
        { id: 59, Icon: SpringIcon, x: 98, y: 60, size: chatGptSize, speed: 0 },
        { id: 60, Icon: PythonIcon, x: 92, y: 66, size: chatGptSize, speed: 0 },
        { id: 61, Icon: FastAPIIcon, x: 98, y: 72, size: chatGptSize, speed: 0 },
        { id: 62, Icon: CSS3Icon, x: 92, y: 78, size: chatGptSize, speed: 0 },
        { id: 63, Icon: HTML5Icon, x: 98, y: 84, size: chatGptSize, speed: 0 },
        { id: 64, Icon: TailwindIcon, x: 92, y: 90, size: chatGptSize, speed: 0 },
        { id: 65, Icon: BootstrapIcon, x: 98, y: 96, size: chatGptSize, speed: 0 },
        
        // Zigzag central - columna 3 (Mezcla de IA y tech)
        { id: 66, Icon: GitHubCopilotIcon, x: 45, y: 4, size: chatGptSize, speed: 0 },
        { id: 67, Icon: MetaIcon, x: 51, y: 10, size: chatGptSize, speed: 0 },
        { id: 68, Icon: ClaudeIcon, x: 45, y: 16, size: chatGptSize, speed: 0 },
        { id: 69, Icon: NodeIcon, x: 51, y: 22, size: chatGptSize, speed: 0 },
        { id: 70, Icon: GeminiIcon, x: 45, y: 28, size: chatGptSize, speed: 0 },
        { id: 71, Icon: TypeScriptIcon, x: 51, y: 34, size: chatGptSize, speed: 0 },
        { id: 72, Icon: DeepSeekIcon, x: 45, y: 40, size: chatGptSize, speed: 0 },
        { id: 73, Icon: ViteIcon, x: 51, y: 46, size: chatGptSize, speed: 0 },
        { id: 74, Icon: MistralIcon, x: 45, y: 52, size: chatGptSize, speed: 0 },
        { id: 75, Icon: FigmaIcon, x: 51, y: 58, size: chatGptSize, speed: 0 },
        { id: 76, Icon: PerplexityIcon, x: 45, y: 64, size: chatGptSize, speed: 0 },
        { id: 77, Icon: GitHubIcon, x: 51, y: 70, size: chatGptSize, speed: 0 },
        { id: 78, Icon: GitHubCopilotIcon, x: 45, y: 76, size: chatGptSize, speed: 0 },
        { id: 79, Icon: PostgreSQLIcon, x: 51, y: 82, size: chatGptSize, speed: 0 },
        { id: 80, Icon: CursorIcon, x: 45, y: 88, size: chatGptSize, speed: 0 },
        { id: 81, Icon: JavaIcon, x: 51, y: 94, size: chatGptSize, speed: 0 }
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
        backgroundRepeat: 'no-repeat',
        // Asegurar que el contenedor se corte en los bordes
        clipPath: 'inset(0 0 0 0)',
        // Prevenir que los iconos se extiendan más allá del contenedor
        contain: 'layout style paint'
      }}
    >
      {/* Iconos de IA y tecnologías en patrón zigzag - Máxima variedad */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          zIndex: 1,
          // Asegurar que los iconos se corten en los bordes del contenedor
          overflow: 'hidden',
          clipPath: 'inset(0 0 0 0)'
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
              height: `${icon.size}px`,
              // Asegurar que los iconos no se extiendan más allá del contenedor
              maxWidth: '100%',
              maxHeight: '100%'
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
                opacity: 0.3,
                filter: 'brightness(1.2) contrast(1.1) drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))',
                color: '#3b82f6',
                transformOrigin: 'center center',
                // Asegurar que el contenido del icono se corte si es necesario
                overflow: 'hidden'
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
          // Asegurar que los iconos se corten en los bordes
          overflow: hidden;
        }
        
        .icon-static-container {
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          // Asegurar que el contenido se corte si es necesario
          overflow: hidden;
        }
        
        .static-tech-icon:hover .icon-static-container {
          opacity: 0.6 !important;
          filter: brightness(1.5) contrast(1.2) drop-shadow(0 0 15px rgba(59, 130, 246, 0.6)) !important;
        }
        
        .background-icons-container {
          z-index: -2;
          transform: translateZ(0);
          backface-visibility: hidden;
          // Asegurar que el contenedor se corte correctamente
          overflow: hidden;
          clip-path: inset(0 0 0 0);
        }
      `}</style>
    </div>
  )
}

export default BackgroundIcons
