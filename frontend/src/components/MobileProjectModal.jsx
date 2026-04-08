"use client"

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MobileProjectModal = ({ isOpen, onClose, project, onNextProject, onPrevProject, hasNextProject, hasPrevProject }) => {
  const [expandedCards, setExpandedCards] = useState({
    images: false,
    description: false,
    features: false,
    challenges: false
  });
  
  const toggleCard = (cardKey) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  };
  
  React.useEffect(() => {
    setExpandedCards({
      images: false,
      description: false,
      features: false,
      challenges: false
    });
  }, [project?.title]);

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

  if (!project || !isOpen) {
    return null;
  }

  return createPortal(
    <div className="mobile-modal-overlay" onClick={onClose}>
      <div className="mobile-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="mobile-modal-header">
          <button
            className="mobile-close-button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Cerrar"
          >
            ×
          </button>

          <button
            className="mobile-nav-button"
            onClick={(e) => {
              e.stopPropagation();
              onPrevProject();
            }}
            disabled={!hasPrevProject}
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <h2 className="mobile-modal-title">{project.title}</h2>

          <button
            className="mobile-nav-button"
            onClick={(e) => {
              e.stopPropagation();
              onNextProject();
            }}
            disabled={!hasNextProject}
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Cards */}
        <div className="mobile-cards-wrapper">
          {/* Card de imágenes */}
          {project.images && project.images.length > 0 && (
            <div className={`mobile-card mobile-image-card mobile-collapsible ${expandedCards.images ? 'expanded' : ''}`}>
              <div 
                className="card-header collapsible-header"
                onClick={() => toggleCard('images')}
              >
                <span>🖼️</span>
                <h3>Imágenes del Proyecto</h3>
                <span className="expand-icon">
                  {expandedCards.images ? '▼' : '▶'}
                </span>
              </div>
              <div className="card-content image-content">
                <img 
                  src={project.images[0]} 
                  alt={`Imagen del proyecto ${project.title}`}
                  className="project-main-image"
                />
              </div>
            </div>
          )}

          {/* Card de descripción */}
          <div className={`mobile-card mobile-collapsible ${expandedCards.description ? 'expanded' : ''}`}>
            <div 
              className="card-header collapsible-header"
              onClick={() => toggleCard('description')}
            >
              <span>📝</span>
              <h3>Descripción</h3>
              <span className="expand-icon">
                {expandedCards.description ? '▼' : '▶'}
              </span>
            </div>
            <div className="card-content">
              <p>{project.description}</p>
              {project.overview && (
                <div>
                  <h4>Resumen</h4>
                  <p>{project.overview}</p>
                </div>
              )}
            </div>
          </div>

          {/* Card de características */}
          <div className={`mobile-card mobile-collapsible ${expandedCards.features ? 'expanded' : ''}`}>
            <div 
              className="card-header collapsible-header"
              onClick={() => toggleCard('features')}
            >
              <span>⭐</span>
              <h3>Características</h3>
              <span className="expand-icon">
                {expandedCards.features ? '▼' : '▶'}
              </span>
            </div>
            <div className="card-content">
              {project.features && project.features.length > 0 ? (
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay características disponibles.</p>
              )}
            </div>
          </div>

          {/* Card de desafíos */}
          <div className={`mobile-card mobile-collapsible ${expandedCards.challenges ? 'expanded' : ''}`}>
            <div 
              className="card-header collapsible-header"
              onClick={() => toggleCard('challenges')}
            >
              <span>🎯</span>
              <h3>Desafíos y Soluciones</h3>
              <span className="expand-icon">
                {expandedCards.challenges ? '▼' : '▶'}
              </span>
            </div>
            <div className="card-content">
              {project.challenges && project.challenges.length > 0 && (
                <div>
                  <h4>Desafíos</h4>
                  <ul>
                    {project.challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.solutions && project.solutions.length > 0 && (
                <div>
                  <h4>Soluciones</h4>
                  <ul>
                    {project.solutions.map((solution, index) => (
                      <li key={index}>{solution}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mobile-hint">
            👆 Toca las cards para expandir
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileProjectModal;
