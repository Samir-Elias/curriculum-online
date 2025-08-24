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
  Calendar,
  Users,
  CheckCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import ImageSlider from "./ImageSlider";

const ProjectsSection = ({ 
  proyectosDestacados, 
  isVisible, 
  containerVariants, 
  itemVariants, 
  expandedProject, 
  setExpandedProject 
}) => {
  const [selectedProjectImages, setSelectedProjectImages] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleImageClick = (images, currentIndex) => {
    const normalizedImages = Array.isArray(images) ? images : [images];
    setSelectedProjectImages(normalizedImages);
    setModalImageIndex(currentIndex);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % selectedProjectImages.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + selectedProjectImages.length) % selectedProjectImages.length);
  };

  const goToModalImage = (index) => {
    setModalImageIndex(index);
  };

  const closeModal = () => {
    setSelectedProjectImages(null);
    setModalImageIndex(0);
  };

  const getProjectCardClasses = (index) => {
    const baseClasses = "shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-r-2";
    
    switch(index) {
      case 0:
        return `${baseClasses} border-l-slate-600 border-r-slate-300 bg-gradient-to-r from-slate-50 to-white shadow-slate-200/50`;
      case 1:
        return `${baseClasses} border-l-slate-600 border-r-slate-300 bg-gradient-to-r from-slate-50 to-white shadow-slate-200/50`;
      case 2:
        return `${baseClasses} border-l-blue-600 border-r-blue-300 bg-gradient-to-r from-blue-50 to-white shadow-blue-200/50`;
      case 3:
        return `${baseClasses} border-l-emerald-600 border-r-emerald-300 bg-gradient-to-r from-emerald-50 to-white shadow-emerald-200/50`;
      default:
        return `${baseClasses} border-l-indigo-600 border-r-indigo-300 bg-gradient-to-r from-indigo-50 to-white shadow-indigo-200/50`;
    }
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

  const getBulletClasses = (index) => {
    switch(index) {
      case 0:
      case 1:
        return 'bg-slate-600';
      case 2:
        return 'bg-blue-600';
      case 3:
        return 'bg-emerald-600';
      default:
        return 'bg-indigo-600';
    }
  };

  return (
    <>
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
        <div className="grid gap-6 sm:gap-8">
          {proyectosDestacados.map((proyecto, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="cursor-pointer"
              onClick={() => setExpandedProject(expandedProject === index ? null : index)}
            >
              <Card className={`${getProjectCardClasses(index)} ${
                expandedProject === index ? 'ring-2 ring-blue-300 shadow-2xl' : ''
              }`}>
                <CardHeader className="pb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Imagen del proyecto - 2/5 */}
                    <div className="lg:col-span-2">
                      <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 relative group">
                        <ImageSlider 
                          images={proyecto.imagenes}
                          alt={`Captura de pantalla de ${proyecto.nombre}`}
                          className="w-full h-full object-cover transition-all duration-500"
                          onImageClick={(imageUrl, currentIndex, allImages) => {
                            if (allImages && allImages.length > 0) {
                              handleImageClick(allImages, currentIndex);
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Image className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Botones de acción */}
                      <div className="flex gap-2 mt-3">
                        {proyecto.demoUrl && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(proyecto.demoUrl);
                            }}
                            className="flex-1 print:hidden text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-1 flex-shrink-0" />
                            Ver Demo
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(proyecto.repositorio);
                          }}
                          className="flex-1 print:hidden text-xs border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Github className="w-3 h-3 mr-1 flex-shrink-0" />
                          Repo
                        </Button>
                      </div>
                    </div>
                    
                    {/* Contenido del proyecto - 3/5 */}
                    <div className="lg:col-span-3">
                      {/* Header con título y estado */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                          <CardTitle className={`text-xl sm:text-2xl font-bold flex items-start ${getTitleClasses(index)} leading-tight`}>
                            <GitBranch className="mr-3 w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span className="break-words">{proyecto.nombre}</span>
                          </CardTitle>
                          {/* Añadir info adicional si existe */}
                          {proyecto.destacado && (
                            <div className="flex items-start mt-2 text-sm text-gray-600">
                              <Star className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                              <span className="font-medium leading-relaxed">{proyecto.destacado.aspecto}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <Badge variant="outline" className={`text-xs flex-shrink-0 ${
                            proyecto.estado === 'Completado y Funcional' || proyecto.estado === 'Completado' || proyecto.estado === 'Completado y En Producción' ? 
                            'bg-emerald-100 text-emerald-800 border-emerald-200' :
                            'bg-orange-100 text-orange-800 border-orange-200'
                          }`}>
                            {proyecto.estado}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Descripción principal */}
                      <div className="mb-5">
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                          {proyecto.descripcion}
                        </p>
                        
                        {/* Detalle destacado si existe */}
                        {proyecto.destacado && (
                          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
                            <p className="text-blue-800 text-sm font-medium leading-relaxed">
                              <span className="font-semibold">💡 Aspecto destacado:</span> {proyecto.destacado.detalle}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {/* Grid de información técnica */}
                      <div className="space-y-4">
                        {/* Tecnologías */}
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3 text-sm flex items-center">
                            <Code className="w-4 h-4 mr-2 text-gray-600" />
                            Stack Tecnológico:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {proyecto.tecnologias.slice(0, expandedProject === index ? proyecto.tecnologias.length : 8).map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className={`text-xs ${getBadgeClasses(index)} hover:shadow-sm transition-shadow`}>
                                {tech}
                              </Badge>
                            ))}
                            {!expandedProject && proyecto.tecnologias.length > 8 && (
                              <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 transition-colors">
                                +{proyecto.tecnologias.length - 8} más
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Características resumidas en columnas */}
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3 text-sm flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            Características principales:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {proyecto.caracteristicas.slice(0, expandedProject === index ? proyecto.caracteristicas.length : 6).map((caracteristica, charIndex) => (
                              <div key={charIndex} className="flex items-start text-xs text-gray-700 bg-gray-50 p-2 rounded">
                                <div className={`w-1.5 h-1.5 rounded-full mr-2 mt-1.5 flex-shrink-0 ${getBulletClasses(index)}`}></div>
                                <span className="leading-relaxed">{caracteristica}</span>
                              </div>
                            ))}
                            {!expandedProject && proyecto.caracteristicas.length > 6 && (
                              <div className="text-xs text-gray-500 italic flex items-center p-2">
                                <Users className="w-3 h-3 mr-1" />
                                +{proyecto.caracteristicas.length - 6} características más...
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Indicador de expansión */}
                      <div className="mt-4 text-center border-t pt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full"
                        >
                          {expandedProject === index ? '↑ Ocultar detalles' : '↓ Mostrar todos los detalles'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                {/* Contenido expandido */}
                {expandedProject === index && (
                  <CardContent>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t pt-6"
                    >
                      {/* Características completas en grid más organizado */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {/* Columna 1 - Funcionalidades Core */}
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-4 text-base flex items-center">
                            <Star className="w-4 h-4 mr-2 text-yellow-500" />
                            Funcionalidades Core
                          </h4>
                          <div className="space-y-2">
                            {proyecto.caracteristicas.slice(0, Math.ceil(proyecto.caracteristicas.length / 3)).map((caracteristica, charIndex) => (
                              <div key={charIndex} className="flex items-start p-3 bg-yellow-50 rounded-lg">
                                <div className={`w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 ${getBulletClasses(index)}`}></div>
                                <span className="text-gray-700 text-sm leading-relaxed">{caracteristica}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Columna 2 - Features Técnicas */}
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-4 text-base flex items-center">
                            <Code className="w-4 h-4 mr-2 text-blue-500" />
                            Features Técnicas
                          </h4>
                          <div className="space-y-2">
                            {proyecto.caracteristicas.slice(Math.ceil(proyecto.caracteristicas.length / 3), Math.ceil(proyecto.caracteristicas.length * 2 / 3)).map((caracteristica, charIndex) => (
                              <div key={charIndex} className="flex items-start p-3 bg-blue-50 rounded-lg">
                                <div className={`w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 ${getBulletClasses(index)}`}></div>
                                <span className="text-gray-700 text-sm leading-relaxed">{caracteristica}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Columna 3 - Extras y UX */}
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-4 text-base flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-green-500" />
                            UX & Extras
                          </h4>
                          <div className="space-y-2">
                            {proyecto.caracteristicas.slice(Math.ceil(proyecto.caracteristicas.length * 2 / 3)).map((caracteristica, charIndex) => (
                              <div key={charIndex} className="flex items-start p-3 bg-green-50 rounded-lg">
                                <div className={`w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 ${getBulletClasses(index)}`}></div>
                                <span className="text-gray-700 text-sm leading-relaxed">{caracteristica}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Stack tecnológico completo */}
                      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                        <h4 className="font-semibold text-gray-700 mb-4 text-base flex items-center">
                          <Code className="w-5 h-5 mr-2 text-indigo-600" />
                          Stack Tecnológico Completo
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                          {proyecto.tecnologias.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className={`text-xs ${getBadgeClasses(index)} hover:shadow-md transition-all hover:scale-105 text-center py-2`}>
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Modal para imágenes - mantener igual que antes */}
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
                ✕ Cerrar
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
                    onClick={prevModalImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition-all duration-300"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={nextModalImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition-all duration-300"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-70 px-4 py-2 rounded-full">
                    {selectedProjectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToModalImage(index)}
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