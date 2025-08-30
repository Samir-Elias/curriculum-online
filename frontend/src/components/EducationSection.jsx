"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import {
  BookOpen,
  Award,
  Eye,
  ExternalLink,
  FileText,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  GraduationCap
} from "lucide-react"
import { Badge } from "./ui/badge"
import "../styles/components/education/education-section.css"

const EducationSection = ({ formacionTecnica, isVisible, containerVariants, itemVariants, setSelectedCertificate }) => {
  const [currentEducation, setCurrentEducation] = useState(0)
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Navigation functions
  const nextEducation = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentEducation((prev) => (prev + 1) % formacionTecnica.length)
    setIsDetailsExpanded(false)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [formacionTecnica.length, isTransitioning])

  const prevEducation = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentEducation((prev) => (prev - 1 + formacionTecnica.length) % formacionTecnica.length)
    setIsDetailsExpanded(false)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [formacionTecnica.length, isTransitioning])

  const toggleDetails = useCallback(() => {
    setIsDetailsExpanded(!isDetailsExpanded)
  }, [isDetailsExpanded])

  // Keyboard navigation - CAMBIADO A SHIFT
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isVisible.education) return

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          prevEducation()
          break
        case "ArrowRight":
          e.preventDefault()
          nextEducation()
          break
        case "Shift": // CAMBIADO DE "Enter"/" " A "Shift"
          e.preventDefault()
          toggleDetails()
          break
        case "Escape":
          setIsDetailsExpanded(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isVisible.education, prevEducation, nextEducation, toggleDetails])

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
    }
    if (isRightSwipe) {
      prevEducation()
    }
  }

  const currentFormacion = formacionTecnica[currentEducation]

  return (
    <motion.section
      id="education"
      className="education-section"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible.education ? "visible" : "hidden"}
    >
      <div className="education-container">
        {/* Header */}
        <motion.div className="education-header" variants={itemVariants}>
          <div className="education-title-decoration">
            <BookOpen className="education-title-icon" />
            <h2 className="education-title-text">
              Formación <span className="education-title-accent">Especializada</span>
            </h2>
          </div>
          <p className="education-subtitle">
            Desarrollo de competencias técnicas avanzadas
          </p>
          <div className="education-counter">
            <span className="current-education">{currentEducation + 1}</span>
            <span className="separator"> / </span>
            <span className="total-education">{formacionTecnica.length}</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          key={currentEducation}
          className="education-main-wrapper"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          variants={itemVariants}
        >
          {/* Left Side - Main Info */}
          <div className="education-main-container">
            <div className="education-content-wrapper">
              <div className="education-info-container">
                <div className="education-header-info">
                  <h3 className="education-title-info">
                    {currentFormacion.titulo}
                  </h3>
                  <p className="education-institution">
                    {currentFormacion.institucion}
                  </p>
                </div>

                {/* Meta Information */}
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

                {/* Status */}
                {currentFormacion.estado && (
                  <div className="education-status">
                    <CheckCircle className="status-icon" />
                    {currentFormacion.estado}
                  </div>
                )}

                {/* Description Summary */}
                <div className="education-description-summary">
                  {currentFormacion.descripcion}
                </div>

                {/* Details Toggle Button */}
                <button
                  onClick={toggleDetails}
                  className="details-toggle-button"
                  disabled={isTransitioning}
                >
                  {isDetailsExpanded ? (
                    <>
                      <ChevronUp />
                      Ocultar Detalles
                      <span className="keyboard-hint">
                        <span className="key-indicator">Shift</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <ChevronDown />
                      Ver Detalles Completos
                      <span className="keyboard-hint">
                        <span className="key-indicator">Shift</span>
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Highlights Card */}
          <div className="education-card-container">
            {/* Highlight Section con logo amarillo asomándose */}
            <div className="education-highlight-section">
              <GraduationCap className="highlight-icon" />
              <div className="highlight-content">
                <h4 className="highlight-title">Formación Especializada</h4>
                <p className="highlight-subtitle">
                  Desarrollo de competencias técnicas avanzadas
                </p>
              </div>
            </div>

            {/* Competencies Preview */}
            <div className="education-details-section">
              <h4 className="section-title">
                <CheckCircle className="section-icon" />
                Competencias Clave
              </h4>
              <div className="competencies-preview">
                {currentFormacion.competencias.slice(0, 4).map((competencia, index) => (
                  <div key={index} className="competency-preview-item">
                    {competencia}
                  </div>
                ))}
                {currentFormacion.competencias.length > 4 && (
                  <div className="more-competencies">
                    +{currentFormacion.competencias.length - 4} competencias más
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevEducation}
            className="nav-button education-nav-lateral education-prev"
            disabled={formacionTecnica.length <= 1 || isTransitioning}
            aria-label="Educación anterior"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextEducation}
            className="nav-button education-nav-lateral education-next"
            disabled={formacionTecnica.length <= 1 || isTransitioning}
            aria-label="Siguiente educación"
          >
            <ChevronRight />
          </button>
        </motion.div>

        {/* Progress Indicators */}
        <div className="education-indicators">
          {formacionTecnica.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentEducation(index)
                setIsDetailsExpanded(false)
              }}
              className={`indicator ${index === currentEducation ? "active" : ""}`}
              disabled={isTransitioning}
              aria-label={`Ir a educación ${index + 1}`}
            />
          ))}
        </div>

        {/* Modal de Detalles */}
        <AnimatePresence>
          {isDetailsExpanded && (
            <motion.div
              className="education-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailsExpanded(false)}
            >
              <motion.div
                className="education-modal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="modal-header">
                  <div className="modal-title-section">
                    <h3 className="modal-title">{currentFormacion.titulo}</h3>
                    <p className="modal-subtitle">{currentFormacion.institucion}</p>
                  </div>
                  <div className="modal-actions">
                    <button
                      onClick={prevEducation}
                      className="modal-nav-button"
                      disabled={formacionTecnica.length <= 1}
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={nextEducation}
                      className="modal-nav-button"
                      disabled={formacionTecnica.length <= 1}
                    >
                      <ChevronRight />
                    </button>
                    <button
                      onClick={() => setIsDetailsExpanded(false)}
                      className="modal-close-button"
                    >
                      <X />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="modal-content">
                  {/* Info Section */}
                  <div className="modal-info-section">
                    <div className="modal-metadata">
                      <div className="metadata-item">
                        <Clock className="metadata-icon" />
                        <div>
                          <div className="metadata-label">Duración</div>
                          <div className="metadata-value">{currentFormacion.duracion}</div>
                        </div>
                      </div>
                      <div className="metadata-item">
                        <MapPin className="metadata-icon" />
                        <div>
                          <div className="metadata-label">Modalidad</div>
                          <div className="metadata-value">{currentFormacion.modalidad}</div>
                        </div>
                      </div>
                      <div className="metadata-item">
                        <Calendar className="metadata-icon" />
                        <div>
                          <div className="metadata-label">Período</div>
                          <div className="metadata-value">{currentFormacion.periodo}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="modal-description">
                    <h3>Descripción del Programa</h3>
                    <p>{currentFormacion.descripcion}</p>
                  </div>

                  {/* Competencies */}
                  <div className="modal-competencies">
                    <h3>Competencias Desarrolladas ({currentFormacion.competencias.length})</h3>
                    <div className="competencies-grid">
                      {currentFormacion.competencias.map((competencia, index) => (
                        <div key={index} className="competency-item">
                          <div className="competency-bullet"></div>
                          <span>{competencia}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certificaciones - BOTÓN MOVIDO AQUÍ */}
                  {currentFormacion.certificaciones && currentFormacion.certificaciones.length > 0 && (
                    <div className="modal-certificates">
                      <h3>Certificaciones Obtenidas</h3>
                      
                      {/* Botón para ver certificaciones - AGREGADO AL MODAL */}
                      <button
                        onClick={() => {
                          // Abrir modal de certificaciones o manejar certificaciones
                          if (currentFormacion.certificaciones.length === 1) {
                            setSelectedCertificate(currentFormacion.certificaciones[0])
                          }
                        }}
                        className="view-certificates-modal-btn"
                      >
                        <Award />
                        Ver Certificaciones ({currentFormacion.certificaciones.length})
                      </button>

                      <div className="certificates-grid">
                        {currentFormacion.certificaciones.map((cert, index) => (
                          <div key={index} className="certificate-item">
                            <div className="certificate-info">
                              <h4>{cert.nombre}</h4>
                              <p>{cert.emisor}</p>
                            </div>
                            <button
                              onClick={() => setSelectedCertificate(cert)}
                              className="view-certificate-btn"
                            >
                              <Eye />
                              Ver
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default EducationSection