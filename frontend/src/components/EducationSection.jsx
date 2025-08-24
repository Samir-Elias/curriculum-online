import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen,
  Award,
  Eye,
  ExternalLink,
  FileText,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  Users,
  ChevronDown,
  ChevronUp,
  Star,
  Target,
  TrendingUp,
  X
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import ImageSlider from "./ImageSlider";

const EducationSection = ({ 
  formacionTecnica, 
  isVisible, 
  containerVariants, 
  itemVariants, 
  setSelectedCertificate,
  expandedEducation,
  setExpandedEducation
}) => {
  // Variantes de animación para el slide lateral
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

  return (
    <motion.section 
      id="education"
      className="mb-0"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible.education ? "visible" : "hidden"}
    >
      {/* Título de sección - fuera del scroll snap */}
      <div className="section-title-container">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800"
          variants={itemVariants}
        >
          <BookOpen className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-blue-600" />
          Formación Técnica Especializada
        </motion.h2>
      </div>

      {/* Container con scroll snapping */}
      <div className="scroll-snap-container">
        {formacionTecnica.map((formacion, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="scroll-snap-item fullscreen-section"
          >
            {/* Contenedor que se adapta al contenido */}
            <div className="relative w-full">
              
              {/* CARDS DUALES - Ocupan el espacio necesario */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`dual-${index}`}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 absolute inset-0 w-full"
                  variants={slideVariants}
                  animate={expandedEducation === index ? "pushedRight" : "dual"}
                  style={{ pointerEvents: expandedEducation === index ? "none" : "auto" }}
                >
                  
                  {/* CARD IZQUIERDA - CONTENIDO PRINCIPAL */}
                  <Card 
                    className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600 bg-gradient-to-r from-blue-50 to-white shadow-blue-200/50 cursor-pointer fullscreen-card"
                    onClick={() => setExpandedEducation(expandedEducation === index ? null : index)}
                  >
                    <CardHeader className="pb-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-2xl sm:text-3xl text-blue-800 mb-3 leading-tight break-words">
                            {formacion.titulo}
                          </CardTitle>
                          <CardDescription className="text-lg sm:text-xl text-blue-600 font-semibold mb-4 break-words">
                            {formacion.institucion}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          {formacion.estado && (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-sm px-4 py-2">
                              {formacion.estado}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Info con iconos - más espaciada */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-xs text-gray-600 uppercase">Duración</p>
                            <p className="text-sm text-gray-800">{formacion.duracion}</p>
                          </div>
                        </div>
                        {formacion.modalidad && (
                          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-xs text-gray-600 uppercase">Modalidad</p>
                              <p className="text-sm text-gray-800">{formacion.modalidad}</p>
                            </div>
                          </div>
                        )}
                        {formacion.periodo && (
                          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-xs text-gray-600 uppercase">Período</p>
                              <p className="text-sm text-gray-800">{formacion.periodo}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-8">
                      {/* Descripción completa */}
                      <div>
                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                          {formacion.descripcion}
                        </p>
                      </div>
                      
                      {/* Todas las competencias - sin scroll, en grid */}
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-6 text-lg flex items-center">
                          <CheckCircle className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                          Competencias desarrolladas:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {formacion.competencias.map((competencia, compIndex) => (
                            <div key={compIndex} className="flex items-start p-4 bg-white rounded-lg border border-blue-100 shadow-sm">
                              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700 leading-relaxed">{competencia}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Indicador de expansión */}
                      <div className="text-center pt-6 border-t border-blue-100">
                        <Button variant="ghost" size="lg" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-8 py-4 text-base">
                          <ChevronDown className="w-5 h-5 mr-3" />
                          Ver certificaciones y detalles completos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CARD DERECHA - CERTIFICACIONES */}
                  <Card 
                    className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-600 bg-gradient-to-r from-emerald-50 to-white shadow-emerald-200/50 cursor-pointer fullscreen-card"
                    onClick={() => setExpandedEducation(expandedEducation === index ? null : index)}
                  >
                    <CardHeader className="pb-6">
                      <CardTitle className="text-2xl text-emerald-800 flex items-center">
                        <Award className="w-6 h-6 mr-3 flex-shrink-0" />
                        Certificaciones Obtenidas
                      </CardTitle>
                      <CardDescription className="text-emerald-600 text-lg">
                        {formacion.certificaciones?.length || 0} certificación{formacion.certificaciones?.length !== 1 ? 'es' : ''} disponible{formacion.certificaciones?.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-8">
                      {formacion.certificaciones && formacion.certificaciones.length > 0 ? (
                        <div className="space-y-6">
                          {/* Mostrar todas las certificaciones */}
                          {formacion.certificaciones.map((cert, certIndex) => (
                            <div key={certIndex} className="bg-white rounded-lg p-6 border border-emerald-100 shadow-sm">
                              {cert.tipo === "imagen" ? (
                                <div>
                                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                    <ImageSlider 
                                      images={cert.imagenes}
                                      alt={`Certificado ${cert.nombre}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <h5 className="font-semibold text-gray-800 text-lg mb-2">
                                    {cert.nombre}
                                  </h5>
                                  <p className="text-sm text-gray-500 mb-4">
                                    {cert.emisor}
                                  </p>
                                  <div className="flex gap-3">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedCertificate(cert);
                                      }}
                                      className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      Ver Certificado
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(cert.url);
                                      }}
                                      className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Enlace Original
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center flex-1 min-w-0">
                                    <FileText className="w-8 h-8 mr-4 text-blue-600 flex-shrink-0" />
                                    <div className="min-w-0">
                                      <h5 className="font-semibold text-gray-800 text-lg mb-1">
                                        {cert.nombre}
                                      </h5>
                                      <p className="text-sm text-gray-500">{cert.emisor}</p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.open(cert.url);
                                    }}
                                    className="border-blue-200 text-blue-700 hover:bg-blue-50 flex-shrink-0 ml-4"
                                  >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Ver Enlace
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <h3 className="text-lg font-semibold mb-2">Certificaciones en proceso</h3>
                          <p className="text-sm">Las certificaciones estarán disponibles próximamente</p>
                        </div>
                      )}

                      {/* Call to action */}
                      <div className="text-center pt-6 border-t border-emerald-100">
                        <Button variant="ghost" size="lg" className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 px-8 py-4 text-base">
                          <ChevronDown className="w-5 h-5 mr-3" />
                          Ver análisis detallado del programa
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* CARD EXPANDIDA - Vista completa sin scroll interno */}
              <AnimatePresence>
                {expandedEducation === index && (
                  <motion.div
                    key={`expanded-${index}`}
                    className="absolute inset-0 w-full"
                    variants={expandedVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600 bg-gradient-to-r from-blue-50 to-white shadow-blue-200/50 ring-2 ring-blue-300 fullscreen-card-expanded">
                      <CardHeader className="pb-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-3xl sm:text-4xl text-blue-800 mb-3 flex items-start">
                              <Star className="w-8 h-8 mr-4 text-yellow-500 flex-shrink-0 mt-2" />
                              <span className="break-words leading-tight">{formacion.titulo}</span>
                            </CardTitle>
                            <CardDescription className="text-xl sm:text-2xl text-blue-600 font-semibold break-words">
                              {formacion.institucion}
                            </CardDescription>
                          </div>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setExpandedEducation(null)}
                            className="text-blue-600 hover:bg-blue-50 flex-shrink-0 px-6 py-3"
                          >
                            <X className="w-5 h-5 mr-2" />
                            Cerrar Vista Detallada
                          </Button>
                        </div>
                      </CardHeader>

                      <CardContent>
                        {/* Grid expandido con información completa */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                          
                          {/* Información detallada - 2/3 */}
                          <div className="lg:col-span-2 space-y-10">
                            {/* Metadata completa */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-lg">
                                <Clock className="w-6 h-6 text-blue-500" />
                                <div>
                                  <p className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Duración</p>
                                  <p className="text-lg text-gray-800 font-medium">{formacion.duracion}</p>
                                </div>
                              </div>
                              {formacion.modalidad && (
                                <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-lg">
                                  <MapPin className="w-6 h-6 text-blue-500" />
                                  <div>
                                    <p className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Modalidad</p>
                                    <p className="text-lg text-gray-800 font-medium">{formacion.modalidad}</p>
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-lg">
                                <Target className="w-6 h-6 text-emerald-500" />
                                <div>
                                  <p className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Estado</p>
                                  <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 text-sm">
                                    {formacion.estado}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* Descripción completa */}
                            <div>
                              <h4 className="font-bold text-gray-700 mb-6 text-xl flex items-center">
                                <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                                Descripción completa del programa:
                              </h4>
                              <p className="text-gray-700 leading-relaxed text-lg">{formacion.descripcion}</p>
                            </div>

                            {/* Todas las competencias organizadas */}
                            <div>
                              <h4 className="font-bold text-gray-700 mb-8 text-xl flex items-center">
                                <CheckCircle className="w-6 h-6 mr-3 text-blue-600" />
                                Competencias desarrolladas:
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {formacion.competencias.map((competencia, compIndex) => (
                                  <div key={compIndex} className="flex items-start p-6 bg-white rounded-lg border border-blue-100 shadow-sm">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                                    <span className="text-base text-gray-700 leading-relaxed">{competencia}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Certificaciones completas - 1/3 */}
                          <div className="lg:col-span-1">
                            <h4 className="font-bold text-gray-700 mb-8 text-xl flex items-center">
                              <Award className="w-6 h-6 mr-3 text-emerald-600" />
                              Certificaciones:
                            </h4>
                            
                            {formacion.certificaciones && formacion.certificaciones.length > 0 ? (
                              <div className="space-y-6">
                                {formacion.certificaciones.map((cert, certIndex) => (
                                  <div key={certIndex} className="border border-emerald-200 rounded-lg bg-white overflow-hidden hover:shadow-md transition-all">
                                    {cert.tipo === "imagen" ? (
                                      <div>
                                        <div className="aspect-[4/3] bg-gray-100 cursor-pointer" onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedCertificate(cert);
                                        }}>
                                          <ImageSlider 
                                            images={cert.imagenes}
                                            alt={`Certificado ${cert.nombre}`}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <div className="p-6">
                                          <h5 className="font-semibold text-gray-800 text-base mb-2">{cert.nombre}</h5>
                                          <p className="text-sm text-gray-500 mb-4">{cert.emisor}</p>
                                          <div className="flex gap-3">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedCertificate(cert);
                                              }}
                                              className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                            >
                                              <Eye className="w-4 h-4 mr-2" />
                                              Ver
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(cert.url);
                                              }}
                                              className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                                            >
                                              <ExternalLink className="w-4 h-4 mr-2" />
                                              Enlace
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="p-6 flex items-center justify-between">
                                        <div className="flex items-center flex-1 min-w-0">
                                          <FileText className="w-8 h-8 mr-4 text-blue-600 flex-shrink-0" />
                                          <div className="min-w-0">
                                            <h5 className="font-semibold text-gray-800 text-base">{cert.nombre}</h5>
                                            <p className="text-sm text-gray-500">{cert.emisor}</p>
                                          </div>
                                        </div>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(cert.url);
                                          }}
                                          className="border-blue-200 text-blue-700 hover:bg-blue-50 flex-shrink-0 ml-4"
                                        >
                                          <ExternalLink className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                                <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p className="text-base">Certificaciones en proceso</p>
                              </div>
                            )}
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
  );
};

export default EducationSection;