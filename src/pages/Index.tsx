import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FlyingBirds from "@/components/FlyingBirds";
import MusicToggle from "@/components/MusicToggle";
import SplashScreen from "@/components/SplashScreen";
import ThemeMaskToggle from "@/components/ThemeMaskToggle";
import ScrollCompanionBird from "@/components/ScrollCompanionBird";

const Index = () => {
  const [started, setStarted] = useState(false);

  return (
    <>
      <SplashScreen visible={!started} onStart={() => setStarted(true)} />
      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="min-h-screen bg-background overflow-x-hidden"
          >
            <FlyingBirds />
            <ScrollCompanionBird />
            <MusicToggle />
            <ThemeMaskToggle />
            <Navbar />
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
