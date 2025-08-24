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
  ChevronDown,
  X,
  Star,
  Target,
  TrendingUp
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
          className="section-title"
          variants={itemVariants}
        >
          <BookOpen className="title-icon" />
          Formación Técnica Especializada
        </motion.h2>
      </div>

      {/* Container con scroll snapping */}
      <div className="scroll-snap-container">
        {formacionTecnica.map((formacion, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="scroll-snap-item"
          >
            {/* Container relativo para las animaciones */}
            <div className="slide-container">
              
              {/* CARDS DUALES */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`dual-${index}`}
                  className={`slide-dual-cards ${
                    expandedEducation === index ? "state-pushed" : "state-normal"
                  }`}
                  variants={slideVariants}
                  animate={expandedEducation === index ? "pushedRight" : "dual"}
                >
                  <div className="dual-cards-grid">
                    
                    {/* CARD IZQUIERDA - CONTENIDO PRINCIPAL */}
                    <div 
                      className="education-card-fullscreen education-card-blue education-card-interactive"
                      onClick={() => setExpandedEducation(expandedEducation === index ? null : index)}
                    >
                      <div className="education-card-header">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1 min-w-0">
                            <h3 className="education-card-title">
                              {formacion.titulo}
                            </h3>
                            <p className="education-card-subtitle">
                              {formacion.institucion}
                            </p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            {formacion.estado && (
                              <Badge className={`text-sm px-4 py-2 ${
                                formacion.estado.includes('Completado') ? 
                                'bg-emerald-100 text-emerald-800 border-emerald-200' :
                                'bg-orange-100 text-orange-800 border-orange-200'
                              }`}>
                                {formacion.estado}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="education-card-content">
                        {/* Metadata */}
                        <div className="education-metadata-grid">
                          <div className="education-metadata-item">
                            <Clock className="education-metadata-icon" />
                            <div>
                              <p className="font-semibold text-xs text-gray-600 uppercase">Duración</p>
                              <p className="text-sm text-gray-800">{formacion.duracion}</p>
                            </div>
                          </div>
                          {formacion.modalidad && (
                            <div className="education-metadata-item">
                              <MapPin className="education-metadata-icon" />
                              <div>
                                <p className="font-semibold text-xs text-gray-600 uppercase">Modalidad</p>
                                <p className="text-sm text-gray-800">{formacion.modalidad}</p>
                              </div>
                            </div>
                          )}
                          {formacion.periodo && (
                            <div className="education-metadata-item">
                              <Calendar className="education-metadata-icon" />
                              <div>
                                <p className="font-semibold text-xs text-gray-600 uppercase">Período</p>
                                <p className="text-sm text-gray-800">{formacion.periodo}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Descripción */}
                        <div>
                          <p className="text-gray-700 leading-relaxed text-base">
                            {formacion.descripcion}
                          </p>
                        </div>
                        
                        {/* Competencias */}
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-4 text-lg flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-blue-600" />
                            Competencias desarrolladas:
                          </h4>
                          <div className="education-competencias-grid">
                            {formacion.competencias.slice(0, 6).map((competencia, compIndex) => (
                              <div key={compIndex} className="education-competencia-item">
                                <div className="education-competencia-bullet"></div>
                                <span className="text-sm text-gray-700 leading-relaxed">{competencia}</span>
                              </div>
                            ))}
                            {formacion.competencias.length > 6 && (
                              <div className="education-competencia-item">
                                <div className="education-competencia-bullet"></div>
                                <span className="text-sm text-gray-700 leading-relaxed">
                                  +{formacion.competencias.length - 6} competencias más...
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Botón de expansión */}
                      <div className="education-expand-button">
                        <ChevronDown className="w-5 h-5" />
                        Ver certificaciones y detalles completos
                      </div>
                    </div>

                    {/* CARD DERECHA - CERTIFICACIONES */}
                    <div 
                      className="education-card-fullscreen education-card-emerald education-card-interactive"
                      onClick={() => setExpandedEducation(expandedEducation === index ? null : index)}
                    >
                      <div className="education-card-header">
                        <h3 className="education-card-title text-emerald-800">
                          <Award className="w-6 h-6 mr-3 inline-block" />
                          Certificaciones Obtenidas
                        </h3>
                        <p className="education-card-subtitle text-emerald-600">
                          {formacion.certificaciones?.length || 0} certificación{formacion.certificaciones?.length !== 1 ? 'es' : ''} disponible{formacion.certificaciones?.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      
                      <div className="education-card-content">
                        {formacion.certificaciones && formacion.certificaciones.length > 0 ? (
                          <div className="education-certificates-grid">
                            {/* Mostrar primeras 2 certificaciones en vista dual */}
                            {formacion.certificaciones.slice(0, 2).map((cert, certIndex) => (
                              <div key={certIndex} className="education-certificate-item">
                                {cert.tipo === "imagen" ? (
                                  <div>
                                    <div className="certificate-image-container">
                                      <ImageSlider 
                                        images={cert.imagenes}
                                        alt={`Certificado ${cert.nombre}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="education-certificate-info">
                                      <h5 className="education-certificate-title">
                                        {cert.nombre}
                                      </h5>
                                      <p className="education-certificate-issuer">
                                        {cert.emisor}
                                      </p>
                                      <div className="flex gap-2">
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
                                  <div className="education-certificate-info">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center flex-1 min-w-0">
                                        <FileText className="w-8 h-8 mr-4 text-blue-600 flex-shrink-0" />
                                        <div className="min-w-0">
                                          <h5 className="education-certificate-title">
                                            {cert.nombre}
                                          </h5>
                                          <p className="education-certificate-issuer">{cert.emisor}</p>
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
                                  </div>
                                )}
                              </div>
                            ))}
                            
                            {/* Indicador de más certificaciones */}
                            {formacion.certificaciones.length > 2 && (
                              <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                                <Award className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">
                                  +{formacion.certificaciones.length - 2} certificación{formacion.certificaciones.length - 2 !== 1 ? 'es' : ''} más
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-semibold mb-2">Certificaciones en proceso</h3>
                            <p className="text-sm">Las certificaciones estarán disponibles próximamente</p>
                          </div>
                        )}
                      </div>

                      {/* Botón de expansión */}
                      <div className="education-expand-button education-expand-button-emerald">
                        <ChevronDown className="w-5 h-5" />
                        Ver análisis detallado del programa
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* CARD EXPANDIDA - Vista completa */}
              <AnimatePresence>
                {expandedEducation === index && (
                  <motion.div
                    key={`expanded-${index}`}
                    className={`slide-expanded-card ${
                      expandedEducation === index ? "state-visible" : "state-hidden"
                    }`}
                    variants={expandedVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="fullscreen-card education-card-expanded">
                      <div className="education-card-header" style={{ margin: '2rem 2rem 0 2rem', paddingBottom: '2rem' }}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <h2 className="text-3xl font-bold text-blue-800 mb-3 flex items-start">
                              <Star className="w-8 h-8 mr-4 text-yellow-500 flex-shrink-0 mt-2" />
                              <span className="break-words leading-tight">{formacion.titulo}</span>
                            </h2>
                            <p className="text-xl text-blue-600 font-semibold break-words">
                              {formacion.institucion}
                            </p>
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
                      </div>

                      <div className="education-expanded-content">
                        
                        {/* Información detallada - 2/3 */}
                        <div className="space-y-8">
                          
                          {/* Metadata expandida */}
                          <div className="education-metadata-grid">
                            <div className="education-metadata-item">
                              <Clock className="w-6 h-6 text-blue-500" />
                              <div>
                                <p className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Duración Total</p>
                                <p className="text-lg text-gray-800 font-medium">{formacion.duracion}</p>
                              </div>
                            </div>
                            {formacion.modalidad && (
                              <div className="education-metadata-item">
                                <MapPin className="w-6 h-6 text-blue-500" />
                                <div>
                                  <p className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Modalidad</p>
                                  <p className="text-lg text-gray-800 font-medium">{formacion.modalidad}</p>
                                </div>
                              </div>
                            )}
                            <div className="education-metadata-item">
                              <Target className="w-6 h-6 text-emerald-500" />
                              <div>
                                <p className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Estado</p>
                                <Badge className={`px-4 py-2 text-sm ${
                                  formacion.estado.includes('Completado') ? 
                                  'bg-emerald-100 text-emerald-800' :
                                  'bg-orange-100 text-orange-800'
                                }`}>
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

                          {/* Todas las competencias */}
                          <div>
                            <h4 className="font-bold text-gray-700 mb-8 text-xl flex items-center">
                              <CheckCircle className="w-6 h-6 mr-3 text-blue-600" />
                              Competencias desarrolladas ({formacion.competencias.length}):
                            </h4>
                            <div className="education-competencias-grid gap-6">
                              {formacion.competencias.map((competencia, compIndex) => (
                                <div key={compIndex} className="education-competencia-item p-6">
                                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                                  <span className="text-base text-gray-700 leading-relaxed">{competencia}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Certificaciones completas - 1/3 */}
                        <div className="space-y-6">
                          <h4 className="font-bold text-gray-700 text-xl flex items-center">
                            <Award className="w-6 h-6 mr-3 text-emerald-600" />
                            Todas las Certificaciones:
                          </h4>
                          
                          {formacion.certificaciones && formacion.certificaciones.length > 0 ? (
                            <div className="education-certificates-grid">
                              {formacion.certificaciones.map((cert, certIndex) => (
                                <div key={certIndex} className="education-certificate-item">
                                  {cert.tipo === "imagen" ? (
                                    <div>
                                      <div className="certificate-image-container cursor-pointer" 
                                           onClick={(e) => {
                                             e.stopPropagation();
                                             setSelectedCertificate(cert);
                                           }}>
                                        <ImageSlider 
                                          images={cert.imagenes}
                                          alt={`Certificado ${cert.nombre}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="education-certificate-info">
                                        <h5 className="education-certificate-title">{cert.nombre}</h5>
                                        <p className="education-certificate-issuer">{cert.emisor}</p>
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
                                    <div className="education-certificate-info">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center flex-1 min-w-0">
                                          <FileText className="w-8 h-8 mr-4 text-blue-600 flex-shrink-0" />
                                          <div className="min-w-0">
                                            <h5 className="education-certificate-title">{cert.nombre}</h5>
                                            <p className="education-certificate-issuer">{cert.emisor}</p>
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
                    </div>
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