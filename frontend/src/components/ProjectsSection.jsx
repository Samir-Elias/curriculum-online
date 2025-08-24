import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckCircle,
  ChevronDown,
  X,
  ExternalLink,
  Zap,
  Layers
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

  // Variantes de animación para el slide lateral (mismas que EducationSection)
  const slideVariants = {
    dual: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    },
    pushedRight: {
      x: "100%",
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    }
  };

  const expandedVariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
      scale: 0.9
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    },
    exit: {
      x: "-100%",
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    }
  };

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

  const closeModal = () => {
    setSelectedProjectImages(null);
    setModalImageIndex(0);
  };

  const getProjectCardClasses = (index) => {
    const baseClasses = "shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-r-2";
    
    switch(index) {
      case 0:
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
        
        <div className="space-y-8">
          {proyectosDestacados.map((proyecto, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden"
            >
              {/* Contenedor con posición relativa para las animaciones */}
              <div className="relative min-h-[400px]">
                
                {/* CARDS DUALES */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`dual-${index}`}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 absolute inset-0 w-full"
                    variants={slideVariants}
                    animate={expandedProject === index ? "pushedRight" : "dual"}
                    style={{ pointerEvents: expandedProject === index ? "none" : "auto" }}
                  >
                    
                    {/* CARD IZQUIERDA - IMAGEN Y PREVIEW */}
                    <Card 
                      className={`${getProjectCardClasses(index)} h-full cursor-pointer`}
                      onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                    >
                      <CardHeader className="pb-4">
                        <CardTitle className={`text-xl font-bold flex items-start ${getTitleClasses(index)} leading-tight mb-4`}>
                          <GitBranch className="mr-3 w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span className="break-words">{proyecto.nombre}</span>
                        </CardTitle>
                        
                        {/* Status y info básica */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className={`text-xs flex-shrink-0 ${
                            proyecto.estado === 'Completado y Funcional' || proyecto.estado === 'Completado' || proyecto.estado === 'Completado y En Producción' ? 
                            'bg-emerald-100 text-emerald-800 border-emerald-200' :
                            'bg-orange-100 text-orange-800 border-orange-200'
                          }`}>
                            {proyecto.estado}
                          </Badge>
                          {proyecto.destacado && (
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Destacado
                            </Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        {/* Imagen principal */}
                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 relative group mb-4">
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

                        {/* Descripción resumida */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {proyecto.descripcion.length > 120 
                            ? `${proyecto.descripcion.substring(0, 120)}...` 
                            : proyecto.descripcion
                          }
                        </p>

                        {/* Botones de acción */}
                        <div className="flex gap-2 mb-4">
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
                              Demo
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
                            Código
                          </Button>
                        </div>

                        {/* Call to action */}
                        <div className="text-center pt-3 border-t border-gray-100">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 hover:bg-gray-50">
                            <ChevronDown className="w-4 h-4 mr-2" />
                            Ver detalles técnicos
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* CARD DERECHA - INFORMACIÓN TÉCNICA */}
                    <Card 
                      className={`${getProjectCardClasses(index)} h-full cursor-pointer`}
                      onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                    >
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center text-gray-700">
                          <Layers className="w-5 h-5 mr-2 flex-shrink-0" />
                          Información Técnica
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          Stack y características principales
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        {/* Stack tecnológico principal */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-700 mb-3 text-sm flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-blue-600" />
                            Stack principal:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {proyecto.tecnologias.slice(0, 6).map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className={`text-xs ${getBadgeClasses(index)} hover:shadow-sm transition-shadow`}>
                                {tech}
                              </Badge>
                            ))}
                            {proyecto.tecnologias.length > 6 && (
                              <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600 border-gray-300">
                                +{proyecto.tecnologias.length - 6}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Características destacadas */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-700 mb-3 text-sm flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            Características clave:
                          </h4>
                          <div className="space-y-2">
                            {proyecto.caracteristicas.slice(0, 4).map((caracteristica, charIndex) => (
                              <div key={charIndex} className="flex items-start text-xs text-gray-700 bg-gray-50 p-2 rounded">
                                <div className="w-1.5 h-1.5 rounded-full mr-2 mt-1.5 flex-shrink-0 bg-green-500"></div>
                                <span className="leading-relaxed">{caracteristica}</span>
                              </div>
                            ))}
                            {proyecto.caracteristicas.length > 4 && (
                              <div className="text-xs text-gray-500 italic flex items-center p-2">
                                <Users className="w-3 h-3 mr-1" />
                                +{proyecto.caracteristicas.length - 4} características más...
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Aspecto destacado si existe */}
                        {proyecto.destacado && (
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg mb-4">
                            <p className="text-yellow-800 text-xs font-medium leading-relaxed">
                              <span className="font-semibold">💡 Destacado:</span> {proyecto.destacado.aspecto}
                            </p>
                          </div>
                        )}

                        {/* Información adicional */}
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="bg-white p-3 rounded border border-gray-100">
                            <p className="text-xs text-gray-500 mb-1">TECNOLOGÍAS</p>
                            <p className="font-bold text-sm text-gray-800">{proyecto.tecnologias.length}</p>
                          </div>
                          <div className="bg-white p-3 rounded border border-gray-100">
                            <p className="text-xs text-gray-500 mb-1">FEATURES</p>
                            <p className="font-bold text-sm text-gray-800">{proyecto.caracteristicas.length}</p>
                          </div>
                        </div>

                        {/* Call to action */}
                        <div className="text-center pt-4 mt-4 border-t border-gray-100">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 hover:bg-gray-50">
                            <ChevronDown className="w-4 h-4 mr-2" />
                            Ver análisis completo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>

                {/* CARD EXPANDIDA */}
                <AnimatePresence>
                  {expandedProject === index && (
                    <motion.div
                      key={`expanded-${index}`}
                      className="absolute inset-0 w-full"
                      variants={expandedVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Card className={`${getProjectCardClasses(index)} ${
                        expandedProject === index ? 'ring-2 ring-blue-300 shadow-2xl' : ''
                      } h-full`}>
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className={`text-2xl font-bold flex items-start ${getTitleClasses(index)} leading-tight mb-2`}>
                                <Star className="mr-3 w-6 h-6 flex-shrink-0 mt-1 text-yellow-500" />
                                <span className="break-words">{proyecto.nombre}</span>
                              </CardTitle>
                              {proyecto.destacado && (
                                <div className="flex items-start mt-2 text-sm text-gray-600">
                                  <Star className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                                  <span className="font-medium leading-relaxed">{proyecto.destacado.aspecto}</span>
                                </div>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExpandedProject(null)}
                              className="text-gray-600 hover:bg-gray-50"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cerrar
                            </Button>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                            {/* Grid expandido con toda la información */}
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                              
                              {/* Imagen del proyecto - 2/5 */}
                              <div className="lg:col-span-2">
                                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 relative group mb-4">
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
                                <div className="flex gap-2 mb-4">
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
                                    Repositorio
                                  </Button>
                                </div>

                                {/* Estado y metadata */}
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-xs font-semibold text-gray-600 mb-1">ESTADO</p>
                                    <Badge variant="outline" className={`${
                                      proyecto.estado === 'Completado y Funcional' || proyecto.estado === 'Completado' || proyecto.estado === 'Completado y En Producción' ? 
                                      'bg-emerald-100 text-emerald-800 border-emerald-200' :
                                      'bg-orange-100 text-orange-800 border-orange-200'
                                    }`}>
                                      {proyecto.estado}
                                    </Badge>
                                  </div>
                                  {proyecto.destacado && (
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                                      <p className="text-blue-800 text-sm font-medium leading-relaxed">
                                        <span className="font-semibold">💡 Aspecto destacado:</span> {proyecto.destacado.detalle}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Contenido del proyecto - 3/5 */}
                              <div className="lg:col-span-3">
                                {/* Descripción completa */}
                                <div className="mb-6">
                                  <h4 className="font-semibold text-gray-700 mb-3 text-base">Descripción del proyecto:</h4>
                                  <p className="text-gray-700 leading-relaxed">{proyecto.descripcion}</p>
                                </div>

                                {/* Grid de información técnica */}
                                <div className="space-y-6">
                                  {/* Tecnologías completas */}
                                  <div>
                                    <h4 className="font-semibold text-gray-700 mb-4 text-base flex items-center">
                                      <Code className="w-5 h-5 mr-2 text-gray-600" />
                                      Stack Tecnológico Completo:
                                    </h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                                      {proyecto.tecnologias.map((tech, techIndex) => (
                                        <Badge key={techIndex} variant="outline" className={`text-xs ${getBadgeClasses(index)} hover:shadow-md transition-all hover:scale-105 text-center py-2`}>
                                          {tech}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Características completas */}
                                  <div>
                                    <h4 className="font-semibold text-gray-700 mb-4 text-base flex items-center">
                                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                                      Características y Funcionalidades:
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {proyecto.caracteristicas.map((caracteristica, charIndex) => (
                                        <div key={charIndex} className="flex items-start p-3 bg-gray-50 rounded">
                                          <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 bg-green-500"></div>
                                          <span className="text-sm text-gray-700 leading-relaxed">{caracteristica}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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