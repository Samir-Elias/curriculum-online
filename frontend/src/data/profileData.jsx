export const profileData = {
  personalInfo: {
    nombre: "Samir Elias Salatino",
    edad: 25,
    ubicacion: "Mendoza, Argentina",
    email: "samireliassalatino@gmail.com",
    telefono: "+54 9 261 466-6991",
    foto: "/perfil.jpg",
    titulo: "Desarrollador Backend Java | Full-Stack Developer",
    experiencia: "6 años como Developer Autodidacta",
    bio: "Developer apasionado especializado en Backend con Java, Spring Framework y arquitecturas robustas. Experiencia en metodologías ágiles y proyectos Full-Stack. Más información y certificados disponibles en mi portfolio.",
    linkedin: "https://www.linkedin.com/in/samir-elías",
    github: "https://github.com/Samir-Elias",
    website: "https://sites.google.com/view/samir-elias-salatino/inicio"
  },
  
  tecnologiasCore: {
    backend: ["Java", "JavaScript", "Spring Boot", "JPA", "Maven", "SQL", "PostgreSQL", "MySQL"],
    frontend: ["React", "Thymeleaf", "HTML5", "CSS3", "JavaScript", "SCSS"],
    herramientas: ["Git", "GitHub", "IntelliJ IDEA", "Eclipse", "Postman", "Docker", "Figma", "Claude", "Gemini", "N8N"],
    metodologias: ["Scrum", "Agile", "Sprints", "Trabajo en equipo", "UX/UI Design", "User Research"]
  },
  
  proyectosDestacados: [
    {
      nombre: "CV Digital Interactivo - React Portfolio",
      descripcion: "CV digital moderno desarrollado con React y Tailwind CSS. Diseño responsive con animaciones fluidas, paleta profesional y optimizado para conversión. Incluye secciones interactivas, descarga PDF y enlaces directos.",
      tecnologias: ["React", "Tailwind CSS", "Framer Motion", "JavaScript", "CSS3", "Responsive Design"],
      imagenes: [
        "/images/Cv_1erFoto.png",
        "/images/Cv_2daFoto.png",
        "/images/Cv_3erFoto.png"
      ],
      demoUrl: "https://curriculum-online2.netlify.app",
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
      imagenes: [
        "https://via.placeholder.com/1200x630/1e293b/64748b?text=ServiceBook+Dashboard",
        "https://via.placeholder.com/1200x630/1e293b/94a3b8?text=ServiceBook+Chat",
        "https://via.placeholder.com/1200x630/1e293b/cbd5e1?text=ServiceBook+Calendar",
        "https://via.placeholder.com/1200x630/1e293b/e2e8f0?text=ServiceBook+Admin"
      ],
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
      imagenes: [
        "https://via.placeholder.com/1200x630/0f172a/3b82f6?text=TeloApp+Home",
        "https://via.placeholder.com/1200x630/0f172a/60a5fa?text=TeloApp+Maps",
        "https://via.placeholder.com/1200x630/0f172a/93c5fd?text=TeloApp+Search"
      ],
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
      imagenes: "https://via.placeholder.com/1200x630/065f46/10b981?text=Rick+%26+Morty+Explorer",
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
      imagenes: "https://via.placeholder.com/1200x630/166534/22c55e?text=Caminito+Verde+ONG",
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
      titulo: "Full-Stack Java - Argentina Programa 4.0 - Programación desde cero ",
      institucion: "Egg Education - Cursado Full-Stack Java Intensivo",
      duracion: "1.5 años (3 horas diarias, L-V)",
      descripcion: "Formación intensiva en desarrollo Full-Stack con Java. Metodología práctica con Sprints, trabajo en equipos rotativos de 10 personas simulando entorno startup real. Programa gubernamental de formación en programación con metodología Scrum aplicada. Fundamentos sólidos de programación y mejores prácticas.",
      competencias: ["Java avanzado", "Spring Framework", "JPA", "Maven", "SQL", "Metodologías Ágiles", "Trabajo en equipo", "Git colaborativo"],
      certificaciones: [
        {
          nombre: "Certificado Java Full-Stack",
          url: "https://sites.google.com/view/samir-elias-salatino/inicio",
          imagenes: [
            "/images/certificates/Egg_FullStack.png", 
            "/images/certificates/Tramo1.jpeg",
            "/images/certificates/Backend_Tramo2.png",
            "/images/certificates/Cuarto_Tramo.png",
            "/images/certificates/4Tramos.png",
            "/images/certificates/Proyecto_Scrum.png"
          ],
          emisor: "Argentina Programa 4.0 - Programación desde cero",
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
          url: "https://coursera.org/verify/professional-cert/tu-certificado-aqui",
          imagenes: [
            "/images/certificates/certificado-ux.png",
            "/images/certificates/certificado-ux2.png",
            "/images/certificates/certificado-ux3.png"
          ],
          emisor: "Google Career Certificates",
          tipo: "imagen"
        }
      ],
      estado: "Parcialmente Completado (3/7)",
      periodo: "2023-2024"
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
          imagenes: "https://via.placeholder.com/800x600/7c3aed/a855f7?text=Certificado+Diseño+Web",
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
    descripcion: "Busco incorporarme como desarrollador en un equipo dinámico donde pueda aplicar mis 6 años de experiencia en Java y Spring Framework. Especializado en Backend con sólidos conocimientos Frontend. Disponible para trabajo remoto o presencial en Mendoza.",
    modalidades: ["Remoto", "Híbrido", "Presencial en Mendoza"],
    niveles: ["Junior Developer", "Trainee", "Developer Jr/SSr"]
  }
};