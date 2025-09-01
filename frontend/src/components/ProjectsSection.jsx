"use client"

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Eye } from "lucide-react";
import { getSpriteTechIcon } from "../icons/TechIconSprite";
import ImageSlider from "./ImageSlider";
import ProjectModal from "./ProjectModal";
import { useModal } from "../context/ModalContext";
import "../styles/components/projects-section.css";

const ProjectsSection = ({ proyectosDestacados = [], isVisible, containerVariants, itemVariants }) => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Usar el contexto del modal
  const { isModalOpen, openModal, closeModal, selectedProjectIndex, openProjectModal } = useModal();

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

  // Eliminado el useEffect de visibilidad local - ahora usa el sistema centralizado

  // Sincronizar el proyecto actual cuando se selecciona desde el contexto
  useEffect(() => {
    if (isModalOpen && selectedProjectIndex !== currentProject) {
      setCurrentProject(selectedProjectIndex);
    }
  }, [isModalOpen, selectedProjectIndex, currentProject]);

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
  }, [isModalOpen, closeModal, openModal])

  // Memoizar las funciones de navegación
  const nextProject = useCallback((keepModalOpen = false) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentProject((prev) => (prev + 1) % mappedProjects.length)
    if (!keepModalOpen) {
      closeModal()
    }
    setTimeout(() => setIsTransitioning(false), 300)
  }, [isTransitioning, mappedProjects.length, closeModal])

  const prevProject = useCallback((keepModalOpen = false) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentProject((prev) => (prev - 1 + mappedProjects.length) % mappedProjects.length)
    if (!keepModalOpen) {
      closeModal()
    }
    setTimeout(() => setIsTransitioning(false), 300)
  }, [isTransitioning, mappedProjects.length, closeModal])

  // Funciones específicas para navegación desde el modal
  const nextProjectInModal = useCallback(() => {
    const nextIndex = (currentProject + 1) % mappedProjects.length;
    setCurrentProject(nextIndex);
    // Actualizar el contexto para mantener sincronización
    openProjectModal(nextIndex);
  }, [currentProject, mappedProjects.length, openProjectModal])

  const prevProjectInModal = useCallback(() => {
    const prevIndex = (currentProject - 1 + mappedProjects.length) % mappedProjects.length;
    setCurrentProject(prevIndex);
    // Actualizar el contexto para mantener sincronización
    openProjectModal(prevIndex);
  }, [currentProject, mappedProjects.length, openProjectModal])

  const goToProject = useCallback((index) => {
    if (index === currentProject || isTransitioning) return
    setIsTransitioning(true)
    setCurrentProject(index)
    closeModal()
    setTimeout(() => setIsTransitioning(false), 300)
  }, [currentProject, isTransitioning, closeModal])

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

  if (!mappedProjects || mappedProjects.length === 0) {
    return (
      <section className="projects-section" id="proyectos">
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
      <section className="projects-section" id="proyectos">
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
  if (!isVisible?.projects) {
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
                          <span key={`char-${project.title}-${index}-${char}`} className="project-title-accent">{char}</span>
                        ) : (
                          <span key={`char-${project.title}-${index}-${char}`}>{char}</span>
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

                {/* CONTENEDOR DERECHO - Layout de desktop y móvil */}
                <div className="project-card-container">
                  {/* Layout de desktop: imagen, grid de tecnologías y botón */}
                  <div className="project-card-section">
                    {/* Imagen del proyecto */}
                    <div className="project-image-section">
                      {project.images && project.images.length > 0 ? (
                        <ImageSlider images={project.images} isPaused={isModalOpen} />
                      ) : (
                        <div className="project-image-placeholder">
                          <p>Sin imágenes</p>
                        </div>
                      )}
                    </div>

                    {/* Grid de tecnologías */}
                    <div className="project-tech-section">
                      <h4 className="tech-grid-title">Stack Tecnológico</h4>
                      <div className="tech-grid-container">
                        {project.technologies.map((tech, index) => (
                          <div key={`tech-${project.title}-${tech}-${index}`} className="tech-grid-item">
                            <div className="tech-grid-icon">{getSpriteTechIcon(tech)}</div>
                            <span className="tech-grid-name">{tech}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Botón "Ver Más" dentro del mismo contenedor */}
                      <div className="tech-section-button">
                        <motion.button
                          className="details-button"
                          onClick={openModal}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Ver Más</span>
                          <Eye />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Layout móvil: estructura simplificada */}
                  <div className="project-card-container-mobile">
                    {/* 1. ImageSlider arriba */}
                    <div className="mobile-image-section">
                      {project.images && project.images.length > 0 ? (
                        <ImageSlider images={project.images} isPaused={isModalOpen} />
                      ) : (
                        <div className="mobile-image-placeholder">
                          <p>Sin imágenes</p>
                        </div>
                      )}
                    </div>

                    {/* 2. Stack Tecnológico en el medio */}
                    <div className="mobile-tech-section">
                      <h4 className="mobile-tech-title">Stack Tecnológico</h4>
                      <div className="mobile-tech-grid">
                        {project.technologies.map((tech, index) => (
                          <div key={`tech-${project.title}-${tech}-${index}`} className="mobile-tech-item">
                            <div className="mobile-tech-icon">{getSpriteTechIcon(tech)}</div>
                            <span className="mobile-tech-name">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Botón abajo */}
                    <div className="mobile-button-section">
                      <motion.button
                        className="mobile-modal-button"
                        onClick={openModal}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Ver Más</span>
                        <Eye />
                      </motion.button>
                    </div>
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
      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal 
            isOpen={isModalOpen}
            onClose={closeModal}
            project={project}
            onNextProject={nextProjectInModal}
            onPrevProject={prevProjectInModal}
            hasNextProject={currentProject < mappedProjects.length - 1}
            hasPrevProject={currentProject > 0}
          />
        )}
      </AnimatePresence>

    </>
  )
}

export default ProjectsSection