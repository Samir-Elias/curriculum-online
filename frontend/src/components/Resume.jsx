import React, { useState, useEffect } from "react";
import { profileData } from "../data/profileData";
import HeroSection from "./HeroSection";
import TechStack from "./TechStack";
import ProjectsSection from "./ProjectsSection"; // ← AÑADIR ESTE IMPORT
// import ScrollCheckpoints from "./ScrollCheckpoints"; // ← COMENTAR ESTA LÍNEA
import EducationSection from "./EducationSection";
import ObjectiveSection from "./ObjectiveSection";
import Footer from "./Footer";
import CertificateModal from "./CertificateModal";
import LoadingScreen from "./LoadingScreen";

const Resume = () => {
  const [isVisible, setIsVisible] = useState({});
  const [hasBeenVisible, setHasBeenVisible] = useState({});
  const [expandedEducation, setExpandedEducation] = useState(null);
  const [expandedObjective, setExpandedObjective] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Manejar el scroll del body durante la carga
    if (showLoading) {
      document.body.classList.add('loading');
      document.documentElement.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
      document.documentElement.classList.remove('loading');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.id;
          
          setIsVisible(prev => ({
            ...prev,
            [elementId]: entry.isIntersecting
          }));
          
          if (entry.isIntersecting) {
            setHasBeenVisible(prev => ({
              ...prev,
              [elementId]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Solo observar elementos si no estamos mostrando la pantalla de carga
    if (!showLoading) {
      document.querySelectorAll('[id]').forEach((el) => {
        observer.observe(el);
      });
    }

    return () => {
      observer.disconnect();
      // Limpiar clases al desmontar
      document.body.classList.remove('loading');
      document.documentElement.classList.remove('loading');
    };
  }, [showLoading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const getSectionVisibility = (sectionId) => {
    if (hasBeenVisible[sectionId]) {
      return "visible";
    }
    if (isVisible[sectionId]) {
      return "visible";
    }
    return "hidden";
  };

  // Función que se ejecuta cuando termina la carga
  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  // Si estamos mostrando la pantalla de carga, solo mostrar eso
  if (showLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // Resto del componente (se muestra después de la carga)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 print:bg-white">
      {/* Hero Section */}
      <HeroSection 
        personalInfo={profileData.personalInfo}
        itemVariants={itemVariants}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Stack Tecnológico */}
        <TechStack 
          tecnologiasCore={profileData.tecnologiasCore}
          isVisible={{
            ...isVisible,
            techstack: getSectionVisibility('techstack') === 'visible'
          }}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />

        {/* Proyectos Destacados - NUEVO Sistema Responsive */}
        <ProjectsSection 
          proyectosDestacados={profileData.proyectosDestacados}
          isVisible={{
            ...isVisible,
            projects: getSectionVisibility('projects') === 'visible'
          }}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />

        {/* Formación Técnica */}
        <EducationSection 
          formacionTecnica={profileData.formacionTecnica}
          isVisible={{
            ...isVisible,
            education: getSectionVisibility('education') === 'visible'
          }}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          setSelectedCertificate={setSelectedCertificate}
          expandedEducation={expandedEducation}
          setExpandedEducation={setExpandedEducation}
        />

        {/* Objetivo Profesional */}
        <ObjectiveSection 
          objetivoProfesional={profileData.objetivoProfesional}
          isVisible={{
            ...isVisible,
            objective: getSectionVisibility('objective') === 'visible'
          }}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          expandedObjective={expandedObjective}
          setExpandedObjective={setExpandedObjective}
        />
      </div>

      {/* Footer */}
      <Footer personalInfo={profileData.personalInfo} />

      {/* Modal para certificaciones */}
      <CertificateModal 
        selectedCertificate={selectedCertificate}
        setSelectedCertificate={setSelectedCertificate}
      />
    </div>
  );
};

export default Resume;