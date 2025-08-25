import React from 'react';
import { Linkedin } from 'lucide-react';

const LinkedInBadge = ({ personalInfo }) => {
  const openLinkedIn = () => {
    window.open(personalInfo?.linkedin || 'https://ar.linkedin.com/in/samir-elias', '_blank', 'noopener,noreferrer');
  };

  const initials = personalInfo?.nombre 
    ? personalInfo.nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'SS';

  return (
    <>
      {/* Badge deslizante para desktop */}
      <div className="linkedin-badge-container">
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
          <div className="linkedin-badge-info">
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
          <div className="linkedin-badge-arrow">
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