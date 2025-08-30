"use client"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { ExternalLink, X, Award, Calendar, MapPin } from "lucide-react"
import { Button } from "./ui/button"
import ImageSlider from "./ImageSlider"
import "../styles/components/education/certificate-modal.css"

const CertificateModal = ({ selectedCertificate, setSelectedCertificate }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [modalPosition, setModalPosition] = useState({ top: '2rem' })

  useEffect(() => {
    if (selectedCertificate) {
      // Hacer scroll a la sección de educación primero
      const educationSection = document.getElementById('education')
      if (educationSection) {
        educationSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        
        // Esperar a que el scroll se complete antes de calcular la posición
        setTimeout(() => {
          const rect = educationSection.getBoundingClientRect()
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          
          // Calcular la posición del modal para que aparezca sobre la sección
          const modalTop = Math.max(2, rect.top + scrollTop - 50) // 50px de margen superior
          
          setModalPosition({ top: `${modalTop}px` })
        }, 400) // Delay para que el scroll se complete
      } else {
        setModalPosition({ top: '2rem' })
      }
    }
  }, [selectedCertificate])

  if (!selectedCertificate) return null

  // Usar Portal para renderizar fuera del contenedor de EducationSection
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="certificate-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedCertificate(null);
        }}
      >
        <motion.div
          className="certificate-modal-container"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={modalPosition}
        >
          {/* Header */}
          <div className="certificate-modal-header">
            <div className="certificate-modal-title-section">
              <h2 className="certificate-modal-title">
                <Award className="certificate-modal-icon" />
                {selectedCertificate.nombre}
              </h2>
              <p className="certificate-modal-issuer">{selectedCertificate.emisor}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCertificate(null);
              }}
              className="certificate-modal-close"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="certificate-modal-content">
            {/* Left Side - Information */}
            <div className="certificate-info-section">
              <div className="certificate-info-card">
                <h3 className="certificate-info-title">Detalles del Certificado</h3>
                
                <div className="certificate-info-grid">
                  <div className="certificate-info-item">
                    <Award className="certificate-info-icon" />
                    <div>
                      <div className="certificate-info-label">Certificación</div>
                      <div className="certificate-info-value">{selectedCertificate.nombre}</div>
                    </div>
                  </div>
                  
                  <div className="certificate-info-item">
                    <MapPin className="certificate-info-icon" />
                    <div>
                      <div className="certificate-info-label">Emisor</div>
                      <div className="certificate-info-value">{selectedCertificate.emisor}</div>
                    </div>
                  </div>
                  
                  <div className="certificate-info-item">
                    <Calendar className="certificate-info-icon" />
                    <div>
                      <div className="certificate-info-label">Tipo</div>
                      <div className="certificate-info-value">
                        {selectedCertificate.tipo === "imagen" ? "Certificado Digital" : "Certificado Online"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="certificate-actions">
                  {selectedCertificate.url && (
                    <Button
                      onClick={() => window.open(selectedCertificate.url, '_blank')}
                      className="certificate-action-btn primary"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Certificado Original
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCertificate(null);
                    }}
                    className="certificate-action-btn secondary"
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="certificate-image-section">
              {selectedCertificate.tipo === "imagen" && selectedCertificate.imagenes && selectedCertificate.imagenes.length > 0 ? (
                <div className="certificate-image-container">
                  <ImageSlider
                    images={selectedCertificate.imagenes}
                    alt={`Certificado ${selectedCertificate.nombre}`}
                    className="certificate-image-slider"
                  />
                </div>
              ) : (
                <div className="certificate-no-image">
                  <Award className="certificate-no-image-icon" />
                  <p>Certificado disponible online</p>
                  {selectedCertificate.url && (
                    <Button
                      onClick={() => window.open(selectedCertificate.url, '_blank')}
                      className="certificate-action-btn primary"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Certificado
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default CertificateModal
