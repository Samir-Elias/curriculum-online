import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin,
  Download,
  Code,
  Globe
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const HeroSection = ({ personalInfo, itemVariants }) => {
  const downloadPDF = () => {
    window.print();
  };

  return (
    <motion.section 
      id="hero"
      className="hero-section relative bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white print:bg-gray-800"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.6,
            staggerChildren: 0.1
          }
        }
      }}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12"
          variants={itemVariants}
        >
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 border-4 border-white shadow-2xl">
              <AvatarImage src={personalInfo.foto} alt="Samir Salatino" className="object-cover" />
              <AvatarFallback className="text-2xl sm:text-3xl lg:text-4xl bg-white text-blue-600">
                SS
              </AvatarFallback>
            </Avatar>
          </motion.div>
          
          <div className="text-center lg:text-left flex-1">
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight"
              variants={itemVariants}
            >
              {personalInfo.nombre}
            </motion.h1>
            <motion.h2 
              className="text-lg sm:text-xl lg:text-2xl mb-4 text-blue-200 font-semibold"
              variants={itemVariants}
            >
              {personalInfo.titulo}
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg mb-6 text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              variants={itemVariants}
            >
              {personalInfo.bio}
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                <MapPin size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <span>{personalInfo.ubicacion}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                <Code size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <span>{personalInfo.experiencia}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                <Globe size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Disponible para remoto</span>
              </div>
            </motion.div>
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4"
              variants={itemVariants}
            >
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg print:hidden text-xs sm:text-sm px-3 sm:px-4 py-2"
                onClick={() => window.open(`mailto:${personalInfo.email}`)}
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">{personalInfo.email}</span>
                <span className="sm:hidden">Email</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-white hover:bg-white hover:text-gray-900 print:hidden text-xs sm:text-sm px-3 sm:px-4 py-2"
                onClick={downloadPDF}
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Descargar PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-white hover:bg-white hover:text-gray-900 print:hidden text-xs sm:text-sm px-3 sm:px-4 py-2"
                onClick={() => window.open(personalInfo.github)}
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                GitHub
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-white hover:bg-white hover:text-gray-900 print:hidden text-xs sm:text-sm px-3 sm:px-4 py-2"
                onClick={() => window.open(personalInfo.website)}
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Portfolio</span>
                <span className="sm:hidden">Web</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white to-transparent print:hidden"></div>
    </motion.section>
  );
};

export default HeroSection;