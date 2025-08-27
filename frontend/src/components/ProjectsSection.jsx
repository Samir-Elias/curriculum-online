"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { profileData } from "../data/profileData"
import ImageSlider from "./ImageSlider"
import { getTechIcon, ChevronLeft, ChevronRight, ChevronDown, GitHubIcon, ExternalLinkIcon } from "../icons/TechIcons"
import "../styles/components/projects-section.css"

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0)
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Mapear los datos a la estructura esperada con datos mejorados
  const rawProjects = profileData?.proyectosDestacados || []
  const projects = rawProjects.map((project) => ({
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

  // Navegación con teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        prevProject()
      } else if (e.key === "ArrowRight") {
        nextProject()
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        toggleDetails()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

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

  const nextProject = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentProject((prev) => (prev + 1) % projects.length)
    setIsDetailsExpanded(false)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [projects.length, isTransitioning])

  const prevProject = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
    setIsDetailsExpanded(false)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [projects.length, isTransitioning])

  const toggleDetails = () => {
    setIsDetailsExpanded(!isDetailsExpanded)
  }

  const goToProject = (index) => {
    if (index === currentProject || isTransitioning) return
    setIsTransitioning(true)
    setCurrentProject(index)
    setIsDetailsExpanded(false)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  if (!projects || projects.length === 0) {
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

  const project = projects[currentProject]

  if (!project) {
    return (
      <section className="projects-section">
        <div className="projects-container">
          <div className="error-state">
            <h3>Error cargando proyecto</h3>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="projects-section" id="proyectos">
      <div className="projects-container">
        {/* Header mejorado */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="projects-title">Proyectos Destacados</h2>
          <div className="projects-counter">
            <span className="current-project">{currentProject + 1}</span>
            <span className="separator">/</span>
            <span className="total-projects">{projects.length}</span>
          </div>
        </motion.div>

        {/* Navegación superior */}
        <div className="projects-navigation-top">
          <button
            className="nav-button nav-prev"
            onClick={prevProject}
            disabled={isTransitioning}
            aria-label="Proyecto anterior"
          >
            <ChevronLeft />
          </button>
          <button
            className="nav-button nav-next"
            onClick={nextProject}
            disabled={isTransitioning}
            aria-label="Siguiente proyecto"
          >
            <ChevronRight />
          </button>
        </div>

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
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Contenedor de imagen mejorado */}
              <div className="project-image-container">
                <div className="image-wrapper">
                  {project.images && project.images.length > 1 ? (
                    <ImageSlider images={project.images} />
                  ) : (
                    <img
                      src={project.image || "/placeholder.svg?height=400&width=600&query=project-preview"}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                    />
                  )}
                  <div className="image-overlay">
                    <div className="project-status">
                      <span className="status-badge">{project.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido del proyecto mejorado */}
              <div className="project-info-container">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>

                {/* Tecnologías con mejor diseño */}
                <div className="technologies-section">
                  <h4 className="section-title">Tecnologías</h4>
                  <div className="technologies-grid">
                    {project.technologies.map((tech, index) => (
                      <motion.div
                        key={tech}
                        className="tech-item"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="tech-icon">{getTechIcon(tech)}</div>
                        <span className="tech-name">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Métricas de rendimiento */}
                <div className="project-metrics">
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <span className="metric-value">{project.metrics.performance}</span>
                      <span className="metric-label">Performance</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-value">{project.metrics.accessibility}</span>
                      <span className="metric-label">Accessibility</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-value">{project.metrics.seo}</span>
                      <span className="metric-label">SEO</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-value">{project.metrics.bestPractices}</span>
                      <span className="metric-label">Best Practices</span>
                    </div>
                  </div>
                </div>

                {/* Información del proyecto */}
                <div className="project-meta">
                  <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    <span className="meta-text">{project.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">👤</span>
                    <span className="meta-text">{project.type}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">💼</span>
                    <span className="meta-text">{project.role}</span>
                  </div>
                </div>

                {/* Botón de detalles mejorado */}
                <motion.button
                  className="details-toggle-button"
                  onClick={toggleDetails}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{isDetailsExpanded ? "Ocultar Detalles" : "Ver Características Completas"}</span>
                  <motion.div animate={{ rotate: isDetailsExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown />
                  </motion.div>
                </motion.button>

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
                      <GitHubIcon />
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
                      <ExternalLinkIcon />
                      <span>Demo en Vivo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Detalles expandidos completamente rediseñados */}
          <AnimatePresence>
            {isDetailsExpanded && (
              <motion.div
                className="project-details-expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="details-content">
                  {/* Resumen principal */}
                  {project.overview && (
                    <motion.div
                      className="detail-section overview-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="section-header">
                        <span className="section-icon">📋</span>
                        <h4>Resumen del Proyecto</h4>
                      </div>
                      <p className="overview-text">{project.overview}</p>
                    </motion.div>
                  )}

                  {/* Grid de características */}
                  {project.features && project.features.length > 0 && (
                    <motion.div
                      className="detail-section features-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="section-header">
                        <span className="section-icon">⭐</span>
                        <h4>Características Principales</h4>
                      </div>
                      <div className="features-grid">
                        {project.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="feature-item"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            <div className="feature-bullet"></div>
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Desafíos y Soluciones lado a lado */}
                  <div className="challenges-solutions-row">
                    {project.challenges && project.challenges.length > 0 && (
                      <motion.div
                        className="detail-section challenges-section"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="section-header">
                          <span className="section-icon">🎯</span>
                          <h4>Desafíos Técnicos</h4>
                        </div>
                        <ul className="challenges-list">
                          {project.challenges.map((challenge, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              {challenge}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {project.solutions && project.solutions.length > 0 && (
                      <motion.div
                        className="detail-section solutions-section"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="section-header">
                          <span className="section-icon">💡</span>
                          <h4>Soluciones</h4>
                        </div>
                        <ul className="solutions-list">
                          {project.solutions.map((solution, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              {solution}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>

                  {/* Resultados */}
                  {project.results && project.results.length > 0 && (
                    <motion.div
                      className="detail-section results-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="section-header">
                        <span className="section-icon">📈</span>
                        <h4>Resultados y Logros</h4>
                      </div>
                      <div className="results-grid">
                        {project.results.map((result, index) => (
                          <motion.div
                            key={index}
                            className="result-item"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                          >
                            <div className="result-check">✓</div>
                            <span>{result}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Indicadores de proyecto mejorados */}
        <div className="project-indicators">
          {projects.map((_, index) => (
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
      </div>
    </section>
  )
}

export default ProjectsSection
