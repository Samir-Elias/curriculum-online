import React from 'react';
import { Linkedin } from 'lucide-react';

const LinkedInBadge = ({ personalInfo }) => {
  const openLinkedIn = () => {
    window.open(personalInfo?.linkedin || 'https://ar.linkedin.com/in/samir-elias', '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed top-4 right-4 z-50 hidden lg:block print:hidden"
      style={{ zIndex: 9999 }}
    >
      <div 
        onClick={openLinkedIn}
        className="bg-[#0A66C2] hover:bg-[#004182] text-white px-4 py-2 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-3 min-w-[280px] group"
      >
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <img 
              src={personalInfo?.foto || "https://media.licdn.com/dms/image/v2/D4D03AQE7nE8zvNLI5Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1709681327803?e=1738800000&v=beta&t=yGjCpEQoQdBJDYI7Qe09PGP96Zs5DQXLyHCM0kfZ9eU"} 
              alt={personalInfo?.nombre || "Samir Elías Salatino"}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-sm font-semibold hidden">
              {personalInfo?.nombre ? personalInfo.nombre.split(' ').map(n => n[0]).join('').slice(0, 2) : 'SS'}
            </div>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <Linkedin size={16} className="flex-shrink-0" />
            <span className="text-xs font-medium text-blue-100">LinkedIn</span>
          </div>
          <div className="text-sm font-semibold text-white truncate">
            {personalInfo?.nombre || "Samir Elías Salatino"}
          </div>
          <div className="text-xs text-blue-200 truncate">
            {personalInfo?.titulo || "Desarrollador Backend Java | Full-Stack Developer"}
          </div>
        </div>
        
        <div className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7z"/>
          </svg>
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Ver perfil completo en LinkedIn
        </div>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </div>
  );
};

export default LinkedInBadge;