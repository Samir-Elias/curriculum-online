"use client"
import { motion } from "framer-motion"
import {
  Target,
  Briefcase,
  Rocket,
  Code,
  Star,
  Heart,
  MapPin,
  User,
  Building,
  Clock,
  TrendingUp,
  CheckCircle,
  Award,
  Globe,
  Coffee,
  Lightbulb,
  Zap,
  Users,
  ArrowRight
} from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import "../styles/components/objective/objective-section.css"
import "../styles/components/objective/objective-mobile.css"
import "../styles/components/objective/objective-centered.css"

const ObjectiveSection = ({
  objetivoProfesional,
  isVisible,
  containerVariants,
  itemVariants,
}) => {
  if (!objetivoProfesional) {
    return null;
  }

  return (
    <motion.section
      id="objective"
      className="objective-section"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible?.objective ? "visible" : "hidden"}
    >
      <div className="objective-container">
        {/* Header */}
        <motion.div className="objective-header" variants={itemVariants}>
          <h2 className="objective-title">
            <Target className="objective-title-icon" />
            Objetivo Profesional
          </h2>
          <p className="objective-subtitle">
            Mi visión y propuesta de valor para tu equipo
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="objective-content-grid">
          {/* Left Column - Main Objective */}
          <motion.div className="objective-main-card" variants={itemVariants}>
            <div className="objective-card-header">
              <div className="objective-title-section">
                <h3 className="objective-card-title">{objetivoProfesional.titulo}</h3>
                <p className="objective-card-subtitle">Especialista en desarrollo con IA</p>
              </div>
              <div className="objective-status-badge">
                <Heart className="status-icon" />
                <span>Open to Work</span>
              </div>
            </div>

            {/* Description */}
            <div className="objective-description-section">
              <h4 className="objective-section-title">
                <Lightbulb className="section-icon" />
                Mi Enfoque Profesional
              </h4>
              <p className="objective-description">{objetivoProfesional.descripcion}</p>
            </div>

            {/* Value Proposition - Cards Perfeccionadas */}
            <div className="objective-value-section">
              <h4 className="objective-section-title">
                <Rocket className="section-icon" />
                Mi Propuesta de Valor
              </h4>
              <div className="objective-value-grid">
                <div className="objective-value-item">
                  <div className="value-icon-container">
                    <TrendingUp className="value-icon" />
                  </div>
                  <div className="value-content">
                    <div className="value-title">6 años de experiencia autodidacta</div>
                    <div className="value-description">Proyectos reales y aprendizaje continuo</div>
                  </div>
                </div>
                <div className="objective-value-item">
                  <div className="value-icon-container">
                    <Code className="value-icon" />
                  </div>
                  <div className="value-content">
                    <div className="value-title">Especialización en Java y Spring</div>
                    <div className="value-description">Backend robusto y escalable</div>
                  </div>
                </div>
                <div className="objective-value-item">
                  <div className="value-icon-container">
                    <Star className="value-icon" />
                  </div>
                  <div className="value-content">
                    <div className="value-title">Experto en IA y Prompt Engineering</div>
                    <div className="value-description">Desarrollo asistido por inteligencia artificial</div>
                  </div>
                </div>
                <div className="objective-value-item">
                  <div className="value-icon-container">
                    <Users className="value-icon" />
                  </div>
                  <div className="value-content">
                    <div className="value-title">Metodologías ágiles (Scrum)</div>
                    <div className="value-description">Trabajo en equipo y entregas iterativas</div>
                  </div>
                </div>
                <div className="objective-value-item">
                  <div className="value-icon-container">
                    <Zap className="value-icon" />
                  </div>
                  <div className="value-content">
                    <div className="value-title">Experto en React y Frontend</div>
                    <div className="value-description">Interfaces modernas y experiencia de usuario</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action - Movido a la card izquierda */}
            <div className="objective-cta-section">
              <h4 className="objective-section-title">
                <Heart className="section-icon" />
                ¿Interesado en trabajar juntos?
              </h4>
              <p className="objective-description">
                Estoy listo para contribuir desde el primer día con mi experiencia y pasión por el desarrollo.
              </p>
              <div className="objective-cta-actions">
                <Button className="objective-cta-button primary">
                  <Users className="w-4 h-4 mr-2" />
                  Conectar
                </Button>
                <Button variant="outline" className="objective-cta-button secondary">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Ver Proyectos
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div className="objective-sidebar" variants={itemVariants}>
            {/* Availability Status */}
            <div className="objective-sidebar-card status-card">
              <div className="status-header">
                <Coffee className="status-icon" />
                <h4 className="status-title">🟢 Disponible Inmediatamente</h4>
              </div>
              <p className="status-description">Listo para comenzar desde el primer día</p>
              <div className="status-details">
                <div className="status-item">
                  <MapPin className="status-item-icon" />
                  <div>
                    <div className="status-item-label">Ubicación</div>
                    <div className="status-item-value">Mendoza, Argentina</div>
                  </div>
                </div>
                <div className="status-item">
                  <Clock className="status-item-icon" />
                  <div>
                    <div className="status-item-label">Disponibilidad</div>
                    <div className="status-item-value">Tiempo completo</div>
                  </div>
                </div>
                <div className="status-item">
                  <Zap className="status-item-icon" />
                  <div>
                    <div className="status-item-label">Inicio</div>
                    <div className="status-item-value">Inmediato</div>
                  </div>
                </div>
              </div>
              
              {/* Modalidades integradas en móvil */}
              <div className="modalities-integrated">
                <h4 className="sidebar-card-title">
                  <Globe className="sidebar-icon" />
                  Modalidades de Trabajo
                </h4>
                <div className="modalities-list">
                  {objetivoProfesional.modalidades?.map((modalidad, index) => (
                    <div key={index} className="modality-item">
                      <CheckCircle className="modality-icon" />
                      <span className="modality-text">{modalidad}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>



            {/* Interest Levels */}
            <div className="objective-sidebar-card levels-card">
              <h4 className="sidebar-card-title">
                <Building className="sidebar-icon" />
                Niveles de Interés
              </h4>
              <div className="levels-list">
                {objetivoProfesional.niveles?.map((nivel, index) => (
                  <div key={index} className="level-item">
                    <User className="level-icon" />
                    <div className="level-content">
                      <div className="level-title">{nivel}</div>
                      <div className="level-description">
                        {index === 0 && "Posición ideal para mi experiencia"}
                        {index === 1 && "Programa de desarrollo estructurado"}
                        {index === 2 && "Rol versátil con crecimiento"}
                        {index === 3 && "Especialización en mi área fuerte"}
                        {index === 4 && "Innovación con tecnologías emergentes"}
                        {index === 5 && "Desarrollo frontend con React"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default ObjectiveSection
