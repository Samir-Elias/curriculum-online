import React from "react";
import { motion } from "framer-motion";
import { 
  Award,
  Globe,
  Building
} from "lucide-react";
import { Badge } from "./ui/badge";

const ObjectiveSection = ({ objetivoProfesional, isVisible, containerVariants, itemVariants }) => {
  return (
    <motion.section 
      id="objective"
      className="mb-12 sm:mb-16"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible.objective ? "visible" : "hidden"}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800"
        variants={itemVariants}
      >
        <Award className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-emerald-600" />
        Objetivo Profesional
      </motion.h2>
      <motion.div 
        className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 sm:p-8 shadow-lg border-l-4 border-l-emerald-600"
        variants={itemVariants}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 break-words">{objetivoProfesional.titulo}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed text-base sm:text-lg">{objetivoProfesional.descripcion}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm sm:text-base">
              <Globe className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />
              Modalidades preferidas:
            </h4>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {objetivoProfesional.modalidades.map((modalidad, index) => (
                <Badge key={index} className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200 text-xs">
                  {modalidad}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm sm:text-base">
              <Building className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
              Niveles de interés:
            </h4>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {objetivoProfesional.niveles.map((nivel, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 text-xs">
                  {nivel}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ObjectiveSection; 