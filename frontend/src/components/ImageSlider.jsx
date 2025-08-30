"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "../styles/components/image-slider.css"

const ImageSlider = ({ images = [], isPaused = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality - Optimizado para rendimiento
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 6000) // Aumentado de 4s a 6s para menos frecuencia

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length, isPaused]) // Agregado isPaused a las dependencias

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  if (!images || images.length === 0) {
    return (
      <div className="image-slider-placeholder">
        <img src="/project-preview.png" alt="Project preview" className="placeholder-image" />
      </div>
    )
  }

  if (images.length === 1) {
    return (
      <div className="image-slider-single">
        <img src={images[0] || "/placeholder.svg"} alt="Project preview" className="single-image" />
      </div>
    )
  }

  return (
    <div
      className="image-slider"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main image container */}
      <div className="slider-container">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Project image ${currentIndex + 1}`}
            className="slider-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            loading="lazy"
          />
        </AnimatePresence>

        {/* Navigation arrows */}
        <button className="slider-nav slider-nav-prev" onClick={goToPrevious} aria-label="Previous image">
          <ChevronLeft />
        </button>
        <button className="slider-nav slider-nav-next" onClick={goToNext} aria-label="Next image">
          <ChevronRight />
        </button>

        {/* Image counter */}
        <div className="slider-counter">
          <span className="current-slide">{currentIndex + 1}</span>
          <span className="separator">/</span>
          <span className="total-slides">{images.length}</span>
        </div>

        {/* Auto-play indicator */}
        {isAutoPlaying && (
          <div className="auto-play-indicator">
            <div className="auto-play-progress">
              <motion.div
                className="progress-bar"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Dot indicators only */}
      <div className="slider-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
