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
import { getTechIcon } from "../icons/TechIcons";

const TechStack = ({ tecnologiasCore, isVisible, containerVariants, itemVariants }) => {
  return (
    <motion.section 
      id="techstack"
      className="techstack-floating-section"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible.techstack ? "visible" : "hidden"}
    >
      <div className="techstack-floating-container">
        <motion.h2 
          className="techstack-floating-title"
          variants={itemVariants}
        >
          <Zap className="techstack-floating-icon" />
          Stack Tecnoló<span style={{ color: '#10b981' }}>G</span>ico
        </motion.h2>
        <div className="techstack-floating-grid">
          <motion.div variants={itemVariants}>
            <Card className="techstack-floating-card backend-card">
              <CardHeader className="techstack-floating-card-header">
                <CardTitle className="techstack-floating-card-title">
                  <Server className="techstack-floating-card-icon" />
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent className="techstack-floating-card-content">
                <div className="techstack-floating-badges">
                  {tecnologiasCore.backend.map((tech, index) => (
                    <Badge key={index} className="techstack-floating-badge backend-badge">
                      <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                      <span className="tech-name">{tech}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="techstack-floating-card frontend-card">
              <CardHeader className="techstack-floating-card-header">
                <CardTitle className="techstack-floating-card-title">
                  <Layout className="techstack-floating-card-icon" />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent className="techstack-floating-card-content">
                <div className="techstack-floating-badges">
                  {tecnologiasCore.frontend.map((tech, index) => (
                    <Badge key={index} className="techstack-floating-badge frontend-badge">
                      <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                      <span className="tech-name">{tech}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="techstack-floating-card tools-card">
              <CardHeader className="techstack-floating-card-header">
                <CardTitle className="techstack-floating-card-title">
                  <Database className="techstack-floating-card-icon" />
                  Herramientas
                </CardTitle>
              </CardHeader>
              <CardContent className="techstack-floating-card-content">
                <div className="techstack-floating-badges">
                  {tecnologiasCore.herramientas.map((tech, index) => (
                    <Badge key={index} className="techstack-floating-badge tools-badge">
                      <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                      <span className="tech-name">{tech}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="techstack-floating-card methodologies-card">
              <CardHeader className="techstack-floating-card-header">
                <CardTitle className="techstack-floating-card-title">
                  <Users className="techstack-floating-card-icon" />
                  Metodologías
                </CardTitle>
              </CardHeader>
              <CardContent className="techstack-floating-card-content">
                <div className="techstack-floating-badges">
                  {tecnologiasCore.metodologias.map((tech, index) => (
                    <Badge key={index} className="techstack-floating-badge methodologies-badge">
                      <span className="tech-icon-medium">{getTechIcon(tech)}</span>
                      <span className="tech-name">{tech}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default TechStack;