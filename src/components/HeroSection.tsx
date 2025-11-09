import { useRef, useEffect } from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroTitle = "DESIGNING DIGITAL EXPERIENCE";
const heroSubtitle = "Senior UI/UX Designer & Front-End Developer.";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  // ⭐️ Particle Background Animation
  useEffect(() => {
    const particles = gsap.utils.toArray(".floating-dot");
    gsap.to(particles, {
      y: "random(-30, 30)",
      x: "random(-30, 30)",
      opacity: "random(0.3, 0.8)",
      duration: "random(4, 8)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
    });
  }, []);

  // ⭐️ Main GSAP Animation
  useGSAP(() => {
    const words = gsap.utils.toArray(".hero-word");

    gsap.from(words, {
      y: 100,
      opacity: 0,
      duration: 1.3,
      ease: "power4.out",
      stagger: 0.1,
      delay: 0.4,
    });

    gsap.from(imageRef.current, {
      x: 100,
      opacity: 0,
      duration: 1.3,
      ease: "power3.out",
      delay: 1.1,
    });

    gsap.from(ctaRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 1.5,
    });

    // Parallax BG movement
    gsap.to(backgroundRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  }, { scope: containerRef });

  return (
    <Box
      ref={containerRef}
      id="hero"
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        p: 4,
        color: "#fff",
      }}
    >
      {/* ✨ Animated Gradient Background */}
      <Box
        ref={backgroundRef}
        sx={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 30% 50%, #00c6ff20, #0a0a0a 80%)",
          zIndex: 0,
        }}
      />

      {/* ✨ Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          className="floating-dot"
          sx={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#00e5ff" : "#7b61ff",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.4,
            zIndex: 0,
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Text Section */}
          <Grid size={{xs:12, md:7}} >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "3.5rem" },
                lineHeight: 1.2,
                textShadow: "0 0 25px rgba(0,229,255,0.3)",
              }}
            >
              {heroTitle.split(" ").map((word, index) => (
                <span
                  key={index}
                  className="hero-word"
                  style={{
                    display: "inline-block",
                    marginRight: "12px",
                    background:
                      "linear-gradient(90deg,#00e5ff,#7b61ff)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {word}
                </span>
              ))}
            </Typography>

            <Typography
              variant="h5"
              className="hero-word"
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontWeight: 300,
                mb: 4,
                maxWidth: 600,
              }}
            >
              {heroSubtitle}
            </Typography>

            <Button
              ref={ctaRef}
              variant="contained"
              size="large"
              sx={{
                py: 1.4,
                px: 4,
                fontSize: "1.1rem",
                borderRadius: "30px",
                background:
                  "linear-gradient(90deg, #00e5ff, #7b61ff)",
                boxShadow: "0 0 25px rgba(0,229,255,0.5)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 40px rgba(123,97,255,0.7)",
                },
              }}
            >
              View Featured Projects
            </Button>
          </Grid>

          {/* Right Graphic Section */}
          <Grid size={{xs:12,md:5}} >
            <Box
              ref={imageRef}
              sx={{
                width: "100%",
                maxWidth: 380,
                height: 380,
                borderRadius: "50%",
                mx: "auto",
                position: "relative",
                background:
                  "radial-gradient(circle at 30% 30%, #7b61ff, #00e5ff)",
                boxShadow:
                  "0 0 40px rgba(0,229,255,0.5), inset 0 0 40px rgba(123,97,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "url('/path-to-your-photo.png') center/cover no-repeat",
                  borderRadius: "50%",
                  opacity: 0.95,
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
