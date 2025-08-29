export const profileData = {
  personalInfo: {
    nombre: "Samir Elias Salatino",
    edad: 25,
    ubicacion: "Mendoza, Argentina",
    email: "samireliassalatino@gmail.com",
    telefono: "+54 9 261 466-6991",
    foto: "/perfil.jpg",
    titulo: " Dev Java | Full-Stack React",
    experiencia: "6 años como Developer Autodidacta",
    bio: "Developer apasionado especializado en Backend con Java, Spring Framework y arquitecturas robustas. Experiencia en metodologías ágiles y proyectos Full-Stack.",
    linkedin: "https://www.linkedin.com/in/samir-elías",
    github: "https://github.com/Samir-Elias",
    website: "https://sites.google.com/view/samir-elias-salatino/inicio"
  },
  
  tecnologiasCore: {
    backend: ["Java", "JavaScript", "Spring Boot", "JPA", "Maven", "SQL", "PostgreSQL", "MySQL"],
    frontend: ["React", "Thymeleaf", "HTML5", "CSS3", "JavaScript", "SCSS"],
    herramientas: ["GitHub", "IntelliJ IDEA", "Docker", "Figma", "Claude", "Cursor", "N8N"],
    metodologias: ["Scrum", "Agile", "Sprints", "Teamwork", "UX/UI Design", "User Research"]
  },
  
  proyectosDestacados: [
    {
      nombre: "Cv Digital Interactivo - React Portfolio",
      descripcion: "Portfolio profesional desarrollado con React y tecnologías modernas. Diseño responsive con animaciones fluidas usando Framer Motion, estilizado con Tailwind CSS y optimizado para SEO. Incluye secciones interactivas, navegación suave y experiencia de usuario premium.",
      tecnologias: ["React", "Tailwind CSS", "Framer Motion", "JavaScript", "CSS3", "HTML5", "Netlify", "Git", "Responsive Design", "SEO"],
      imagenes: [
        "/images/Cv_1erFoto.png",
        "/images/Cv_2daFoto.png"
      ],
      demoUrl: "https://curriculum-online2.netlify.app",
      caracteristicas: [
        "Arquitectura React moderna con hooks y componentes funcionales",
        "Animaciones fluidas y transiciones con Framer Motion",
        "Diseño responsive optimizado para todos los dispositivos",
        "Estilizado avanzado con Tailwind CSS y CSS personalizado",
        "Navegación suave entre secciones con scroll automático",
        "Optimización SEO completa con meta tags y estructura semántica",
        "Deploy automático en Netlify con CI/CD",
        "Código limpio y mantenible con mejores prácticas",
        "Experiencia de usuario premium con micro-interacciones",
        "Accesibilidad web implementada (ARIA labels, navegación por teclado)",
        "Performance optimizada con lazy loading y code splitting",
        "Integración con APIs externas y enlaces directos"
      ],
      repositorio: "https://github.com/Samir-Elias/samir-elias-cv",
      estado: "Completado y En Producción",
      destacado: {
        aspecto: "Portfolio Profesional Moderno",
        detalle: "Desarrollo completo de portfolio personal con tecnologías frontend modernas, optimizado para conversión y experiencia de usuario"
      },
      desafios: [
        "Crear una experiencia de usuario fluida y profesional que destaque las habilidades técnicas",
        "Implementar animaciones complejas sin afectar el rendimiento de la aplicación",
        "Optimizar el SEO para mejorar la visibilidad en motores de búsqueda",
        "Diseñar una interfaz responsive que funcione perfectamente en todos los dispositivos",
        "Integrar múltiples tecnologías modernas de manera cohesiva y eficiente"
      ],
      soluciones: [
        "Arquitectura React modular con componentes reutilizables y hooks personalizados",
        "Implementación de Framer Motion con optimizaciones de rendimiento y lazy loading",
        "Estructura HTML semántica con meta tags optimizados y Open Graph",
        "Sistema de diseño responsive con Tailwind CSS y breakpoints personalizados",
        "Integración fluida de tecnologías con configuración optimizada de build tools"
      ],
      resultados: [
        "Portfolio profesional con experiencia de usuario premium y navegación intuitiva",
        "Performance optimizada con Core Web Vitals excelentes y carga ultrarrápida",
        "SEO implementado correctamente con mejor posicionamiento en búsquedas",
        "Diseño responsive que se adapta perfectamente a cualquier dispositivo",
        "Código mantenible y escalable siguiendo mejores prácticas de desarrollo"
      ]
    },
    {
      nombre: "ServiceBook - Sistema de Gestión Integral",
      descripcion: "Proyecto Full-Stack más grande desarrollado colaborativamente. Sistema completo de gestión para servicios con chat en tiempo real, sistema de agenda, administración de usuarios y proveedores. Arquitectura robusta con Spring Boot y base de datos relacional.",
      tecnologias: ["Java", "Spring Boot", "JPA", "Thymeleaf", "MySQL", "HTML/CSS", "JavaScript"],
      imagenes: [
        "/images/serviceBook_inicio.png",
        "/images/serviceBook_datos.png",
        "/images/serviceBook_altaprov.png",
        "/images/serviceBook_register.png",
        "/images/serviceBook_excepciones.png"        
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
      nombre: "Estimador de Proyectos - Full-Stack Application",
      descripcion: "Aplicación web completa para estimación de proyectos con panel administrativo. Sistema profesional de cálculo de costos, tiempos y recursos para desarrollo web. Incluye autenticación, base de datos persistente, notificaciones interactivas y dashboard completo para administradores.",
      tecnologias: ["React", "FastAPI", "MongoDB", "Framer Motion", "Tailwind CSS", "Axios", "Python", "JWT Authentication"],
      imagenes: [
        "/images/estimador_calculator.png", 
        "/images/estimador_hero.png",
        "/images/estimador_admin_panel.png",
        "/images/estimador_dashboard.png",
        "/images/estimador_notifications.png"
      ],
      demoUrl: "https://estimador-de-proyectos.vercel.app",
      caracteristicas: [
        "Calculadora inteligente de costos y tiempos por tipo de proyecto",
        "Panel administrativo completo con autenticación JWT",
        "Base de datos MongoDB para persistencia de estimaciones",
        "Notificaciones interactivas con modales animados",
        "Dashboard con estadísticas y métricas en tiempo real",
        "Sistema de configuración de equipo y tarifas personalizables",
        "API RESTful completa con documentación automática",
        "Interfaz responsive con animaciones fluidas (Framer Motion)",
        "Sistema de filtrado y búsqueda de estimaciones guardadas",
        "Desglose detallado por áreas (Frontend, Backend, Design, QA)",
        "Cálculo automático basado en complejidad y funcionalidades",
        "Soporte para diferentes tipos de proyecto (E-commerce, WebApp, etc.)"
      ],
      repositorio: "https://github.com/Samir-Elias/project-estimator",
      estado: "Completado y Funcional",
      destacado: {
        aspecto: "Arquitectura Full-Stack Completa",
        detalle: "Implementación completa desde cero con FastAPI + React, incluyendo autenticación, base de datos, panel admin y cálculos avanzados"
      }
    },
    {
      nombre: "TeloApp - Marketplace de Moteles",
      descripcion: "Aplicación web moderna tipo marketplace para reserva de moteles. Desarrollada con React y Node.js, incluye geolocalización, sistema de búsqueda avanzada y panel de administración para propietarios.",
      tecnologias: ["React", "Node.js", "JavaScript", "HTML/CSS", "APIs de Google Maps"],
      imagenes: [
        "/images/Teloapp_pcview2.png",
        "/images/Teloapp_pcview.png"        
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
      imagenes: [
        "/images/rickymorty_pc.png"
      ],
      demoUrl: "https://rick-morty-1.netlify.app",
      caracteristicas: [
        "Consumo de API REST externa",
        "Interfaz dinámica y responsive",
        "Búsqueda y filtrado de personajes",
        "Manejo de estados de carga y errores"
      ],
      repositorio: "https://github.com/Samir-Elias/Rick-Morty-app",
      estado: "Completado"
    }
  ],
  
  formacionTecnica: [
    {
      titulo: "Full-Stack Java - Argentina Programa 4.0",
      institucion: "Egg Education - Formación Gubernamental Intensiva",
      duracion: "1.5 años intensivos (3hrs diarias L-V)",
      modalidad: "Virtual Presencial",
      descripcion: "Programa gubernamental intensivo de desarrollo Full-Stack con metodología Scrum aplicada. Trabajo colaborativo en equipos rotativos de 10 personas simulando entornos startup reales. Enfoque práctico con Sprints y desarrollo de proyectos completos desde cero.",
      competencias: [
        "Java avanzado y POO",
        "Spring Framework y Spring Boot", 
        "JPA/Hibernate y Maven",
        "Base de datos SQL",
        "Metodologías Ágiles (Scrum)",
        "Teamwork colaborativo",
        "Git y control de versiones",
        "Testing y debugging"
      ],
      certificaciones: [
        {
          nombre: "Certificación Full-Stack Java Argentina Programa 4.0",
          url: "https://sites.google.com/view/samir-elias-salatino/inicio",
          imagenes: [
            "/images/certificates/Egg_FullStack.png", 
            "/images/certificates/Tramo_1.png",
            "/images/certificates/Backend_Tramo2.png",
            "/images/certificates/Cuarto_Tramo.png",
            "/images/certificates/4Tramos.png",
            "/images/certificates/Proyecto_Scrum.png"
          ],
          emisor: "Argentina Programa 4.0 - Egg Education",
          tipo: "imagen"
        }
      ],
      estado: "Completado",
      periodo: "2022-2023"
    },
    {
      titulo: "Google UX Design Certificate - Programa Profesional",
      institucion: "Google Career Certificates - Coursera",
      duracion: "3 de 7 módulos completados (150+ horas)",
      modalidad: "Online en Inglés",
      descripcion: "Certificación profesional de Google en Diseño UX/UI. Formación práctica en metodologías de investigación de usuarios, prototipado y herramientas de diseño profesionales. Enfoque hands-on con proyectos reales y portfolio building.",
      competencias: [
        "UX/UI Design fundamentals",
        "User Research y Testing",
        "Figma y herramientas de prototipado",
        "Design Thinking methodology",
        "User-Centered Design",
        "Wireframing y mockups",
        "Usability Testing",
        "Design Systems"
      ],
      certificaciones: [
        {
          nombre: "Google UX Design - Aspectos Básicos del Diseño UX",
          url: "https://sites.google.com/view/samir-elias-salatino/inicio",
          imagenes: [
            "/images/certificates/certificado-ux.png",
            "/images/certificates/certificado-ux2.png",
            "/images/certificates/certificado-ux3.png"
          ],
          emisor: "Google Career Certificates",
          tipo: "imagen"
        }
      ],
      estado: "En progreso (3/7 módulos)",
      periodo: "2023-2024"
    },
    {
      titulo: "JavaScript Algorithm and Data Structures",
      institucion: "FreeCodeCamp - Certificación Internacional",
      duracion: "300 horas de trabajo práctico",
      modalidad: "Online Autoguiado",
      descripcion: "Certificación intensiva en algoritmos y estructuras de datos con JavaScript. Enfoque práctico resolviendo problemas reales de programación, optimización de código y mejores prácticas de desarrollo.",
      competencias: [
        "JavaScript avanzado (ES6+)",
        "Algoritmos de búsqueda y ordenamiento",
        "Estructuras de datos complejas",
        "Análisis de complejidad algorítmica",
        "Problem-solving avanzado",
        "Programación funcional",
        "Optimización de rendimiento",
        "Clean Code principles"
      ],
      certificaciones: [
        {
          nombre: "JavaScript Algorithm and Data Structures Certification",
          url: "https://sites.google.com/view/samir-elias-salatino/inicio",
          imagenes: [
            "/images/certificates/FreeCodeCamp.png"
          ],
          emisor: "FreeCodeCamp",
          tipo: "imagen"
        }
      ],
      estado: "Completado",
      periodo: "2023"
    },
    {
      titulo: "Diseño de Páginas Web - Desarrollo Frontend",
      institucion: "Escuelas Newton - Formación Presencial",
      duracion: "200 horas presenciales",
      modalidad: "Presencial",
      descripcion: "Formación presencial intensiva en desarrollo web frontend y diseño UI/UX. Enfoque práctico en maquetación moderna, diseño responsive y experiencia de usuario. Proyectos reales con metodología hands-on.",
      competencias: [
        "HTML5 semántico y accesibilidad",
        "CSS3 y técnicas avanzadas",
        "JavaScript vanilla y DOM",
        "Diseño responsive (Mobile-first)",
        "UI/UX Design principles",
        "Prototipado y wireframing",
        "Cross-browser compatibility",
        "Web Performance optimization"
      ],
      certificaciones: [],
      estado: "Completado",
      periodo: "2022-2023"
    }
  ],
  
  experienciaComplementaria: [
    {
      rol: "Desarrollo de habilidades transferibles",
      descripcion: "Experiencia laboral previa que ha desarrollado competencias clave para el mundo tech: gestión bajo presión, atención al detalle, resolución autónoma de problemas, comunicación efectiva con clientes, y capacidad de adaptación a entornos dinámicos."
    }
  ],
  
  objetivoProfesional: {
    titulo: "Desarrollador Backend Java | Full-Stack Developer",
    descripcion: "Developer especializado en Backend con Java y Spring Framework, con experiencia en proyectos Full-Stack y metodologías ágiles. Busco contribuir desde el primer día en un equipo dinámico donde pueda aplicar mis 6 años de experiencia autodidacta y seguir creciendo profesionalmente en un entorno colaborativo e innovador.",
    modalidades: ["Trabajo Remoto", "Modalidad Híbrida", "Presencial en Mendoza"],
    niveles: ["Junior Developer", "Developer Trainee", "Full-Stack Junior", "Backend Developer Jr"]
  }
};