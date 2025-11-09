import { useRef, useEffect } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // -----------------------------
        // 🌈 Floating Gradient Overlay Motion
        // -----------------------------
        gsap.to(overlayRef.current, {
            backgroundPosition: "200% center",
            duration: 10,
            repeat: -1,
            ease: "linear",
        });

        // -----------------------------
        // 🎥 Headshot 3D Parallax
        // -----------------------------
        gsap.to(imageRef.current, {
            y: 100,
            rotateY: 10,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            },
        });

        // -----------------------------
        // ✨ Text Split & Stagger Animation
        // -----------------------------
        if (contentRef.current) {
            const split = new SplitType(contentRef.current.querySelector(".about-title") as HTMLElement, {
                types: "chars",
            });

            gsap.from(split.chars, {
                yPercent: 120,
                opacity: 0,
                rotateX: -90,
                stagger: 0.03,
                duration: 1.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });
        }

        // -----------------------------
        // 🪄 Content Fade-up Cascade
        // -----------------------------
        gsap.from(".about-item", {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: contentRef.current,
                start: "top 85%",
            },
        });
    }, { scope: sectionRef });

    return (
        <Box
            ref={sectionRef}
            id="about"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                background: "radial-gradient(circle at top left, #0f2027, #203a43, #2c5364)",
            }}
        >
            {/* 🌈 Floating Gradient Overlay */}
            <Box
                ref={overlayRef}
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(120deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)",
                    backgroundSize: "200% 200%",
                    mixBlendMode: "overlay",
                    zIndex: 0,
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
                <Grid container spacing={8} alignItems="center">
                    {/* 🧠 LEFT: Headshot */}
                    <Grid size={{xs:12,md:5}} >
                        <Box
                            ref={imageRef}
                            sx={{
                                position: "relative",
                                mx: { xs: "auto", md: 0 },
                                width: "90%",
                                maxWidth: 420,
                                height: { xs: 320, md: 520 },
                                borderRadius: "30px",
                                overflow: "hidden",
                                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {/* 🔮 Glowing Border */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "inherit",
                                    boxShadow: "0 0 40px 5px rgba(0,255,255,0.2)",
                                }}
                            />
                            {/* 📸 Headshot Image */}
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundImage: "url(/assets/your-headshot.jpg)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    transform: "translateZ(30px)",
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* 🧩 RIGHT: Bio Content */}

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Box ref={contentRef}>
                            <Typography
                                variant="h2"
                                component="h2"
                                className="about-title"
                                sx={{
                                    mb: 4,
                                    fontWeight: 700,
                                    color: "#00e5ff",
                                    textShadow: "0 0 20px rgba(0,229,255,0.3)",
                                }}
                            >
                                The Architect Behind the Pixels
                            </Typography>

                            <Typography
                                variant="body1"
                                className="about-item"
                                sx={{
                                    mb: 3,
                                    color: "rgba(255,255,255,0.85)",
                                    fontSize: "1.1rem",
                                    lineHeight: 1.7,
                                }}
                            >
                                I’m a creative technologist and front-end specialist passionate about
                                crafting immersive, performance-optimized, and intuitive digital experiences.
                                Each interface I design tells a story — blending logic, aesthetics, and emotion
                                to create something truly memorable.
                            </Typography>

                            <Typography
                                variant="body1"
                                className="about-item"
                                sx={{
                                    mb: 5,
                                    color: "rgba(255,255,255,0.75)",
                                    fontSize: "1rem",
                                }}
                            >
                                With expertise spanning React, GSAP, and UI design systems, I focus on building
                                fluid, story-driven experiences that feel alive and human.
                            </Typography>

                            <Grid container spacing={3} className="about-item">
                                <Grid size={{ xs: 6 }}>
                                    <Typography sx={{ color: "#80deea", fontWeight: 600 }}>
                                        ⚡ Specialty: Animated UI / GSAP
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Typography sx={{ color: "#80deea", fontWeight: 600 }}>
                                        🧩 Tools: React, MUI, TypeScript
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Typography sx={{ color: "#80deea", fontWeight: 600 }}>
                                        🌍 Location: Global (Remote)
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AboutSection;
