import React from "react";
import { ChevronUp, ChevronDown, Circle, ArrowUp } from "lucide-react";

/**
 * Componente de indicadores de scroll lateral
 */
const ScrollIndicators = ({ indicators = [], className = "" }) => {
  if (!indicators.length) return null;

  return (
    <div className={`scroll-indicators ${className}`}>
      {indicators.map((indicator, index) => (
        <button
          key={indicator.id}
          className={`scroll-indicator ${indicator.isActive ? 'active' : ''}`}
          onClick={indicator.onClick}
          data-label={indicator.label}
          aria-label={`Ir a ${indicator.label}`}
          title={indicator.label}
        >
          <Circle 
            className="w-full h-full" 
            fill={indicator.isActive ? "currentColor" : "none"}
          />
        </button>
      ))}
    </div>
  );
};

/**
 * Barra de progreso de scroll
 */
const ScrollProgress = ({ progress = 0, className = "" }) => {
  return (
    <div className={`scroll-progress ${className}`}>
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};

/**
 * Navegación de sección inferior
 */
const SectionNavigation = ({ 
  navigation = {}, 
  sections = [], 
  activeSection = 0,
  className = "" 
}) => {
  if (!navigation.canGoNext && !navigation.canGoPrevious && sections.length <= 1) {
    return null;
  }

  return (
    <div className={`section-nav ${className}`}>
      {/* Botón anterior */}
      <button
        className="section-nav-button"
        onClick={navigation.goToPrevious}
        disabled={!navigation.canGoPrevious}
        aria-label="Sección anterior"
        style={{
          opacity: navigation.canGoPrevious ? 1 : 0.5,
          cursor: navigation.canGoPrevious ? 'pointer' : 'not-allowed'
        }}
      >
        <ChevronUp className="w-4 h-4" />
        Anterior
      </button>

      {/* Indicador de sección */}
      <div className="section-nav-button active">
        {navigation.currentSection} / {navigation.totalSections}
      </div>

      {/* Botón siguiente */}
      <button
        className="section-nav-button"
        onClick={navigation.goToNext}
        disabled={!navigation.canGoNext}
        aria-label="Siguiente sección"
        style={{
          opacity: navigation.canGoNext ? 1 : 0.5,
          cursor: navigation.canGoNext ? 'pointer' : 'not-allowed'
        }}
      >
        <ChevronDown className="w-4 h-4" />
        Siguiente
      </button>
    </div>
  );
};

/**
 * Título flotante de checkpoint
 */
const CheckpointTitle = ({ 
  title = "", 
  isVisible = false, 
  className = "" 
}) => {
  if (!title) return null;

  return (
    <div className={`checkpoint-title ${isVisible ? 'visible' : ''} ${className}`}>
      {title}
    </div>
  );
};

/**
 * Botón para volver arriba
 */
const BackToTop = ({ 
  onClick, 
  isVisible = false, 
  className = "" 
}) => {
  if (!isVisible) return null;

  return (
    <button
      className={`fixed bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${className}`}
      onClick={onClick}
      aria-label="Volver al inicio"
      style={{
        zIndex: 60,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden'
      }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

/**
 * Indicador de contenido adicional
 */
const ContentOverflowIndicator = ({ 
  onClick,
  text = "Más contenido abajo",
  isVisible = false,
  className = "" 
}) => {
  if (!isVisible) return null;

  return (
    <button
      className={`content-overflow-indicator ${className}`}
      onClick={onClick}
      aria-label={text}
    >
      {text}
      <ChevronDown className="w-4 h-4 ml-2" />
    </button>
  );
};

/**
 * Componente principal que agrupa toda la navegación
 */
const ScrollNavigation = ({
  indicators = [],
  navigation = {},
  sections = [],
  activeSection = 0,
  scrollProgress = 0,
  currentSectionTitle = "",
  showIndicators = true,
  showNavigation = true,
  showProgress = true,
  showBackToTop = false,
  showCheckpointTitle = false,
  onBackToTop = () => {},
  className = ""
}) => {
  return (
    <>
      {/* Barra de progreso */}
      {showProgress && (
        <ScrollProgress 
          progress={scrollProgress}
          className={className}
        />
      )}

      {/* Indicadores laterales */}
      {showIndicators && (
        <ScrollIndicators 
          indicators={indicators}
          className={`${indicators.length > 0 ? 'visible' : ''} ${className}`}
        />
      )}

      {/* Navegación inferior */}
      {showNavigation && (
        <SectionNavigation
          navigation={navigation}
          sections={sections}
          activeSection={activeSection}
          className={className}
        />
      )}

      {/* Título de checkpoint */}
      {showCheckpointTitle && (
        <CheckpointTitle
          title={currentSectionTitle}
          isVisible={Boolean(currentSectionTitle)}
          className={className}
        />
      )}

      {/* Botón volver arriba */}
      <BackToTop
        onClick={onBackToTop}
        isVisible={showBackToTop}
        className={className}
      />
    </>
  );
};

/**
 * Hook para controlar la visibilidad de la navegación
 */
export const useScrollNavigationVisibility = (
  scrollProgress = 0,
  activeSection = 0,
  totalSections = 0
) => {
  const showBackToTop = scrollProgress > 20;
  const showIndicators = totalSections > 1;
  const showNavigation = totalSections > 1;
  const showProgress = true;
  const showCheckpointTitle = totalSections > 1;

  return {
    showBackToTop,
    showIndicators,
    showNavigation,
    showProgress,
    showCheckpointTitle
  };
};

/**
 * Componente simplificado para uso rápido
 */
export const SimpleScrollNavigation = ({
  scrollSnapHook,
  sectionTitles = [],
  className = ""
}) => {
  const {
    indicators,
    navigation,
    activeSection,
    scrollProgress,
    scrollToSection
  } = scrollSnapHook;

  const visibility = useScrollNavigationVisibility(
    scrollProgress,
    activeSection,
    sectionTitles.length
  );

  const currentSectionTitle = sectionTitles[activeSection] || "";

  return (
    <ScrollNavigation
      indicators={indicators}
      navigation={navigation}
      activeSection={activeSection}
      scrollProgress={scrollProgress}
      currentSectionTitle={currentSectionTitle}
      onBackToTop={() => scrollToSection(0)}
      className={className}
      {...visibility}
    />
  );
};

export {
  ScrollIndicators,
  ScrollProgress,
  SectionNavigation,
  CheckpointTitle,
  BackToTop,
  ContentOverflowIndicator
};

export default ScrollNavigation;