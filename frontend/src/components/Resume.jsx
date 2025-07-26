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
  Building
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";

const mockData = {
  personalInfo: {
    nombre: "Samir Elias Salatino",
    edad: 25,
    dni: "42377867",
    ubicacion: "Mendoza, Argentina",
    email: "samireliassalatino@gmail.com",
    telefono: "+54 9 261 466-6991",
    estadoCivil: "Soltero (en pareja hace 7 años)",
    foto: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%23E2E8F0'/%3E%3Ctext x='60' y='70' text-anchor='middle' font-size='40' fill='%23475569'%3ESS%3C/text%3E%3C/svg%3E",
    titulo: "Desarrollador Web Junior | Técnico en IT"
  },
  experienciaLaboral: [
    {
      puesto: "Repartidor en Pedidos Ya",
      descripcion: "Delivery en motocicleta | 2020 – Actualidad (5 años) - Atención al cliente, logística urbana y resolución de incidencias. - Alta tolerancia al estrés y habilidades de organización y tiempo.",
      periodo: "2020 - Actualidad",
      empresa: "PedidosYa"
    },
    {
      puesto: "Encargado de Despensa 'Los Elías'",
      descripcion: "Repositor – Atención al cliente – Logística | 2019 – 2024 (5 años) - Organización de stock, trato directo con proveedores, gestión del depósito.",
      periodo: "2019 - 2024",
      empresa: "Los Elías"
    },
    {
      puesto: "Servicio Técnico de PC (Freelance)",
      descripcion: "Soporte técnico a domicilio | 2019 – Actualidad - Diagnóstico y reparación de hardware y software. - Instalación de sistemas, backup, redes domésticas.",
      periodo: "2019 - Actualidad",
      empresa: "Freelance"
    },
    {
      puesto: "Venta de Juegos Digitales para Consolas",
      descripcion: "eCommerce informal | 2020 – 2022 - Gestión de ventas digitales, atención en redes sociales, marketing.",
      periodo: "2020 - 2022",
      empresa: "Emprendimiento Propio"
    }
  ],
  proyectos: [
    {
      nombre: "TeloApp",
      descripcion: "Aplicación de moteles digitales, plataforma digital tipo marketplace, desarrollada para conectar moteles con clientes, basada en geolocalización mediante Google Maps. Carga automática de establecimientos con validación posterior de sus dueños. Inspirada en la UX de apps como PedidosYa.",
      tecnologias: ["HTML", "CSS", "Java", "Figma", "Google Maps API", "Prototipado con IA"]
    }
  ],
  formacionAcademica: [
    {
      titulo: "Argentina Programa 4.0 – 'Programación desde cero'",
      estado: "En curso",
      institucion: "Argentina Programa"
    },
    {
      titulo: "Diseño de Páginas Web – Modalidad Scrum (200 hs)",
      institucion: "Escuelas Newton",
      anio: "2022-2023"
    }
  ],
  habilidades: {
    tecnicas: [
      "Desarrollo Web (Frontend y Backend en formación)",
      "Prototipado UI/UX en Figma",
      "Lógica de programación en Java",
      "Google Maps API, automatizaciones básicas",
      "Armado y reparación de PC"
    ],
    blandas: [
      "Creatividad",
      "Resolución autónoma de problemas", 
      "Perseverancia ante el error",
      "Aprendizaje acelerado (IA como copiloto)",
      "Trabajo en equipo",
      "Excelente comunicación"
    ]
  },
  puestosIdeales: [
    "Desarrollador Web Junior / Fullstack Trainee",
    "Asistente Técnico en Proyectos IT",
    "Soporte Técnico Nivel 1 / 2",
    "Diseñador UX/UI Jr.",
    "Prototyper para startups o MVPs",
    "Tester Funcional con conocimientos técnicos"
  ]
};

const Resume = () => {
  const [isVisible, setIsVisible] = useState({});

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <motion.section 
        id="hero"
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white"
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
                <AvatarImage src={mockData.personalInfo.foto} alt="Samir Salatino" />
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
                {mockData.personalInfo.nombre}
              </motion.h1>
              <motion.h2 
                className="text-xl lg:text-2xl mb-6 text-blue-100"
                variants={itemVariants}
              >
                {mockData.personalInfo.titulo}
              </motion.h2>
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 text-blue-100">
                  <MapPin size={18} />
                  <span>{mockData.personalInfo.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <Calendar size={18} />
                  <span>{mockData.personalInfo.edad} años</span>
                </div>
              </motion.div>
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-4"
                variants={itemVariants}
              >
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {mockData.personalInfo.email}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {mockData.personalInfo.telefono}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </motion.section>

      <div className="container mx-auto px-6 py-12">
        {/* Experiencia Laboral */}
        <motion.section 
          id="experience"
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.experience ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl font-bold mb-8 text-center text-gray-800"
            variants={itemVariants}
          >
            <Building className="inline-block w-8 h-8 mr-3 text-blue-600" />
            Experiencia Laboral
          </motion.h2>
          <div className="grid gap-6">
            {mockData.experienciaLaboral.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-gray-800">{exp.puesto}</CardTitle>
                        <CardDescription className="text-lg text-blue-600 font-semibold">
                          {exp.empresa}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {exp.periodo}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{exp.descripcion}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Proyectos */}
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
            <Code className="inline-block w-8 h-8 mr-3 text-purple-600" />
            Proyectos Destacados
          </motion.h2>
          <div className="grid gap-6">
            {mockData.proyectos.map((proyecto, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-50 to-white">
                  <CardHeader>
                    <CardTitle className="text-2xl text-purple-800 flex items-center">
                      {proyecto.nombre}
                      <ExternalLink className="ml-2 w-5 h-5" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed">{proyecto.descripcion}</p>
                    <div className="flex flex-wrap gap-2">
                      {proyecto.tecnologias.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Habilidades */}
        <motion.section 
          id="skills"
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.skills ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl font-bold mb-8 text-center text-gray-800"
            variants={itemVariants}
          >
            <Award className="inline-block w-8 h-8 mr-3 text-green-600" />
            Habilidades
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-green-700 flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Habilidades Técnicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockData.habilidades.tecnicas.map((habilidad, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800 border-green-200">
                        {habilidad}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-700 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Habilidades Blandas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockData.habilidades.blandas.map((habilidad, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                        {habilidad}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Formación */}
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
            <Award className="inline-block w-8 h-8 mr-3 text-indigo-600" />
            Formación Académica
          </motion.h2>
          <div className="grid gap-6">
            {mockData.formacionAcademica.map((formacion, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-l-4 border-l-indigo-500 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">{formacion.titulo}</CardTitle>
                    <CardDescription className="text-lg text-indigo-600 font-semibold">
                      {formacion.institucion}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge 
                      variant={formacion.estado === "En curso" ? "default" : "secondary"}
                      className={formacion.estado === "En curso" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                    >
                      {formacion.estado || formacion.anio}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Puestos Ideales */}
        <motion.section 
          id="ideal-roles"
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible["ideal-roles"] ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl font-bold mb-8 text-center text-gray-800"
            variants={itemVariants}
          >
            <Smartphone className="inline-block w-8 h-8 mr-3 text-orange-600" />
            Puestos de Interés
          </motion.h2>
          <motion.div 
            className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-8 shadow-lg"
            variants={itemVariants}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockData.puestosIdeales.map((puesto, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Badge className="w-full justify-center p-3 text-center bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200">
                    {puesto}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">¿Interesado en trabajar conmigo?</h3>
            <p className="text-gray-300 mb-6">
              Estoy disponible para nuevas oportunidades y proyectos desafiantes
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary" size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Contactar
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Descargar CV
              </Button>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Resume;