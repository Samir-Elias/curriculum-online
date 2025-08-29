import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap,
  Database,
  Server,
  Layout,
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { getTechIcon } from "../icons/TechIcons";

const TechStack = ({ tecnologiasCore, isVisible, containerVariants, itemVariants }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detectar rendimiento del dispositivo
  useEffect(() => {
    const checkPerformance = () => {
      // Detectar si es un PC con hardware limitado
      const isPC = window.innerWidth >= 1024;
      const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
      const hasSlowConnection = navigator.connection && 
        (navigator.connection.effectiveType === 'slow-2g' || 
         navigator.connection.effectiveType === '2g');
      
      if (isPC && (hasLowMemory || hasSlowConnection)) {
        setIsLowPerformance(true);
      }
    };

    checkPerformance();
  }, []);

  // Navegación del carrusel
  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % 4);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + 4) % 4);
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isMobile) return;
      
      if (e.key === "ArrowLeft") {
        prevCard();
      } else if (e.key === "ArrowRight") {
        nextCard();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isMobile]);

  // Clases condicionales para optimización
  const titleDecorationClass = isLowPerformance ? "title-decoration no-animation" : "title-decoration";
  const badgeClass = isLowPerformance ? "techstack-floating-badge no-transition" : "techstack-floating-badge";

  return (
    <motion.section 
      id="techstack"
      className="techstack-floating-section"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible.techstack ? "visible" : "hidden"}
    >
      <div className="techstack-floating-container">
        <motion.h2 
          className="techstack-floating-title"
          variants={itemVariants}
        >
          <Zap className={titleDecorationClass} />
          <div className="title-text">
            <span className="techstack-main-title">
              <span style={{ color: '#10b981' }}>S</span>TACK TE<span style={{ color: '#10b981' }}>C</span>H
            </span>
          </div>
          <Zap className={titleDecorationClass} />
        </motion.h2>
        {isMobile ? (
          // Carrusel para móvil
          <div className="techstack-carousel">
            <button 
              className="carousel-button carousel-prev" 
              onClick={prevCard}
              aria-label="Anterior"
            >
              <ChevronLeft />
            </button>
            
            <div className="carousel-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="carousel-card"
                >
                  {currentCard === 0 && (
                    <Card className="techstack-floating-card backend-card">
                      <CardHeader className="techstack-floating-card-header">
                        <CardTitle className="techstack-floating-card-title">
                          <Server className="techstack-floating-card-icon" />
                          Backend
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="techstack-floating-card-content">
                        <div className="techstack-floating-badges">
                          {tecnologiasCore.backend.map((tech, index) => (
                            <Badge key={index} className={`${badgeClass} backend-badge`}>
                              <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                              <span className="tech-name">{tech}</span>
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {currentCard === 1 && (
                    <Card className="techstack-floating-card frontend-card">
                      <CardHeader className="techstack-floating-card-header">
                        <CardTitle className="techstack-floating-card-title">
                          <Layout className="techstack-floating-card-icon" />
                          Frontend
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="techstack-floating-card-content">
                        <div className="techstack-floating-badges">
                          {tecnologiasCore.frontend.map((tech, index) => (
                            <Badge key={index} className={`${badgeClass} frontend-badge`}>
                              <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                              <span className="tech-name">{tech}</span>
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {currentCard === 2 && (
                    <Card className="techstack-floating-card tools-card">
                      <CardHeader className="techstack-floating-card-header">
                        <CardTitle className="techstack-floating-card-title">
                          <Database className="techstack-floating-card-icon" />
                          Herramientas
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="techstack-floating-card-content">
                        <div className="techstack-floating-badges">
                          {tecnologiasCore.herramientas.map((tech, index) => (
                            <Badge key={index} className={`${badgeClass} tools-badge`}>
                              <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                              <span className="tech-name">{tech}</span>
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {currentCard === 3 && (
                    <Card className="techstack-floating-card methodologies-card">
                      <CardHeader className="techstack-floating-card-header">
                        <CardTitle className="techstack-floating-card-title">
                          <Users className="techstack-floating-card-icon" />
                          Metodologías
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="techstack-floating-card-content">
                        <div className="techstack-floating-badges">
                          {tecnologiasCore.metodologias.map((tech, index) => (
                            <Badge key={index} className={`${badgeClass} methodologies-badge`}>
                              <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                              <span className="tech-name">{tech}</span>
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <button 
              className="carousel-button carousel-next" 
              onClick={nextCard}
              aria-label="Siguiente"
            >
              <ChevronRight />
            </button>
            
            {/* Indicadores */}
            <div className="carousel-indicators">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${currentCard === index ? 'active' : ''}`}
                  onClick={() => setCurrentCard(index)}
                  aria-label={`Ir a tarjeta ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Grid normal para desktop
          <div className="techstack-floating-grid">
            <motion.div variants={itemVariants}>
              <Card className="techstack-floating-card backend-card">
                <CardHeader className="techstack-floating-card-header">
                  <CardTitle className="techstack-floating-card-title">
                    <Server className="techstack-floating-card-icon" />
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent className="techstack-floating-card-content">
                  <div className="techstack-floating-badges">
                    {tecnologiasCore.backend.map((tech, index) => (
                      <Badge key={index} className={`${badgeClass} backend-badge`}>
                        <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                        <span className="tech-name">{tech}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="techstack-floating-card frontend-card">
                <CardHeader className="techstack-floating-card-header">
                  <CardTitle className="techstack-floating-card-title">
                    <Layout className="techstack-floating-card-icon" />
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent className="techstack-floating-card-content">
                  <div className="techstack-floating-badges">
                    {tecnologiasCore.frontend.map((tech, index) => (
                      <Badge key={index} className={`${badgeClass} frontend-badge`}>
                        <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                        <span className="tech-name">{tech}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="techstack-floating-card tools-card">
                <CardHeader className="techstack-floating-card-header">
                  <CardTitle className="techstack-floating-card-title">
                    <Database className="techstack-floating-card-icon" />
                    Herramientas
                  </CardTitle>
                </CardHeader>
                <CardContent className="techstack-floating-card-content">
                  <div className="techstack-floating-badges">
                    {tecnologiasCore.herramientas.map((tech, index) => (
                      <Badge key={index} className={`${badgeClass} tools-badge`}>
                        <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                        <span className="tech-name">{tech}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="techstack-floating-card methodologies-card">
                <CardHeader className="techstack-floating-card-header">
                  <CardTitle className="techstack-floating-card-title">
                    <Users className="techstack-floating-card-icon" />
                    Metodologías
                  </CardTitle>
                </CardHeader>
                <CardContent className="techstack-floating-card-content">
                  <div className="techstack-floating-badges">
                    {tecnologiasCore.metodologias.map((tech, index) => (
                      <Badge key={index} className={`${badgeClass} methodologies-badge`}>
                        <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                        <span className="tech-name">{tech}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default TechStack;