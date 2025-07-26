import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin,
  Download,
  ExternalLink,
  Code,
  Smartphone,
  Users,
  Award,
  Calendar,
  Building,
  Globe,
  Coffee,
  Zap,
  Database,
  Server,
  Layout,
  GitBranch,
  BookOpen
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const profileData = {
  personalInfo: {
    nombre: "Samir Elias Salatino",
    edad: 25,
    ubicacion: "Mendoza, Argentina",
    email: "samireliassalatino@gmail.com",
    telefono: "+54 9 261 466-6991",
    foto: "data:image/jpeg;base64,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",
    titulo: "Desarrollador Backend Java | Full-Stack Developer",
    experiencia: "4 años como Developer Autodidacta",
    bio: "Developer apasionado especializado en Backend con Java, Spring Framework y arquitecturas robustas. Experiencia en metodologías ágiles y proyectos Full-Stack. Más información y certificados disponibles en mi portfolio.",
    linkedin: "https://www.linkedin.com/in/samir-elías",
    github: "https://github.com/Samir-Elias",
    website: "https://sites.google.com/view/samir-elias-salatino/inicio"
  },
  tecnologiasCore: {
    backend: ["Java", "Spring Framework", "Spring Boot", "JPA", "Maven", "SQL", "PostgreSQL", "MySQL"],
    frontend: ["React", "Thymeleaf", "HTML5", "CSS3", "JavaScript", "SCSS"],
    herramientas: ["Git", "GitHub", "IntelliJ IDEA", "Eclipse", "Postman", "Docker"],
    metodologias: ["Scrum", "Agile", "Sprints", "Trabajo en equipo"]
  },
  proyectosDestacados: [
    {
      nombre: "ServiceBook - Sistema de Gestión Integral",
      descripcion: "Proyecto Full-Stack más grande desarrollado colaborativamente. Sistema completo de gestión para servicios con chat en tiempo real, sistema de agenda, administración de usuarios y proveedores. Arquitectura robusta con Spring Boot y base de datos relacional.",
      tecnologias: ["Java", "Spring Boot", "JPA", "Thymeleaf", "MySQL", "HTML/CSS", "JavaScript"],
      caracteristicas: [
        "Sistema de chat integrado con usuarios",
        "Gestión completa de agenda y citas",
        "Panel de administración completo",
        "Sistema de roles (Admin, Proveedores, Clientes)",
        "CRUD completo para todas las entidades",
        "Validaciones y manejo de errores robusto"
      ],
      repositorio: "https://github.com/Samir-Elias/ServiceBook-Spring",
      estado: "Completado y Funcional"
    },
    {
      nombre: "TeloApp - Marketplace de Moteles",
      descripcion: "Aplicación web moderna tipo marketplace para reserva de moteles. Desarrollada con React y Node.js, incluye geolocalización, sistema de búsqueda avanzada y panel de administración para propietarios.",
      tecnologias: ["React", "Node.js", "JavaScript", "HTML/CSS", "APIs de Google Maps"],
      caracteristicas: [
        "Interfaz moderna inspirada en PedidosYa",
        "Sistema de geolocalización con Google Maps",
        "Búsqueda y filtros avanzados",
        "Panel para propietarios de establecimientos",
        "Diseño responsive y user-friendly"
      ],
      repositorio: "https://github.com/Samir-Elias/TeloApp",
      estado: "En desarrollo activo"
    },
    {
      nombre: "Rick & Morty Explorer App",
      descripcion: "Aplicación web interactiva que consume la API de Rick & Morty. Desarrollada para practicar integración de APIs REST y manejo de datos dinámicos.",
      tecnologias: ["JavaScript", "HTML/CSS", "API REST", "JSON"],
      caracteristicas: [
        "Consumo de API REST externa",
        "Interfaz dinámica y responsive",
        "Búsqueda y filtrado de personajes",
        "Manejo de estados de carga y errores"
      ],
      repositorio: "https://github.com/Samir-Elias/Rick-Morty-app",
      estado: "Completado"
    },
    {
      nombre: "Caminito Verde ONG - Web Institucional",
      descripcion: "Sitio web institucional para ONG ambientalista. Diseño moderno con SCSS y estructura semántica para optimización SEO.",
      tecnologias: ["HTML5", "SCSS", "CSS3", "JavaScript"],
      caracteristicas: [
        "Diseño responsive y accesible",
        "Optimización SEO",
        "Arquitectura CSS modular con SCSS",
        "Interfaz limpia y profesional"
      ],
      repositorio: "https://github.com/Samir-Elias/Caminito-Verde-ONG",
      estado: "Completado"
    }
  ],
  formacionTecnica: [
    {
      titulo: "Cursado Full-Stack Java Intensivo",
      institucion: "Programa Autodidacta Estructurado",
      duracion: "1.5 años (3 horas diarias, L-V)",
      descripcion: "Formación intensiva en desarrollo Full-Stack con Java. Metodología práctica con Sprints, trabajo en equipos rotativos de 10 personas simulando entorno startup real.",
      competencias: ["Java avanzado", "Spring Framework", "JPA", "Maven", "SQL", "Metodologías Ágiles", "Trabajo en equipo", "Git colaborativo"],
      certificaciones: "Disponible en portfolio completo"
    },
    {
      titulo: "Argentina Programa 4.0 - Programación desde cero",
      institucion: "Argentina Programa",
      duracion: "300 horas - Modalidad Scrum",
      descripcion: "Programa gubernamental de formación en programación con metodología Scrum aplicada. Fundamentos sólidos de programación y mejores prácticas.",
      competencias: ["Lógica de programación", "Metodología Scrum", "Fundamentos de desarrollo", "Resolución de problemas"],
      estado: "Completado"
    },
    {
      titulo: "Diseño de Páginas Web",
      institucion: "Escuelas Newton",
      duracion: "200 horas presenciales",
      descripcion: "Formación presencial en desarrollo web frontend. Enfoque práctico en diseño UI/UX y maquetación moderna.",
      competencias: ["HTML5", "CSS3", "JavaScript", "Diseño responsive", "UI/UX", "Prototipado"],
      modalidad: "Presencial",
      periodo: "2022-2023"
    }
  ],
  experienciaComplementaria: [
    {
      rol: "Desarrollo de habilidades transferibles",
      descripcion: "Experiencia laboral que ha desarrollado competencias clave para el mundo tech: gestión bajo presión, atención al detalle, resolución autónoma de problemas, y excelente comunicación con clientes."
    }
  ],
  objetivoProfesional: {
    titulo: "Desarrollador Backend Java | Full-Stack Developer",
    descripcion: "Busco incorporarme como desarrollador en un equipo dinámico donde pueda aplicar mis 4 años de experiencia en Java y Spring Framework. Especializado en Backend con sólidos conocimientos Frontend. Disponible para trabajo remoto o presencial en Mendoza.",
    modalidades: ["Remoto", "Híbrido", "Presencial en Mendoza"],
    niveles: ["Junior Developer", "Trainee", "Developer Jr/SSr"]
  }
};

const Resume = () => {
  const [isVisible, setIsVisible] = useState({});
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const downloadPDF = () => {
    window.print();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 print:bg-white">
      {/* Hero Section */}
      <motion.section 
        id="hero"
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white print:bg-gray-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12"
            variants={itemVariants}
          >
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="w-48 h-48 border-4 border-white shadow-2xl">
                <AvatarImage src={profileData.personalInfo.foto} alt="Samir Salatino" className="object-cover" />
                <AvatarFallback className="text-4xl bg-white text-blue-600">
                  SS
                </AvatarFallback>
              </Avatar>
            </motion.div>
            
            <div className="text-center lg:text-left">
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                {profileData.personalInfo.nombre}
              </motion.h1>
              <motion.h2 
                className="text-xl lg:text-2xl mb-4 text-blue-100 font-semibold"
                variants={itemVariants}
              >
                {profileData.personalInfo.titulo}
              </motion.h2>
              <motion.p 
                className="text-lg mb-6 text-blue-100 max-w-2xl"
                variants={itemVariants}
              >
                {profileData.personalInfo.bio}
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 text-blue-100">
                  <MapPin size={18} />
                  <span>{profileData.personalInfo.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <Code size={18} />
                  <span>{profileData.personalInfo.experiencia}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <Globe size={18} />
                  <span>Disponible para remoto</span>
                </div>
              </motion.div>
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-4"
                variants={itemVariants}
              >
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg print:hidden"
                  onClick={() => window.open(`mailto:${profileData.personalInfo.email}`)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {profileData.personalInfo.email}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 print:hidden"
                  onClick={downloadPDF}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 print:hidden"
                  onClick={() => window.open(profileData.personalInfo.github)}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 print:hidden"
                  onClick={() => window.open(profileData.personalInfo.website)}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Portfolio Completo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent print:hidden"></div>
      </motion.section>

      <div className="container mx-auto px-6 py-12">
        {/* Tecnologías Core */}
        <motion.section 
          id="technologies"
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.technologies ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl font-bold mb-8 text-center text-gray-800"
            variants={itemVariants}
          >
            <Zap className="inline-block w-8 h-8 mr-3 text-yellow-600" />
            Stack Tecnológico
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-red-700 flex items-center">
                    <Server className="w-5 h-5 mr-2" />
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.tecnologiasCore.backend.map((tech, index) => (
                      <Badge key={index} className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-blue-700 flex items-center">
                    <Layout className="w-5 h-5 mr-2" />
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.tecnologiasCore.frontend.map((tech, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-green-700 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Herramientas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.tecnologiasCore.herramientas.map((tech, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-purple-700 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Metodologías
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.tecnologiasCore.metodologias.map((tech, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Proyectos Destacados */}
        <motion.section 
          id="projects"
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.projects ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl font-bold mb-8 text-center text-gray-800"
            variants={itemVariants}
          >
            <Code className="inline-block w-8 h-8 mr-3 text-indigo-600" />
            Proyectos Destacados
          </motion.h2>
          <div className="grid gap-8">
            {profileData.proyectosDestacados.map((proyecto, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="cursor-pointer"
                onClick={() => setExpandedProject(expandedProject === index ? null : index)}
              >
                <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
                  index === 0 ? 'border-l-red-500 bg-gradient-to-r from-red-50 to-white' :
                  index === 1 ? 'border-l-blue-500 bg-gradient-to-r from-blue-50 to-white' :
                  index === 2 ? 'border-l-green-500 bg-gradient-to-r from-green-50 to-white' :
                  'border-l-purple-500 bg-gradient-to-r from-purple-50 to-white'
                } ${expandedProject === index ? 'ring-2 ring-blue-300' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className={`text-xl flex items-center ${
                          index === 0 ? 'text-red-800' :
                          index === 1 ? 'text-blue-800' :
                          index === 2 ? 'text-green-800' :
                          'text-purple-800'
                        }`}>
                          <GitBranch className="mr-2 w-5 h-5" />
                          {proyecto.nombre}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-2">
                          {proyecto.descripcion}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className={`${
                          proyecto.estado === 'Completado y Funcional' || proyecto.estado === 'Completado' ? 
                          'bg-green-100 text-green-800 border-green-200' :
                          'bg-orange-100 text-orange-800 border-orange-200'
                        }`}>
                          {proyecto.estado}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(proyecto.repositorio);
                          }}
                          className="print:hidden"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Ver Repo
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Tecnologías:</h4>
                      <div className="flex flex-wrap gap-2">
                        {proyecto.tecnologias.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className={`${
                            index === 0 ? 'bg-red-100 text-red-800 border-red-200' :
                            index === 1 ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            index === 2 ? 'bg-green-100 text-green-800 border-green-200' :
                            'bg-purple-100 text-purple-800 border-purple-200'
                          }`}>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {expandedProject === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t pt-4 mt-4"
                      >
                        <h4 className="font-semibold text-gray-700 mb-3">Características principales:</h4>
                        <ul className="space-y-2">
                          {proyecto.caracteristicas.map((caracteristica, charIndex) => (
                            <li key={charIndex} className="flex items-start">
                              <div className={`w-2 h-2 rounded-full mr-3 mt-2 ${
                                index === 0 ? 'bg-red-500' :
                                index === 1 ? 'bg-blue-500' :
                                index === 2 ? 'bg-green-500' :
                                'bg-purple-500'
                              }`}></div>
                              <span className="text-gray-600">{caracteristica}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Formación Técnica */}
        <motion.section 
          id="education"
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.education ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl font-bold mb-8 text-center text-gray-800"
            variants={itemVariants}
          >
            <BookOpen className="inline-block w-8 h-8 mr-3 text-blue-600" />
            Formación Técnica Especializada
          </motion.h2>
          <div className="grid gap-6">
            {profileData.formacionTecnica.map((formacion, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-gray-800">{formacion.titulo}</CardTitle>
                        <CardDescription className="text-lg text-blue-600 font-semibold">
                          {formacion.institucion}
                        </CardDescription>
                        <CardDescription className="text-sm text-gray-500 mt-1">
                          {formacion.duracion} {formacion.modalidad && `• ${formacion.modalidad}`}
                        </CardDescription>
                      </div>
                      {formacion.estado && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {formacion.estado}
                        </Badge>
                      )}
                      {formacion.periodo && (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800">
                          {formacion.periodo}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed">{formacion.descripcion}</p>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Competencias desarrolladas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {formacion.competencias.map((competencia, compIndex) => (
                          <Badge key={compIndex} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {competencia}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Objetivo Profesional */}
        <motion.section 
          id="objective"
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.objective ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl font-bold mb-8 text-center text-gray-800"
            variants={itemVariants}
          >
            <Award className="inline-block w-8 h-8 mr-3 text-green-600" />
            Objetivo Profesional
          </motion.h2>
          <motion.div 
            className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 shadow-lg border-l-4 border-l-green-500"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{profileData.objetivoProfesional.titulo}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">{profileData.objetivoProfesional.descripcion}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-green-600" />
                  Modalidades preferidas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profileData.objetivoProfesional.modalidades.map((modalidad, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">
                      {modalidad}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <Building className="w-4 h-4 mr-2 text-blue-600" />
                  Niveles de interés:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profileData.objetivoProfesional.niveles.map((nivel, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">
                      {nivel}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 print:hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">¿Listo para el próximo desafío?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              4 años de experiencia autodidacta me han preparado para contribuir desde el día uno. 
              Busco un equipo donde pueda aplicar mi pasión por el desarrollo Backend y seguir creciendo.
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => window.open(`mailto:${profileData.personalInfo.email}`)}
              >
                <Mail className="w-4 h-4 mr-2" />
                {profileData.personalInfo.email}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-800"
                onClick={() => window.open(`tel:${profileData.personalInfo.telefono}`)}
              >
                <Phone className="w-4 h-4 mr-2" />
                {profileData.personalInfo.telefono}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-800"
                onClick={() => window.open(profileData.personalInfo.linkedin)}
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-400">
              <Coffee className="w-4 h-4" />
              <span>Desarrollado con pasión desde Mendoza, Argentina</span>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Resume;