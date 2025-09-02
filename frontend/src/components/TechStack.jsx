import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap,
  Database,
  Server,
  Layout,
  Users,
  ChevronLeft,
  ChevronRight,
  Brain,
  ChevronDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { getSpriteTechIcon } from "../icons/TechIconSprite";

// Fallback function in case the import fails
const getTechIcon = (tech) => {
  try {
    return getSpriteTechIcon(tech);
  } catch (error) {
    console.warn('Error loading tech icon:', error);
    // Return a simple fallback icon
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
      </svg>
    );
  }
};

const TechStack = ({ tecnologiasCore, isVisible, containerVariants, itemVariants }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const carouselRef = useRef(null);
  const cardContentRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

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

  // Verificar si hay scroll vertical necesario
  useEffect(() => {
    if (isMobile && cardContentRef.current) {
      const checkScrollNeeded = () => {
        const content = cardContentRef.current;
        if (content) {
          const hasVerticalScroll = content.scrollHeight > content.clientHeight;
          setShowScrollHint(hasVerticalScroll && !hasInteracted);
        }
      };
      
      checkScrollNeeded();
      window.addEventListener('resize', checkScrollNeeded);
      return () => window.removeEventListener('resize', checkScrollNeeded);
    }
  }, [isMobile, hasInteracted]);

  // Navegación del carrusel
  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % 5);
    setHasInteracted(true);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + 5) % 5);
    setHasInteracted(true);
  };

  // Swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distanceX = touchStartX.current - touchEndX.current;
    const distanceY = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    // Determinar si es un swipe horizontal o vertical
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Swipe horizontal
      if (Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) {
          nextCard(); // Swipe izquierda
        } else {
          prevCard(); // Swipe derecha
        }
      }
    } else {
      // Swipe vertical - manejar scroll
      if (Math.abs(distanceY) > minSwipeDistance && cardContentRef.current) {
        const content = cardContentRef.current;
        const scrollAmount = distanceY > 0 ? 100 : -100;
        content.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        setHasInteracted(true);
      }
    }

    // Reset touch values
    touchStartX.current = 0;
    touchStartY.current = 0;
    touchEndX.current = 0;
    touchEndY.current = 0;
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isMobile) return;
      
      if (e.key === "ArrowLeft") {
        prevCard();
      } else if (e.key === "ArrowRight") {
        nextCard();
      } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        if (cardContentRef.current) {
          const scrollAmount = e.key === "ArrowUp" ? -100 : 100;
          cardContentRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
          setHasInteracted(true);
        }
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
          <span className="title-text">
            <span style={{ color: '#10b981' }}>S</span>
            <span style={{ color: 'white' }}>TACK TE</span>
            <span style={{ color: '#10b981' }}>C</span>
            <span style={{ color: 'white' }}>H</span>
          </span>
          <Zap className={titleDecorationClass} />
        </motion.h2>

        {isMobile ? (
          // Carrusel para móvil con swipe gestures
          <div 
            ref={carouselRef}
            className={`techstack-carousel swipe-container ${hasInteracted ? 'swipe-hint-hidden' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Indicador de swipe horizontal */}
            {!hasInteracted && (
              <div className="swipe-gesture-indicator">
                Desliza para navegar
              </div>
            )}

            {/* Flechas de swipe */}
            {!hasInteracted && (
              <>
                <div className="swipe-arrow-left">
                  <ChevronLeft />
                </div>
                <div className="swipe-arrow-right">
                  <ChevronRight />
                </div>
              </>
            )}

            <div className="carousel-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
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
                      <CardContent 
                        ref={cardContentRef}
                        className="techstack-floating-card-content mobile-scrollable"
                      >
                        {/* Indicador de scroll vertical */}
                        {showScrollHint && (
                          <div className="scroll-hint-indicator">
                            <ChevronDown className="scroll-hint-icon" />
                            <span>Desliza hacia arriba para ver más</span>
                          </div>
                        )}
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
                      <CardContent 
                        ref={cardContentRef}
                        className="techstack-floating-card-content mobile-scrollable"
                      >
                        {showScrollHint && (
                          <div className="scroll-hint-indicator">
                            <ChevronDown className="scroll-hint-icon" />
                            <span>Desliza hacia arriba para ver más</span>
                          </div>
                        )}
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
                      <CardContent 
                        ref={cardContentRef}
                        className="techstack-floating-card-content mobile-scrollable"
                      >
                        {showScrollHint && (
                          <div className="scroll-hint-indicator">
                            <ChevronDown className="scroll-hint-icon" />
                            <span>Desliza hacia arriba para ver más</span>
                          </div>
                        )}
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
                      <CardContent 
                        ref={cardContentRef}
                        className="techstack-floating-card-content mobile-scrollable"
                      >
                        {showScrollHint && (
                          <div className="scroll-hint-indicator">
                            <ChevronDown className="scroll-hint-icon" />
                            <span>Desliza hacia arriba para ver más</span>
                          </div>
                        )}
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
                  
                  {currentCard === 4 && (
                    <Card className="techstack-floating-card ai-card">
                      <CardHeader className="techstack-floating-card-header">
                        <CardTitle className="techstack-floating-card-title">
                          <Brain className="techstack-floating-card-icon" />
                          Inteligencia Artificial
                        </CardTitle>
                      </CardHeader>
                      <CardContent 
                        ref={cardContentRef}
                        className="techstack-floating-card-content mobile-scrollable"
                      >
                        {showScrollHint && (
                          <div className="scroll-hint-indicator">
                            <ChevronDown className="scroll-hint-icon" />
                            <span>Desliza hacia arriba para ver más</span>
                          </div>
                        )}
                        <div className="techstack-floating-badges">
                          {tecnologiasCore.inteligenciaArtificial.map((tech, index) => (
                            <Badge key={index} className={`${badgeClass} ai-badge`}>
                              <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                              <span className="tech-name" data-tech={tech}>{tech}</span>
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
              className="carousel-button carousel-prev" 
              onClick={prevCard}
              aria-label="Anterior"
            >
              <ChevronLeft />
            </button>
            
            <button 
              className="carousel-button carousel-next" 
              onClick={nextCard}
              aria-label="Siguiente"
            >
              <ChevronRight />
            </button>
            
            {/* Indicadores */}
            <div className="carousel-indicators">
              {[0, 1, 2, 3, 4].map((index) => (
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

            <motion.div variants={itemVariants}>
              <Card className="techstack-floating-card ai-card">
                <CardHeader className="techstack-floating-card-header">
                  <CardTitle className="techstack-floating-card-title">
                    <Brain className="techstack-floating-card-icon" />
                    Inteligencia Artificial
                  </CardTitle>
                </CardHeader>
                <CardContent className="techstack-floating-card-content">
                  <div className="techstack-floating-badges">
                    {tecnologiasCore.inteligenciaArtificial.map((tech, index) => (
                      <Badge key={index} className={`${badgeClass} ai-badge`}>
                        <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                        <span className="tech-name" data-tech={tech}>{tech}</span>
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