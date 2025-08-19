import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code,
  Eye,
  Github,
  GitBranch,
  Image
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
  const [selectedProjectImage, setSelectedProjectImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedProjectImage(imageUrl);
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
              <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
                index === 0 ? 'border-l-slate-600 bg-gradient-to-r from-slate-50 to-white' :
                index === 1 ? 'border-l-slate-600 bg-gradient-to-r from-slate-50 to-white' :
                index === 2 ? 'border-l-blue-600 bg-gradient-to-r from-blue-50 to-white' :
                index === 3 ? 'border-l-emerald-600 bg-gradient-to-r from-emerald-50 to-white' :
                'border-l-indigo-600 bg-gradient-to-r from-indigo-50 to-white'
              } ${expandedProject === index ? 'ring-2 ring-blue-300' : ''}`}>
                <CardHeader>
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Imagen del proyecto */}
                    <div className="lg:w-1/3 flex-shrink-0">
                      <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 relative group">
                        <ImageSlider 
                          images={proyecto.imagenes}
                          alt={`Captura de pantalla de ${proyecto.nombre}`}
                          className="w-full h-full object-cover transition-all duration-500"
                          onImageClick={handleImageClick}
                        />
                        {/* Overlay para hover effect */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Image className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
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
                    
                    {/* Contenido del proyecto */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <CardTitle className={`text-lg sm:text-xl flex items-center ${
                            index === 0 ? 'text-slate-800' :
                            index === 1 ? 'text-slate-800' :
                            index === 2 ? 'text-blue-800' :
                            index === 3 ? 'text-emerald-800' :
                            'text-indigo-800'
                          }`}>
                            <GitBranch className="mr-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="break-words">{proyecto.nombre}</span>
                          </CardTitle>
                        </div>
                        <Badge variant="outline" className={`text-xs flex-shrink-0 ${
                          proyecto.estado === 'Completado y Funcional' || proyecto.estado === 'Completado' || proyecto.estado === 'Completado y En Producción' ? 
                          'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          'bg-orange-100 text-orange-800 border-orange-200'
                        }`}>
                          {proyecto.estado}
                        </Badge>
                      </div>
                      
                      <CardDescription className="text-gray-600 mb-4 text-sm sm:text-base">
                        {proyecto.descripcion}
                      </CardDescription>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Tecnologías:</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {proyecto.tecnologias.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className={`text-xs ${
                              index === 0 ? 'bg-slate-100 text-slate-800 border-slate-200' :
                              index === 1 ? 'bg-slate-100 text-slate-800 border-slate-200' :
                              index === 2 ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              index === 3 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                              'bg-indigo-100 text-indigo-800 border-indigo-200'
                            }`}>
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                {expandedProject === index && (
                  <CardContent>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t pt-4"
                    >
                      <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">Características principales:</h4>
                      <ul className="space-y-2">
                        {proyecto.caracteristicas.map((caracteristica, charIndex) => (
                          <li key={charIndex} className="flex items-start">
                            <div className={`w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 ${
                              index === 0 ? 'bg-slate-600' :
                              index === 1 ? 'bg-slate-600' :
                              index === 2 ? 'bg-blue-600' :
                              index === 3 ? 'bg-emerald-600' :
                              'bg-indigo-600'
                            }`}></div>
                            <span className="text-gray-600 text-sm sm:text-base">{caracteristica}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Modal para imágenes de proyectos */}
      {selectedProjectImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProjectImage(null)}
        >
          <div 
            className="relative max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <h3 className="text-lg font-semibold text-gray-800">Vista ampliada del proyecto</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProjectImage(null)}
                className="text-xs"
              >
                ✕ Cerrar
              </Button>
            </div>
            
            {/* Imagen ampliada */}
            <div className="flex items-center justify-center bg-gray-50 p-4">
              <img 
                src={selectedProjectImage}
                alt="Vista ampliada del proyecto"
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x600/e2e8f0/64748b?text=Error+al+cargar+imagen";
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;