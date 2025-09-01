"use client"
import { motion } from "framer-motion"
import HeroCardsContainer from "./HeroCardsContainer"
import "../styles/components/hero/index.css"

const HeroSection = ({ personalInfo = {}, itemVariants = {} }) => {
  return (
    <section className="hero-section" id="hero">
      <HeroCardsContainer personalInfo={personalInfo} itemVariants={itemVariants} />
    </section>
  )
}

export default HeroSection
