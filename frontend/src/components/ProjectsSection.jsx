"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { profileData } from "../data/profileData"
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  GitHubIcon, 
  ExternalLinkIcon,
  getTechIcon 
} from "../icons/TechIcons"
import "../styles/components/projects-section.css"
import "../styles/components/image-modal.css"


const ProjectsSection = ({ proyectosDestacados, isVisible, containerVariants, itemVariants }) => {
  const [currentProject, setCurrentProject] = useState(0)
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null) // Para modal de imágenes

  // Usar los proyectos pasados como prop o los del profileData como fallback
  const projects = proyectosDestacados || profileData?.proyectosDestacados || []

  // Reset de detalles al cambiar de proyecto
  useEffect(() => {
    setIsDetailsExpanded(false)
  }, [currentProject])

  if (!projects || projects.length === 0) {
    return (
      <section className="projects-section" id="projects">
        <div className="projects-container">
          <div className="projects-header">
            <h2 className="projects-title">Proyectos en desarrollo...</h2>
          </div>
        </div>
      </section>
    )
  }

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const toggleDetails = () => {
    setIsDetailsExpanded(!isDetailsExpanded)
  }

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevProject()
      } else if (e.key === 'ArrowRight') {
        nextProject()
      } else if (e.key === 'Space' || e.key === 'Enter') {
        if (e.target.closest('.details-toggle-button')) {
          e.preventDefault()
          toggleDetails()
        }
      } else if (e.key === 'Escape' && selectedImage) {
        closeImageModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  const safeCurrentProject = Math.min(currentProject, projects.length - 1)
  const project = projects[safeCurrentProject]

  if (!project) {
    return (
      <section className="projects-section" id="projects">
        <div className="projects-container">
          <div className="projects-header">
            <h2 className="projects-title">Error cargando proyecto</h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">Una selección de mis mejores trabajos como desarrollador Full-Stack</h2>
          <div className="project-counter">
            {safeCurrentProject + 1} / {projects.length}
          </div>
        </div>

        <div className="project-carousel">
          <button 
            className="nav-button nav-button-left" 
            onClick={prevProject} 
            aria-label="Proyecto anterior"
            tabIndex={0}
          >
            <ChevronLeft />
          </button>

          <motion.div
            className={`project-card ${isDetailsExpanded ? 'expanded' : ''}`}
            key={safeCurrentProject}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="project-image-container">
              <img
                src={project.imagenes?.[0] || "/placeholder.svg"}
                alt={project.nombre || "Proyecto"}
                className="project-image"
                onClick={() => project.imagenes?.[0] && openImageModal(project.imagenes[0])}
                style={{ cursor: project.imagenes?.[0] ? 'pointer' : 'default' }}
              />
            </div>

            <div className="project-content">
              <h3 className="project-title">{project.nombre || "Título no disponible"}</h3>
              <p className="project-description">{project.descripcion || "Descripción no disponible"}</p>

              <div className="project-technologies">
                <h4>Tecnologías</h4>
                <div className="tech-grid">
                  {(project.tecnologias || []).map((tech, index) => (
                    <div key={index} className="tech-item">
                      <span className="tech-icon">{getTechIcon(tech)}</span>
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-stats">
                <div className="stat-item">
                  <span className="stat-icon">📅</span>
                  <span>{project.periodo || project.duracion || "No especificado"}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">📊</span>
                  <span>{project.estado || "No especificado"}</span>
                </div>
                {project.destacado && (
                  <div className="project-highlight">
                    <span className="highlight-badge" title={project.destacado.detalle}>
                      {project.destacado.aspecto}
                    </span>
                  </div>
                )}
              </div>

              <div className="project-details-toggle">
                <button 
                  className="details-toggle-button" 
                  onClick={toggleDetails}
                  aria-expanded={isDetailsExpanded}
                  aria-controls="project-expanded-details"
                >
                  <span>
                    {isDetailsExpanded ? "Ocultar Detalles" : "Ver Características Completas"}
                  </span>
                  {isDetailsExpanded ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>

              <AnimatePresence>
                {isDetailsExpanded && (
                  <motion.div
                    id="project-expanded-details"
                    className="project-expanded-details"
                    initial={{ opacity: 0, height: 0, scaleY: 0 }}
                    animate={{ 
                      opacity: 1, 
                      height: "auto", 
                      scaleY: 1,
                      transition: { 
                        duration: 0.5, 
                        ease: "easeOut",
                        staggerChildren: 0.1
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0, 
                      scaleY: 0,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Características Principales */}
                    {project.caracteristicas && project.caracteristicas.length > 0 && (
                      <motion.div 
                        className="detail-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h4>⭐ Características Principales</h4>
                        <ul>
                          {project.caracteristicas.map((feature, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                            >
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Aspecto Destacado */}
                    {project.destacado && (
                      <motion.div 
                        className="detail-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h4>🎯 Aspecto Destacado</h4>
                        <p>
                          <strong>{project.destacado.aspecto}:</strong> {project.destacado.detalle}
                        </p>
                      </motion.div>
                    )}

                    {/* Galería de Imágenes */}
                    {project.imagenes && project.imagenes.length > 1 && (
                      <motion.div 
                        className="detail-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4>📸 Capturas del Proyecto ({project.imagenes.length - 1} adicionales)</h4>
                        <div className="project-gallery">
                          {project.imagenes.slice(1).map((imagen, index) => (
                            <motion.img 
                              key={index} 
                              src={imagen} 
                              alt={`${project.nombre} - Captura ${index + 2}`}
                              className="gallery-image"
                              onClick={() => openImageModal(imagen)}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Información Técnica Adicional */}
                    {project.repositorio && (
                      <motion.div 
                        className="detail-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h4>🔗 Información del Repositorio</h4>
                        <p>
                          El código fuente está disponible en GitHub con documentación completa, 
                          instrucciones de instalación y ejemplos de uso.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="project-links">
                {project.repositorio && (
                  <a
                    href={project.repositorio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link github-link"
                  >
                    <GitHubIcon />
                    <span>Código</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link demo-link"
                  >
                    <ExternalLinkIcon />
                    <span>Demo en Vivo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <button 
            className="nav-button nav-button-right" 
            onClick={nextProject} 
            aria-label="Siguiente proyecto"
            tabIndex={0}
          >
            <ChevronRight />
          </button>
        </div>

        <div className="project-indicators">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === safeCurrentProject ? "active" : ""}`}
              onClick={() => setCurrentProject(index)}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal para ver imágenes en grande */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="image-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh'
              }}
            >
              <img
                src={selectedImage}
                alt="Imagen ampliada del proyecto"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  borderRadius: '12px'
                }}
              />
              <button
                onClick={closeImageModal}
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
                aria-label="Cerrar imagen"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProjectsSection