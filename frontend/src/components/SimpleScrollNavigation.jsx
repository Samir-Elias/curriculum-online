import React from "react";
import { ChevronUp, ChevronDown, Circle, ArrowUp, Code, BookOpen, Target, User, Home } from "lucide-react";

/**
 * Navegación simplificada específicamente optimizada para el sistema de checkpoints
 */
const SimpleScrollNavigation = ({
  activeSection = 0,
  totalSections = 0,
  scrollProgress = 0,
  onScrollToSection,
  onBackToTop,
  sectionTitles = [],
  className = ""
}) => {
  
  // Mostrar navegación solo si hay múltiples secciones
  if (totalSections <= 1) return null;

  // Determinar si mostrar el botón de volver arriba
  const showBackToTop = scrollProgress > 10 && activeSection > 0;
  
  // Función para obtener el icono según la sección
  const getSectionIcon = (index, title) => {
    const iconClass = "w-3 h-3";
    
    if (title.toLowerCase().includes('inicio') || index === 0) {
      return <Home className={iconClass} />;
    }
    if (title.toLowerCase().includes('stack') || title.toLowerCase().includes('tecnolog')) {
      return <Code className={iconClass} />;
    }
    if (title.toLowerCase().includes('formac') || title.toLowerCase().includes('educac')) {
      return <BookOpen className={iconClass} />;
    }
    if (title.toLowerCase().includes('objetivo')) {
      return <Target className={iconClass} />;
    }
    if (title.toLowerCase().includes('perfil') || title.toLowerCase().includes('personal')) {
      return <User className={iconClass} />;
    }
    // Para proyectos, usar un círculo simple
    return <Circle className={iconClass} fill="currentColor" />;
  };

  // Generar indicadores
  const indicators = Array.from({ length: totalSections }, (_, index) => {
    const isActive = index === activeSection;
    const title = sectionTitles[index] || `Sección ${index + 1}`;
    
    return {
      index,
      title,
      isActive,
      icon: getSectionIcon(index, title)
    };
  });

  return (
    <>
      {/* Barra de progreso */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[100]">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 transition-all duration-300 ease-out shadow-lg"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
        />
      </div>

      {/* Indicadores laterales */}
      <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-50 ${className}`}>
        <div className="flex flex-col gap-3 bg-white/90 backdrop-blur-lg p-4 rounded-2xl shadow-2xl border border-white/20">
          {indicators.map((indicator) => (
            <button
              key={indicator.index}
              onClick={() => onScrollToSection(indicator.index)}
              className={`
                group relative flex items-center justify-center w-4 h-4 rounded-full
                transition-all duration-300 hover:scale-125
                ${indicator.isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-600'
                }
              `}
              aria-label={`Ir a ${indicator.title}`}
            >
              {indicator.icon}
              
              {/* Tooltip */}
              <div className="
                absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg
                opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200
                whitespace-nowrap transform translate-x-2 group-hover:translate-x-0
              ">
                {indicator.title}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-900 border-y-4 border-y-transparent"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navegación inferior */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 bg-white/95 backdrop-blur-lg px-6 py-3 rounded-full shadow-2xl border border-white/20">
          
          {/* Botón anterior */}
          <button
            onClick={() => onScrollToSection(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeSection === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
            aria-label="Sección anterior"
          >
            <ChevronUp className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Indicador central */}
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full">
            <span className="text-sm font-semibold">
              {activeSection + 1} / {totalSections}
            </span>
          </div>

          {/* Botón siguiente */}
          <button
            onClick={() => onScrollToSection(Math.min(totalSections - 1, activeSection + 1))}
            disabled={activeSection === totalSections - 1}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeSection === totalSections - 1
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
            aria-label="Siguiente sección"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Título flotante de la sección actual */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
        <div className={`
          px-6 py-3 bg-black/80 text-white rounded-full text-sm font-medium
          backdrop-blur-lg shadow-2xl border border-white/10
          transition-all duration-300 transform
          ${activeSection >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        `}>
          {sectionTitles[activeSection] || `Sección ${activeSection + 1}`}
        </div>
      </div>

      {/* Botón volver arriba */}
      {showBackToTop && (
        <button
          onClick={onBackToTop}
          className="
            fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white 
            rounded-full shadow-2xl hover:shadow-blue-600/25 
            transition-all duration-300 transform hover:scale-110
            flex items-center justify-center z-50
          "
          aria-label="Volver al inicio"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

/**
 * Hook simplificado para manejar la navegación de checkpoints
 */
export const useCheckpointNavigation = (totalSections, scrollToSectionFn, activeSection, scrollProgress) => {
  const handleScrollToSection = (sectionIndex) => {
    if (sectionIndex >= 0 && sectionIndex < totalSections && scrollToSectionFn) {
      scrollToSectionFn(sectionIndex);
    }
  };

  const handleBackToTop = () => {
    if (scrollToSectionFn) {
      scrollToSectionFn(0);
    }
  };

  const handleKeyNavigation = (event) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        if (activeSection > 0) {
          handleScrollToSection(activeSection - 1);
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
      case ' ':
        event.preventDefault();
        if (activeSection < totalSections - 1) {
          handleScrollToSection(activeSection + 1);
        }
        break;
      case 'Home':
        event.preventDefault();
        handleScrollToSection(0);
        break;
      case 'End':
        event.preventDefault();
        handleScrollToSection(totalSections - 1);
        break;
      default:
        // Números para navegación directa (1-9)
        const num = parseInt(event.key);
        if (num >= 1 && num <= Math.min(9, totalSections)) {
          event.preventDefault();
          handleScrollToSection(num - 1);
        }
        break;
    }
  };

  // Effect para manejar las teclas de navegación
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      // Solo manejar teclas si no estamos en un input/textarea
      if (
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        !document.activeElement?.contentEditable
      ) {
        handleKeyNavigation(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, totalSections]);

  return {
    handleScrollToSection,
    handleBackToTop,
    canGoPrevious: activeSection > 0,
    canGoNext: activeSection < totalSections - 1,
    currentSection: activeSection + 1,
    totalSections
  };
};

export default SimpleScrollNavigation;