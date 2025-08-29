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
                  {currentFormacion.competencias.slice(0, 4).map((competencia, compIndex) => (
                    <div key={compIndex} className="competency-item">
                      <div className="competency-bullet"></div>
                      <span>{competencia}</span>
                    </div>
                  ))}
                </div>
                {currentFormacion.competencias.length > 4 && (
                  <p className="more-indicator">
                    +{currentFormacion.competencias.length - 4} competencias más...
                  </p>
                )}
              </div>

              {/* Certificates Preview - Simplified */}
              {currentFormacion.certificaciones && currentFormacion.certificaciones.length > 0 && (
                <div className="education-certificates">
                  <h4 className="education-section-title">
                    <Award className="section-icon" />
                    Certificaciones ({currentFormacion.certificaciones.length}):
                  </h4>
                  <div className="certificates-grid">
                    {currentFormacion.certificaciones.slice(0, 2).map((cert, certIndex) => (
                      <div key={certIndex} className="certificate-preview">
                        {cert.tipo === "imagen" && cert.imagenes && cert.imagenes.length > 0 ? (
                          <div>
                            <div className="certificate-image-container">
                              <img 
                                src={cert.imagenes[0]} 
                                alt={`Certificado ${cert.nombre}`}
                                className="certificate-image"
                              />
                            </div>
                            <h5 className="certificate-title">{cert.nombre}</h5>
                            <p className="certificate-issuer">{cert.emisor}</p>
                            <div className="certificate-actions">
                              <button
                                onClick={() => setSelectedCertificate(cert)}
                                className="certificate-action-btn view-btn"
                              >
                                <Eye className="w-4 h-4" />
                                Ver
                              </button>
                              {cert.url && (
                                <a
                                  href={cert.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="certificate-action-btn link-btn"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Enlace
                                </a>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="certificate-text">
                            <FileText className="certificate-icon" />
                            <h5 className="certificate-title">{cert.nombre}</h5>
                            <p className="certificate-issuer">{cert.emisor}</p>
                            {cert.url && (
                              <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="certificate-action-btn link-btn"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Ver Certificado
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expand Button */}
              <div className="education-card-footer">
                <button
                  onClick={toggleDetails}
                  className="expand-button"
                  disabled={isTransitioning}
                >
                  {isDetailsExpanded ? (
                    <>
                      <ChevronUp className="w-5 h-5" />
                      Ocultar Detalles Completos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" />
                      Ver Detalles Completos
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expanded Details - Simplified */}
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

                    {/* All Certificates - Simplified */}
                    <div className="expanded-section">
                      <h4 className="education-section-title">
                        <Award className="section-icon" />
                        Todas las Certificaciones:
                      </h4>
                      {currentFormacion.certificaciones && currentFormacion.certificaciones.length > 0 ? (
                        <div className="certificates-list">
                          {currentFormacion.certificaciones.map((cert, certIndex) => (
                            <div key={certIndex} className="certificate-card">
                              {cert.tipo === "imagen" && cert.imagenes && cert.imagenes.length > 0 ? (
                                <div>
                                  <div className="certificate-image-container-large">
                                    <img 
                                      src={cert.imagenes[0]} 
                                      alt={`Certificado ${cert.nombre}`}
                                      className="certificate-image"
                                    />
                                  </div>
                                  <h5 className="certificate-title-large">{cert.nombre}</h5>
                                  <p className="certificate-issuer-large">{cert.emisor}</p>
                                  <div className="certificate-actions-large">
                                    <button
                                      onClick={() => setSelectedCertificate(cert)}
                                      className="certificate-action-btn view-btn"
                                    >
                                      <Eye className="w-4 h-4" />
                                      Ver
                                    </button>
                                    {cert.url && (
                                      <a
                                        href={cert.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="certificate-action-btn link-btn"
                                      >
                                        <ExternalLink className="w-4 h-4" />
                                        Enlace
                                      </a>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="certificate-text-large">
                                  <FileText className="certificate-icon-large" />
                                  <h5 className="certificate-title-large">{cert.nombre}</h5>
                                  <p className="certificate-issuer-large">{cert.emisor}</p>
                                  {cert.url && (
                                    <a
                                      href={cert.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="certificate-action-btn link-btn"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      Ver Certificado
                                    </a>
                                  )}
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
