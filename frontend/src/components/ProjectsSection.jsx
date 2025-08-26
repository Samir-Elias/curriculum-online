"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { profileData } from "../data/profileData"
import ImageSlider from "./ImageSlider"
import "../styles/components/projects-section.css"

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
)

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
)

const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
)

const ChevronUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41-1.41z" />
  </svg>
)

const ReactIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#61DAFB">
    <circle cx="12" cy="12" r="2" />
    <path d="M12,1C18.5,1 24,6.5 24,12C24,17.5 18.5,23 12,23C5.5,23 0,17.5 0,12C0,6.5 5.5,1 12,1M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3Z" />
  </svg>
)

const NodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#339933">
    <path d="M12,1.85C11.73,1.85 11.45,1.92 11.22,2.05L3.78,6.35C3.32,6.61 3,7.12 3,7.66V16.34C3,16.88 3.32,17.39 3.78,17.65L11.22,21.95C11.45,22.08 11.73,22.15 12,22.15C12.27,22.15 12.55,22.08 12.78,21.95L20.22,17.65C20.68,17.39 21,16.88 21,16.34V7.66C21,7.12 20.68,6.61 20.22,6.35L12.78,2.05C12.55,1.92 12.27,1.85 12,1.85Z" />
  </svg>
)

const JavaScriptIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#F7DF1E">
    <path d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z" />
  </svg>
)

const CSS3Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1572B6">
    <path d="M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z" />
  </svg>
)

const HTML5Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#E34F26">
    <path d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z" />
  </svg>
)

const TailwindIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#06B6D4">
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
  </svg>
)

const MongoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#47A248">
    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z" />
  </svg>
)

const FirebaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFCA28">
    <path d="M5.8 21l7.13-12.74c.14-.26.44-.29.63-.06L17.2 12 5.8 21z" />
    <path d="M3.27 17.96l2.53-15.81c.09-.58.69-.58.78 0L8.46 9.6 3.27 17.96z" />
    <path d="M8.46 9.6L12.8 2.8c.19-.33.63-.33.82 0l2.54 4.96L8.46 9.6z" />
  </svg>
)

const JavaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ED8B00">
    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.218M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218" />
  </svg>
)

const SpringIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#6DB33F">
    <path d="M21.8537 1.4158c-1.2422 2.265-3.1017 4.0513-5.2394 5.3811.4299.8275.7438 1.7299.9195 2.6598C18.2887 7.2489 19.0149 4.9994 21.8537 1.4158zM.6444 7.1312c1.7073.9765 3.8308 1.2984 5.7171.8803.1054-.0234.2084-.0515.3092-.0845-.6898-.9121-1.2608-1.9249-1.6891-3.0084C2.8972 5.9935 1.6444 6.4635.6444 7.1312z" />
  </svg>
)

const MySQLIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4479A1">
    <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
  </svg>
)

const AndroidIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#3DDC84">
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4486.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4486.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1518-.5972.416.416 0 00-.5972.1518l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1333 1.0989L4.8442 5.4467a.4161.4161 0 00-.5972-.1518.416.416 0 00-.1518.5972L6.0952 9.3214C2.8794 11.1037.9999 13.9648.9999 17.2854h22C23 13.9648 21.1205 11.1037 17.9047 9.3214z" />
  </svg>
)

const BootstrapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#7952B3">
    <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572z" />
    <path d="M21.356 0H2.644C1.184 0 0 1.184 0 2.644v18.712C0 22.816 1.184 24 2.644 24h18.712C22.816 24 24 22.816 24 21.356V2.644C24 1.184 22.816 0 21.356 0zM11.99 16.434H7.831V6.395h4.159c2.824 0 4.405 1.289 4.405 3.496 0 1.289-.773 2.332-2.174 2.824v.043c1.834.391 2.955 1.572 2.955 3.496 0 2.607-1.834 4.18-4.186 4.18z" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
  </svg>
)

const DatabaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14H20V19Z" />
  </svg>
)

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0)
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)

  // Mapear los datos a la estructura esperada
  const rawProjects = profileData?.proyectosDestacados || []
  const projects = rawProjects.map(project => ({
    title: project.nombre,
    description: project.descripcion,
    technologies: project.tecnologias || [],
    images: project.imagenes || [],
    image: project.imagenes?.[0], // Primera imagen como fallback
    duration: project.estado || "No especificado",
    type: project.destacado?.aspecto || "Proyecto Individual",
    role: "Full-Stack Developer",
    github: project.repositorio,
    demo: project.demoUrl,
    overview: project.descripcion,
    features: project.caracteristicas || [],
    challenges: [
      "Implementación de arquitectura escalable",
      "Optimización de rendimiento",
      "Integración de múltiples tecnologías"
    ],
    solutions: [
      "Diseño de componentes reutilizables",
      "Implementación de mejores prácticas",
      "Testing y debugging exhaustivo"
    ],
    results: [
      "Aplicación completamente funcional",
      "Interfaz responsive y moderna",
      "Código mantenible y escalable"
    ]
  }))

  if (!projects || projects.length === 0) {
    return (
      <section className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <h2 className="projects-title">Cargando proyectos...</h2>
            <p style={{color: 'white', marginTop: '1rem'}}>
              Se encontraron {rawProjects.length} proyectos en los datos
            </p>
          </div>
        </div>
      </section>
    )
  }

  const getTechIcon = (tech) => {
    const iconMap = {
      React: <ReactIcon />,
      "Node.js": <NodeIcon />,
      MongoDB: <MongoIcon />,
      Express: <DatabaseIcon />,
      JavaScript: <JavaScriptIcon />,
      "Tailwind CSS": <TailwindIcon />,
      "Framer Motion": <ReactIcon />,
      CSS3: <CSS3Icon />,
      HTML5: <HTML5Icon />,
      Firebase: <FirebaseIcon />,
      Java: <JavaIcon />,
      "Spring Boot": <SpringIcon />,
      MySQL: <MySQLIcon />,
      Android: <AndroidIcon />,
      Bootstrap: <BootstrapIcon />,
      "Responsive Design": <CSS3Icon />,
    }

    return iconMap[tech] || <DatabaseIcon />
  }

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
    setIsDetailsExpanded(false)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
    setIsDetailsExpanded(false)
  }

  const toggleDetails = () => {
    setIsDetailsExpanded(!isDetailsExpanded)
  }

  const safeCurrentProject = Math.min(currentProject, projects.length - 1)
  const project = projects[safeCurrentProject]

  if (!project) {
    return (
      <section className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <h2 className="projects-title">Error cargando proyecto</h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">Una selección de mis mejores trabajos como desarrollador Full-Stack</h2>
          <div className="project-counter">
            {safeCurrentProject + 1} / {projects.length}
          </div>
        </div>

        <div className="project-carousel">
          <button className="nav-button nav-button-left" onClick={prevProject} aria-label="Proyecto anterior">
            <ChevronLeft />
          </button>

          <motion.div
            className={`project-card ${isDetailsExpanded ? 'expanded' : ''}`}
            key={safeCurrentProject}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Contenedor principal con imagen y contenido lado a lado */}
            <div className="project-main-content">
              {/* Contenedor de imagen - FIJO en posición */}
              <div className="project-image-container">
                <ImageSlider
                  images={project.images || project.image || []}
                  alt={project.title || "Proyecto"}
                  className="project-image"
                />
              </div>

              {/* Contenedor de contenido */}
              <div className="project-content">
                <h3 className="project-title">{project.title || "Título no disponible"}</h3>
                <p className="project-description">{project.description || "Descripción no disponible"}</p>

                <div className="project-technologies">
                  <h4>Tecnologías</h4>
                  <div className="tech-grid">
                    {(project.technologies || []).map((tech, index) => (
                      <div key={index} className="tech-item">
                        <span className="tech-icon">{getTechIcon(tech)}</span>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="project-stats">
                  <div className="stat-item">
                    <span className="stat-icon">📅</span>
                    <span>{project.duration || "No especificado"}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">👤</span>
                    <span>{project.type || "No especificado"}</span>
                  </div>
                  <div className="project-role">{project.role || "Desarrollador"}</div>
                </div>

                <div className="project-details-toggle">
                  <button className="details-toggle-button" onClick={toggleDetails}>
                    <span>{isDetailsExpanded ? "Ocultar Detalles" : "Ver Características Completas"}</span>
                    {isDetailsExpanded ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>

                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link github-link"
                    >
                      <GitHubIcon />
                      <span>Código</span>
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link demo-link">
                      <ExternalLinkIcon />
                      <span>Demo en Vivo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Detalles expandidos - DISEÑO MEJORADO */}
            <AnimatePresence>
              {isDetailsExpanded && (
                <motion.div
                  className="project-expanded-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="details-content">
                    {/* Resumen principal - prominente */}
                    {project.overview && (
                      <div className="detail-section overview">
                        <h4>📋 Resumen del Proyecto</h4>
                        <p>{project.overview}</p>
                      </div>
                    )}

                    {/* Grid principal para características */}
                    {project.features && project.features.length > 0 && (
                      <div className="detail-section features">
                        <h4>⭐ Características Principales</h4>
                        <div className="features-grid">
                          {project.features.map((feature, index) => (
                            <div key={index} className="feature-item">
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Row para desafíos y soluciones */}
                    <div className="details-row">
                      {project.challenges && project.challenges.length > 0 && (
                        <div className="detail-section challenges">
                          <h4>🎯 Desafíos Técnicos</h4>
                          <ul>
                            {project.challenges.map((challenge, index) => (
                              <li key={index}>{challenge}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.solutions && project.solutions.length > 0 && (
                        <div className="detail-section solutions">
                          <h4>💡 Soluciones</h4>
                          <ul>
                            {project.solutions.map((solution, index) => (
                              <li key={index}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Resultados */}
                    {project.results && project.results.length > 0 && (
                      <div className="detail-section results">
                        <h4>📈 Resultados y Logros</h4>
                        <ul>
                          {project.results.map((result, index) => (
                            <li key={index}>{result}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <button className="nav-button nav-button-right" onClick={nextProject} aria-label="Siguiente proyecto">
            <ChevronRight />
          </button>
        </div>

        <div className="project-indicators">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === safeCurrentProject ? "active" : ""}`}
              onClick={() => {
                setCurrentProject(index)
                setIsDetailsExpanded(false)
              }}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection