// hooks/useImageLoader.js
import { useState, useEffect } from 'react';

export const useImageLoader = (src, fallback = null) => {
  const [imageState, setImageState] = useState({
    loaded: false,
    error: false,
    src: src
  });

  useEffect(() => {
    if (!src) {
      setImageState(prev => ({ ...prev, error: true }));
      return;
    }

    const img = new Image();
    
    const handleLoad = () => {
      setImageState({
        loaded: true,
        error: false,
        src: src
      });
    };

    const handleError = () => {
      setImageState({
        loaded: false,
        error: true,
        src: fallback || src
      });
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    
    img.src = src;

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, fallback]);

  return imageState;
};

// hooks/useExpandedContent.js
import { useState, useCallback, useRef, useEffect } from 'react';

export const useExpandedContent = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const contentRefs = useRef(new Map());

  const toggleExpanded = useCallback((id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const isExpanded = useCallback((id) => {
    return expandedItems.has(id);
  }, [expandedItems]);

  const expandAll = useCallback(() => {
    // Esta función puede ser útil si quieres expandir todos los proyectos
    setExpandedItems(new Set(Array.from(contentRefs.current.keys())));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedItems(new Set());
  }, []);

  const setContentRef = useCallback((id, ref) => {
    if (ref) {
      contentRefs.current.set(id, ref);
    } else {
      contentRefs.current.delete(id);
    }
  }, []);

  return {
    toggleExpanded,
    isExpanded,
    expandAll,
    collapseAll,
    setContentRef,
    expandedCount: expandedItems.size
  };
};

// hooks/useIntersectionObserver.js
import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasIntersected, options]);

  return {
    elementRef,
    isIntersecting,
    hasIntersected
  };
};

// Componente mejorado ProjectImage
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink } from 'lucide-react';
import { useImageLoader } from './hooks/useImageLoader';

export const ProjectImage = ({ 
  src, 
  alt, 
  className = "", 
  fallbackIcon: FallbackIcon = Code2,
  onImageClick,
  showOverlay = true 
}) => {
  const { loaded, error } = useImageLoader(src);

  return (
    <div className={`relative group ${className}`}>
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10">
        {!error && src ? (
          <>
            {/* Placeholder mientras carga */}
            {!loaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 animate-pulse flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <FallbackIcon className="w-8 h-8 text-white/40" />
                </motion.div>
              </div>
            )}
            
            {/* Imagen real */}
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover transition-all duration-500 ${
                loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
              onLoad={() => {}} // El hook maneja esto
              onError={() => {}} // El hook maneja esto
            />
          </>
        ) : (
          /* Fallback cuando no hay imagen o hay error */
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <FallbackIcon className="w-12 h-12 text-white/40" />
          </div>
        )}

        {/* Overlay interactivo */}
        {showOverlay && loaded && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
            onClick={onImageClick}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full"
            >
              <ExternalLink className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        )}

        {/* Indicador de estado */}
        <div className="absolute top-2 right-2">
          {!loaded && !error && (
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          )}
          {loaded && !error && (
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          )}
          {error && (
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

// Ejemplo de uso de los hooks en tu componente principal
/*
import { useExpandedContent, useIntersectionObserver } from './hooks';
import { ProjectImage } from './ProjectImage';

const ProjectSection = () => {
  const { toggleExpanded, isExpanded, expandedCount } = useExpandedContent();
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={elementRef} className="py-20">
      {hasIntersected && (
        // Tu contenido de proyectos aquí
      )}
    </section>
  );
};
*/

// Hook para manejar el scroll suave al expandir contenido
import { useEffect } from 'react';

export const useScrollToExpanded = (isExpanded, elementRef, offset = 100) => {
  useEffect(() => {
    if (isExpanded && elementRef.current) {
      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = rect.top + scrollTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }, [isExpanded, offset]);
};

// Hook para optimizar el renderizado de listas largas
export const useVirtualization = (items, containerHeight = 600, itemHeight = 400) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState(null);

  const visibleStartIndex = Math.floor(scrollTop / itemHeight);
  const visibleEndIndex = Math.min(
    visibleStartIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length - 1
  );

  const visibleItems = items.slice(visibleStartIndex, visibleEndIndex + 1);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return {
    visibleItems,
    visibleStartIndex,
    totalHeight: items.length * itemHeight,
    offsetY: visibleStartIndex * itemHeight,
    containerRef: setContainerRef,
    onScroll: handleScroll
  };
};

// Utils para formatear datos de proyectos
export const formatProjectDuration = (months) => {
  if (months < 1) return "Menos de 1 mes";
  if (months === 1) return "1 mes";
  if (months < 12) return `${months} meses`;
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return years === 1 ? "1 año" : `${years} años`;
  }
  
  return `${years} año${years > 1 ? 's' : ''} y ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
};

export const getProjectStatusColor = (status) => {
  const statusColors = {
    'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'planning': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'on-hold': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'cancelled': 'bg-red-500/20 text-red-400 border-red-500/30'
  };
  
  return statusColors[status] || statusColors['completed'];
};

export const getProjectStatusText = (status) => {
  const statusTexts = {
    'completed': 'Completado',
    'in-progress': 'En Progreso',
    'planning': 'Planificación',
    'on-hold': 'En Pausa',
    'cancelled': 'Cancelado'
  };
  
  return statusTexts[status] || 'Completado';
};