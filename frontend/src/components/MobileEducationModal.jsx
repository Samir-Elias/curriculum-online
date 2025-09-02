"use client"

import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import ImageSlider from "./ImageSlider";

const MobileEducationModal = ({ isOpen, onClose, education, onNextEducation, onPrevEducation, hasNextEducation, hasPrevEducation }) => {
  const [expandedCards, setExpandedCards] = useState({
    description: false,
    institutional: false,
    competencies: false,
    certifications: false
  });
  
  const modalContentRef = useRef(null);
  
  const toggleCard = (cardKey) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
    
    // Si se está expandiendo la card, hacer scroll hasta el título del badge
    if (!expandedCards[cardKey]) {
      setTimeout(() => {
        if (modalContentRef.current) {
          // Encontrar el badge que se está expandiendo
          const badgeElement = document.querySelector(`[data-badge="${cardKey}"]`);
          if (badgeElement) {
            // Calcular la posición del badge relativa al modal
            const modalRect = modalContentRef.current.getBoundingClientRect();
            const badgeRect = badgeElement.getBoundingClientRect();
            const scrollTop = badgeRect.top - modalRect.top + modalContentRef.current.scrollTop;
            
            // Hacer scroll hasta el badge con un pequeño offset para el header
            modalContentRef.current.scrollTo({
              top: Math.max(0, scrollTop - 20),
              behavior: 'smooth'
            });
          } else {
            // Fallback: scroll hasta arriba
            modalContentRef.current.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        }
      }, 150); // Delay para que la animación de expansión comience
    }
  };
  
  React.useEffect(() => {
    setExpandedCards({
      description: false,
      institutional: false,
      competencies: false,
      certifications: false
    });
  }, [education.titulo]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!education || !isOpen) {
    return null;
  }

  return createPortal(
    <div className="mobile-modal-overlay" onClick={onClose}>
      <div className="mobile-modal-content" ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="mobile-modal-header">
          <button 
            className="mobile-nav-button"
            onClick={(e) => {
              e.stopPropagation();
              onPrevEducation();
            }}
            disabled={!hasPrevEducation}
          >
            <ChevronLeft size={24} />
          </button>
          
          <h2 className="mobile-modal-title">{education.titulo}</h2>
          
          <button 
            className="mobile-close-button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ×
          </button>
          
          <button 
            className="mobile-nav-button"
            onClick={(e) => {
              e.stopPropagation();
              onNextEducation();
            }}
            disabled={!hasNextEducation}
          >
            <ChevronRight size={24} />
          </button>
        </div>

                         {/* Contenido Principal */}
         <div className="mobile-cards-wrapper">
           {/* Badge de Descripción */}
           <div 
             className={`mobile-card mobile-collapsible ${expandedCards.description ? 'expanded' : ''}`}
             data-badge="description"
           >
             <div 
               className="card-header collapsible-header"
               onClick={() => toggleCard('description')}
             >
               <span>📖</span>
               <h3>Descripción del Programa</h3>
               <span className="expand-icon">
                 {expandedCards.description ? '▼' : '▶'}
               </span>
             </div>
             <div className="card-content">
               <p className="card-text">{education.descripcion}</p>
             </div>
           </div>

           {/* Badge de Información Institucional */}
           <div 
             className={`mobile-card mobile-collapsible ${expandedCards.institutional ? 'expanded' : ''}`}
             data-badge="institutional"
           >
             <div 
               className="card-header collapsible-header"
               onClick={() => toggleCard('institutional')}
             >
               <span>🏛️</span>
               <h3>Información Institucional</h3>
               <span className="expand-icon">
                 {expandedCards.institutional ? '▼' : '▶'}
               </span>
             </div>
             <div className="card-content">
               <div className="details-grid">
                 <div className="detail-item">
                   <span className="detail-label">Institución:</span>
                   <span className="detail-value">{education.institucion}</span>
                 </div>
                 
                 <div className="detail-item">
                   <span className="detail-label">Período:</span>
                   <span className="detail-value">{education.periodo}</span>
                 </div>
                 
                 <div className="detail-item">
                   <span className="detail-label">Duración:</span>
                   <span className="detail-value">{education.duracion}</span>
                 </div>
                 
                 <div className="detail-item">
                   <span className="detail-label">Modalidad:</span>
                   <span className="detail-value">{education.modalidad}</span>
                 </div>
                 
                 <div className="detail-item">
                   <span className="detail-label">Estado:</span>
                   <span className="detail-value status-badge">{education.estado}</span>
                 </div>
               </div>
             </div>
           </div>

           {/* Badge de Competencias */}
           {education.competencias && education.competencias.length > 0 && (
             <div 
               className={`mobile-card mobile-collapsible ${expandedCards.competencies ? 'expanded' : ''}`}
               data-badge="competencies"
             >
               <div 
                 className="card-header collapsible-header"
                 onClick={() => toggleCard('competencies')}
               >
                 <span>⭐</span>
                 <h3>Competencias Desarrolladas</h3>
                 <span className="expand-icon">
                   {expandedCards.competencies ? '▼' : '▶'}
                 </span>
               </div>
               <div className="card-content">
                 <div className="competencies-list">
                   {education.competencias.map((competencia, index) => (
                     <div key={index} className="competency-item">
                       <span className="competency-icon">✓</span>
                       <span className="competency-text">{competencia}</span>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}

           {/* Badge de Certificaciones */}
           {education.certificaciones && education.certificaciones.length > 0 && (
             <div 
               className={`mobile-card mobile-collapsible ${expandedCards.certifications ? 'expanded' : ''}`}
               data-badge="certifications"
             >
               <div 
                 className="card-header collapsible-header"
                 onClick={() => toggleCard('certifications')}
               >
                 <span>🏆</span>
                 <h3>Certificaciones</h3>
                 <span className="expand-icon">
                   {expandedCards.certifications ? '▼' : '▶'}
                 </span>
               </div>
               <div className="card-content">
                 <div className="certifications-list">
                   {education.certificaciones.map((cert, index) => (
                     <div key={index} className="certification-item">
                       <div className="cert-info">
                         <h5 className="cert-title">{cert.nombre}</h5>
                         <span className="cert-issuer">{cert.emisor}</span>
                       </div>
                       
                                                {cert.imagenes && cert.imagenes.length > 0 && (
                           <div className="cert-gallery">
                             <ImageSlider 
                               images={cert.imagenes}
                               alt={`Certificación ${cert.nombre}`}
                               showControls={false}
                               showDots={true}
                               autoPlay={false}
                             />
                           </div>
                         )}
                       
                       {cert.url && (
                         <a 
                           href={cert.url} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="cert-link"
                         >
                           <ExternalLink size={16} />
                           <span>Ver Certificación</span>
                         </a>
                       )}
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}

           <div className="mobile-hint">
             👆 Toca las cards para expandir
           </div>
         </div>
      </div>
    </div>,
    document.body
  );
};



export default MobileEducationModal;
