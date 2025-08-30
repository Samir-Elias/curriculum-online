import React, { Suspense, lazy } from 'react';

// Componente de fallback para cuando el icono está cargando
const IconFallback = () => (
  <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
);

// Función para cargar SVG dinámicamente
const loadSVGIcon = (iconName) => {
  return lazy(() => 
    import(`./svg/${iconName}.svg`)
      .then(module => ({ default: () => <img src={module.default} alt={iconName} className="w-5 h-5" /> }))
      .catch(() => ({ default: () => <IconFallback /> }))
  );
};

// Mapeo de tecnologías a nombres de archivos SVG
const techToSVGMap = {
  "React": "react",
  "JavaScript": "javascript",
  "CSS3": "css3",
  "HTML5": "html5",
  "Java": "java",
  "Spring Boot": "spring",
  "MySQL": "mysql",
  "PostgreSQL": "postgresql",
  "Node.js": "node",
  "MongoDB": "mongo",
  "Express": "express",
  "Tailwind CSS": "tailwind",
  "Framer Motion": "framer",
  "Firebase": "firebase",
  "Android": "android",
  "Bootstrap": "bootstrap",
  "Python": "python",
  "FastAPI": "fastapi",
  "Thymeleaf": "thymeleaf",
  "GitHub": "github",
  "IntelliJ IDEA": "intellij",
  "Docker": "docker",
  "Figma": "figma",
  "Claude": "claude",
  "Cursor": "cursor",
  "N8N": "n8n",
  "Scrum": "scrum",
  "Agile": "agile",
  "Sprints": "sprints",
  "Teamwork": "teamwork",
  "UX/UI Design": "uxui",
  "User Research": "userresearch"
};

// Componente optimizado para iconos
export const OptimizedTechIcon = ({ tech, className = "w-5 h-5" }) => {
  const svgName = techToSVGMap[tech];
  
  if (!svgName) {
    // Fallback para tecnologías no mapeadas
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
      </svg>
    );
  }

  const LazyIcon = loadSVGIcon(svgName);

  return (
    <Suspense fallback={<IconFallback />}>
      <LazyIcon />
    </Suspense>
  );
};

// Función helper para obtener el icono optimizado
export const getOptimizedTechIcon = (tech) => {
  return <OptimizedTechIcon tech={tech} />;
};
