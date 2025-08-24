import React from "react";
import { motion } from "framer-motion";
import { 
  Award,
  Globe,
  Building,
  Target,
  MapPin,
  User,
  Briefcase,
  TrendingUp,
  Code,
  Users,
  Clock,
  Star,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Coffee,
  Lightbulb,
  Rocket,
  Heart
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const ObjectiveSection = ({ 
  objetivoProfesional, 
  isVisible, 
  containerVariants, 
  itemVariants,
  expandedObjective,
  setExpandedObjective 
}) => {
  return (
    <motion.section 
      id="objective"
      className="mb-12 sm:mb-16"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible.objective ? "visible" : "hidden"}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800"
        variants={itemVariants}
      >
        <Target className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-emerald-600" />
        Objetivo Profesional
      </motion.h2>

      <div className="cursor-pointer" onClick={() => setExpandedObjective(!expandedObjective)}>
        {/* Cards separadas cuando NO está expandido */}
        {!expandedObjective ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* CARD IZQUIERDA - CONTENIDO PRINCIPAL ENRIQUECIDO */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-600 bg-gradient-to-r from-emerald-50 to-white shadow-emerald-200/50 h-full">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-emerald-800 flex items-start">
                    <Briefcase className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                    <span className="leading-tight">{objetivoProfesional.titulo}</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Descripción principal */}
                  <div>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                      {objetivoProfesional.descripcion}
                    </p>
                  </div>

                  {/* Mi propuesta de valor */}
                  <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-sm">
                      <Rocket className="w-4 h-4 mr-2 text-blue-600" />
                      Mi propuesta de valor:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">6 años de experiencia autodidacta con proyectos reales</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Especialización en Java y Spring Framework</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Experiencia en metodologías ágiles (Scrum)</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Capacidad de aprendizaje rápido</span>
                      </div>
                    </div>
                  </div>

                  {/* Stack tecnológico destacado */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm">
                      <Code className="w-4 h-4 mr-2 text-emerald-600" />
                      Stack principal:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Java", "Spring Boot", "React", "PostgreSQL", "Git", "Docker"].map((tech, index) => (
                        <Badge key={index} className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Proyectos destacados */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm">
                      <Star className="w-4 h-4 mr-2 text-yellow-600" />
                      Proyectos relevantes:
                    </h4>
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded border border-gray-100">
                        <p className="text-sm font-medium text-gray-800">ServiceBook - Sistema Full-Stack</p>
                        <p className="text-xs text-gray-600">Java + Spring Boot + MySQL + Metodología Scrum</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-100">
                        <p className="text-sm font-medium text-gray-800">Estimador de Proyectos</p>
                        <p className="text-xs text-gray-600">React + FastAPI + MongoDB + JWT</p>
                      </div>
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="text-center pt-4 border-t border-emerald-100">
                    <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50">
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Ver información completa y disponibilidad
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CARD DERECHA - INFORMACIÓN COMPLEMENTARIA */}
            <motion.div variants={itemVariants}>
              <div className="space-y-4">
                
                {/* Status actual */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-yellow-200/50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                        <Heart className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-bold text-yellow-800 mb-2 text-lg">🟢 Open to Work</h4>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Disponible inmediatamente. Buscando oportunidades para contribuir desde el día uno.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="bg-white bg-opacity-50 p-2 rounded">
                          <p className="font-semibold text-gray-700">Ubicación</p>
                          <p className="text-gray-600">Mendoza, Argentina</p>
                        </div>
                        <div className="bg-white bg-opacity-50 p-2 rounded">
                          <p className="font-semibold text-gray-700">Experiencia</p>
                          <p className="text-gray-600">6 años autodidacta</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Modalidades */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600 bg-gradient-to-r from-blue-50 to-white shadow-blue-200/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-800 flex items-center">
                      <Globe className="w-5 h-5 mr-2 flex-shrink-0" />
                      Modalidades
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {objetivoProfesional.modalidades.map((modalidad, index) => (
                        <div key={index} className="flex items-center p-2 bg-white rounded border border-blue-100 hover:border-blue-200 transition-colors">
                          <MapPin className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{modalidad}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Niveles de interés */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-600 bg-gradient-to-r from-emerald-50 to-white shadow-emerald-200/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-emerald-800 flex items-center">
                      <Building className="w-5 h-5 mr-2 flex-shrink-0" />
                      Niveles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {objetivoProfesional.niveles.map((nivel, index) => (
                        <div key={index} className="flex items-center p-2 bg-white rounded border border-emerald-100 hover:border-emerald-200 transition-colors">
                          <User className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{nivel}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        ) : (
          /* VISTA EXPANDIDA - CARD UNIFICADA */
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-600 bg-gradient-to-r from-emerald-50 to-white shadow-emerald-200/50 ring-2 ring-emerald-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl text-emerald-800 flex items-start">
                  <Target className="w-7 h-7 mr-3 flex-shrink-0 mt-1" />
                  <span className="leading-tight">{objetivoProfesional.titulo}</span>
                </CardTitle>
                <Button variant="outline" size="sm" className="text-emerald-600 hover:bg-emerald-50">
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Contraer
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Grid expandido con información completa */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Contenido principal detallado - 2/3 */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* Descripción y enfoque */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <Lightbulb className="w-5 h-5 mr-2 text-emerald-600" />
                        Mi enfoque profesional:
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-4">{objetivoProfesional.descripcion}</p>
                    </div>

                    {/* Fortalezas expandidas */}
                    <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-blue-600" />
                        Fortalezas y experiencia clave:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800 text-sm">6 años de experiencia práctica</p>
                              <p className="text-xs text-gray-600">Proyectos reales con tecnologías modernas</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800 text-sm">Especialización Backend</p>
                              <p className="text-xs text-gray-600">Java, Spring Framework, bases de datos</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800 text-sm">Metodologías ágiles</p>
                              <p className="text-xs text-gray-600">Scrum, trabajo en equipo, sprints</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800 text-sm">Full-Stack capability</p>
                              <p className="text-xs text-gray-600">React, APIs, bases de datos</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800 text-sm">Aprendizaje continuo</p>
                              <p className="text-xs text-gray-600">Autodidacta, certificaciones activas</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800 text-sm">Adaptabilidad</p>
                              <p className="text-xs text-gray-600">Diferentes proyectos y tecnologías</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Objetivos a corto y largo plazo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-5 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Objetivos inmediatos:
                        </h5>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            Incorporarme a un equipo de desarrollo
                          </li>
                          <li className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            Contribuir desde el primer día
                          </li>
                          <li className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            Aplicar metodologías ágiles
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white p-5 rounded-lg border border-emerald-200">
                        <h5 className="font-semibold text-emerald-800 mb-3 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Crecimiento profesional:
                        </h5>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            Especializarme en arquitecturas robustas
                          </li>
                          <li className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            Liderar proyectos técnicos
                          </li>
                          <li className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            Mentorear otros desarrolladores
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Stack tecnológico completo */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                        <Code className="w-5 h-5 mr-2 text-emerald-600" />
                        Stack tecnológico completo:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h6 className="font-medium text-slate-700 mb-2 text-sm">Backend</h6>
                          <div className="flex flex-wrap gap-1">
                            {["Java", "Spring Boot", "JPA", "Maven", "SQL"].map((tech, index) => (
                              <Badge key={index} className="bg-slate-100 text-slate-800 text-xs">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h6 className="font-medium text-blue-700 mb-2 text-sm">Frontend</h6>
                          <div className="flex flex-wrap gap-1">
                            {["React", "JavaScript", "HTML5", "CSS3"].map((tech, index) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <h6 className="font-medium text-emerald-700 mb-2 text-sm">Herramientas</h6>
                          <div className="flex flex-wrap gap-1">
                            {["Git", "Docker", "IntelliJ", "Postman"].map((tech, index) => (
                              <Badge key={index} className="bg-emerald-100 text-emerald-800 text-xs">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información lateral completa - 1/3 */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-4 space-y-6">
                      
                      {/* Status detallado */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                        <div className="text-center mb-4">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                            <Coffee className="w-8 h-8 text-green-600" />
                          </div>
                          <h4 className="font-bold text-green-800 text-lg mb-2">🟢 Disponible Ya</h4>
                          <p className="text-sm text-gray-600">Listo para comenzar inmediatamente</p>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white bg-opacity-70 p-3 rounded">
                            <p className="font-semibold text-xs text-gray-600">UBICACIÓN</p>
                            <p className="text-sm text-gray-800">📍 Mendoza, Argentina</p>
                          </div>
                          <div className="bg-white bg-opacity-70 p-3 rounded">
                            <p className="font-semibold text-xs text-gray-600">DISPONIBILIDAD</p>
                            <p className="text-sm text-gray-800">⏰ Tiempo completo</p>
                          </div>
                          <div className="bg-white bg-opacity-70 p-3 rounded">
                            <p className="font-semibold text-xs text-gray-600">INICIO</p>
                            <p className="text-sm text-gray-800">🚀 Inmediato</p>
                          </div>
                        </div>
                      </div>

                      {/* Modalidades expandidas */}
                      <div>
                        <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                          <Globe className="w-4 h-4 mr-2" />
                          Modalidades preferidas:
                        </h5>
                        <div className="space-y-2">
                          {objetivoProfesional.modalidades.map((modalidad, index) => (
                            <div key={index} className="bg-blue-50 p-3 rounded border-l-2 border-blue-400">
                              <p className="text-sm font-medium text-blue-800">{modalidad}</p>
                              <p className="text-xs text-blue-600">
                                {modalidad === "Trabajo Remoto" && "100% remoto con comunicación fluida"}
                                {modalidad === "Modalidad Híbrida" && "Flexibilidad entre remoto y presencial"}
                                {modalidad === "Presencial en Mendoza" && "Oficina en Mendoza, Argentina"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Niveles expandidos */}
                      <div>
                        <h5 className="font-semibold text-emerald-800 mb-3 flex items-center">
                          <Building className="w-4 h-4 mr-2" />
                          Niveles de interés:
                        </h5>
                        <div className="space-y-2">
                          {objetivoProfesional.niveles.map((nivel, index) => (
                            <div key={index} className="bg-emerald-50 p-3 rounded border-l-2 border-emerald-400">
                              <p className="text-sm font-medium text-emerald-800">{nivel}</p>
                              <p className="text-xs text-emerald-600">
                                {index === 0 && "Posición ideal para mi experiencia"}
                                {index === 1 && "Programa de desarrollo estructurado"}  
                                {index === 2 && "Rol versátil con crecimiento"}
                                {index === 3 && "Especialización en mi área fuerte"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.section>
  );
};

export default ObjectiveSection;