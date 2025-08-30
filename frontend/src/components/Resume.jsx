import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import HeroSection from './HeroSection';
import TechStack from './TechStack';
import ProjectsSection from './ProjectsSection';
import EducationSection from './EducationSection';
import ObjectiveSection from './ObjectiveSection';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';
import BackgroundAnimation from './BackgroundAnimation';
import CertificateModal from './CertificateModal';
import { profileData } from '../data/profileData';
import { useModal } from '../context/ModalContext';

const Resume = ({ onAppLoadingComplete }) => {
  const [showLoading, setShowLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [expandedEducation, setExpandedEducation] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const { isModalOpen } = useModal();
  
  // Estados para controlar la visibilidad de secciones
  const [isVisible, setIsVisible] = useState({
    hero: false,
    techstack: false,
    projects: false,
    education: false,
    objective: false
  });
  
  const [hasBeenVisible, setHasBeenVisible] = useState({
    hero: false,
    techstack: false,
    projects: false,
    education: false,
    objective: false
  });

  // Detectar si es móvil
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Manejar el scroll del body durante la carga
    if (showLoading) {
      document.body.classList.add('loading');
      document.documentElement.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
      document.documentElement.classList.remove('loading');
    }

    // Limpiar clases de checkpoints si existen
    document.body.classList.remove('checkpoints-active');
    document.documentElement.classList.remove('checkpoints-active');

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
      document.body.classList.remove('checkpoints-active');
      document.documentElement.classList.remove('checkpoints-active');
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
    // Notificar a App.js que la carga terminó
    if (onAppLoadingComplete) {
      onAppLoadingComplete();
    }
  };

    return (
    <>
      {/* LoadingScreen con AnimatePresence para transición suave */}
      <LoadingScreen onLoadingComplete={handleLoadingComplete} showLoading={showLoading} />
      
      {/* Background Animation con transición suave */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          opacity: showLoading ? 0 : 1,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <BackgroundAnimation isMobile={isMobile} isPaused={isModalOpen} />
      </motion.div>
      
      {/* Contenido principal con transición suave */}
      <motion.div 
        className="relative min-h-screen"
        style={{
          opacity: showLoading ? 0 : 1,
          filter: showLoading ? 'blur(20px)' : 'blur(0px)',
          transform: showLoading ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 1s ease-in-out',
          pointerEvents: showLoading ? 'none' : 'auto',
          minHeight: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          overflowY: 'auto'
        }}
      >

      
        {/* Contenido principal con z-index para estar sobre el background */}
        <div className="relative z-1">
          {/* Hero Section con título del TechStack */}
          <HeroSection 
            personalInfo={profileData.personalInfo}
            itemVariants={itemVariants}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Stack Tecnológico sin título */}
            <TechStack 
              tecnologiasCore={profileData.tecnologiasCore}
              isVisible={{
                ...isVisible,
                techstack: getSectionVisibility('techstack') === 'visible'
              }}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />

            {/* PROYECTOS DESTACADOS - CORREGIDO */}
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
            />
          </div>

          {/* Espaciado adicional antes del footer */}
          <div className="h-8 sm:h-12"></div>

          {/* Footer */}
          <Footer personalInfo={profileData.personalInfo} />

          {/* Modal para certificaciones */}
          <CertificateModal 
            selectedCertificate={selectedCertificate}
            setSelectedCertificate={setSelectedCertificate}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Resume;