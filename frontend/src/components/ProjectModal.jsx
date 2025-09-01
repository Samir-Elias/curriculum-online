"use client"

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ExternalLink, Github, Maximize2, Minimize2, ChevronLeft, ChevronRight } from "lucide-react";
import { getSpriteTechIcon } from "../icons/TechIconSprite";
import ImageSlider from "./ImageSlider";

const ProjectModal = ({ isOpen, onClose, project, onNextProject, onPrevProject, hasNextProject, hasPrevProject }) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showImageSlider, setShowImageSlider] = useState(false);
  
  // Controlar el scroll del body cuando el modal está abierto
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Limpiar al desmontar
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Detectar si es móvil
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listener para teclas de navegación y ESC
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          if (showImageSlider) {
            setShowImageSlider(false);
          } else {
            onClose();
          }
          break;
        case 'ArrowLeft':
          if (hasPrevProject && !showImageSlider) {
            onPrevProject();
          }
          break;
        case 'ArrowRight':
          if (hasNextProject && !showImageSlider) {
            onNextProject();
          }
          break;
        default:
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, showImageSlider, hasPrevProject, hasNextProject, onPrevProject, onNextProject]);


  
  if (!project) {
    return null;
  }

  // Usar Portal para renderizar fuera del contenedor de ProjectsSection
  return createPortal(
    <>
      {/* Overlay con animación in/out */}
      <motion.div
        className="project-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.4,
          ease: "easeInOut"
        }}
        onClick={onClose}
      />
      
      {/* Modal - Solo se anima al abrir/cerrar, no al cambiar proyectos */}
      <motion.div
        className={`project-modal ${isMobile ? 'mobile-modal' : ''}`}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ 
          duration: 0.4, 
          ease: "easeOut",
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        onClick={(e) => e.stopPropagation()}
      >
                 {/* Header de la modal */}
         <div className="modal-header">
           {/* Flecha izquierda */}
           <motion.button
             className="modal-nav-button modal-nav-prev"
             onClick={onPrevProject}
             disabled={!hasPrevProject}
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             aria-label="Proyecto anterior (←)"
             title="Proyecto anterior (←)"
           >
             <ChevronLeft size={24} />
           </motion.button>
           
                       {/* Título y meta información */}
            <div className="modal-title-section">
              <h2 className="modal-title">
                {project.title.split('').map((char, index) => {
                  const shouldHighlight = char === 'S' || char === 'E' || char === 'T' || 
                                        char === 'C' || char === 'D' || char === 'P' || 
                                        char === 'R' || char === 'I' || char === 'A' || 
                                        char === 'M' || char === 'G' || char === 'F' || 
                                        char === 'B' || char === 'J' || char === 'V' || 
                                        char === 'O' || char === 'L' || char === 'U' || 
                                        char === 'X' || char === 'Y' || char === 'Z' || 
                                        char === 'K' || char === 'W' || char === 'N' || 
                                        char === 'H' || char === 'Q' || char === '-' || 
                                        char === '–' || char === '—';
                   
                  return shouldHighlight ? (
                    <span key={`char-${index}-${char}`} className="project-title-accent">{char}</span>
                  ) : (
                    <span key={`char-${index}-${char}`}>{char}</span>
                  );
                })}
              </h2>
              
              {/* Meta información del proyecto */}
              <div className={`modal-title-meta ${isMobile ? 'mobile-hidden' : ''}`}>
                <div className="meta-item">
                  <span className="meta-icon">👤</span>
                  <span className="meta-text">{project.type}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">💼</span>
                  <span className="meta-text">{project.role}</span>
                </div>
               <div className="meta-item navigation-hint">
                 <span className="meta-icon">⌨️</span>
                 <span className="meta-text">← → para navegar</span>
               </div>
              </div>
            </div>
           
           {/* Botón cerrar - Reposicionado entre título y flecha derecha */}
           <motion.button
             className="modal-close-button"
             onClick={onClose}
             whileHover={{ scale: 1.05, y: -2 }}
             whileTap={{ scale: 0.95 }}
           >
             <span>×</span>
           </motion.button>
           
           {/* Flecha derecha */}
           <motion.button
             className="modal-nav-button modal-nav-next"
             onClick={onNextProject}
             disabled={!hasNextProject}
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             aria-label="Siguiente proyecto (→)"
             title="Siguiente proyecto (→)"
           >
             <ChevronRight size={24} />
           </motion.button>
         </div>

                                                     {/* Contenido de la modal */}
          <div className="modal-content">

                       {/* Sección expandida de imágenes y resultados - Solo visible cuando está expandida */}
            {isImageExpanded && (
              <motion.div 
                className="modal-expanded-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="expanded-cards-container">
                  {/* Card izquierda: Imágenes */}
                  <motion.div 
                    className="expanded-image-card"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="card-header">
                      <span className="card-icon">🖼️</span>
                      <h3 className="card-title">Imágenes del Proyecto</h3>
                      <motion.button
                        className="image-close-button"
                        onClick={() => setIsImageExpanded(false)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Cerrar imágenes"
                      >
                        <Minimize2 size={20} />
                      </motion.button>
                    </div>
                    <div className="card-content">
                      <div className="image-container">
                        {project.images && project.images.length > 1 ? (
                          <ImageSlider images={project.images} />
                        ) : (
                          <img
                            src={project.image || "/placeholder.svg?height=400&width=600&query=project-preview"}
                            alt={project.title}
                            className="modal-project-image"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Card derecha: Resultados y Logros */}
                  {project.results && project.results.length > 0 && (
                    <motion.div 
                      className="expanded-results-card"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="card-header">
                        <span className="card-icon">📈</span>
                        <h3 className="card-title">Resultados y Logros</h3>
                      </div>
                      <div className="card-content">
                        <div className="results-grid">
                          {project.results.map((result, index) => (
                            <motion.div 
                              key={`result-${project.title}-${index}`}
                              className="result-item"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              <div className="result-check">✓</div>
                              <span>{result}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

                                                                                               {/* Contenido principal en cards centradas */}
              <div className={`modal-cards-container ${isMobile ? 'mobile-cards-container' : ''}`}>
                {!isMobile ? (
                  <>
                               {/* Card 1: Stack Tecnológico (Solo badges, sin título) */}
                 <motion.div 
                   className="modal-card"
                      initial={{ opacity: 1, filter: 'blur(0px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0 }}
                 >
                   <div className="card-header">
                     <span className="card-icon">⚡</span>
                     <h3 className="card-title">Stack Tecnológico</h3>
                   </div>
                   <div className="card-content">
                     <div className="modal-tech-grid">
                       {project.technologies.map((tech, index) => (
                         <motion.div
                           key={`tech-${project.title}-${tech}-${index}`}
                           className="modal-tech-item"
                           initial={{ opacity: 1, scale: 1 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 0 }}
                         >
                           <div className="tech-icon">{getSpriteTechIcon(tech)}</div>
                           <span className="tech-name">{tech}</span>
                         </motion.div>
                       ))}
                     </div>
                   </div>
                 </motion.div>

                 {/* Card 2: Descripción del Proyecto */}
                 <motion.div 
                   className="modal-card"
                   initial={{ opacity: 1, filter: 'blur(0px)' }}
                   animate={{ opacity: 1, filter: 'blur(0px)' }}
                   transition={{ duration: 0 }}
                 >
                   <div className="card-header">
                     <span className="card-icon">📝</span>
                     <h3 className="card-title">Descripción del Proyecto</h3>
                   </div>
                                     <div className="card-content">
                    <p className="modal-description">{project.description}</p>
                    
                    {/* Resumen integrado en la card principal */}
                    {project.overview && (
                      <>
                        <div className="card-section-divider"></div>
                        <div className="card-subsection">
                          <h4 className="subsection-title">📋 Resumen del Proyecto</h4>
                          <p className="overview-text-compact">{project.overview}</p>
                        </div>
                      </>
                    )}
                  </div>
                 </motion.div>

                 {/* Card 3: Características (Centro - Principal) */}
                 <motion.div 
                   className="modal-card"
                   initial={{ opacity: 1, filter: 'blur(0px)' }}
                   animate={{ opacity: 1, filter: 'blur(0px)' }}
                   transition={{ duration: 0 }}
                 >
                   <div className="card-header">
                     <span className="card-icon">⭐</span>
                     <h3 className="card-title">Características Principales</h3>
                   </div>
                   <div className="card-content">
                     {project.features && project.features.length > 0 ? (
                       <div className="features-list-compact">
                         {project.features.map((feature, index) => (
                           <div key={index} className="feature-item-compact">
                             <div className="feature-bullet-compact"></div>
                             <span>{feature}</span>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <p className="no-content-message">No hay características disponibles para este proyecto.</p>
                     )}
                   </div>
                 </motion.div>

                 {/* Card 4: Desafíos y Soluciones */}
                  <motion.div 
                    className="modal-card"
                    initial={{ opacity: 1, filter: 'blur(0px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0 }}
                  >
                    <div className="card-header">
                      <span className="card-icon">🎯</span>
                      <h3 className="card-title">Desafíos y Soluciones</h3>
                    </div>
                    <div className="card-content">
                      {(project.challenges && project.challenges.length > 0) || (project.solutions && project.solutions.length > 0) ? (
                        <div className="challenges-solutions-compact">
                          {project.challenges && project.challenges.length > 0 && (
                            <div className="challenge-section-compact">
                              <h4 className="subsection-subtitle">Desafíos Técnicos</h4>
                              <ul className="challenges-list-compact">
                                {project.challenges.map((challenge, index) => (
                                  <li key={index}>{challenge}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {project.solutions && project.solutions.length > 0 && (
                            <div className="solution-section-compact">
                              <h4 className="subsection-subtitle">Soluciones Implementadas</h4>
                              <ul className="solutions-list-compact">
                                {project.solutions.map((solution, index) => (
                                  <li key={index}>{solution}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="no-content-message">No hay información de desafíos y soluciones disponibles para este proyecto.</p>
                      )}
                    </div>
                  </motion.div>

                 {/* Card 5: Ver Imágenes (Texto vertical) */}
                 <motion.div 
                   className="modal-card"
                   initial={{ opacity: 1, filter: 'blur(0px)' }}
                   animate={{ opacity: 1, filter: 'blur(0px)' }}
                   transition={{ duration: 0 }}
                 >
                   <div className="card-content">
                     {/* Badge con número de imágenes */}
                     {project.images && project.images.length > 0 && (
                       <motion.div
                         className="image-count-badge"
                         initial={{ opacity: 1, scale: 1 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0 }}
                       >
                         {project.images.length}
                       </motion.div>
                     )}
                     
                     <motion.div
                       className="vertical-text"
                       onClick={() => setIsImageExpanded(true)}
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       VER IMÁGENES
                     </motion.div>
                   </div>
                 </motion.div>
                   </>
                 ) : (
                   /* Layout móvil - Solo 3 cards principales */
                   <>
                     {/* Card 1: Descripción del Proyecto */}
                     <motion.div 
                       className="modal-card mobile-card"
                       initial={{ opacity: 1, filter: 'blur(0px)' }}
                       animate={{ opacity: 1, filter: 'blur(0px)' }}
                       transition={{ duration: 0 }}
                     >
                       <div className="card-header">
                         <span className="card-icon">📝</span>
                         <h3 className="card-title">Descripción del Proyecto</h3>
                       </div>
                       <div className="card-content">
                         <p className="modal-description">{project.description}</p>
                         
                         {project.overview && (
                           <>
                             <div className="card-section-divider"></div>
                             <div className="card-subsection">
                               <h4 className="subsection-title">📋 Resumen del Proyecto</h4>
                               <p className="overview-text-compact">{project.overview}</p>
                             </div>
                           </>
                         )}
                       </div>
                     </motion.div>

                     {/* Card 2: Características Principales */}
                     <motion.div 
                       className="modal-card mobile-card"
                       initial={{ opacity: 1, filter: 'blur(0px)' }}
                       animate={{ opacity: 1, filter: 'blur(0px)' }}
                       transition={{ duration: 0 }}
                     >
                       <div className="card-header">
                         <span className="card-icon">⭐</span>
                         <h3 className="card-title">Características Principales</h3>
                       </div>
                       <div className="card-content">
                         {project.features && project.features.length > 0 ? (
                           <div className="features-list-compact">
                             {project.features.map((feature, index) => (
                               <div key={index} className="feature-item-compact">
                                 <div className="feature-bullet-compact"></div>
                                 <span>{feature}</span>
                               </div>
                             ))}
                           </div>
                         ) : (
                           <p className="no-content-message">No hay características disponibles para este proyecto.</p>
                         )}
                       </div>
                     </motion.div>

                     {/* Card 3: Desafíos y Soluciones */}
                     <motion.div 
                       className="modal-card mobile-card"
                       initial={{ opacity: 1, filter: 'blur(0px)' }}
                       animate={{ opacity: 1, filter: 'blur(0px)' }}
                       transition={{ duration: 0 }}
                     >
                       <div className="card-header">
                         <span className="card-icon">🎯</span>
                         <h3 className="card-title">Desafíos y Soluciones</h3>
                       </div>
                       <div className="card-content">
                         {(project.challenges && project.challenges.length > 0) || (project.solutions && project.solutions.length > 0) ? (
                           <div className="challenges-solutions-compact">
                             {project.challenges && project.challenges.length > 0 && (
                               <div className="challenge-section-compact">
                                 <h4 className="subsection-subtitle">Desafíos Técnicos</h4>
                                 <ul className="challenges-list-compact">
                                   {project.challenges.map((challenge, index) => (
                                     <li key={index}>{challenge}</li>
                                   ))}
                                 </ul>
                               </div>
                             )}
                             
                             {project.solutions && project.solutions.length > 0 && (
                               <div className="solution-section-compact">
                                 <h4 className="subsection-subtitle">Soluciones Implementadas</h4>
                                 <ul className="solutions-list-compact">
                                   {project.solutions.map((solution, index) => (
                                     <li key={index}>{solution}</li>
                                   ))}
                                 </ul>
                               </div>
                             )}
                           </div>
                         ) : (
                           <p className="no-content-message">No hay información de desafíos y soluciones disponibles para este proyecto.</p>
                         )}
                       </div>
                     </motion.div>

                     {/* Botón para abrir imágenes */}
                     {project.images && project.images.length > 0 && (
                       <motion.div
                         className="mobile-images-button-container"
                         initial={{ opacity: 1, filter: 'blur(0px)' }}
                         animate={{ opacity: 1, filter: 'blur(0px)' }}
                         transition={{ duration: 0 }}
                       >
                         <button
                           className="mobile-images-button"
                           onClick={() => setShowImageSlider(true)}
                         >
                           <span className="button-icon">🖼️</span>
                           <span className="button-text">Ver Imágenes ({project.images.length})</span>
                         </button>
                       </motion.div>
                     )}
                   </>
                 )}
                           
           </div>
         </div>

        {/* ImageSlider Modal para móvil */}
        {isMobile && showImageSlider && project.images && project.images.length > 0 && (
          <motion.div
            className="mobile-image-slider-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-image-slider-overlay" onClick={() => setShowImageSlider(false)} />
            <motion.div
              className="mobile-image-slider-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="mobile-image-slider-close"
                onClick={() => setShowImageSlider(false)}
              >
                ×
              </button>
              <ImageSlider images={project.images} />
            </motion.div>
          </motion.div>
        )}

      </motion.div>
    </>,
    document.body
  );
};

export default ProjectModal;
