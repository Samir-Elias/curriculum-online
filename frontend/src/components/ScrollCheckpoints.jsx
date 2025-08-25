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
  ChevronRight
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

  // Navegar a proyecto específico
  const scrollToProject = useCallback((projectIndex) => {
    const targetRef = projectRefs.current[projectIndex];
    if (!targetRef) return;

    setIsScrolling(true);
    
    targetRef.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });

    setTimeout(() => {
      setActiveProject(projectIndex);
      setIsScrolling(false);
    }, 800);
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

  // Intersection Observer para detectar proyecto activo
  useEffect(() => {
    if (projects.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: [0.3, 0.5, 0.7]
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

      if (mostVisibleProject.ratio >= 0.5) {
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

  const getVariantClass = (index) => {
    if (index <= 1) return 'project-variant-0';
    if (index === 2) return 'project-variant-2';
    if (index === 3) return 'project-variant-3';
    return 'project-variant-4';
  };

  const renderProjectCard = (proyecto, index) => {
    const isExpanded = expandedProject === index;
    
    if (isExpanded) {
      return (
        <motion.div
          key={`expanded-${index}`}
          className={`project-card-expanded ${getVariantClass(index)}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <button
            className="close-button"
            onClick={() => setExpandedProject(null)}
            aria-label="Cerrar vista expandida"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="expanded-content">
            <div className="expanded-image-section">
              <h3 className="text-2xl font-bold mb-4 text-white">{proyecto.nombre}</h3>
              
              <div className="mb-4">
                <Badge className={`status-badge ${proyecto.estado.includes('Completado') ? 'status-completed' : 'status-in-progress'}`}>
                  <CheckCircle className="w-4 h-4" />
                  {proyecto.estado}
                </Badge>
                {proyecto.destacado && (
                  <Badge className="status-badge ml-2" style={{ background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>
                    <Star className="w-4 h-4" />
                    Destacado
                  </Badge>
                )}
              </div>

              <div className="mb-6">
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

              <div className="action-buttons">
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
              <div>
                <h4 className="text-xl font-semibold mb-3 text-white">Descripción</h4>
                <p className="text-gray-200 leading-relaxed mb-4">{proyecto.descripcion}</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 text-white">Stack Tecnológico</h4>
                <div className="tech-stack-expanded">
                  {proyecto.tecnologias.map((tech, techIndex) => (
                    <div key={techIndex} className="tech-badge">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 text-white">Características</h4>
                <ul className="features-list">
                  {proyecto.caracteristicas.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <CheckCircle className="feature-icon" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {proyecto.destacado && (
                <div className="bg-yellow-500/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <p className="text-yellow-200 font-medium">
                    <Star className="w-4 h-4 inline mr-2" />
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
      <div className="project-checkpoint-layout">
        {/* TARJETA ROJA - Imagen y básicos */}
        <motion.div
          className="project-card-image"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <h3 className="card-title">{proyecto.nombre}</h3>
          
          <div className="image-container">
            <ImageSlider 
              images={proyecto.imagenes}
              alt={`Proyecto ${proyecto.nombre}`}
              className="w-full h-auto rounded-lg"
              onImageClick={(imageUrl, currentIndex, allImages) => {
                if (allImages && allImages.length > 0) {
                  handleImageClick(allImages, currentIndex);
                }
              }}
            />
            <div className="image-caption">
              {proyecto.nombre}
            </div>
          </div>

          <div className="mb-4">
            <Badge className={`status-badge ${proyecto.estado.includes('Completado') ? 'status-completed' : 'status-in-progress'}`}>
              <CheckCircle className="w-4 h-4" />
              {proyecto.estado}
            </Badge>
            {proyecto.destacado && (
              <Badge className="status-badge ml-2" style={{ background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>
                <Star className="w-4 h-4" />
                Destacado
              </Badge>
            )}
          </div>

          <div className="action-buttons">
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
        </motion.div>

        {/* TARJETA CELESTE - Stack técnico y descripción */}
        <motion.div
          className="project-card-info"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <h3 className="card-title">Stack Tecnológico</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white/90 mb-3">Tecnologías utilizadas:</h4>
            <div className="flex flex-wrap gap-2">
              {proyecto.tecnologias.slice(0, 6).map((tech, techIndex) => (
                <Badge key={techIndex} className="tech-badge">
                  {tech}
                </Badge>
              ))}
              {proyecto.tecnologias.length > 6 && (
                <Badge className="tech-badge">
                  +{proyecto.tecnologias.length - 6}
                </Badge>
              )}
            </div>
          </div>

          <div className="description-container">
            <h3>Características principales:</h3>
            <div className="space-y-2 mb-4">
              {proyecto.caracteristicas.slice(0, 3).map((caracteristica, charIndex) => (
                <div key={charIndex} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-white/90">{caracteristica}</span>
                </div>
              ))}
              {proyecto.caracteristicas.length > 3 && (
                <div className="text-sm text-white/70 italic">
                  +{proyecto.caracteristicas.length - 3} características más...
                </div>
              )}
            </div>

            <p className="text-sm text-white/85 mb-4 line-clamp-3">
              {proyecto.descripcion.length > 150 
                ? `${proyecto.descripcion.substring(0, 150)}...` 
                : proyecto.descripcion
              }
            </p>

            <button
              onClick={() => setExpandedProject(index)}
              className="details-button"
            >
              <ExternalLink className="w-4 h-4" />
              Más detalles
            </button>
          </div>
        </motion.div>
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
        className="py-8"
      >
        <motion.h2 
          className="text-4xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Code className="inline-block w-8 h-8 mr-3 text-blue-600" />
          Proyectos Destacados
        </motion.h2>

        {proyectosDestacados.map((proyecto, index) => (
          <motion.div
            key={index}
            ref={(ref) => registerProjectRef(index, ref)}
            className={`checkpoint-item ${activeProject === index ? 'active' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <AnimatePresence mode="wait">
              {renderProjectCard(proyecto, index)}
            </AnimatePresence>
          </motion.div>
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
        className={`fixed bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50 ${
          scrollProgress > 20 ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => scrollToProject(0)}
        aria-label="Volver al inicio"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Modal para imágenes */}
      {selectedProjectImages && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-7xl max-h-[95vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-black bg-opacity-75 rounded-t-lg">
              <div className="text-white">
                <h3 className="text-lg font-semibold">Vista ampliada del proyecto</h3>
                <p className="text-sm text-gray-300">
                  {modalImageIndex + 1} de {selectedProjectImages.length}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={closeModal}
                className="text-xs bg-white text-black hover:bg-gray-200"
              >
                ✕ Cerrar
              </Button>
            </div>
            
            <div className="relative bg-white rounded-b-lg overflow-hidden">
              <div className="flex items-center justify-center bg-gray-50 p-4 min-h-[60vh]">
                <img 
                  src={selectedProjectImages[modalImageIndex]}
                  alt={`Vista ampliada - Imagen ${modalImageIndex + 1}`}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={() => setModalImageIndex((prev) => (prev + 1) % selectedProjectImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-70 px-4 py-2 rounded-full">
                    {selectedProjectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setModalImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === modalImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
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