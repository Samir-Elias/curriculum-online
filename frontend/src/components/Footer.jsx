import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  Linkedin,
  Coffee
} from "lucide-react";
import { Button } from "./ui/button";

const Footer = ({ personalInfo }) => {
  return (
    <footer id="footer" className="bg-slate-900 text-white py-8 sm:py-12 print:hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Conectemos y creemos algo increíble juntos</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            6 años de experiencia autodidacta me han preparado para contribuir desde el día uno. 
            Busco un equipo donde pueda aplicar mi pasión por el desarrollo Backend y seguir creciendo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
            <Button 
              variant="secondary" 
              size="sm"
              className="text-xs sm:text-sm px-3 sm:px-4 bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => window.open(`mailto:${personalInfo.email}`)}
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="break-all sm:break-normal">{personalInfo.email}</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-400 text-white hover:bg-white hover:text-slate-900 text-xs sm:text-sm px-3 sm:px-4"
              onClick={() => window.open(`tel:${personalInfo.telefono}`)}
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              {personalInfo.telefono}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-400 text-white hover:bg-white hover:text-slate-900 text-xs sm:text-sm px-3 sm:px-4"
              onClick={() => window.open(personalInfo.linkedin)}
            >
              <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              LinkedIn
            </Button>
          </div>
          <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-gray-400">
            <Coffee className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Desarrollado desde Mendoza, Argentina</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;