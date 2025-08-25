import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code,
  Eye,
  Github,
  GitBranch,
  Image,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  X,
  Zap,
  Layers
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import ImageSlider from "./ImageSlider";
import ScrollCheckpoints from "./ScrollCheckpoints";

const ProjectsSection = ({ 
  proyectosDestacados, 
  isVisible, 
  containerVariants, 
  itemVariants 
}) => {
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

  const getProjectCardClasses = (index) => {
    const variantClass = `variant-${index}`;
    return `project-card-checkpoint ${variantClass}`;
  };

  const getBadgeClasses = (index) => {
    switch(index) {
      case 0:
      case 1:
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case 2:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 3:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    }
  };

  const getTitleClasses = (index) => {
    switch(index) {
      case 0:
      case 1:
        return 'text-slate-800';
      case 2:
        return 'text-blue-800';
      case 3:
        return 'text-emerald-800';
      default:
        return 'text-indigo-800';
    }
  };

  // Componente para cada proyecto individual
  const ProjectCheckpoint = ({ proyecto, index, registerProjectRef, isActive }) => (
    <div 
      className={`project-checkpoint ${isActive ? 'active' : ''}`}
      ref={(ref) => registerProjectRef && registerProjectRef(index, ref)}
    >
      <div className="project-dual-cards">
        
        {/* CARD IZQUIERDA - IMAGEN Y INFORMACIÓN BÁSICA */}
        <Card className={getProjectCardClasses(index)}>
          <CardHeader className="project-card-header">
            <CardTitle className={`project-card-title ${getTitleClasses(index)}`}>
              <GitBranch className="mr-3 w-6 h-6 flex-shrink-0 mt-1" />
              {proyecto.nombre}
            </CardTitle>
            
            {/* Status y badges */}
            <div className="project-status-badges">
              <Badge 
                variant="outline" 
                className={`project-badge ${
                  proyecto.estado === 'Completado y Funcional' || 
                  proyecto.estado === 'Completado' || 
                  proyecto.estado === 'Completado y En Producción' ? 
                  'completed' : 'bg-orange-100 text-orange-800 border-orange-200'
                }`}
              >
                {proyecto.estado}
              </Badge>
              {proyecto.destacado && (
                <Badge className="project-badge featured">
                  <Star className="w-4 h-4 mr-1" />
                  Destacado
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="project-card-content">
            {/* Imagen principal */}
            <div 
              className="project-image-container"
              onClick={() => {
                if (proyecto.imagenes && proyecto.imagenes.length > 0) {
                  handleImageClick(proyecto.imagenes, 0);
                }
              }}
            >
              <ImageSlider 
                images={proyecto.imagenes}
                alt={`Captura de pantalla de ${proyecto.nombre}`}
                className="w-full h-full object-cover"
                onImageClick={(imageUrl, currentIndex, allImages) => {
                  if (allImages && allImages.length > 0) {
                    handleImageClick(allImages, currentIndex);
                  }
                }}
              />
            </div>

            {/* Descripción completa */}
            <div className="project-description">
              {proyecto.descripcion}
            </div>

            {/* Botones de acción */}
            <div className="project-actions">
              {proyecto.demoUrl && (
                <a
                  href={proyecto.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-action-btn primary"
                >
                  <Eye className="w-4 h-4" />
                  Ver Demo
                </a>
              )}
              <a
                href={proyecto.repositorio}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-btn secondary"
              >
                <Github className="w-4 h-4" />
                Repositorio
              </a>
            </div>
          </CardContent>
        </Card>

        {/* CARD DERECHA - INFORMACIÓN TÉCNICA COMPLETA */}
        <Card className={getProjectCardClasses(index)}>
          <CardHeader className="project-card-header">
            <CardTitle className="project-card-title text-gray-700">
              <Layers className="w-6 h-6 mr-2" />
              Stack Tecnológico
            </CardTitle>
            <CardDescription className="project-card-subtitle">
              Tecnologías y características implementadas
            </CardDescription>
          </CardHeader>

          <CardContent className="project-card-content">
            {/* Stack tecnológico completo */}
            <div className="project-tech-stack">
              <h4 className="project-tech-title">
                <Zap className="w-5 h-5 text-blue-600" />
                Tecnologías utilizadas:
              </h4>
              <div className="project-tech-grid">
                {proyecto.tecnologias.map((tech, techIndex) => (
                  <div key={techIndex} className="project-tech-badge">
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Características y funcionalidades completas */}
            <div className="project-features">
              <h4 className="project-features-title">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Características principales:
              </h4>
              <div className="project-features-list">
                {proyecto.caracteristicas.map((caracteristica, charIndex) => (
                  <div key={charIndex} className="project-feature-item">
                    <div className="project-feature-bullet"></div>
                    <span className="project-feature-text">{caracteristica}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Información adicional si existe aspecto destacado */}
            {proyecto.destacado && (
              <div className="project-tech-info">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-lg">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Aspecto destacado:
                </h4>
                <p className="text-gray-600 leading-relaxed mb-3 text-base">
                  <strong>{proyecto.destacado.aspecto}</strong>
                </p>
                {proyecto.destacado.detalle && (
                  <p className="text-gray-600 leading-relaxed text-base">
                    {proyecto.destacado.detalle}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <>
      {/* Título de la sección */}
      <motion.section 
        id="projects"
        className="mb-12 sm:mb-16"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible.projects ? "visible" : "hidden"}
      >
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800"
          variants={itemVariants}
        >
          <Code className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-blue-600" />
          Proyectos Destacados
        </motion.h2>

        {/* Sistema de checkpoints con proyectos */}
        <ScrollCheckpoints 
          projects={proyectosDestacados}
          showIndicators={true}
          showNavigation={true}
          showProgress={true}
        >
          <div className="projects-checkpoint-container">
            {proyectosDestacados.map((proyecto, index) => (
              <ProjectCheckpoint
                key={index}
                proyecto={proyecto}
                index={index}
              />
            ))}
          </div>
        </ScrollCheckpoints>
      </motion.section>

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
            {/* Header del modal */}
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
                <X className="w-4 h-4 mr-1" />
                Cerrar
              </Button>
            </div>
            
            {/* Contenedor de imagen con controles */}
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

              {/* Controles de navegación */}
              {selectedProjectImages.length > 1 && (
                <>
                  <button
                    onClick={() => setModalImageIndex((prev) => (prev - 1 + selectedProjectImages.length) % selectedProjectImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition-all duration-300"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={() => setModalImageIndex((prev) => (prev + 1) % selectedProjectImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition-all duration-300"
                    aria-label="Imagen siguiente"
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