import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Code,
  Eye,
  Github,
  GitBranch,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  X,
  Zap,
  Layers,
  ExternalLink
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import ImageSlider from "./ImageSlider";

const ProjectsSection = ({ 
  proyectosDestacados, 
  isVisible, 
  containerVariants, 
  itemVariants 
}) => {
  const [selectedProjectImages, setSelectedProjectImages] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState(new Set());

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Manejar expansión en mobile
  const toggleProjectExpansion = (index) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProjects(newExpanded);
  };

  const handleImageClick = (images, currentIndex) => {
    const normalizedImages = Array.isArray(images) ? images : [images];
    setSelectedProjectImages(normalizedImages);
    setModalImageIndex(currentIndex);
  };

  const closeModal = () => {
    setSelectedProjectImages(null);
    setModalImageIndex(0);
  };

  // **MOBILE VIEW** - Lista simple sin checkpoints
  const MobileProjectView = () => (
    <div className="mobile-projects-container">
      {proyectosDestacados.map((proyecto, index) => {
        const isExpanded = expandedProjects.has(index);
        
        return (
          <motion.div
            key={index}
            className="mobile-project-card"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            {/* Header compacto */}
            <div className="mobile-project-header">
              <div className="mobile-project-title">
                <GitBranch className="w-5 h-5 text-blue-600" />
                <h3>{proyecto.nombre}</h3>
              </div>
              
              <div className="mobile-project-badges">
                <Badge 
                  variant="outline" 
                  className={`mobile-status-badge ${
                    proyecto.estado.includes('Completado') ? 'completed' : 'in-progress'
                  }`}
                >
                  <CheckCircle className="w-3 h-3" />
                  {proyecto.estado}
                </Badge>
                {proyecto.destacado && (
                  <Badge className="mobile-featured-badge">
                    <Star className="w-3 h-3" />
                    Destacado
                  </Badge>
                )}
              </div>
            </div>

            {/* Imagen principal */}
            <div 
              className="mobile-project-image"
              onClick={() => {
                if (proyecto.imagenes && proyecto.imagenes.length > 0) {
                  handleImageClick(proyecto.imagenes, 0);
                }
              }}
            >
              <ImageSlider 
                images={proyecto.imagenes}
                alt={`Proyecto ${proyecto.nombre}`}
                className="w-full h-48 object-cover rounded-lg"
                onImageClick={(imageUrl, currentIndex, allImages) => {
                  if (allImages && allImages.length > 0) {
                    handleImageClick(allImages, currentIndex);
                  }
                }}
              />
            </div>

            {/* Descripción breve */}
            <div className="mobile-project-description">
              <p>{proyecto.descripcion.substring(0, 120)}...</p>
            </div>

            {/* Botones de acción */}
            <div className="mobile-project-actions">
              {proyecto.demoUrl && (
                <a
                  href={proyecto.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-action-btn primary"
                >
                  <Eye className="w-4 h-4" />
                  Ver Demo
                </a>
              )}
              <a
                href={proyecto.repositorio}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-action-btn secondary"
              >
                <Github className="w-4 h-4" />
                Código
              </a>
            </div>

            {/* Botón expandir/contraer */}
            <button
              className="mobile-expand-btn"
              onClick={() => toggleProjectExpansion(index)}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Menos detalles
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Más detalles
                </>
              )}
            </button>

            {/* Contenido expandible */}
            {isExpanded && (
              <motion.div
                className="mobile-project-expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stack tecnológico */}
                <div className="mobile-tech-section">
                  <h4 className="mobile-section-title">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Tecnologías:
                  </h4>
                  <div className="mobile-tech-badges">
                    {proyecto.tecnologias.map((tech, techIndex) => (
                      <span key={techIndex} className="mobile-tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Características */}
                <div className="mobile-features-section">
                  <h4 className="mobile-section-title">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Características:
                  </h4>
                  <ul className="mobile-features-list">
                    {proyecto.caracteristicas.map((caracteristica, charIndex) => (
                      <li key={charIndex} className="mobile-feature-item">
                        <div className="mobile-feature-bullet"></div>
                        {caracteristica}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Descripción completa */}
                <div className="mobile-description-full">
                  <h4 className="mobile-section-title">Descripción completa:</h4>
                  <p>{proyecto.descripcion}</p>
                </div>

                {/* Aspecto destacado si existe */}
                {proyecto.destacado && (
                  <div className="mobile-destacado-section">
                    <h4 className="mobile-section-title">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Aspecto destacado:
                    </h4>
                    <p><strong>{proyecto.destacado.aspecto}</strong></p>
                    {proyecto.destacado.detalle && (
                      <p className="text-sm text-gray-600 mt-1">
                        {proyecto.destacado.detalle}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );

  // **DESKTOP VIEW** - Sistema de checkpoints (SIN ScrollCheckpoints component)
  const DesktopProjectView = () => (
    <div className="desktop-projects-container">
      {proyectosDestacados.map((proyecto, index) => (
        <div key={index} className="desktop-project-checkpoint">
          <div className="project-dual-cards">
            
            {/* CARD IZQUIERDA - IMAGEN Y INFORMACIÓN BÁSICA */}
            <Card className="desktop-project-card-left">
              <CardHeader className="desktop-project-header">
                <CardTitle className="desktop-project-title">
                  <GitBranch className="mr-3 w-6 h-6 flex-shrink-0" />
                  {proyecto.nombre}
                </CardTitle>
                
                <div className="desktop-project-badges">
                  <Badge 
                    variant="outline" 
                    className={`desktop-status-badge ${
                      proyecto.estado.includes('Completado') ? 'completed' : 'in-progress'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {proyecto.estado}
                  </Badge>
                  {proyecto.destacado && (
                    <Badge className="desktop-featured-badge">
                      <Star className="w-4 h-4" />
                      Destacado
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="desktop-project-content">
                <div 
                  className="desktop-project-image"
                  onClick={() => {
                    if (proyecto.imagenes && proyecto.imagenes.length > 0) {
                      handleImageClick(proyecto.imagenes, 0);
                    }
                  }}
                >
                  <ImageSlider 
                    images={proyecto.imagenes}
                    alt={`Proyecto ${proyecto.nombre}`}
                    className="w-full h-full object-cover rounded-lg"
                    onImageClick={(imageUrl, currentIndex, allImages) => {
                      if (allImages && allImages.length > 0) {
                        handleImageClick(allImages, currentIndex);
                      }
                    }}
                  />
                </div>

                <div className="desktop-project-description">
                  {proyecto.descripcion}
                </div>

                <div className="desktop-project-actions">
                  {proyecto.demoUrl && (
                    <a
                      href={proyecto.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="desktop-action-btn primary"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Demo
                    </a>
                  )}
                  <a
                    href={proyecto.repositorio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="desktop-action-btn secondary"
                  >
                    <Github className="w-4 h-4" />
                    Repositorio
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* CARD DERECHA - INFORMACIÓN TÉCNICA */}
            <Card className="desktop-project-card-right">
              <CardHeader className="desktop-project-header">
                <CardTitle className="desktop-project-title">
                  <Layers className="w-6 h-6 mr-2" />
                  Stack Tecnológico
                </CardTitle>
                <CardDescription>
                  Tecnologías y características implementadas
                </CardDescription>
              </CardHeader>

              <CardContent className="desktop-project-content">
                {/* Stack tecnológico */}
                <div className="desktop-tech-section">
                  <h4 className="desktop-section-title">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Tecnologías utilizadas:
                  </h4>
                  <div className="desktop-tech-grid">
                    {proyecto.tecnologias.map((tech, techIndex) => (
                      <div key={techIndex} className="desktop-tech-badge">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Características */}
                <div className="desktop-features-section">
                  <h4 className="desktop-section-title">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Características principales:
                  </h4>
                  <div className="desktop-features-list">
                    {proyecto.caracteristicas.map((caracteristica, charIndex) => (
                      <div key={charIndex} className="desktop-feature-item">
                        <div className="desktop-feature-bullet"></div>
                        <span>{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aspecto destacado si existe */}
                {proyecto.destacado && (
                  <div className="desktop-destacado-section">
                    <h4 className="desktop-section-title">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Aspecto destacado:
                    </h4>
                    <p className="font-semibold">{proyecto.destacado.aspecto}</p>
                    {proyecto.destacado.detalle && (
                      <p className="text-sm text-gray-600 mt-2">
                        {proyecto.destacado.detalle}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Título de la sección */}
      <motion.section 
        id="projects"
        className="projects-section-container"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible.projects ? "visible" : "hidden"}
      >
        <motion.h2 
          className="projects-section-title"
          variants={itemVariants}
        >
          <Code className="projects-title-icon" />
          Proyectos Destacados
        </motion.h2>

        {/* Renderizar vista según dispositivo */}
        {isMobile ? <MobileProjectView /> : <DesktopProjectView />}
      </motion.section>

      {/* Modal para imágenes */}
      {selectedProjectImages && (
        <div 
          className="projects-modal-overlay"
          onClick={closeModal}
        >
          <div 
            className="projects-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="projects-modal-header">
              <div className="projects-modal-info">
                <h3 className="projects-modal-title">Vista ampliada del proyecto</h3>
                <p className="projects-modal-subtitle">
                  {modalImageIndex + 1} de {selectedProjectImages.length}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={closeModal}
                className="projects-modal-close"
              >
                <X className="w-4 h-4 mr-1" />
                Cerrar
              </Button>
            </div>
            
            {/* Contenedor de imagen con controles */}
            <div className="projects-modal-image-container">
              <div className="projects-modal-image-display">
                <img 
                  src={selectedProjectImages[modalImageIndex]}
                  alt={`Vista ampliada - Imagen ${modalImageIndex + 1}`}
                  className="projects-modal-image"
                  onError={(e) => {
                    console.error("Error cargando imagen en modal:", selectedProjectImages[modalImageIndex]);
                    e.target.src = "https://via.placeholder.com/800x600/e2e8f0/64748b?text=Error+al+cargar+imagen";
                  }}
                />
              </div>

              {/* Controles de navegación */}
              {selectedProjectImages.length > 1 && (
                <>
                  <button
                    onClick={() => setModalImageIndex((prev) => (prev - 1 + selectedProjectImages.length) % selectedProjectImages.length)}
                    className="projects-modal-nav-btn projects-modal-nav-left"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={() => setModalImageIndex((prev) => (prev + 1) % selectedProjectImages.length)}
                    className="projects-modal-nav-btn projects-modal-nav-right"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="projects-modal-indicators">
                    {selectedProjectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setModalImageIndex(index)}
                        className={`projects-modal-indicator ${
                          index === modalImageIndex ? 'active' : ''
                        }`}
                        aria-label={`Ir a imagen ${index + 1}`}
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

export default ProjectsSection;