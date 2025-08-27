"use client"
import { motion } from "framer-motion"
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
  Clock,
  Star,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Coffee,
  Lightbulb,
  Rocket,
  Heart,
} from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import "../styles/components/objective-section.css"

const ObjectiveSection = ({
  objetivoProfesional,
  isVisible,
  containerVariants,
  itemVariants,
  expandedObjective,
  setExpandedObjective,
}) => {
  return (
    <motion.section
      id="objective"
      className="objective-section"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible.objective ? "visible" : "hidden"}
    >
      <div className="objective-container">
        <motion.h2 className="objective-title" variants={itemVariants}>
          <Target className="objective-title-icon" />
          Objetivo Profesional
        </motion.h2>

        <div className="cursor-pointer" onClick={() => setExpandedObjective(!expandedObjective)}>
          {/* Cards separadas cuando NO está expandido */}
          {!expandedObjective ? (
            <div className="objective-cards-grid">
              {/* CARD IZQUIERDA - CONTENIDO PRINCIPAL ENRIQUECIDO */}
              <motion.div variants={itemVariants}>
                <div className="objective-card objective-card-emerald">
                  <div className="objective-card-header">
                    <h3 className="objective-card-title">
                      <Briefcase className="w-6 h-6 flex-shrink-0" />
                      <span>{objetivoProfesional.titulo}</span>
                    </h3>
                  </div>

                  <div className="objective-card-content">
                    {/* Descripción principal */}
                    <div>
                      <p className="objective-description">{objetivoProfesional.descripcion}</p>
                    </div>

                    {/* Mi propuesta de valor */}
                    <div className="objective-value-proposition">
                      <h4 className="objective-value-title">
                        <Rocket className="w-4 h-4 text-blue-400" />
                        Mi propuesta de valor:
                      </h4>
                      <div className="objective-value-grid">
                        <div className="objective-value-item">
                          <div className="objective-value-bullet bg-blue-500"></div>
                          <span className="text-sm text-gray-100">
                            6 años de experiencia autodidacta con proyectos reales
                          </span>
                        </div>
                        <div className="objective-value-item">
                          <div className="objective-value-bullet bg-emerald-500"></div>
                          <span className="text-sm text-gray-100">Especialización en Java y Spring Framework</span>
                        </div>
                        <div className="objective-value-item">
                          <div className="objective-value-bullet bg-blue-500"></div>
                          <span className="text-sm text-gray-100">Experiencia en metodologías ágiles (Scrum)</span>
                        </div>
                        <div className="objective-value-item">
                          <div className="objective-value-bullet bg-emerald-500"></div>
                          <span className="text-sm text-gray-100">Capacidad de aprendizaje rápido</span>
                        </div>
                      </div>
                    </div>

                    {/* Stack tecnológico destacado */}
                    <div className="objective-tech-stack">
                      <h4 className="objective-tech-title">
                        <Code className="w-4 h-4 text-emerald-400" />
                        Stack principal:
                      </h4>
                      <div className="objective-tech-badges">
                        {["Java", "Spring Boot", "React", "PostgreSQL", "Git", "Docker"].map((tech, index) => (
                          <Badge key={index} className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Proyectos destacados */}
                    <div className="objective-projects">
                      <h4 className="objective-projects-title">
                        <Star className="w-4 h-4 text-yellow-400" />
                        Proyectos relevantes:
                      </h4>
                      <div className="space-y-2">
                        <div className="objective-project-item">
                          <p className="objective-project-name">ServiceBook - Sistema Full-Stack</p>
                          <p className="objective-project-tech">Java + Spring Boot + MySQL + Metodología Scrum</p>
                        </div>
                        <div className="objective-project-item">
                          <p className="objective-project-name">Estimador de Proyectos</p>
                          <p className="objective-project-tech">React + FastAPI + MongoDB + JWT</p>
                        </div>
                      </div>
                    </div>

                    {/* Call to action */}
                    <div className="objective-cta">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-emerald-300 hover:text-white hover:bg-emerald-600/20"
                      >
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Ver información completa y disponibilidad
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CARD DERECHA - INFORMACIÓN COMPLEMENTARIA */}
              <motion.div variants={itemVariants}>
                <div className="space-y-4">
                  {/* Status actual */}
                  <div className="objective-card objective-card-yellow">
                    <div className="objective-card-content">
                      <div className="objective-status-card">
                        <div className="objective-status-icon">
                          <Heart className="w-6 h-6 text-green-400" />
                        </div>
                        <h4 className="objective-status-title">🟢 Open to Work</h4>
                        <p className="objective-status-description">
                          Disponible inmediatamente. Buscando oportunidades para contribuir desde el día uno.
                        </p>
                        <div className="objective-status-grid">
                          <div className="objective-status-item">
                            <p className="objective-status-label">Ubicación</p>
                            <p className="objective-status-value">Mendoza, Argentina</p>
                          </div>
                          <div className="objective-status-item">
                            <p className="objective-status-label">Experiencia</p>
                            <p className="objective-status-value">6 años autodidacta</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modalidades */}
                  <div className="objective-card objective-card-blue">
                    <div className="objective-card-header">
                      <h3 className="objective-card-title">
                        <Globe className="w-5 h-5 flex-shrink-0" />
                        Modalidades
                      </h3>
                    </div>
                    <div className="objective-card-content">
                      <div className="objective-modalities-list">
                        {objetivoProfesional.modalidades.map((modalidad, index) => (
                          <div key={index} className="objective-modality-item">
                            <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span className="text-sm text-gray-100">{modalidad}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Niveles de interés */}
                  <div className="objective-card objective-card-emerald">
                    <div className="objective-card-header">
                      <h3 className="objective-card-title">
                        <Building className="w-5 h-5 flex-shrink-0" />
                        Niveles
                      </h3>
                    </div>
                    <div className="objective-card-content">
                      <div className="objective-levels-list">
                        {objetivoProfesional.niveles.map((nivel, index) => (
                          <div key={index} className="objective-level-item">
                            <User className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-sm text-gray-100">{nivel}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* VISTA EXPANDIDA - CARD UNIFICADA */
            <div className="objective-expanded-card">
              <div className="objective-expanded-header">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl text-white flex items-start font-bold">
                    <Target className="w-7 h-7 mr-3 flex-shrink-0 mt-1 text-emerald-400" />
                    <span className="leading-tight">{objetivoProfesional.titulo}</span>
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-emerald-300 hover:bg-emerald-600/20 border-emerald-400 bg-transparent"
                  >
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Contraer
                  </Button>
                </div>
              </div>

              <div className="objective-expanded-content">
                {/* Contenido principal detallado - 2/3 */}
                <div className="space-y-6">
                  {/* Descripción y enfoque */}
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-emerald-400" />
                      Mi enfoque profesional:
                    </h4>
                    <p className="text-gray-100 leading-relaxed mb-4">{objetivoProfesional.descripcion}</p>
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
                              <Badge key={index} className="bg-slate-100 text-slate-800 text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h6 className="font-medium text-blue-700 mb-2 text-sm">Frontend</h6>
                          <div className="flex flex-wrap gap-1">
                            {["React", "JavaScript", "HTML5", "CSS3"].map((tech, index) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <h6 className="font-medium text-emerald-700 mb-2 text-sm">Herramientas</h6>
                          <div className="flex flex-wrap gap-1">
                            {["Git", "Docker", "IntelliJ", "Postman"].map((tech, index) => (
                              <Badge key={index} className="bg-emerald-100 text-emerald-800 text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información lateral completa - 1/3 */}
                  <div className="objective-sidebar">
                    <div className="objective-status-card">
                      <div className="objective-status-icon">
                        <Coffee className="w-8 h-8 text-green-400" />
                      </div>
                      <h4 className="objective-status-title">🟢 Disponible Ya</h4>
                      <p className="objective-status-description">Listo para comenzar inmediatamente</p>
                      <div className="objective-status-grid">
                        <div className="objective-status-item">
                          <p className="objective-status-label">UBICACIÓN</p>
                          <p className="objective-status-value">📍 Mendoza, Argentina</p>
                        </div>
                        <div className="objective-status-item">
                          <p className="objective-status-label">DISPONIBILIDAD</p>
                          <p className="objective-status-value">⏰ Tiempo completo</p>
                        </div>
                        <div className="objective-status-item">
                          <p className="objective-status-label">INICIO</p>
                          <p className="objective-status-value">🚀 Inmediato</p>
                        </div>
                      </div>
                    </div>

                    <div className="objective-modalities-list">
                      <h5 className="objective-modality-title">
                        <Globe className="w-4 h-4 text-blue-400" />
                        Modalidades preferidas:
                      </h5>
                      <div className="space-y-2">
                        {objetivoProfesional.modalidades.map((modalidad, index) => (
                          <div key={index} className="objective-modality-item">
                            <p className="objective-modality-label">{modalidad}</p>
                            <p className="objective-modality-description">
                              {modalidad === "Trabajo Remoto" && "100% remoto con comunicación fluida"}
                              {modalidad === "Modalidad Híbrida" && "Flexibilidad entre remoto y presencial"}
                              {modalidad === "Presencial en Mendoza" && "Oficina en Mendoza, Argentina"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="objective-levels-list">
                      <h5 className="objective-level-title">
                        <Building className="w-4 h-4 text-emerald-400" />
                        Niveles de interés:
                      </h5>
                      <div className="space-y-2">
                        {objetivoProfesional.niveles.map((nivel, index) => (
                          <div key={index} className="objective-level-item">
                            <p className="objective-level-label">{nivel}</p>
                            <p className="objective-level-description">
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
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}

export default ObjectiveSection
