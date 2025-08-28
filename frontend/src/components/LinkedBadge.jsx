import React, { useState, useEffect, useRef } from 'react';
import { Linkedin } from 'lucide-react';

const LinkedInBadge = ({ personalInfo }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const timeoutRef = useRef(null);
  const textTimeoutRef = useRef(null);

  const openLinkedIn = () => {
    window.open(personalInfo?.linkedin || 'https://ar.linkedin.com/in/samir-elias', '_blank', 'noopener,noreferrer');
  };

  const handleMouseEnter = () => {
    if (isLocked) return; // No hacer nada si está bloqueado
    
    setIsVisible(true);
    setIsTextVisible(true);
    setIsLocked(true); // Bloquear para evitar activaciones múltiples
    
    // Limpiar timeouts anteriores si existen
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (textTimeoutRef.current) {
      clearTimeout(textTimeoutRef.current);
    }
    
    // Ocultar texto después de 1 segundo
    textTimeoutRef.current = setTimeout(() => {
      setIsTextVisible(false);
    }, 1000);
    
    // Ocultar badge completo después de 2 segundos
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      // Desbloquear después de un pequeño delay para evitar activación inmediata
      setTimeout(() => {
        setIsLocked(false);
      }, 500);
    }, 2000);
  };

  const handleMouseLeave = () => {
    // No hacer nada al salir del mouse, el timeout se encarga de ocultar
  };

  // Limpiar timeouts al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (textTimeoutRef.current) {
        clearTimeout(textTimeoutRef.current);
      }
    };
  }, []);

  const initials = personalInfo?.nombre 
    ? personalInfo.nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'SS';

  return (
    <>
      {/* Badge deslizante para desktop */}
      <div 
        className={`linkedin-badge-container ${isVisible ? 'linkedin-badge-visible' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div onClick={openLinkedIn} className="linkedin-badge-card">
          {/* Indicador visual de hint */}
          <div className="linkedin-badge-hint" aria-hidden="true"></div>
          
          {/* Avatar circular siempre visible */}
          <div className="linkedin-badge-avatar">
            <img 
              src={personalInfo?.foto || "https://media.licdn.com/dms/image/v2/D4D03AQE7nE8zvNLI5Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1709681327803?e=1738800000&v=beta&t=yGjCpEQoQdBJDYI7Qe09PGP96Zs5DQXLyHCM0kfZ9eU"} 
              alt={personalInfo?.nombre || "Samir Elías Salatino"}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="linkedin-badge-avatar-fallback" style={{ display: 'none' }}>
              {initials}
            </div>
          </div>
          
          {/* Información del perfil */}
          <div className={`linkedin-badge-info ${isTextVisible ? 'linkedin-badge-text-visible' : ''}`}>
            <div className="linkedin-badge-header">
              <Linkedin size={14} />
              <span className="linkedin-badge-label">LinkedIn Profile</span>
            </div>
            
            <div className="linkedin-badge-name">
              {personalInfo?.nombre || "Samir Elías Salatino"}
            </div>
            
            <div className="linkedin-badge-title">
              {personalInfo?.titulo || "Desarrollador Backend Java | Full-Stack Developer"}
            </div>
            
            <div className="linkedin-badge-location">
              <span>📍</span>
              <span>{personalInfo?.ubicacion || "Mendoza, Argentina"}</span>
            </div>
            
            <div className="linkedin-badge-status">
              Open to Work
            </div>
          </div>
          
          {/* Flecha indicadora */}
          <div className={`linkedin-badge-arrow ${isTextVisible ? 'linkedin-badge-text-visible' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" opacity="0.8">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Botón flotante para móvil */}
      <div className="linkedin-badge-mobile">
        <div className="linkedin-badge-mobile-ring" aria-hidden="true"></div>
        <div 
          onClick={openLinkedIn}
          className="linkedin-badge-mobile-button"
          aria-label="Ver perfil de LinkedIn"
        >
          <Linkedin size={24} color="white" />
        </div>
        <div className="linkedin-badge-mobile-tooltip">
          LinkedIn
        </div>
      </div>
    </>
  );
};

export default LinkedInBadge;