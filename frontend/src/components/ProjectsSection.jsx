"use client"

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Eye } from "lucide-react";
import { getSpriteTechIcon } from "../icons/TechIconSprite";
import ImageSlider from "./ImageSlider";
import ProjectModal from "./ProjectModal";
import "../styles/components/projects-section.css";

const ProjectsSection = ({ proyectosDestacados = [] }) => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Mapear los datos a la estructura esperada con datos mejorados
  const rawProjects = proyectosDestacados || []
  const mappedProjects = rawProjects.map((project) => ({
    title: project.nombre,
    description: project.descripcion,
    technologies: project.tecnologias || [],
    images: project.imagenes || [],
    image: project.imagenes?.[0],
    duration: project.estado || "Completado",
    type: project.destacado?.aspecto || "Proyecto Individual",
    role: "Full-Stack Developer",
    github: project.repositorio,
    demo: project.demoUrl,
    overview: project.descripcion,
    features: project.caracteristicas || [
      "Diseño responsive optimizado para móviles y desktop",
      "Animaciones suaves con Framer Motion",
      "Paleta de colores profesional para startups",
      "Función de descarga PDF integrada",
      "Secciones interactivas expandibles",
      "SEO optimizado y carga ultrarrápida",
    ],
    challenges: project.desafios || [
      "Implementación de arquitectura escalable y modular",
      "Optimización de rendimiento para carga rápida",
      "Integración fluida de múltiples tecnologías",
      "Diseño responsive que funcione en todos los dispositivos",
    ],
    solutions: project.soluciones || [
      "Diseño de componentes reutilizables y modulares",
      "Implementación de mejores prácticas de desarrollo",
      "Testing exhaustivo y debugging sistemático",
      "Optimización de imágenes y recursos",
    ],
    results: project.resultados || [
      "Aplicación completamente funcional y estable",
      "Interfaz moderna y altamente responsive",
      "Código limpio, mantenible y escalable",
      "Excelente experiencia de usuario",
    ],
    metrics: project.metricas || {
      performance: "95%",
      accessibility: "98%",
      seo: "100%",
      bestPractices: "92%",
    },
  }))



  // Optimización: Memoizar el proyecto actual
  const currentProjectData = useMemo(() => {
    if (mappedProjects.length === 0) return null;
    return mappedProjects[currentProject] || mappedProjects[0];
  }, [mappedProjects, currentProject]);

  // Detectar visibilidad una sola vez
  useEffect(() => {
    const element = document.getElementById('proyectos');
    if (element) {
      setIsVisible(true);
    }
  }, []);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isModalOpen) {
        // Solo permitir cerrar con Escape cuando el modal está abierto
        if (e.key === "Escape") {
          closeModal()
        }
      } else {
        // Navegación normal solo cuando el modal está cerrado
        if (e.key === "ArrowLeft") {
          prevProject()
        } else if (e.key === "ArrowRight") {
          nextProject()
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          openModal()
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isModalOpen])

  // Manejo de gestos táctiles
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextProject()
    } else if (isRightSwipe) {
      prevProject()
    }
  }

  const nextProject = (keepModalOpen = false) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentProject((prev) => (prev + 1) % mappedProjects.length)
    if (!keepModalOpen) {
      setIsModalOpen(false)
    }
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevProject = (keepModalOpen = false) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentProject((prev) => (prev - 1 + mappedProjects.length) % mappedProjects.length)
    if (!keepModalOpen) {
      setIsModalOpen(false)
    }
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Funciones específicas para navegación desde el modal
  const nextProjectInModal = () => {
    nextProject(true) // Mantener modal abierto
  }

  const prevProjectInModal = () => {
    prevProject(true) // Mantener modal abierto
  }

  const goToProject = (index) => {
    if (index === currentProject || isTransitioning) return
    setIsTransitioning(true)
    setCurrentProject(index)
    setIsModalOpen(false)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  if (!mappedProjects || mappedProjects.length === 0) {
    return (
      <section className="projects-section">
        <div className="projects-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <h3>Cargando proyectos...</h3>
            <p>Se encontraron {rawProjects.length} proyectos en los datos</p>
          </div>
        </div>
      </section>
    )
  }

  const project = currentProjectData

  if (!project) {
    return (
      <section className="projects-section">
        <div className="projects-container">
          <div className="error-state">
            <h3>Error cargando proyecto</h3>
            <p>Current: {currentProject}</p>
          </div>
        </div>
      </section>
    )
  }

  // Optimización: Renderizar contenido pesado solo cuando es visible
  if (!isVisible) {
    return (
      <section className="projects-section" id="proyectos">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="projects-title">
            <span className="title-decoration">✦</span>
            <span className="title-text">
              <span className="title-accent">P</span>royectos <span className="title-accent">D</span>estacados
            </span>
            <span className="title-decoration">✦</span>
          </h2>
        </motion.div>
        <motion.div 
          className="projects-loading"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="loading-placeholder">Cargando proyectos...</div>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      <section className="projects-section" id="proyectos">
        {/* Header con título */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="projects-title">
            <span className="title-decoration">✦</span>
            <span className="title-text">
              <span className="title-accent">P</span>royectos <span className="title-accent">D</span>estacados
            </span>
            <span className="title-decoration">✦</span>
          </h2>
          <div className="projects-counter">
            <span className="current-project">{currentProject + 1}</span>
            <span className="separator">/</span>
            <span className="total-projects">{mappedProjects.length}</span>
          </div>
        </motion.div>

        {/* Contenedor principal con nueva estructura */}
        <div className="project-main-wrapper">
          {/* Flecha de navegación izquierda */}
          <button
            className="nav-button nav-lateral nav-prev"
            onClick={prevProject}
            disabled={isTransitioning}
            aria-label="Proyecto anterior"
          >
            <ChevronLeft />
          </button>

          {/* Contenedor principal del proyecto */}
          <motion.div
            className="project-main-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                className="project-content-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut"
                }}
              >
                {/* CONTENEDOR IZQUIERDO - Información del proyecto (solo en desktop) */}
                <div className="project-info-container">
                  {/* Header del proyecto */}
                  <div className="project-header">
                    <h3 className="project-title">
                      {project.title.split('').map((char, index) => {
                        // Resaltar varias MAYÚSCULAS y guiones con el color verde de prograMate
                        const shouldHighlight = char === 'S' || // S de ServiceBook
                                               char === 'E' || // E de Estimador
                                               char === 'T' || // T de TeloApp
                                               char === 'C' || // C de CV
                                               char === 'D' || // D de Digital
                                               char === 'P' || // P de Portfolio
                                               char === 'R' || // R de React
                                               char === 'I' || // I de Interactivo
                                               char === 'A' || // A de App
                                               char === 'M' || // M de Management
                                               char === 'G' || // G de Gestión
                                               char === 'F' || // F de Full-Stack
                                               char === 'B' || // B de Backend
                                               char === 'J' || // J de Java
                                               char === 'V' || // V de Virtual
                                               char === 'O' || // O de Online
                                               char === 'L' || // L de Live
                                               char === 'U' || // U de User
                                               char === 'X' || // X de eXperience
                                               char === 'Y' || // Y de System
                                               char === 'Z' || // Z de Zero
                                               char === 'K' || // K de Stack
                                               char === 'W' || // W de Web
                                               char === 'N' || // N de Node
                                               char === 'H' || // H de HTML
                                               char === 'Q' || // Q de Quality
                                               char === '-' || // Guiones
                                               char === '–' || // Guión medio
                                               char === '—';   // Guión largo
                        
                        return shouldHighlight ? (
                          <span key={index} className="project-title-accent">{char}</span>
                        ) : (
                          <span key={index}>{char}</span>
                        );
                      })}
                    </h3>
                  </div>
                  
                  {/* Descripción del proyecto */}
                  <p className="project-description">{project.description}</p>

                  {/* Información del proyecto */}
                  <div className="project-meta">
                    <div className="meta-item">
                      <span className="meta-icon">👤</span>
                      <span className="meta-text">{project.type}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">💼</span>
                      <span className="meta-text">{project.role}</span>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="project-actions">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button github-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github />
                        <span>Código</span>
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button demo-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink />
                        <span>Demo en Vivo</span>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* CONTENEDOR DERECHO - Card con título (móvil), ImageSlider, tecnologías y modal */}
                <div className="project-card-container">
                  {/* Título del proyecto dentro de la card (solo en móvil) */}
                  <div className="project-title-section">
                    <h3 className="project-title">
                      {project.title.split('').map((char, index) => {
                        // Resaltar varias MAYÚSCULAS y guiones con el color verde de prograMate
                        const shouldHighlight = char === 'S' || // S de ServiceBook
                                               char === 'E' || // E de Estimador
                                               char === 'T' || // T de TeloApp
                                               char === 'C' || // C de CV
                                               char === 'D' || // D de Digital
                                               char === 'P' || // P de Portfolio
                                               char === 'R' || // R de React
                                               char === 'I' || // I de Interactivo
                                               char === 'A' || // A de App
                                               char === 'M' || // M de Management
                                               char === 'G' || // G de Gestión
                                               char === 'F' || // F de Full-Stack
                                               char === 'B' || // B de Backend
                                               char === 'J' || // J de Java
                                               char === 'V' || // V de Virtual
                                               char === 'O' || // O de Online
                                               char === 'L' || // L de Live
                                               char === 'U' || // U de User
                                               char === 'X' || // X de eXperience
                                               char === 'Y' || // Y de System
                                               char === 'Z' || // Z de Zero
                                               char === 'K' || // K de Stack
                                               char === 'W' || // W de Web
                                               char === 'N' || // N de Node
                                               char === 'H' || // H de HTML
                                               char === 'Q' || // Q de Quality
                                               char === '-' || // Guiones
                                               char === '–' || // Guión medio
                                               char === '—';   // Guión largo
                        
                        return shouldHighlight ? (
                          <span key={index} className="project-title-accent">{char}</span>
                        ) : (
                          <span key={index}>{char}</span>
                        );
                      })}
                    </h3>
                  </div>
                  {/* Sección del ImageSlider */}
                  <div className="project-imageslider-section">
                    <div className="image-wrapper">
                      {project.images && project.images.length > 1 ? (
                        <ImageSlider images={project.images} isPaused={isModalOpen} />
                      ) : (
                        <img
                          src={project.image || "/placeholder.svg?height=400&width=600&query=project-preview"}
                          alt={project.title}
                          className="project-image no-hover-effects"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>

                  {/* Sección de tecnologías con scroll interno */}
                  <div className="project-tech-section">
                    <h4 className="section-title">Stack Tecnológico</h4>
                    <div className="technologies-scroll-container">
                      <div className="technologies-scroll-grid">
                        {project.technologies.map((tech, index) => (
                          <motion.div
                            key={`${tech}-${index}`}
                            className="tech-scroll-item"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                          >
                            <div className="tech-scroll-icon">{getSpriteTechIcon(tech)}</div>
                            <span className="tech-scroll-name">{tech}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Botón del modal */}
                  <div className="project-modal-section">
                    <motion.button
                      className="project-modal-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Ver Detalles Completos</span>
                      <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                        <Eye />
                      </motion.div>
                      <div className="keyboard-hint">
                        <span className="key-indicator">ESPACIO - IN</span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Flecha de navegación derecha */}
          <button
            className="nav-button nav-lateral nav-next"
            onClick={nextProject}
            disabled={isTransitioning}
            aria-label="Siguiente proyecto"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Indicadores de proyecto mejorados */}
        <div className="project-indicators">
          {mappedProjects.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === currentProject ? "active" : ""}`}
              onClick={() => goToProject(index)}
              disabled={isTransitioning}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Modal de Detalles del Proyecto - Renderizado con Portal */}
      <ProjectModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        project={project}
        onNextProject={nextProjectInModal}
        onPrevProject={prevProjectInModal}
        hasNextProject={currentProject < mappedProjects.length - 1}
        hasPrevProject={currentProject > 0}
      />
    </>
  )
}

export default ProjectsSection