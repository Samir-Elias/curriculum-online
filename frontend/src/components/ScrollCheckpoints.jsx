import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  ArrowUp,
  Eye,
  Github,
  X,
  CheckCircle,
  Star,
  Code,
  ExternalLink,
  Circle,
  ChevronLeft,
  ChevronRight,
  Zap,
  Layers
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import ImageSlider from "./ImageSlider";

// Hook personalizado para manejar checkpoints de proyectos
const useProjectCheckpoints = (projects = []) => {
  const [activeProject, setActiveProject] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedProject, setExpandedProject] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const containerRef = useRef(null);
  const projectRefs = useRef([]);
  const scrollTimeoutRef = useRef(null);
  const observerRef = useRef(null);

  // Registrar referencia de proyecto
  const registerProjectRef = useCallback((index, ref) => {
    projectRefs.current[index] = ref;
  }, []);

  // Calcular progreso de scroll
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  }, []);

  // Navegar a proyecto específico con scroll snapping forzado
  const scrollToProject = useCallback((projectIndex) => {
    const targetRef = projectRefs.current[projectIndex];
    if (!targetRef) return;

    setIsScrolling(true);
    
    // Scroll más directo y preciso para snap
    targetRef.scrollIntoView({
      behavior: 'smooth',
      block: 'start', // Cambiar de 'center' a 'start' para mejor snapping
      inline: 'nearest'
    });

    // Timeout más corto para mejor responsividad
    setTimeout(() => {
      setActiveProject(projectIndex);
      setIsScrolling(false);
    }, 500);
  }, []);

  // Navegación
  const goToNext = useCallback(() => {
    const nextIndex = Math.min(activeProject + 1, projects.length - 1);
    if (nextIndex !== activeProject) {
      scrollToProject(nextIndex);
    }
  }, [activeProject, projects.length, scrollToProject]);

  const goToPrevious = useCallback(() => {
    const prevIndex = Math.max(activeProject - 1, 0);
    if (prevIndex !== activeProject) {
      scrollToProject(prevIndex);
    }
  }, [activeProject, scrollToProject]);

  // Manejo de scroll
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    setIsScrolling(true);
    updateScrollProgress();
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, [updateScrollProgress]);

  // Intersection Observer mejorado para scroll snapping
  useEffect(() => {
    if (projects.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px', // Margen más pequeño para mejor precisión
      threshold: [0.5, 0.6, 0.7, 0.8, 0.9] // Más thresholds para mayor precisión
    };

    const observerCallback = (entries) => {
      if (isScrolling) return;
      
      let mostVisibleProject = { index: 0, ratio: 0 };
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = projectRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1 && entry.intersectionRatio > mostVisibleProject.ratio) {
            mostVisibleProject = { index, ratio: entry.intersectionRatio };
          }
        }
      });

      // Threshold más bajo para cambiar más rápido
      if (mostVisibleProject.ratio >= 0.6) {
        setActiveProject(mostVisibleProject.index);
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    
    projectRefs.current.forEach((ref) => {
      if (ref) observerRef.current.observe(ref);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [projects.length, isScrolling]);

  // Event listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          event.preventDefault();
          goToNext();
          break;
        case 'Home':
          event.preventDefault();
          scrollToProject(0);
          break;
        case 'End':
          event.preventDefault();
          scrollToProject(projects.length - 1);
          break;
        case 'Escape':
          setExpandedProject(null);
          break;
        default:
          const num = parseInt(event.key);
          if (num >= 1 && num <= Math.min(5, projects.length)) {
            event.preventDefault();
            scrollToProject(num - 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, scrollToProject, projects.length]);

  // Generar indicadores
  const indicators = projects.map((project, index) => ({
    id: `project-${index}`,
    label: project.nombre || `Proyecto ${index + 1}`,
    isActive: activeProject === index,
    onClick: () => scrollToProject(index)
  }));

  // Generar navegación
  const navigation = {
    canGoNext: activeProject < projects.length - 1,
    canGoPrevious: activeProject > 0,
    goToNext,
    goToPrevious,
    currentSection: activeProject + 1,
    totalSections: projects.length
  };

  return {
    activeProject,
    scrollProgress,
    scrollToProject,
    navigation,
    indicators,
    containerRef,
    registerProjectRef,
    expandedProject,
    setExpandedProject
  };
};

// Componente principal
const ScrollCheckpoints = ({ proyectosDestacados = [] }) => {
  const {
    activeProject,
    scrollProgress,
    scrollToProject,
    navigation,
    indicators,
    containerRef,
    registerProjectRef,
    expandedProject,
    setExpandedProject
  } = useProjectCheckpoints(proyectosDestacados);

  const [selectedProjectImages, setSelectedProjectImages] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleImageClick = (images, currentIndex) => {
    const normalizedImages = Array.isArray(images) ? images : [images];
    setSelectedProjectImages(normalizedImages);
    setModalImageIndex(currentIndex);
  };

  const closeModal = () => {
    setSelectedProjectImages(null);
    setModalImageIndex(0);
  };

  const renderProjectCard = (proyecto, index) => {
    const isExpanded = expandedProject === index;
    
    if (isExpanded) {
      return (
        <motion.div
          key={`expanded-${index}`}
          className="project-card-expanded-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <button
            className="close-button-expanded"
            onClick={() => setExpandedProject(null)}
            aria-label="Cerrar vista expandida"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="expanded-content-grid">
            <div className="expanded-image-section">
              <h3 className="expanded-title">{proyecto.nombre}</h3>
              
              <div className="expanded-badges">
                <Badge className={`status-badge ${proyecto.estado.includes('Completado') ? 'status-completed' : 'status-in-progress'}`}>
                  <CheckCircle className="w-4 h-4" />
                  {proyecto.estado}
                </Badge>
                {proyecto.destacado && (
                  <Badge className="status-badge featured-badge">
                    <Star className="w-4 h-4" />
                    Destacado
                  </Badge>
                )}
              </div>

              <div className="expanded-image-container">
                <ImageSlider 
                  images={proyecto.imagenes}
                  alt={`Proyecto ${proyecto.nombre}`}
                  className="w-full rounded-lg"
                  onImageClick={(imageUrl, currentIndex, allImages) => {
                    if (allImages && allImages.length > 0) {
                      handleImageClick(allImages, currentIndex);
                    }
                  }}
                />
              </div>

              <div className="expanded-action-buttons">
                {proyecto.demoUrl && (
                  <a
                    href={proyecto.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button demo-button"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Demo
                  </a>
                )}
                <a
                  href={proyecto.repositorio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button code-button"
                >
                  <Github className="w-4 h-4" />
                  Código
                </a>
              </div>
            </div>

            <div className="expanded-info-section">
              <div className="expanded-description">
                <h4 className="expanded-section-title">Descripción</h4>
                <p className="expanded-text">{proyecto.descripcion}</p>
              </div>

              <div className="expanded-tech-stack">
                <h4 className="expanded-section-title">Stack Tecnológico</h4>
                <div className="tech-grid-expanded">
                  {proyecto.tecnologias.map((tech, techIndex) => (
                    <div key={techIndex} className="tech-badge-expanded">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div className="expanded-features">
                <h4 className="expanded-section-title">Características</h4>
                <ul className="features-list-expanded">
                  {proyecto.caracteristicas.map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature-item-expanded">
                      <CheckCircle className="feature-icon-expanded" />
                      <span className="feature-text-expanded">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {proyecto.destacado && (
                <div className="destacado-section">
                  <h4 className="expanded-section-title">
                    <Star className="w-5 h-5 inline mr-2 text-yellow-400" />
                    Aspecto Destacado
                  </h4>
                  <p className="destacado-text">
                    {proyecto.destacado.detalle || proyecto.destacado.aspecto}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <div className="project-checkpoint-dual">
        {/* TARJETA ROJA - Imagen y básicos */}
        <div className="project-card-red">
          <h3 className="card-title-yellow">{proyecto.nombre}</h3>
          
          <div className="image-container-yellow">
            <ImageSlider 
              images={proyecto.imagenes}
              alt={`Proyecto ${proyecto.nombre}`}
              className="project-image"
              onImageClick={(imageUrl, currentIndex, allImages) => {
                if (allImages && allImages.length > 0) {
                  handleImageClick(allImages, currentIndex);
                }
              }}
            />
            <div className="image-caption-inside">
              {proyecto.nombre}
            </div>
          </div>

          <div className="status-badges-container">
            <Badge className={`status-badge ${proyecto.estado.includes('Completado') ? 'status-completed' : 'status-in-progress'}`}>
              <CheckCircle className="w-4 h-4" />
              {proyecto.estado}
            </Badge>
            {proyecto.destacado && (
              <Badge className="status-badge featured-badge">
                <Star className="w-4 h-4" />
                Destacado
              </Badge>
            )}
          </div>

          <div className="action-buttons-red">
            {proyecto.demoUrl && (
              <a
                href={proyecto.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button demo-button"
              >
                <Eye className="w-4 h-4" />
                Demo
              </a>
            )}
            <a
              href={proyecto.repositorio}
              target="_blank"
              rel="noopener noreferrer"
              className="action-button code-button"
            >
              <Github className="w-4 h-4" />
              Código
            </a>
          </div>
        </div>

        {/* TARJETA CELESTE - Stack técnico y descripción */}
        <div className="project-card-celeste">
          <h3 className="card-title-white">Stack Tecnológico</h3>
          
          <div className="tech-section">
            <div className="tech-badges-container">
              {proyecto.tecnologias.slice(0, 6).map((tech, techIndex) => (
                <Badge key={techIndex} className="tech-badge-celeste">
                  {tech}
                </Badge>
              ))}
              {proyecto.tecnologias.length > 6 && (
                <Badge className="tech-badge-celeste">
                  +{proyecto.tecnologias.length - 6}
                </Badge>
              )}
            </div>
          </div>

          <div className="description-container-green">
            <h4 className="green-title">Características principales:</h4>
            <div className="features-preview">
              {proyecto.caracteristicas.slice(0, 3).map((caracteristica, charIndex) => (
                <div key={charIndex} className="feature-item-preview">
                  <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                  <span className="feature-text-preview">{caracteristica}</span>
                </div>
              ))}
              {proyecto.caracteristicas.length > 3 && (
                <div className="more-features-indicator">
                  +{proyecto.caracteristicas.length - 3} características más...
                </div>
              )}
            </div>

            <p className="description-preview">
              {proyecto.descripcion.length > 150 
                ? `${proyecto.descripcion.substring(0, 150)}...` 
                : proyecto.descripcion
              }
            </p>

            <button
              onClick={() => setExpandedProject(index)}
              className="details-button-green"
            >
              <ExternalLink className="w-4 h-4" />
              Más detalles
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Barra de progreso */}
      <div className="scroll-progress">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Indicadores laterales */}
      <div className={`scroll-indicators ${indicators.length > 0 ? 'visible' : ''}`}>
        {indicators.map((indicator, index) => (
          <button
            key={indicator.id}
            className={`scroll-indicator ${indicator.isActive ? 'active' : ''}`}
            onClick={indicator.onClick}
            data-label={indicator.label}
            aria-label={`Ir a ${indicator.label}`}
            title={indicator.label}
          >
            <Circle 
              className="w-full h-full" 
              fill={indicator.isActive ? "currentColor" : "none"}
            />
          </button>
        ))}
      </div>

      {/* Container principal */}
      <div 
        ref={containerRef}
        className="checkpoints-main-container"
      >
        <motion.h2 
          className="checkpoints-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Code className="inline-block w-8 h-8 mr-3 text-blue-600" />
          Proyectos Destacados
        </motion.h2>

        {proyectosDestacados.map((proyecto, index) => (
          <div
            key={index}
            ref={(ref) => registerProjectRef(index, ref)}
            className={`checkpoint-item ${activeProject === index ? 'active' : ''}`}
          >
            <AnimatePresence mode="wait">
              {renderProjectCard(proyecto, index)}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Navegación inferior */}
      <div className="section-nav">
        <button
          className="section-nav-button"
          onClick={navigation.goToPrevious}
          disabled={!navigation.canGoPrevious}
          style={{
            opacity: navigation.canGoPrevious ? 1 : 0.5,
            cursor: navigation.canGoPrevious ? 'pointer' : 'not-allowed'
          }}
        >
          <ChevronUp className="w-4 h-4" />
          Anterior
        </button>

        <div className="section-nav-button active">
          {navigation.currentSection} / {navigation.totalSections}
        </div>

        <button
          className="section-nav-button"
          onClick={navigation.goToNext}
          disabled={!navigation.canGoNext}
          style={{
            opacity: navigation.canGoNext ? 1 : 0.5,
            cursor: navigation.canGoNext ? 'pointer' : 'not-allowed'
          }}
        >
          <ChevronDown className="w-4 h-4" />
          Siguiente
        </button>
      </div>

      {/* Botón volver arriba */}
      <button
        className={`back-to-top-button ${
          scrollProgress > 20 ? 'visible' : 'hidden'
        }`}
        onClick={() => scrollToProject(0)}
        aria-label="Volver al inicio"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Modal para imágenes */}
      {selectedProjectImages && (
        <div 
          className="image-modal-overlay"
          onClick={closeModal}
        >
          <div 
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="image-modal-header">
              <div className="image-modal-info">
                <h3 className="image-modal-title">Vista ampliada del proyecto</h3>
                <p className="image-modal-subtitle">
                  {modalImageIndex + 1} de {selectedProjectImages.length}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={closeModal}
                className="image-modal-close"
              >
                ✕ Cerrar
              </Button>
            </div>
            
            <div className="image-modal-container">
              <div className="image-modal-display">
                <img 
                  src={selectedProjectImages[modalImageIndex]}
                  alt={`Vista ampliada - Imagen ${modalImageIndex + 1}`}
                  className="modal-image"
                  onError={(e) => {
                    console.error("Error cargando imagen en modal:", selectedProjectImages[modalImageIndex]);
                    e.target.src = "https://via.placeholder.com/800x600/e2e8f0/64748b?text=Error+al+cargar+imagen";
                  }}
                />
              </div>

              {selectedProjectImages.length > 1 && (
                <>
                  <button
                    onClick={() => setModalImageIndex((prev) => (prev - 1 + selectedProjectImages.length) % selectedProjectImages.length)}
                    className="modal-nav-button modal-nav-left"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={() => setModalImageIndex((prev) => (prev + 1) % selectedProjectImages.length)}
                    className="modal-nav-button modal-nav-right"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="modal-indicators">
                    {selectedProjectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setModalImageIndex(index)}
                        className={`modal-indicator ${
                          index === modalImageIndex ? 'active' : ''
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollCheckpoints;
export { useProjectCheckpoints };