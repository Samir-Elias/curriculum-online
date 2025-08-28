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

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
          <Zap className="techstack-floating-icon" />
          <div className="title-text">
            <span><span style={{ color: '#10b981' }}>S</span>TACK</span>
            <span>TE<span style={{ color: '#10b981' }}>C</span>H</span>
          </div>
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
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
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
                            <Badge key={index} className="techstack-floating-badge backend-badge">
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
                            <Badge key={index} className="techstack-floating-badge frontend-badge">
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
                            <Badge key={index} className="techstack-floating-badge tools-badge">
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
                            <Badge key={index} className="techstack-floating-badge methodologies-badge">
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
                      <Badge key={index} className="techstack-floating-badge backend-badge">
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
                      <Badge key={index} className="techstack-floating-badge frontend-badge">
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
                      <Badge key={index} className="techstack-floating-badge tools-badge">
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
                      <Badge key={index} className="techstack-floating-badge methodologies-badge">
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