"use client"
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [scrollY, setScrollY] = useState(0)
  const [currentSection, setCurrentSection] = useState('hero')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [previousSection, setPreviousSection] = useState('hero')
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrollY(scrollPosition)

      // Determinar la sección actual basada en el scroll
      const sections = ['techstack', 'projects', 'education', 'objective', 'footer'] // Removido 'hero'
      const sectionElements = sections.map(id => document.getElementById(id))
      
      let activeSection = 'hero' // Mantener hero como default
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            activeSection = sections[index]
          }
        }
      })
      
             // Detectar cambio de sección y activar transición
       if (activeSection !== currentSection) {
         setPreviousSection(currentSection)
         setCurrentSection(activeSection)
         setIsTransitioning(true)
         
         // Desactivar transición después de un delay
         setTimeout(() => {
           setIsTransitioning(false)
         }, 1500) // Transición más larga para suavidad
       }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentSection])

  // Configuraciones de animación por sección - Unificada para las 3 secciones principales
  // Configuración de animación unificada - Una sola animación continua
  const getAnimationConfig = () => {
    return {
      primaryColor: '#1e3a8a',
      secondaryColor: '#3b82f6',
      pattern: 'gradient-flow',
      intensity: 0.7
    }
  }

  const config = getAnimationConfig()
  const prevConfig = getAnimationConfig()

  // Array de iconos de tecnologías
  const techIcons = [
    ReactIcon, NodeIcon, JavaScriptIcon, CSS3Icon, HTML5Icon, 
    TailwindIcon, MongoIcon, FirebaseIcon, JavaIcon, SpringIcon, 
    MySQLIcon, AndroidIcon, BootstrapIcon, PythonIcon, FastAPIIcon
  ]

  // Generar iconos flotantes - Distribución aleatoria, posiciones fijas
  const floatingIcons = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    Icon: techIcons[i % techIcons.length], // Iconos fijos
    x: Math.random() * 85 + 7, // Distribución aleatoria en X
    y: Math.random() * 70 + 15, // Distribución aleatoria en Y
    size: Math.random() * 50 + 70, // Tamaño entre 70-120px
    delay: i * 2, // Delay escalonado
    direction: i % 2 === 0 ? 1 : -1 // Dirección alternada
  }))

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Fondo principal con transición suave */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`
        }}
        animate={{
          background: isTransitioning 
            ? [
                `linear-gradient(135deg, ${prevConfig.primaryColor} 0%, ${prevConfig.secondaryColor} 100%)`,
                `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`
              ]
            : `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`
        }}
        transition={{
          duration: isTransitioning ? 1.5 : 0,
          ease: "easeInOut"
        }}
      />

      {/* Efecto de distorsión durante transiciones */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="absolute inset-0"
            initial={{ 
              opacity: 0,
              scale: 1,
              filter: "blur(0px)"
            }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [1, 1.1, 1],
              filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
            }}
            exit={{ 
              opacity: 0,
              scale: 1,
              filter: "blur(0px)"
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut"
            }}
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`
            }}
          />
        )}
      </AnimatePresence>

             {/* Iconos de tecnologías flotantes */}
       <div className="absolute inset-0 pointer-events-none">
         {floatingIcons.map((icon) => (
           <motion.div
             key={icon.id}
             className="absolute"
             style={{
               left: `${icon.x}%`,
               top: `${icon.y}%`,
               width: `${icon.size}px`,
               height: `${icon.size}px`,
               opacity: 0.5,
               filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.3))',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               position: 'fixed',
               zIndex: 1,
               pointerEvents: 'none'
             }}
             animate={{
               rotate: [0, 360]
             }}
             transition={{
               duration: 40,
               repeat: Infinity,
               ease: "linear",
               delay: icon.delay
             }}
           >
             <div style={{ 
               width: `${icon.size}px`, 
               height: `${icon.size}px`,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               color: 'white',
               opacity: 0.6,
               transform: `scale(${icon.size / 20})`
             }}>
               <icon.Icon />
             </div>
           </motion.div>
         ))}
       </div>




    </div>
  )
}

export default BackgroundAnimation
