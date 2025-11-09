import { useRef, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectTile from "./ProjectTile";
import { featuredProjects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // ⭐️ Floating glowing grid background animation
  useEffect(() => {
    const gridLines = gsap.utils.toArray(".grid-line");
    gsap.to(gridLines, {
      opacity: "random(0.2,0.6)",
      duration: "random(1,3)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });
  }, []);

  useGSAP(() => {
    const innerWrap = innerWrapRef.current;
    if (!innerWrap) return;

    const totalScrollWidth = innerWrap.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: `+=${totalScrollWidth}`,
      },
    });

    // Horizontal Scroll Animation
    tl.to(innerWrap, {
      x: -totalScrollWidth,
      ease: "none",
    });

    // Fade the title as user scrolls horizontally
    gsap.to(titleRef.current, {
      opacity: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom+=200 top",
        scrub: 1,
      },
    });
  }, { scope: sectionRef });

  return (
    <Box
      ref={sectionRef}
      id="projects"
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        color: "#fff",
      }}
    >
      {/* ✨ Animated glowing grid overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 30%, #00e5ff10, transparent 70%)",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <Box
            key={i}
            className="grid-line"
            sx={{
              position: "absolute",
              top: `${(i * 5)}%`,
              left: 0,
              width: "100%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #00e5ff40, transparent)",
              opacity: 0.3,
            }}
          />
        ))}
      </Box>

      {/* Section Title */}
      <Container maxWidth={false} sx={{ py: 6, zIndex: 2, position: "relative" }}>
        <Typography
          ref={titleRef}
          variant="h3"
          component="h2"
          sx={{
            mb: 4,
            ml: 4,
            fontWeight: 700,
            textShadow: "0 0 20px rgba(0,229,255,0.4)",
            letterSpacing: 2,
            textTransform: "uppercase",
            background: "linear-gradient(90deg,#00e5ff,#7b61ff)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Featured Works
        </Typography>
      </Container>

      {/* ⭐️ Horizontal Scrolling Section */}
      <Box
        ref={innerWrapRef}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          px: 10,
          height: "calc(100vh - 150px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {featuredProjects.map((project, i) => (
          <Box
            key={project.id}
            sx={{
              perspective: 1000,
              mr: 6,
              flexShrink: 0,
              position: "relative",
            }}
          >
            <ProjectTile project={project} />
          </Box>
        ))}

        {/* Final CTA Tile */}
        <Box
          sx={{
            width: 400,
            flexShrink: 0,
            textAlign: "center",
            p: 4,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 0 30px rgba(0,229,255,0.3)",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
            Ready for the Next Big Thing?
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(90deg,#00e5ff,#7b61ff)",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 40px rgba(123,97,255,0.7)",
              },
            }}
          >
            Let’s Talk
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectShowcase;
