import { useState, useEffect } from "react";
import { Box, Fade } from "@mui/material";
import HeroSection from "../components/HeroSection";
import ProjectShowcase from "../components/ProjectShowcase";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingNav from "../components/FloatingNavBar";
import HobbiesSection from "../components/HobbiesSection";
import { SignaturePreloader } from "../components/PreLoader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  // When preloader finishes (e.g. after 4.5s), show main content
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box component="main" sx={{ backgroundColor: "background.default", minHeight: "300vh" }}>
      {loading ? (
        // Show preloader only while loading
        <SignaturePreloader />
      ) : (
        // Fade in main content after preloader
        <Fade in={!loading} timeout={1200}>
          <Box>
            <Header />
            <FloatingNav />
            <HeroSection />
            <ProjectShowcase />
            <AboutSection />
            <HobbiesSection />
            <ContactSection />
            <Footer />
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default Home;
