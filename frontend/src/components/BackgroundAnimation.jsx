"use client"
import React, { useRef, useMemo } from 'react'
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

const BackgroundAnimation = () => {
  const containerRef = useRef(null)

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

  // Generar iconos fijos - Tamaño reducido y ubicados en laterales
  const floatingIcons = useMemo(() => [
    // Laterales izquierdos
    { id: 0, Icon: ReactIcon, x: 5, y: 15, size: 60, speed: 35 },
    { id: 1, Icon: JavaScriptIcon, x: 8, y: 35, size: 55, speed: 38 },
    { id: 2, Icon: JavaIcon, x: 3, y: 55, size: 62, speed: 36 },
    { id: 3, Icon: MongoIcon, x: 7, y: 75, size: 58, speed: 37 },
    { id: 4, Icon: PythonIcon, x: 4, y: 85, size: 59, speed: 44 },
    
    // Laterales derechos
    { id: 5, Icon: NodeIcon, x: 92, y: 20, size: 65, speed: 42 },
    { id: 6, Icon: CSS3Icon, x: 95, y: 40, size: 52, speed: 45 },
    { id: 7, Icon: SpringIcon, x: 90, y: 60, size: 64, speed: 41 },
    { id: 8, Icon: FirebaseIcon, x: 93, y: 80, size: 56, speed: 43 },
    { id: 9, Icon: MySQLIcon, x: 88, y: 90, size: 61, speed: 39 },
    
    // Centros laterales (izquierda y derecha)
    { id: 10, Icon: HTML5Icon, x: 12, y: 45, size: 68, speed: 33 },
    { id: 11, Icon: TailwindIcon, x: 85, y: 70, size: 54, speed: 40 },
    
    // Node.js detrás del mate (derecha inferior)
    { id: 12, Icon: NodeIcon, x: 38.1, y: 4.2, size: 85, speed: 50 }
  ], [])

  return (
    <div 
      ref={containerRef}
      className="background-animation-container"
    >

      {/* Sin efectos de distorsión - Fondo completamente estático */}

             {/* Iconos de tecnologías fijos - Solo rotación con CSS puro */}
       <div className="absolute inset-0 pointer-events-none">
         {floatingIcons.map((icon) => (
           <div
             key={`bg-icon-${icon.id}-${icon.x}-${icon.y}`}
             className="floating-tech-icon"
             style={{
               left: `${icon.x}%`,
               top: `${icon.y}%`,
               width: `${icon.size}px`,
               height: `${icon.size}px`,
               '--rotation-speed': `${icon.speed}s`
             }}
           >
             <div style={{ 
               width: `${icon.size}px`, 
               height: `${icon.size}px`,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               transform: `scale(${icon.size / 40})`,
               opacity: icon.id === 12 ? 1.0 : 0.4,
               filter: icon.id === 12 ? 'brightness(3.0) contrast(1.5) drop-shadow(0 0 20px rgba(16, 185, 129, 1.0)) hue-rotate(0deg) saturate(2.0)' : 'none',
               color: icon.id === 12 ? '#10b981' : 'inherit'
             }}>
               {React.createElement(icon.Icon)}
             </div>
           </div>
         ))}
       </div>






    </div>
  )
}

export default BackgroundAnimation
