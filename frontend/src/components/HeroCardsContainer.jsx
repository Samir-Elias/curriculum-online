"use client"
import { motion } from "framer-motion"
import { Mail, MapPin, FileText, Code, Globe, Zap, FolderOpen, GraduationCap, Target, ChevronRight, ExternalLink } from "lucide-react"
import { GitHubIcon, WhatsAppIcon, InstagramIcon } from "../icons/TechIcons"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import MateIcon from "./MateIcon"
import { useModal } from "../context/ModalContext"
import "../styles/hero/index.css"

const HeroCardsContainer = ({ personalInfo = {}, itemVariants = {} }) => {
  const { openModal } = useModal();
  
  const defaultPersonalInfo = {
    nombre: "Samir Elias Salatino",
    titulo: "Full-Stack + AI Specialist | Prompt Engineering Expert",
    bio: "Developer apasionado especializado en Backend con Java, Spring Framework y metodologías ágiles. Experiencia en metodologías ágiles y proyectos Full-Stack. Más interesado y certificado disponible en mi portafolio.",
    ubicacion: "Mendoza, Argentina",
    experiencia: "6+ años Developer Autodidacta",
    email: "samir.elias.dev@gmail.com",
    github: "https://github.com/Samir-Elias",
    website: "https://portfolio.samir-elias.dev",
    avatar: "/images/perfil.jpg",
  }

  // Merge provided personalInfo with defaults
  const info = { ...defaultPersonalInfo, ...personalInfo }

  const defaultItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const variants = { ...defaultItemVariants, ...itemVariants }

  return (
    <div className="hero-cards-container">
      <div className="hero-container">
        <div className="hero-cards-layout">
          {/* Card izquierda - Información personal */}
          <motion.div
            className="hero-card hero-card-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero-content">
              {/* Título flotante para móvil - arriba de la imagen */}
              <motion.h1 
                className="floating-brand-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="title-decoration">⚡</span>
                <span className="title-text">
                  Progra<span className="brand-accent">M</span>ate
                </span>
                <span className="title-decoration">⚡</span>
              </motion.h1>

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
                <h2 className="hero-title">
                  <div className="title-main">Full-Stack + AI Specialist</div>
                  <div className="title-separator"></div>
                  <div className="title-sub">Prompt Engineering Expert</div>
                </h2>
                <p className="hero-bio">{info.bio}</p>
              </motion.div>

              {/* Action buttons */}
              <motion.div className="hero-actions" variants={variants}>
                <Button className="action-button email-button" onClick={() => window.open(`mailto:${info.email}`)}>
                  <Mail className="button-icon" />
                </Button>

                <Button className="action-button download-button">
                  <FileText className="button-icon" />
                </Button>

                <Button className="action-button instagram-button" onClick={() => window.open('https://instagram.com/samir_elias_dev')}>
                  <InstagramIcon />
                </Button>

                <Button className="action-button whatsapp-button" onClick={() => window.open('https://wa.me/5492612345678')}>
                  <WhatsAppIcon />
                </Button>

                {info.github && (
                  <Button className="action-button github-button" onClick={() => window.open(info.github)}>
                    <GitHubIcon />
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
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero-navigation-content">
              {/* Header PrograMate integrado */}
              <motion.div 
                className="brand-card-content"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="brand-title">
                  Progra<span className="brand-accent">M</span>ate
                </h1>
                <div className="mate-animation">
                  <MateIcon width={120} height={120} />
                </div>
              </motion.div>

              <motion.div className="navigation-header" variants={variants}>
                <h2 className="navigation-title">
                  <Zap className="navigation-icon" />
                  Navegación
                </h2>
                <p className="navigation-subtitle">Explora mi portfolio</p>
              </motion.div>

              <motion.div className="navigation-sections" variants={variants}>
                <div className="nav-section-item" onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}>
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

              {/* Textos flotantes integrados en la card de navegación */}
              <motion.div className="navigation-floating-texts" variants={variants}>
                <div className="nav-floating-text-item">
                  <span className="nav-floating-text" onClick={() => window.open(`https://maps.google.com/?q=${info.ubicacion}`, '_blank')}>
                    <MapPin className="nav-floating-text-icon" />
                    {info.ubicacion}
                  </span>
                </div>

                <div className="nav-floating-text-item">
                  <span className="nav-floating-text" onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}>
                    <Code className="nav-floating-text-icon" />
                    {info.experiencia}
                  </span>
                </div>

                <div className="nav-floating-text-item">
                  <span className="nav-floating-text" onClick={() => window.open('https://linkedin.com/in/samir-elias-salatino', '_blank')}>
                    <Globe className="nav-floating-text-icon" />
                    Disponible para remoto
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Card derecha - Preview de proyectos */}
          <motion.div
            className="hero-card hero-card-right"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
                <div className="project-preview-item" onClick={openModal}>
                  <div className="project-preview-text">
                    <h3 className="project-preview-title">Estimador de Costos</h3>
                    <p className="project-preview-description">Sistema completo de estimación y gestión de proyectos</p>
                  </div>
                  <div className="project-preview-image">
                    <img src="/images/estimador_hero.png" alt="Estimador de Costos" />
                    <div className="project-preview-overlay">
                      <ExternalLink className="project-preview-link-icon" />
                    </div>
                  </div>
                </div>

                <div className="project-preview-item" onClick={openModal}>
                  <div className="project-preview-text">
                    <h3 className="project-preview-title">TeloApp</h3>
                    <p className="project-preview-description">Aplicación móvil para gestión de telos y hoteles</p>
                  </div>
                  <div className="project-preview-image">
                    <img src="/images/Teloapp_pcview.png" alt="TeloApp" />
                    <div className="project-preview-overlay">
                      <ExternalLink className="project-preview-link-icon" />
                    </div>
                  </div>
                </div>

                <div className="project-preview-item" onClick={openModal}>
                  <div className="project-preview-text">
                    <h3 className="project-preview-title">ServiceBook</h3>
                    <p className="project-preview-description">Plataforma de gestión de servicios y reservas</p>
                  </div>
                  <div className="project-preview-image">
                    <img src="/images/serviceBook_inicio.png" alt="ServiceBook" />
                    <div className="project-preview-overlay">
                      <ExternalLink className="project-preview-link-icon" />
                    </div>
                  </div>
                </div>



                <div className="project-preview-item" onClick={openModal}>
                  <div className="project-preview-text">
                    <h3 className="project-preview-title">Rick & Morty</h3>
                    <p className="project-preview-description">App de personajes con API REST</p>
                  </div>
                  <div className="project-preview-image">
                    <img src="/images/rickymorty_pc.png" alt="Rick & Morty" />
                    <div className="project-preview-overlay">
                      <ExternalLink className="project-preview-link-icon" />
                    </div>
                  </div>
                </div>

                <div className="project-preview-item" onClick={openModal}>
                  <div className="project-preview-text">
                    <h3 className="project-preview-title">Portfolio React</h3>
                    <p className="project-preview-description">Desarrollo asistido con IA y prompt engineering</p>
                  </div>
                  <div className="project-preview-image">
                    <img src="/images/Cv_2daFoto.png" alt="Portfolio React" />
                    <div className="project-preview-overlay">
                      <ExternalLink className="project-preview-link-icon" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>


      </div>
    </div>
  )
}

export default HeroCardsContainer
