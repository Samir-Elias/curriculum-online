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
} from "lucide-react"
import { Badge } from "./ui/badge"
import ImageSlider from "./ImageSlider"
import "../styles/components/education-section.css"

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

  // Keyboard navigation
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
        case "Enter":
        case " ":
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
          <h2 className="education-title">
            <BookOpen className="education-title-icon" />
            Formación Técnica Especializada
          </h2>
          <div className="education-counter">
            <span className="current-education">{currentEducation + 1}</span>
            <span className="separator">/</span>
            <span>{formacionTecnica.length}</span>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <div className="education-navigation-top">
          <button 
            onClick={prevEducation} 
            className="nav-button" 
            disabled={formacionTecnica.length <= 1 || isTransitioning}
            aria-label="Educación anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextEducation} 
            className="nav-button" 
            disabled={formacionTecnica.length <= 1 || isTransitioning}
            aria-label="Siguiente educación"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Main Education Card */}
        <motion.div
          key={currentEducation}
          className="education-carousel-container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          variants={itemVariants}
        >
          <div className="education-card">
            {/* Header */}
            <div className="education-card-header">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 min-w-0">
                  <h3 className="education-card-title">{currentFormacion.titulo}</h3>
                  <p className="education-card-institution">{currentFormacion.institucion}</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  {currentFormacion.estado && (
                    <Badge
                      className={`education-status-badge ${
                        currentFormacion.estado.includes("Completado")
                          ? "completed"
                          : "in-progress"
                      }`}
                    >
                      {currentFormacion.estado}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="education-metadata-grid">
                <div className="metadata-item">
                  <Clock className="metadata-icon" />
                  <div>
                    <p className="metadata-label">Duración</p>
                    <p className="metadata-value">{currentFormacion.duracion}</p>
                  </div>
                </div>
                {currentFormacion.modalidad && (
                  <div className="metadata-item">
                    <MapPin className="metadata-icon" />
                    <div>
                      <p className="metadata-label">Modalidad</p>
                      <p className="metadata-value">{currentFormacion.modalidad}</p>
                    </div>
                  </div>
                )}
                {currentFormacion.periodo && (
                  <div className="metadata-item">
                    <Calendar className="metadata-icon" />
                    <div>
                      <p className="metadata-label">Período</p>
                      <p className="metadata-value">{currentFormacion.periodo}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="education-card-content">
              {/* Description */}
              <div className="education-description">
                <p>{currentFormacion.descripcion}</p>
              </div>

              {/* Competencies Preview */}
              <div className="education-competencies">
                <h4 className="education-section-title">
                  <CheckCircle className="section-icon" />
                  Competencias desarrolladas ({currentFormacion.competencias.length}):
                </h4>
                <div className="competencies-grid">
                  {currentFormacion.competencias.slice(0, 6).map((competencia, compIndex) => (
                    <div key={compIndex} className="competency-item">
                      <div className="competency-bullet"></div>
                      <span>{competencia}</span>
                    </div>
                  ))}
                </div>
                {currentFormacion.competencias.length > 6 && (
                  <p className="more-indicator">
                    +{currentFormacion.competencias.length - 6} competencias más...
                  </p>
                )}
              </div>

              {/* Certificates Preview */}
              {currentFormacion.certificaciones && currentFormacion.certificaciones.length > 0 && (
                <div className="education-certificates">
                  <h4 className="education-section-title">
                    <Award className="section-icon" />
                    Certificaciones ({currentFormacion.certificaciones.length}):
                  </h4>
                  <div className="certificates-grid">
                    {currentFormacion.certificaciones.slice(0, 2).map((cert, certIndex) => (
                      <div key={certIndex} className="certificate-preview">
                        {cert.tipo === "imagen" ? (
                          <div>
                            <div className="certificate-image-container">
                              <ImageSlider
                                images={cert.imagenes}
                                alt={`Certificado ${cert.nombre}`}
                                className="certificate-image"
                              />
                            </div>
                            <h5 className="certificate-title">{cert.nombre}</h5>
                            <p className="certificate-issuer">{cert.emisor}</p>
                            <div className="certificate-actions">
                              <button
                                onClick={() => setSelectedCertificate(cert)}
                                className="action-button"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Ver
                              </button>
                              <button
                                onClick={() => window.open(cert.url)}
                                className="action-button"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Enlace
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="certificate-link">
                            <div className="certificate-link-content">
                              <FileText className="certificate-icon" />
                              <div>
                                <h5 className="certificate-title">{cert.nombre}</h5>
                                <p className="certificate-issuer">{cert.emisor}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => window.open(cert.url)}
                              className="action-button"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {currentFormacion.certificaciones.length > 2 && (
                    <p className="more-indicator">
                      +{currentFormacion.certificaciones.length - 2} certificaciones más...
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Expand Button */}
            <div className="education-card-footer">
              <button
                onClick={toggleDetails}
                className="expand-button"
                disabled={isTransitioning}
              >
                {isDetailsExpanded ? (
                  <>
                    <ChevronUp className="w-5 h-5 mr-2" />
                    Ocultar Detalles Completos
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5 mr-2" />
                    Ver Detalles Completos
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isDetailsExpanded && (
            <motion.div
              className="education-expanded-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="education-card">
                <div className="education-card-content">
                  <div className="expanded-content-grid">
                    {/* All Competencies */}
                    <div className="expanded-section">
                      <h4 className="education-section-title">
                        <CheckCircle className="section-icon" />
                        Todas las Competencias:
                      </h4>
                      <div className="competencies-list">
                        {currentFormacion.competencias.map((competencia, compIndex) => (
                          <div key={compIndex} className="competency-card">
                            <div className="competency-bullet-large"></div>
                            <span>{competencia}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* All Certificates */}
                    <div className="expanded-section">
                      <h4 className="education-section-title">
                        <Award className="section-icon" />
                        Todas las Certificaciones:
                      </h4>
                      {currentFormacion.certificaciones && currentFormacion.certificaciones.length > 0 ? (
                        <div className="certificates-list">
                          {currentFormacion.certificaciones.map((cert, certIndex) => (
                            <div key={certIndex} className="certificate-card">
                              {cert.tipo === "imagen" ? (
                                <div>
                                  <div className="certificate-image-container-large">
                                    <ImageSlider
                                      images={cert.imagenes}
                                      alt={`Certificado ${cert.nombre}`}
                                      className="certificate-image"
                                    />
                                  </div>
                                  <h5 className="certificate-title-large">{cert.nombre}</h5>
                                  <p className="certificate-issuer-large">{cert.emisor}</p>
                                  <div className="certificate-actions-large">
                                    <button
                                      onClick={() => setSelectedCertificate(cert)}
                                      className="action-button-large"
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      Ver
                                    </button>
                                    <button
                                      onClick={() => window.open(cert.url)}
                                      className="action-button-large"
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Enlace
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="certificate-link-large">
                                  <div className="certificate-link-content">
                                    <FileText className="certificate-icon-large" />
                                    <div>
                                      <h5 className="certificate-title-large">{cert.nombre}</h5>
                                      <p className="certificate-issuer-large">{cert.emisor}</p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => window.open(cert.url)}
                                    className="action-button-large"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="empty-certificates">
                          <Award className="empty-icon" />
                          <h3>Certificaciones en proceso</h3>
                          <p>Las certificaciones estarán disponibles próximamente</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="education-progress-dots">
          {formacionTecnica.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentEducation(index)
                setIsDetailsExpanded(false)
              }}
              className={`progress-dot ${index === currentEducation ? "active" : ""}`}
              disabled={isTransitioning}
              aria-label={`Ir a educación ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default EducationSection
