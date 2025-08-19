import React from "react";
import { motion } from "framer-motion";
import { 
  Zap,
  Database,
  Server,
  Layout,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const TechStack = ({ tecnologiasCore, isVisible, containerVariants, itemVariants }) => {
  return (
    <motion.section 
      id="technologies"
      className="mb-12 sm:mb-16"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible.technologies ? "visible" : "hidden"}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800"
        variants={itemVariants}
      >
        <Zap className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-blue-600" />
        Stack Tecnológico
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-slate-600 h-full">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg text-slate-700 flex items-center">
                <Server className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                Backend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {tecnologiasCore.backend.map((tech, index) => (
                  <Badge key={index} className="bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 transition-colors text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600 h-full">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg text-blue-700 flex items-center">
                <Layout className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                Frontend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {tecnologiasCore.frontend.map((tech, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 transition-colors text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-600 h-full">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg text-emerald-700 flex items-center">
                <Database className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                Herramientas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {tecnologiasCore.herramientas.map((tech, index) => (
                  <Badge key={index} className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200 transition-colors text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-600 h-full">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg text-indigo-700 flex items-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                Metodologías
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {tecnologiasCore.metodologias.map((tech, index) => (
                  <Badge key={index} className="bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200 transition-colors text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TechStack;