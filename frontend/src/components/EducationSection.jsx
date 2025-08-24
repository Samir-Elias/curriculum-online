import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen,
  Award,
  Eye,
  ExternalLink,
  FileText
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
  setSelectedCertificate 
}) => {
  return (
    <motion.section 
      id="education"
      className="mb-12 sm:mb-16"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible.education ? "visible" : "hidden"}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800"
        variants={itemVariants}
      >
        <BookOpen className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-blue-600" />
        Formación Técnica Especializada
      </motion.h2>
      <div className="grid gap-6">
        {formacionTecnica.map((formacion, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-r-2 border-l-blue-600 border-r-blue-300 bg-gradient-to-r from-blue-50 to-white shadow-blue-200/50 w-full max-w-full overflow-hidden">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl text-gray-800 break-words leading-tight">{formacion.titulo}</CardTitle>
                    <CardDescription className="text-base sm:text-lg text-blue-600 font-semibold break-words">
                      {formacion.institucion}
                    </CardDescription>
                    <CardDescription className="text-xs sm:text-sm text-gray-500 mt-1 break-words">
                      {formacion.duracion} {formacion.modalidad && `• ${formacion.modalidad}`}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2 flex-shrink-0">
                    {formacion.estado && (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs whitespace-nowrap">
                        {formacion.estado}
                      </Badge>
                    )}
                    {formacion.periodo && (
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 text-xs whitespace-nowrap">
                        {formacion.periodo}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base break-words">{formacion.descripcion}</p>
                
                {/* Competencias */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Competencias desarrolladas:</h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {formacion.competencias.map((competencia, compIndex) => (
                      <Badge key={compIndex} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs break-words max-w-full">
                        {competencia}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Certificaciones */}
                {formacion.certificaciones && formacion.certificaciones.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base flex items-center">
                      <Award className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />
                      Certificaciones obtenidas:
                    </h4>
                    <div className="space-y-3">
                      {formacion.certificaciones.map((cert, certIndex) => (
                        <div key={certIndex} className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-all duration-300 border-l-2 border-r border-l-emerald-500 border-r-emerald-200 shadow-emerald-100/50 w-full max-w-full">
                          {cert.tipo === "imagen" ? (
                            <div className="flex flex-col sm:flex-row">
                              {/* Thumbnail de la certificación */}
                              <div className="sm:w-24 sm:h-16 w-full h-32 bg-gray-100 flex-shrink-0 relative overflow-hidden cursor-pointer"
                                   onClick={() => setSelectedCertificate(cert)}>
                                <ImageSlider 
                                  images={cert.imagenes}
                                  alt={`Certificado ${cert.nombre}`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                                  <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                              {/* Información de la certificación */}
                              <div className="flex-1 p-3 flex items-center justify-between min-w-0">
                                <div className="min-w-0 flex-1 pr-2">
                                  <p className="text-sm font-medium text-gray-800 truncate">{cert.nombre}</p>
                                  <p className="text-xs text-gray-500 truncate">{cert.emisor}</p>
                                </div>
                                <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedCertificate(cert)}
                                    className="print:hidden text-xs border-blue-200 text-blue-700 hover:bg-blue-50 px-2 py-1"
                                  >
                                    <Eye className="w-3 h-3 mr-1 flex-shrink-0" />
                                    <span className="hidden xs:inline">Ver</span>
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(cert.url)}
                                    className="print:hidden text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-2 py-1"
                                  >
                                    <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
                                    <span className="hidden xs:inline">Enlace</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            // Certificación solo con enlace
                            <div className="flex items-center justify-between p-3 min-w-0">
                              <div className="flex items-center flex-1 min-w-0 pr-2">
                                <FileText className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-800 truncate">{cert.nombre}</p>
                                  <p className="text-xs text-gray-500 truncate">{cert.emisor}</p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(cert.url)}
                                className="print:hidden text-xs border-blue-200 text-blue-700 hover:bg-blue-50 flex-shrink-0 px-2 py-1"
                              >
                                <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
                                <span className="hidden xs:inline">Ver</span>
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EducationSection;