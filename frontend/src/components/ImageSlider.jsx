import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlider = ({ images, alt, className = "", onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Normalizar las imágenes a un array
  const normalizedImages = React.useMemo(() => {
    if (!images) return [];
    if (typeof images === 'string') return [images];
    if (Array.isArray(images)) return images;
    return [];
  }, [images]);
  
  // Si no hay imágenes, mostrar placeholder
  if (normalizedImages.length === 0) {
    return (
      <img 
        src="https://via.placeholder.com/800x600/e2e8f0/64748b?text=Imagen+no+disponible"
        alt={alt}
        className={className}
        loading="lazy"
      />
    );
  }
  
  // Si solo hay una imagen, no mostrar controles
  if (normalizedImages.length === 1) {
    return (
      <img 
        src={normalizedImages[0]} 
        alt={alt}
        className={className}
        loading="lazy"
        onClick={(e) => {
          if (onImageClick) {
            e.stopPropagation();
            onImageClick(normalizedImages[0]);
          }
        }}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/800x600/e2e8f0/64748b?text=Imagen+no+disponible";
        }}
      />
    );
  }
  
  const nextImage = (e) => {
    e.stopPropagation(); // Evitar que se propague al card padre
    setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation(); // Evitar que se propague al card padre
    setCurrentIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
  };
  
  const goToImage = (index, e) => {
    e.stopPropagation(); // Evitar que se propague al card padre
    setCurrentIndex(index);
  };

  const handleImageClick = (e) => {
    if (onImageClick) {
      e.stopPropagation(); // Evitar que se propague al card padre
      onImageClick(normalizedImages[currentIndex]);
    }
  };
  
  return (
    <div className="relative group">
      {/* Imagen principal */}
      <img 
        src={normalizedImages[currentIndex]} 
        alt={`${alt} - ${currentIndex + 1}/${normalizedImages.length}`}
        className={`${className} cursor-pointer`}
        loading="lazy"
        onClick={handleImageClick}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/800x600/e2e8f0/64748b?text=Imagen+no+disponible";
        }}
      />
      
      {/* Contador de imágenes */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium pointer-events-none">
        {currentIndex + 1}/{normalizedImages.length}
      </div>
      
      {/* Controles de navegación */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      
      {/* Indicadores de página (dots) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {normalizedImages.map((_, index) => (
          <button
            key={index}
            onClick={(e) => goToImage(index, e)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-110' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;