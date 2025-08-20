import React, { useState, useEffect } from "react";
import { profileData } from "../data/profileData";
import HeroSection from "./HeroSection";
import TechStack from "./TechStack";
import ProjectsSection from "./ProjectsSection";
import EducationSection from "./EducationSection";
import ObjectiveSection from "./ObjectiveSection";
import Footer from "./Footer";
import CertificateModal from "./CertificateModal";
// Opcional: Solo si quieres usar el debugger de imágenes
// import ImageDebugger from "./ImageDebugger";

const Resume = () => {
  const [isVisible, setIsVisible] = useState({});
  const [expandedProject, setExpandedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
          isVisible={isVisible}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />

        {/* Proyectos Destacados */}
        <ProjectsSection 
          proyectosDestacados={profileData.proyectosDestacados}
          isVisible={isVisible}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          expandedProject={expandedProject}
          setExpandedProject={setExpandedProject}
        />

        {/* Formación Técnica */}
        <EducationSection 
          formacionTecnica={profileData.formacionTecnica}
          isVisible={isVisible}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          setSelectedCertificate={setSelectedCertificate}
        />

        {/* Objetivo Profesional */}
        <ObjectiveSection 
          objetivoProfesional={profileData.objetivoProfesional}
          isVisible={isVisible}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
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