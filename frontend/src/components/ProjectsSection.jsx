import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ExternalLink, Github, Calendar, Users, Code, Zap } from "lucide-react"

const projects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Plataforma completa de comercio electrónico con gestión de inventario y pagos",
    image: "/modern-ecommerce-dashboard.png",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    features: [
      "Carrito de compras avanzado",
      "Gestión de inventario",
      "Procesamiento de pagos",
      "Panel de administración",
      "Analytics en tiempo real",
    ],
    details: {
      overview:
        "Desarrollé una plataforma completa de e-commerce desde cero, incluyendo frontend, backend y base de datos.",
      challenges:
        "Los principales desafíos fueron la optimización de rendimiento con grandes catálogos y la integración segura de pagos.",
      solutions: "Implementé lazy loading, caching inteligente y arquitectura de microservicios para escalabilidad.",
      results: "La plataforma maneja 10,000+ productos y procesa 500+ transacciones diarias con 99.9% uptime.",
    },
    links: {
      demo: "https://demo.example.com",
      github: "https://github.com/example/ecommerce",
    },
    stats: {
      duration: "6 meses",
      team: "4 desarrolladores",
      role: "Full Stack Lead",
    },
  },
  {
    id: "2",
    title: "App de Gestión de Tareas",
    description: "Aplicación colaborativa para gestión de proyectos y tareas en equipo",
    image: "/task-management-app.png",
    technologies: ["Vue.js", "Express", "MongoDB", "Socket.io", "Docker"],
    features: [
      "Colaboración en tiempo real",
      "Tableros Kanban",
      "Notificaciones push",
      "Reportes y métricas",
      "Integración con calendarios",
    ],
    details: {
      overview:
        "Creé una aplicación web para gestión de tareas con funcionalidades colaborativas y sincronización en tiempo real.",
      challenges: "La sincronización en tiempo real entre múltiples usuarios y la gestión de conflictos de datos.",
      solutions:
        "Utilicé WebSockets para comunicación bidireccional y implementé algoritmos de resolución de conflictos.",
      results: "La app es utilizada por 50+ equipos con más de 1000 usuarios activos mensuales.",
    },
    links: {
      demo: "https://tasks.example.com",
      github: "https://github.com/example/task-manager",
    },
    stats: {
      duration: "4 meses",
      team: "3 desarrolladores",
      role: "Frontend Lead",
    },
  },
  {
    id: "3",
    title: "Dashboard Analytics",
    description: "Dashboard interactivo para visualización de datos y métricas empresariales",
    image: "/analytics-dashboard.png",
    technologies: ["React", "D3.js", "Python", "FastAPI", "Redis"],
    features: [
      "Visualizaciones interactivas",
      "Filtros dinámicos",
      "Exportación de reportes",
      "Alertas automáticas",
      "API REST completa",
    ],
    details: {
      overview: "Desarrollé un dashboard completo para visualización de datos empresariales con gráficos interactivos.",
      challenges: "Renderizar grandes volúmenes de datos de manera eficiente y crear visualizaciones personalizables.",
      solutions: "Implementé virtualización de datos, lazy loading y componentes de gráficos reutilizables.",
      results: "El dashboard procesa 1M+ puntos de datos y genera reportes para 200+ usuarios empresariales.",
    },
    links: {
      demo: "https://analytics.example.com",
      github: "https://github.com/example/analytics",
    },
    stats: {
      duration: "5 meses",
      team: "2 desarrolladores",
      role: "Full Stack Developer",
    },
  },
  {
    id: "4",
    title: "Sistema de Gestión Hospitalaria",
    description: "Sistema integral para la administración de hospitales y clínicas",
    image: "/hospital-management.png",
    technologies: ["Java", "Spring Boot", "MySQL", "Angular", "Docker"],
    features: [
      "Gestión de pacientes",
      "Historiales médicos",
      "Programación de citas",
      "Facturación automática",
      "Reportes estadísticos",
    ],
    details: {
      overview: "Sistema completo para la gestión administrativa y médica de instituciones de salud.",
      challenges: "Manejar datos sensibles con altos estándares de seguridad y disponibilidad 24/7.",
      solutions: "Implementé encriptación end-to-end, backups automáticos y arquitectura redundante.",
      results: "Sistema utilizado por 3 hospitales con más de 50,000 pacientes registrados.",
    },
    links: {
      github: "https://github.com/example/hospital-management",
    },
    stats: {
      duration: "8 meses",
      team: "6 desarrolladores",
      role: "Backend Lead",
    },
  },
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)

  const handleShowDetails = (projectId) => {
    setSelectedProject(projectId)
  }

  const handleBackToGrid = () => {
    setSelectedProject(null)
  }

  const selectedProjectData = projects.find((p) => p.id === selectedProject)

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Mis Proyectos
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Una selección de proyectos que demuestran mis habilidades en desarrollo full-stack
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-16"
          >
            {projects.map((project, index) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Card de Información */}
                <Card className="h-fit hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Code className="h-5 w-5 text-blue-600" />
                      Información
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span>{project.stats.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span>{project.stats.team}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Zap className="h-4 w-4 text-orange-600" />
                        <span>{project.stats.role}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card Central - Foto e Info */}
                <Card className="h-fit hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white dark:bg-slate-900 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-10"></div>
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">
                        Tecnologías
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="text-xs px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-slate-700 dark:text-slate-300 border-0 hover:shadow-md transition-shadow duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.links.demo && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </Button>
                        )}
                        {project.links.github && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Código
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card de Características */}
                <Card className="h-fit hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      Características
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" 
                      onClick={() => handleShowDetails(project.id)}
                    >
                      Ver Detalles Completos
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          selectedProjectData && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <Button 
                variant="ghost" 
                onClick={handleBackToGrid} 
                className="mb-6 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Volver a Proyectos
              </Button>

              <Card className="border-0 shadow-2xl bg-white dark:bg-slate-900 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {selectedProjectData.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
                    {selectedProjectData.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-8">
                  {/* Imagen principal */}
                  <div className="aspect-video relative overflow-hidden rounded-xl shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-10"></div>
                    <img
                      src={selectedProjectData.image || "/placeholder.svg"}
                      alt={selectedProjectData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Información del proyecto */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                      <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1 text-slate-800 dark:text-slate-200">Duración</h3>
                      <p className="text-muted-foreground">{selectedProjectData.stats.duration}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                      <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1 text-slate-800 dark:text-slate-200">Equipo</h3>
                      <p className="text-muted-foreground">{selectedProjectData.stats.team}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                      <Zap className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1 text-slate-800 dark:text-slate-200">Mi Rol</h3>
                      <p className="text-muted-foreground">{selectedProjectData.stats.role}</p>
                    </div>
                  </div>

                  {/* Tecnologías */}
                  <div>
                    <h3 className="font-semibold mb-4 text-xl text-slate-800 dark:text-slate-200">
                      Tecnologías Utilizadas
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProjectData.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="px-4 py-2 text-sm bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-slate-700 dark:text-slate-300 border-0 shadow-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Características */}
                  <div>
                    <h3 className="font-semibold mb-4 text-xl text-slate-800 dark:text-slate-200">
                      Características Principales
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProjectData.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detalles del proyecto */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                      <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">
                        Descripción General
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedProjectData.details.overview}
                      </p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                      <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Desafíos</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedProjectData.details.challenges}
                      </p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                      <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Soluciones</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedProjectData.details.solutions}
                      </p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                      <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Resultados</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedProjectData.details.results}
                      </p>
                    </div>
                  </div>

                  {/* Enlaces */}
                  <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                    {selectedProjectData.links.demo && (
                      <Button 
                        asChild
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <a href={selectedProjectData.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver Demo
                        </a>
                      </Button>
                    )}
                    {selectedProjectData.links.github && (
                      <Button 
                        variant="outline" 
                        asChild
                        className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
                      >
                        <a href={selectedProjectData.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Ver Código
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </section>
  )
}