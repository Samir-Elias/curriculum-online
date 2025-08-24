import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook personalizado para manejar scroll snapping y checkpoints
 * @param {Array} sections - Array de secciones con sus IDs
 * @param {Object} options - Opciones de configuración
 * @returns {Object} Estado y funciones del scroll snap
 */
export const useScrollSnap = (sections = [], options = {}) => {
  const {
    threshold = 0.5,
    rootMargin = '0px',
    smooth = true,
    debounceDelay = 100,
    enableIndicators = true,
    enableNavigation = true
  } = options;

  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [sectionsInView, setSectionsInView] = useState(new Set());
  
  const observerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Función para hacer scroll suave a una sección específica
  const scrollToSection = useCallback((sectionIndex) => {
    if (!containerRef.current) return;
    
    const sectionElements = containerRef.current.querySelectorAll('.scroll-snap-item');
    const targetElement = sectionElements[sectionIndex];
    
    if (targetElement) {
      setIsScrolling(true);
      
      // Usar scrollIntoView para scroll suave
      targetElement.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'center',
        inline: 'nearest'
      });
      
      // Actualizar estado después de un delay
      setTimeout(() => {
        setActiveSection(sectionIndex);
        setIsScrolling(false);
      }, smooth ? 800 : 0);
    }
  }, [smooth]);

  // Función para ir a la siguiente sección
  const goToNext = useCallback(() => {
    const nextIndex = Math.min(activeSection + 1, sections.length - 1);
    if (nextIndex !== activeSection) {
      scrollToSection(nextIndex);
    }
  }, [activeSection, sections.length, scrollToSection]);

  // Función para ir a la sección anterior
  const goToPrevious = useCallback(() => {
    const prevIndex = Math.max(activeSection - 1, 0);
    if (prevIndex !== activeSection) {
      scrollToSection(prevIndex);
    }
  }, [activeSection, scrollToSection]);

  // Calcular progreso de scroll
  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  }, []);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    setIsScrolling(true);
    updateScrollProgress();
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, debounceDelay);
  }, [debounceDelay, updateScrollProgress]);

  // Configurar Intersection Observer
  useEffect(() => {
    if (!containerRef.current) return;

    const observerOptions = {
      root: containerRef.current,
      rootMargin,
      threshold: [0.1, 0.3, 0.5, 0.7, 0.9]
    };

    const observerCallback = (entries) => {
      const newSectionsInView = new Set();
      let mostVisibleSection = { index: 0, ratio: 0 };

      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          newSectionsInView.add(index);
          
          // Encontrar la sección más visible
          if (entry.intersectionRatio > mostVisibleSection.ratio) {
            mostVisibleSection = {
              index: Array.from(entry.target.parentNode.children).indexOf(entry.target),
              ratio: entry.intersectionRatio
            };
          }
        }
      });

      setSectionsInView(newSectionsInView);
      
      // Solo actualizar la sección activa si no estamos haciendo scroll programático
      if (!isScrolling && mostVisibleSection.ratio >= threshold) {
        setActiveSection(mostVisibleSection.index);
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todas las secciones
    const sectionElements = containerRef.current.querySelectorAll('.scroll-snap-item');
    sectionElements.forEach((element) => {
      observerRef.current.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, isScrolling]);

  // Configurar event listeners
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Manejo de teclas de navegación
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!enableNavigation) return;
      
      switch (event.key) {
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Spacebar
          event.preventDefault();
          goToNext();
          break;
        case 'Home':
          event.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          event.preventDefault();
          scrollToSection(sections.length - 1);
          break;
        default:
          // Números para navegación directa (1-9)
          const num = parseInt(event.key);
          if (num >= 1 && num <= Math.min(9, sections.length)) {
            event.preventDefault();
            scrollToSection(num - 1);
          }
          break;
      }
    };

    if (enableNavigation) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enableNavigation, goToNext, goToPrevious, scrollToSection, sections.length]);

  // Función para generar indicadores de navegación
  const generateIndicators = useCallback(() => {
    if (!enableIndicators) return null;

    return sections.map((section, index) => ({
      id: section.id || `section-${index}`,
      label: section.title || section.name || `Sección ${index + 1}`,
      isActive: activeSection === index,
      isInView: sectionsInView.has(index),
      onClick: () => scrollToSection(index)
    }));
  }, [enableIndicators, sections, activeSection, sectionsInView, scrollToSection]);

  // Función para generar navegación
  const generateNavigation = useCallback(() => {
    if (!enableNavigation) return null;

    return {
      canGoNext: activeSection < sections.length - 1,
      canGoPrevious: activeSection > 0,
      goToNext,
      goToPrevious,
      currentSection: activeSection + 1,
      totalSections: sections.length
    };
  }, [enableNavigation, activeSection, sections.length, goToNext, goToPrevious]);

  // Función para obtener información de la sección actual
  const getCurrentSection = useCallback(() => {
    return sections[activeSection] || null;
  }, [sections, activeSection]);

  // Función para verificar si una sección está visible
  const isSectionVisible = useCallback((index) => {
    return sectionsInView.has(index);
  }, [sectionsInView]);

  // Función para obtener el porcentaje de visibilidad de una sección
  const getSectionVisibility = useCallback((index) => {
    // Esta función se puede expandir para obtener datos más detallados del IntersectionObserver
    return sectionsInView.has(index) ? (index === activeSection ? 100 : 50) : 0;
  }, [sectionsInView, activeSection]);

  // Función para programar scroll automático
  const startAutoScroll = useCallback((interval = 5000) => {
    const autoScrollInterval = setInterval(() => {
      if (activeSection < sections.length - 1) {
        goToNext();
      } else {
        scrollToSection(0); // Volver al inicio
      }
    }, interval);

    return () => clearInterval(autoScrollInterval);
  }, [activeSection, sections.length, goToNext, scrollToSection]);

  return {
    // Estados
    activeSection,
    scrollProgress,
    isScrolling,
    sectionsInView,
    
    // Referencias
    containerRef,
    
    // Funciones de navegación
    scrollToSection,
    goToNext,
    goToPrevious,
    
    // Funciones de utilidad
    generateIndicators,
    generateNavigation,
    getCurrentSection,
    isSectionVisible,
    getSectionVisibility,
    startAutoScroll,
    
    // Información del estado actual
    navigation: generateNavigation(),
    indicators: generateIndicators(),
    currentSection: getCurrentSection(),
    
    // Configuración
    canNavigate: enableNavigation,
    hasIndicators: enableIndicators
  };
};

/**
 * Hook simplificado para scroll snapping básico
 * @param {number} totalSections - Número total de secciones
 * @returns {Object} Estado y funciones básicas
 */
export const useSimpleScrollSnap = (totalSections = 0) => {
  const sections = Array.from({ length: totalSections }, (_, index) => ({
    id: `section-${index}`,
    title: `Sección ${index + 1}`
  }));

  return useScrollSnap(sections, {
    enableIndicators: true,
    enableNavigation: true,
    smooth: true
  });
};

/**
 * Hook para scroll snapping con datos personalizados
 * @param {Array} data - Array de datos para las secciones
 * @param {Function} mapFunction - Función para mapear datos a formato de sección
 * @returns {Object} Estado y funciones del scroll snap
 */
export const useDataScrollSnap = (data = [], mapFunction = null) => {
  const sections = data.map((item, index) => {
    if (mapFunction) {
      return mapFunction(item, index);
    }
    
    return {
      id: item.id || `section-${index}`,
      title: item.title || item.name || `Sección ${index + 1}`,
      data: item
    };
  });

  return useScrollSnap(sections, {
    enableIndicators: true,
    enableNavigation: true,
    smooth: true,
    threshold: 0.6
  });
};

export default useScrollSnap;