"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import {
  BookOpen,
  Award,
  Eye,
  ExternalLink,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
  Target,
  Star,
  X
} from "lucide-react"
import { Badge } from "./ui/badge"
import ImageSlider from "./ImageSlider"
import "../styles/components/education/education-section.css"

const EducationSection = ({ formacionTecnica, isVisible, containerVariants, itemVariants, expandedEducation, setExpandedEducation }) => {
  const [currentEducation, setCurrentEducation] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const educationSectionRef = useRef(null)

  // Navigation functions
  const nextEducation = useCallback((keepModalOpen = false) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentEducation((prev) => (prev + 1) % formacionTecnica.length)
    if (!keepModalOpen) {
      setIsModalOpen(false)
    }
    setTimeout(() => setIsTransitioning(false), 300)
  }, [formacionTecnica.length, isTransitioning])

  const prevEducation = useCallback((keepModalOpen = false) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentEducation((prev) => (prev - 1 + formacionTecnica.length) % formacionTecnica.length)
    if (!keepModalOpen) {
      setIsModalOpen(false)
    }
    setTimeout(() => setIsTransitioning(false), 300)
  }, [formacionTecnica.length, isTransitioning])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isModalOpen) {
        if (e.key === "Escape") {
          closeModal()
        }
      } else {
        if (e.key === "ArrowLeft") {
          prevEducation()
        } else if (e.key === "ArrowRight") {
          nextEducation()
        } else if (e.key === "Enter" || e.key === "E" || e.key === "e") {
          e.preventDefault()
          openModal()
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isModalOpen, prevEducation, nextEducation])

  // Touch gestures
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
      nextEducation()
      setShowSwipeHint(false) // Ocultar indicadores después del primer swipe
    } else if (isRightSwipe) {
      prevEducation()
      setShowSwipeHint(false) // Ocultar indicadores después del primer swipe
    }
  }

  const openModal = () => {
    // Hacer scroll a la sección de educación antes de abrir el modal
    if (educationSectionRef.current) {
      educationSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
      
      // Pequeño delay para que el scroll se complete antes de abrir el modal
      setTimeout(() => {
        setIsModalOpen(true)
      }, 300)
    } else {
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Funciones específicas para navegación desde el modal
  const nextEducationInModal = () => {
    nextEducation(true) // Mantener modal abierto
  }

  const prevEducationInModal = () => {
    prevEducation(true) // Mantener modal abierto
  }

  const goToEducation = (index) => {
    if (index === currentEducation || isTransitioning) return
    setIsTransitioning(true)
    setCurrentEducation(index)
    setIsModalOpen(false)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const currentFormacion = formacionTecnica[currentEducation]

  if (!currentFormacion) {
    return (
      <section className="education-section">
        <div className="education-container">
          <div className="error-state">
            <h3>Error cargando educación</h3>
            <p>Current: {currentEducation}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
    <motion.section
      ref={educationSectionRef}
      id="education"
      className="education-section"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible.education ? "visible" : "hidden"}
    >
        {/* Header mejorado */}
        <motion.div className="education-header" variants={itemVariants}>
          <h2 className="education-title">
            <span className="title-decoration">✦</span>
            <span className="title-text">
              <span className="education-title-accent">F</span>ormación <span className="education-title-accent">T</span>écnica
            </span>
            <span className="title-decoration">✦</span>
          </h2>
          <div className="education-counter">
            <span className="current-education">{currentEducation + 1}</span>
            <span className="separator">/</span>
            <span className="total-education">{formacionTecnica.length}</span>
          </div>
        </motion.div>

        {/* Contenedor principal de educación con navegación lateral */}
        <div className="education-main-wrapper">
          {/* Flecha de navegación izquierda */}
          <button 
            className="nav-button education-nav-lateral education-prev"
            onClick={prevEducation} 
            disabled={isTransitioning}
            aria-label="Educación anterior"
          >
            <ChevronLeft />
          </button>

          {/* Contenedor principal de educación */}
        <motion.div
            className={`education-main-container swipe-container ${!showSwipeHint ? 'swipe-hint-hidden' : ''}`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          >
            {/* Indicadores de gesto de swipe para móvil */}
            <div className="swipe-gesture-indicator">
              Desliza
            </div>
            <div className="swipe-arrow-left">←</div>
            <div className="swipe-arrow-right">→</div>
            <div className="swipe-dots">
              <div className="swipe-dot"></div>
              <div className="swipe-dot"></div>
              <div className="swipe-dot"></div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEducation}
                className="education-content-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut"
                }}
              >
                {/* CONTENEDOR IZQUIERDO - Información de la educación (transparente) */}
                <div className="education-info-container">
                  {/* Header de la educación */}
                  <div className="education-header-info">
                    <h3 className="education-title-info">
                      {currentFormacion.titulo.split('').map((char, index) => {
                        // Resaltar varias MAYÚSCULAS con el color verde de prograMate
                        const shouldHighlight = char === 'F' || // F de Full-Stack
                                               char === 'B' || // B de Backend
                                               char === 'F' || // F de Frontend
                                               char === 'D' || // D de Desarrollo
                                               char === 'W' || // W de Web
                                               char === 'A' || // A de App
                                               char === 'M' || // M de Mobile
                                               char === 'J' || // J de Java
                                               char === 'P' || // P de Python
                                               char === 'R' || // R de React
                                               char === 'N' || // N de Node
                                               char === 'S' || // S de Spring
                                               char === 'U' || // U de UX/UI
                                               char === 'I' || // I de Interactivo
                                               char === 'C' || // C de Certificación
                                               char === 'T' || // T de Tecnología
                                               char === 'E' || // E de Especializada
                                               char === 'G' || // G de Gestión
                                               char === 'Q' || // Q de Quality
                                               char === 'V' || // V de Virtual
                                               char === 'O' || // O de Online
                                               char === 'L' || // L de Live
                                               char === 'X' || // X de eXperience
                                               char === 'Y' || // Y de System
                                               char === 'Z' || // Z de Zero
                                               char === 'K' || // K de Stack
                                               char === 'H' || // H de HTML
                                               char === 'Q' || // Q de Quality
                                               char === '-' || // Guiones
                                               char === '–' || // Guión medio
                                               char === '—';   // Guión largo
                        
                        return shouldHighlight ? (
                          <span key={index} className="education-title-accent">{char}</span>
                        ) : (
                          <span key={index}>{char}</span>
                        );
                      })}
                    </h3>
                  </div>
                  
                  {/* Institución */}
                  <p className="education-institution">{currentFormacion.institucion}</p>

                  {/* Información básica de la educación */}
                  <div className="education-meta">
                    <div className="meta-item">
                      <Clock className="meta-icon" />
                      <span className="meta-text">{currentFormacion.duracion}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin className="meta-icon" />
                      <span className="meta-text">{currentFormacion.modalidad}</span>
                    </div>
                    <div className="meta-item">
                      <Calendar className="meta-icon" />
                      <span className="meta-text">{currentFormacion.periodo}</span>
                    </div>
              </div>

                  {/* Estado de la educación */}
                {currentFormacion.estado && (
                    <div className="education-status">
                      <CheckCircle className="status-icon" />
                      <span>{currentFormacion.estado}</span>
                    </div>
                  )}

                  {/* Descripción resumida */}
                  <p className="education-description-summary">
                    {currentFormacion.descripcion.length > 150 
                      ? `${currentFormacion.descripcion.substring(0, 150)}...`
                      : currentFormacion.descripcion
                    }
                  </p>

                  {/* Botón de detalles mejorado */}
                  <motion.button
                    className="details-toggle-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye />
                    <span>Ver Detalles Completos</span>
                    <div className="keyboard-hint">
                      <span className="key-indicator">E - IN</span>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* CONTENEDOR DERECHO - Card con información expandida (fuera del wrapper) */}
          <div className="education-card-container">
            {/* Sección superior - Información destacada */}
            <div className="education-highlight-section">
              <GraduationCap className="highlight-icon" />
              <div>
                <h4 className="highlight-title">Formación Especializada</h4>
                <p className="highlight-subtitle">Desarrollo de competencias técnicas avanzadas</p>
              </div>
            </div>

            {/* Sección inferior - Competencias y certificaciones */}
            <div className="education-details-section">
              <h4 className="section-title">
                <Target />
                Competencias Clave
              </h4>
              <div className="competencies-preview">
                {currentFormacion.competencias.slice(0, 3).map((competencia, compIndex) => (
                  <div key={compIndex} className="competency-preview-item">
                    <span>{competencia}</span>
                  </div>
                ))}
                {currentFormacion.competencias.length > 3 && (
                  <div className="more-competencies">
                    <span>+{currentFormacion.competencias.length - 3} más</span>
                  </div>
                )}
              </div>

              {/* Certificaciones preview */}
              <div className="certificates-preview-section">
                <Award className="certificate-icon" />
                <div className="certificates-info">
                  <h5 className="certificates-title">Certificaciones</h5>
                  {currentFormacion.certificaciones && currentFormacion.certificaciones.length > 0 ? (
                    <div>
                      <span className="certificates-count">
                        {currentFormacion.certificaciones.length} certificación{currentFormacion.certificaciones.length > 1 ? 'es' : ''}
                      </span>
                      <button
                        onClick={() => setSelectedCertificate(currentFormacion.certificaciones[0])}
                        className="view-certificates-btn"
                      >
                        <Eye className="w-4 h-4" />
                        Ver Certificados
                      </button>
                    </div>
                  ) : (
                    <div className="empty-certificates">
                      <p>Certificaciones en proceso</p>
                    </div>
                )}
              </div>
            </div>
            </div>
          </div>

          {/* Flecha de navegación derecha */}
          <button
            className="nav-button education-nav-lateral education-next"
            onClick={nextEducation}
            disabled={isTransitioning}
            aria-label="Siguiente educación"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Indicadores de educación mejorados */}
        <div className="education-indicators">
          {formacionTecnica.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === currentEducation ? "active" : ""}`}
              onClick={() => goToEducation(index)}
              disabled={isTransitioning}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ir a educación ${index + 1}`}
            />
          ))}
        </div>
      </motion.section>

      {/* Modal Unificado de Educación y Certificados */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="education-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="education-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header del modal */}
              <div className="modal-header">
                <div className="modal-title-section">
                  <h2 className="modal-title">{currentFormacion.titulo}</h2>
                  <p className="modal-subtitle">{currentFormacion.institucion}</p>
                </div>
                <div className="modal-actions">
                  <button
                    className="modal-nav-button"
                    onClick={prevEducationInModal}
                    disabled={currentEducation === 0}
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    className="modal-nav-button"
                    onClick={nextEducationInModal}
                    disabled={currentEducation === formacionTecnica.length - 1}
                  >
                    <ChevronRight />
                  </button>
                  <button className="modal-close-button" onClick={closeModal}>
                    <X />
                  </button>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="modal-content">
                {/* Información completa */}
                <div className="modal-info-section">
                  <div className="modal-metadata">
                    <div className="metadata-item">
                      <Clock className="metadata-icon" />
                      <div>
                        <div className="metadata-label">DURACIÓN</div>
                        <div className="metadata-value">{currentFormacion.duracion}</div>
                      </div>
                    </div>
                    <div className="metadata-item">
                      <MapPin className="metadata-icon" />
                      <div>
                        <div className="metadata-label">MODALIDAD</div>
                        <div className="metadata-value">{currentFormacion.modalidad}</div>
                      </div>
                    </div>
                    <div className="metadata-item">
                      <Calendar className="metadata-icon" />
                      <div>
                        <div className="metadata-label">PERÍODO</div>
                        <div className="metadata-value">{currentFormacion.periodo}</div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-description">
                    <h3>Descripción Completa</h3>
                    <p>{currentFormacion.descripcion}</p>
                  </div>

                  <div className="modal-competencies">
                    <h3>Competencias Desarrolladas</h3>
                    <div className="competencies-grid">
                      {currentFormacion.competencias.map((competencia, compIndex) => (
                        <div key={compIndex} className="competency-item">
                          <div className="competency-bullet"></div>
                          <span>{competencia}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {currentFormacion.certificaciones && currentFormacion.certificaciones.length > 0 && (
                    <div className="modal-certificates">
                      <h3>Certificaciones Disponibles</h3>
                      <div className="certificates-grid">
                        {currentFormacion.certificaciones.map((cert, certIndex) => (
                          <div key={certIndex} className="certificate-item">
                            <Award className="certificate-icon" />
                            <div className="certificate-info">
                              <h4>{cert.nombre}</h4>
                              <p>{cert.descripcion}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Sección de imágenes de certificados */}
                      <div className="certificates-images-section">
                        <h3>Certificados Obtenidos</h3>
                        <div className="certificates-images-grid">
                          {currentFormacion.certificaciones.map((cert, certIndex) => (
                            cert.tipo === "imagen" && cert.imagenes && cert.imagenes.length > 0 && (
                              <div key={certIndex} className="certificate-image-item">
                                <h4 className="certificate-image-title">{cert.nombre}</h4>
                                <div className="certificate-image-container">
                                  <ImageSlider
                                    images={cert.imagenes}
                                    alt={`Certificado ${cert.nombre}`}
                                    className="certificate-image-slider"
                                  />
                                </div>
                                {cert.url && (
                                  <button
                                    onClick={() => window.open(cert.url, '_blank')}
                                    className="certificate-external-btn"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    Ver Original
                                  </button>
                                )}
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EducationSection
