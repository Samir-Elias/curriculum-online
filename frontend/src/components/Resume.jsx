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
  BookOpen,
  Eye,
  FileText,
  Image
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
    foto: "/perfil.jpg",
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
    herramientas: ["Git", "GitHub", "IntelliJ IDEA", "Eclipse", "Postman", "Docker", "Figma"],
    metodologias: ["Scrum", "Agile", "Sprints", "Trabajo en equipo", "UX/UI Design", "User Research"]
  },
  proyectosDestacados: [
    {
      nombre: "CV Digital Interactivo - React Portfolio",
      descripcion: "CV digital moderno desarrollado con React y Tailwind CSS. Diseño responsive con animaciones fluidas, paleta profesional y optimizado para conversión. Incluye secciones interactivas, descarga PDF y enlaces directos.",
      tecnologias: ["React", "Tailwind CSS", "Framer Motion", "JavaScript", "CSS3", "Responsive Design"],
      imagen: "https://via.placeholder.com/1200x630/1e293b/3b82f6?text=CV+Digital+React+Portfolio",
      demoUrl: "https://samir-elias-cv.netlify.app",
      caracteristicas: [
        "Diseño responsive optimizado para móviles y desktop",
        "Animaciones suaves con Framer Motion",
        "Paleta de colores profesional para startups",
        "Función de descarga PDF integrada",
        "Secciones interactivas expandibles",
        "SEO optimizado y carga ultrarrápida"
      ],
      repositorio: "https://github.com/Samir-Elias/samir-elias-cv",
      estado: "Completado y En Producción"
    },
    {
      nombre: "ServiceBook - Sistema de Gestión Integral",
      descripcion: "Proyecto Full-Stack más grande desarrollado colaborativamente. Sistema completo de gestión para servicios con chat en tiempo real, sistema de agenda, administración de usuarios y proveedores. Arquitectura robusta con Spring Boot y base de datos relacional.",
      tecnologias: ["Java", "Spring Boot", "JPA", "Thymeleaf", "MySQL", "HTML/CSS", "JavaScript"],
      imagen: "https://via.placeholder.com/1200x630/1e293b/64748b?text=ServiceBook+Sistema+de+Gestión",
      demoUrl: null,
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
      imagen: "https://via.placeholder.com/1200x630/0f172a/3b82f6?text=TeloApp+Marketplace",
      demoUrl: null,
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
      imagen: "https://via.placeholder.com/1200x630/065f46/10b981?text=Rick+%26+Morty+Explorer",
      demoUrl: null,
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
      imagen: "https://via.placeholder.com/1200x630/166534/22c55e?text=Caminito+Verde+ONG",
      demoUrl: null,
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
      certificaciones: [
        {
          nombre: "Certificado Java Full-Stack",
          url: "https://sites.google.com/view/samir-elias-salatino/inicio",
          imagen: "https://via.placeholder.com/800x600/1e293b/3b82f6?text=Certificado+Java+Full-Stack",
          emisor: "Programa Autodidacta",
          tipo: "imagen"
        }
      ],
      estado: "Completado"
    },
    {
      titulo: "Google UX Design Certificate - Aspectos Básicos del Diseño UX",
      institucion: "Google Career Certificates (Coursera)",
      duracion: "3 de 7 cursos completados - Modalidad Online",
      descripcion: "Certificación profesional de Google en Diseño de Experiencia del Usuario. Formación práctica en metodologías UX, investigación de usuarios, prototipado y herramientas de diseño. Curso impartido completamente en inglés.",
      competencias: ["UX/UI Design", "User Research", "Figma", "Prototipos de baja fidelidad", "Design Thinking", "User-Centered Design", "Wireframing", "Usability Testing"],
      certificaciones: [
        {
          nombre: "Google UX Design Certificate (3/7 módulos)",
          url: "https://coursera.org/share/7d8616f9e8180543317cd30604b4cbcf", // Reemplazar con URL real
          imagen: "/images/certificates/certificado-ux.png",
          emisor: "Google Career Certificates",
          tipo: "imagen"
        }
      ],
      estado: "Parcialmente Completado (3/7)",
      periodo: "2023-2024"
    },
    {
      titulo: "Argentina Programa 4.0 - Programación desde cero",
      institucion: "Argentina Programa",
      duracion: "300 horas - Modalidad Scrum",
      descripcion: "Programa gubernamental de formación en programación con metodología Scrum aplicada. Fundamentos sólidos de programación y mejores prácticas.",
      competencias: ["Lógica de programación", "Metodología Scrum", "Fundamentos de desarrollo", "Resolución de problemas"],
      certificaciones: [
        {
          nombre: "Certificado Argentina Programa 4.0",
          url: "https://sites.google.com/view/samir-elias-salatino/inicio",
          imagen: "https://via.placeholder.com/800x600/065f46/10b981?text=Argentina+Programa+4.0",
          emisor: "Argentina Programa",
          tipo: "imagen"
        }
      ],
      estado: "Completado"
    },
    {
      titulo: "Diseño de Páginas Web",
      institucion: "Escuelas Newton",
      duracion: "200 horas presenciales",
      descripcion: "Formación presencial en desarrollo web frontend. Enfoque práctico en diseño UI/UX y maquetación moderna.",
      competencias: ["HTML5", "CSS3", "JavaScript", "Diseño responsive", "UI/UX", "Prototipado"],
      certificaciones: [
        {
          nombre: "Certificado Diseño Web",
          url: "https://sites.google.com/view/samir-elias-salatino/inicio",
          imagen: "https://via.placeholder.com/800x600/7c3aed/a855f7?text=Certificado+Diseño+Web",
          emisor: "Escuelas Newton",
          tipo: "imagen"
        }
      ],
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
  const [selectedCertificate, setSelectedCertificate] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 print:bg-white">
      {/* Hero Section */}
      <motion.section 
        id="hero"
        className="relative bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white print:bg-gray-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12"
            variants={itemVariants}
          >
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 border-4 border-white shadow-2xl">
                <AvatarImage src={profileData.personalInfo.foto} alt="Samir Salatino" className="object-cover" />
                <AvatarFallback className="text-2xl sm:text-3xl lg:text-4xl bg-white text-blue-600">
                  SS
                </AvatarFallback>
              </Avatar>
            </motion.div>
            
            <div className="text-center lg:text-left flex-1">
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight"
                variants={itemVariants}
              >
                {profileData.personalInfo.nombre}
              </motion.h1>
              <motion.h2 
                className="text-lg sm:text-xl lg:text-2xl mb-4 text-blue-200 font-semibold"
                variants={itemVariants}
              >
                {profileData.personalInfo.titulo}
              </motion.h2>
              <motion.p 
                className="text-base sm:text-lg mb-6 text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                variants={itemVariants}
              >
                {profileData.personalInfo.bio}
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                  <MapPin size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>{profileData.personalInfo.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                  <Code size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>{profileData.personalInfo.experiencia}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                  <Globe size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Disponible para remoto</span>
                </div>
              </motion.div>
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4"
                variants={itemVariants}
              >
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg print:hidden text-xs sm:text-sm px-3 sm:px-4 py-2"
                  onClick={() => window.open(`mailto:${profileData.personalInfo.email}`)}
                >
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">{profileData.personalInfo.email}</span>
                  <span className="sm:hidden">Email</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-300 text-white hover:bg-white hover:text-gray-900 print:hidden text-xs sm:text-sm px-3 sm:px-4 py-2"
                  onClick={downloadPDF}
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Descargar PDF</span>
                  <span className="sm:hidden">PDF</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-300 text-white hover:bg-white hover:text-gray-900 print:hidden text-xs sm:text-sm px-3 sm:px-4 py-2"
                  onClick={() => window.open(profileData.personalInfo.github)}
                >
                  <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-300 text-white hover:bg-white hover:text-gray-900 print:hidden text-xs sm:text-sm px-3 sm:px-4 py-2"
                  onClick={() => window.open(profileData.personalInfo.website)}
                >
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Portfolio</span>
                  <span className="sm:hidden">Web</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white to-transparent print:hidden"></div>
      </motion.section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Tecnologías Core */}
        <motion.section 
          id="technologies"
          className="mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.technologies ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800"
            variants={itemVariants}
          >
            <Zap className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-blue-600" />
            Stack Tecnológico
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-slate-600 h-full">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg text-slate-700 flex items-center">
                    <Server className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {profileData.tecnologiasCore.backend.map((tech, index) => (
                      <Badge key={index} className="bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 transition-colors text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600 h-full">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg text-blue-700 flex items-center">
                    <Layout className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {profileData.tecnologiasCore.frontend.map((tech, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 transition-colors text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-600 h-full">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg text-emerald-700 flex items-center">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    Herramientas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {profileData.tecnologiasCore.herramientas.map((tech, index) => (
                      <Badge key={index} className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200 transition-colors text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-600 h-full">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg text-indigo-700 flex items-center">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    Metodologías
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {profileData.tecnologiasCore.metodologias.map((tech, index) => (
                      <Badge key={index} className="bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200 transition-colors text-xs">
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
            {profileData.proyectosDestacados.map((proyecto, index) => (
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
                          <img 
                            src={proyecto.imagen} 
                            alt={`Captura de pantalla de ${proyecto.nombre}`}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/1200x630/e2e8f0/64748b?text=Imagen+no+disponible";
                            }}
                          />
                          {/* Overlay para hover effect */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
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

        {/* Formación Técnica */}
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
            {profileData.formacionTecnica.map((formacion, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg sm:text-xl text-gray-800 break-words">{formacion.titulo}</CardTitle>
                        <CardDescription className="text-base sm:text-lg text-blue-600 font-semibold">
                          {formacion.institucion}
                        </CardDescription>
                        <CardDescription className="text-xs sm:text-sm text-gray-500 mt-1">
                          {formacion.duracion} {formacion.modalidad && `• ${formacion.modalidad}`}
                        </CardDescription>
                      </div>
                      <div className="flex flex-row gap-2 flex-shrink-0">
                        {formacion.estado && (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                            {formacion.estado}
                          </Badge>
                        )}
                        {formacion.periodo && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 text-xs">
                            {formacion.periodo}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">{formacion.descripcion}</p>
                    
                    {/* Competencias */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Competencias desarrolladas:</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {formacion.competencias.map((competencia, compIndex) => (
                          <Badge key={compIndex} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
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
                            <div key={certIndex} className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-all duration-300">
                              {cert.tipo === "imagen" ? (
                                <div className="flex flex-col sm:flex-row">
                                  {/* Thumbnail de la certificación */}
                                  <div className="sm:w-24 sm:h-16 w-full h-32 bg-gray-100 flex-shrink-0 relative overflow-hidden cursor-pointer"
                                       onClick={() => setSelectedCertificate(cert)}>
                                    <img 
                                      src={cert.imagen}
                                      alt={`Certificado ${cert.nombre}`}
                                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                      loading="lazy"
                                      onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/200x150/e2e8f0/64748b?text=Certificado";
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                                      <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                  </div>
                                  {/* Información de la certificación */}
                                  <div className="flex-1 p-3 flex items-center justify-between">
                                    <div className="min-w-0 flex-1">
                                      <p className="text-sm font-medium text-gray-800 truncate">{cert.nombre}</p>
                                      <p className="text-xs text-gray-500">{cert.emisor}</p>
                                    </div>
                                    <div className="flex gap-2 ml-2 flex-shrink-0">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedCertificate(cert)}
                                        className="print:hidden text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
                                      >
                                        <Eye className="w-3 h-3 mr-1 flex-shrink-0" />
                                        Ver
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(cert.url)}
                                        className="print:hidden text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                      >
                                        <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
                                        Enlace
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                // Certificación solo con enlace
                                <div className="flex items-center justify-between p-3">
                                  <div className="flex items-center flex-1 min-w-0">
                                    <FileText className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-sm font-medium text-gray-800 truncate">{cert.nombre}</p>
                                      <p className="text-xs text-gray-500">{cert.emisor}</p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(cert.url)}
                                    className="print:hidden text-xs ml-2 border-blue-200 text-blue-700 hover:bg-blue-50 flex-shrink-0"
                                  >
                                    <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
                                    Ver
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

        {/* Objetivo Profesional */}
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
            <Award className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-emerald-600" />
            Objetivo Profesional
          </motion.h2>
          <motion.div 
            className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 sm:p-8 shadow-lg border-l-4 border-l-emerald-600"
            variants={itemVariants}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 break-words">{profileData.objetivoProfesional.titulo}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-base sm:text-lg">{profileData.objetivoProfesional.descripcion}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm sm:text-base">
                  <Globe className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />
                  Modalidades preferidas:
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {profileData.objetivoProfesional.modalidades.map((modalidad, index) => (
                    <Badge key={index} className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200 text-xs">
                      {modalidad}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm sm:text-base">
                  <Building className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                  Niveles de interés:
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {profileData.objetivoProfesional.niveles.map((nivel, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 text-xs">
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
      <footer className="bg-slate-900 text-white py-8 sm:py-12 print:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Conectemos y creemos algo increíble juntos</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              4 años de experiencia autodidacta me han preparado para contribuir desde el día uno. 
              Busco un equipo donde pueda aplicar mi pasión por el desarrollo Backend y seguir creciendo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
              <Button 
                variant="secondary" 
                size="sm"
                className="text-xs sm:text-sm px-3 sm:px-4 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => window.open(`mailto:${profileData.personalInfo.email}`)}
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="break-all sm:break-normal">{profileData.personalInfo.email}</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-400 text-white hover:bg-white hover:text-slate-900 text-xs sm:text-sm px-3 sm:px-4"
                onClick={() => window.open(`tel:${profileData.personalInfo.telefono}`)}
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                {profileData.personalInfo.telefono}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-400 text-white hover:bg-white hover:text-slate-900 text-xs sm:text-sm px-3 sm:px-4"
                onClick={() => window.open(profileData.personalInfo.linkedin)}
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                LinkedIn
              </Button>
            </div>
            <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-gray-400">
              <Coffee className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Desarrollado con pasión desde Mendoza, Argentina</span>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Modal para certificaciones */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden certificate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{selectedCertificate.nombre}</h3>
                <p className="text-sm text-gray-600">{selectedCertificate.emisor}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(selectedCertificate.url)}
                  className="text-xs"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Enlace original
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCertificate(null)}
                  className="text-xs"
                >
                  ✕ Cerrar
                </Button>
              </div>
            </div>
            
            {/* Imagen de la certificación */}
            <div className="flex items-center justify-center bg-gray-50 p-4">
              <img 
                src={selectedCertificate.imagen}
                alt={`Certificado ${selectedCertificate.nombre}`}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x600/e2e8f0/64748b?text=Error+al+cargar+certificado";
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;