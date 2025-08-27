"use client"
import { motion } from "framer-motion"
import { Mail, MapPin, Github, Download, Code, Globe, Zap, FolderOpen, GraduationCap, Target, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Lottie from "lottie-react"
import mateAnimation from "../assets/Progra-Mate.json"
import "../styles/components/hero-section.css"

const HeroSection = ({ personalInfo = {}, itemVariants = {} }) => {
  const defaultPersonalInfo = {
    nombre: "Samir Elias Salatino",
    titulo: "Desarrollador Backend Java | Full Stack Developer",
    bio: "Developer apasionado especializado en Backend con Java, Spring Framework y metodologías ágiles. Experiencia en metodologías ágiles y proyectos Full-Stack. Más interesado y certificado disponible en mi portafolio.",
    ubicacion: "Mendoza, Argentina",
    experiencia: "6+ años Developer Autodidacta",
    email: "samir.elias.dev@gmail.com",
    github: "https://github.com/Samir-Elias",
    website: "https://portfolio.samir-elias.dev",
    avatar: "/images/perfil.jpg", // Cambiado a la imagen correcta
  }

  // Merge provided personalInfo with defaults
  const info = { ...defaultPersonalInfo, ...personalInfo }

  const downloadPDF = () => {
    window.print()
  }

  const defaultItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const variants = { ...defaultItemVariants, ...itemVariants }

  return (
    <section className="hero-section" id="hero">
      {/* Header PrograMate */}
      <motion.div 
        className="hero-brand-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="brand-content">
          <div className="mate-animation">
            <Lottie 
              animationData={mateAnimation} 
              loop={true}
              style={{ width: 100, height: 100 }}
            />
          </div>
          <h1 className="brand-title">
            Progra<span className="brand-accent">M</span>ate
          </h1>
        </div>
      </motion.div>

      <div className="hero-container">
        <div className="hero-cards-layout">
          {/* Card izquierda - Información personal */}
          <motion.div
            className="hero-card hero-card-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero-content">
              {/* Avatar section */}
              <motion.div className="hero-avatar-section" variants={variants}>
                <div className="avatar-container">
                  <Avatar className="hero-avatar">
                    <AvatarImage src={info.avatar || "/images/perfil.jpg"} alt={info.nombre} />
                    <AvatarFallback className="avatar-fallback">
                      {info.nombre
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2) || "SE"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="avatar-status">
                    <div className="status-indicator"></div>
                    <span>Disponible</span>
                  </div>
                </div>
              </motion.div>

              {/* Main info */}
              <motion.div className="hero-main-info" variants={variants}>
                <h1 className="hero-name">{info.nombre}</h1>
                <h2 className="hero-title">{info.titulo}</h2>
                <p className="hero-bio">{info.bio}</p>
              </motion.div>

              {/* Stats section */}
              <motion.div className="hero-stats" variants={variants}>
                <div className="stat-item">
                  <MapPin className="stat-icon" />
                  <span>{info.ubicacion}</span>
                </div>
                <div className="stat-item">
                  <Code className="stat-icon" />
                  <span>{info.experiencia}</span>
                </div>
                <div className="stat-item">
                  <Globe className="stat-icon" />
                  <span>Disponible para remoto</span>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div className="hero-actions" variants={variants}>
                <Button className="action-button primary-button" onClick={() => window.open(`mailto:${info.email}`)}>
                  <Mail className="button-icon" />
                  <span>{info.email}</span>
                  <span className="button-label">Email</span>
                </Button>

                <Button className="action-button secondary-button" onClick={downloadPDF}>
                  <Download className="button-icon" />
                  <span>Descargar PDF</span>
                  <span className="button-label">PDF</span>
                </Button>

                {info.github && (
                  <Button className="action-button tertiary-button" onClick={() => window.open(info.github)}>
                    <Github className="button-icon" />
                    <span>GitHub</span>
                  </Button>
                )}

                {info.website && (
                  <Button className="action-button tertiary-button" onClick={() => window.open(info.website)}>
                    <Globe className="button-icon" />
                    <span>Portfolio</span>
                    <span className="button-label">Web</span>
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Card centro - Índice de navegación */}
          <motion.div
            className="hero-card hero-card-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="hero-navigation-content">
              <motion.div className="navigation-header" variants={variants}>
                <h2 className="navigation-title">
                  <Zap className="navigation-icon" />
                  Navegación
                </h2>
                <p className="navigation-subtitle">Explora mi portfolio</p>
              </motion.div>

              <motion.div className="navigation-sections" variants={variants}>
                <div className="nav-section-item" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className="nav-section-icon">
                    <FolderOpen className="section-icon" />
                  </div>
                  <div className="nav-section-content">
                    <h3 className="nav-section-title">Proyectos Destacados</h3>
                    <p className="nav-section-description">Una selección de mis mejores trabajos como desarrollador Full-Stack</p>
                  </div>
                  <ChevronRight className="nav-section-arrow" />
                </div>

                <div className="nav-section-item" onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className="nav-section-icon">
                    <GraduationCap className="section-icon" />
                  </div>
                  <div className="nav-section-content">
                    <h3 className="nav-section-title">Educación & Certificaciones</h3>
                    <p className="nav-section-description">Mi formación académica y certificaciones profesionales</p>
                  </div>
                  <ChevronRight className="nav-section-arrow" />
                </div>

                <div className="nav-section-item" onClick={() => document.getElementById('objective')?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className="nav-section-icon">
                    <Target className="section-icon" />
                  </div>
                  <div className="nav-section-content">
                    <h3 className="nav-section-title">Objetivos & Metas</h3>
                    <p className="nav-section-description">Mis aspiraciones profesionales y visión de futuro</p>
                  </div>
                  <ChevronRight className="nav-section-arrow" />
                </div>
              </motion.div>

              {/* Tech Stack Preview */}
              <motion.div className="tech-preview" variants={variants}>
                <h3 className="tech-preview-title">Stack Tecnológico</h3>
                <div className="tech-preview-grid">
                  <div className="tech-preview-category">
                    <span className="tech-preview-label">Backend</span>
                    <div className="tech-preview-icons">
                      <span className="tech-preview-icon">☕</span>
                      <span className="tech-preview-icon">🌱</span>
                      <span className="tech-preview-icon">⚡</span>
                    </div>
                  </div>
                  <div className="tech-preview-category">
                    <span className="tech-preview-label">Frontend</span>
                    <div className="tech-preview-icons">
                      <span className="tech-preview-icon">⚛️</span>
                      <span className="tech-preview-icon">🎨</span>
                      <span className="tech-preview-icon">📱</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Card derecha - Preview de proyectos */}
          <motion.div
            className="hero-card hero-card-right"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="hero-projects-preview">
              <motion.div className="projects-preview-header" variants={variants}>
                <h2 className="projects-preview-title">
                  <FolderOpen className="projects-preview-icon" />
                  Proyectos Destacados
                </h2>
                <p className="projects-preview-subtitle">Una muestra de mi trabajo</p>
              </motion.div>

              <motion.div className="projects-preview-grid" variants={variants}>
                <div className="project-preview-item" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className="project-preview-image">
                    <img src="/images/estimador_hero.png" alt="Estimador de Costos" />
                    <div className="project-preview-overlay">
                      <ExternalLink className="project-preview-link-icon" />
                    </div>
                  </div>
                  <h3 className="project-preview-title">Estimador de Costos</h3>
                  <p className="project-preview-description">Sistema completo de estimación y gestión de proyectos</p>
                </div>

                <div className="project-preview-item" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className="project-preview-image">
                    <img src="/images/Teloapp_pcview.png" alt="TeloApp" />
                    <div className="project-preview-overlay">
                      <ExternalLink className="project-preview-link-icon" />
                    </div>
                  </div>
                  <h3 className="project-preview-title">TeloApp</h3>
                  <p className="project-preview-description">Aplicación móvil para gestión de telos y hoteles</p>
                </div>

                <div className="project-preview-item" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className="project-preview-image">
                    <img src="/images/serviceBook_inicio.png" alt="ServiceBook" />
                    <div className="project-preview-overlay">
                      <ExternalLink className="project-preview-link-icon" />
                    </div>
                  </div>
                  <h3 className="project-preview-title">ServiceBook</h3>
                  <p className="project-preview-description">Plataforma de gestión de servicios y reservas</p>
                </div>
              </motion.div>
            </div>
                    </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
