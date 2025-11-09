import { useRef } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../assets/project1.jpg";
import img2 from "../assets/project2.jpg";
import img3 from "../assets/project3.jpg";
import img4 from "../assets/project4.jpeg";

// ✅ Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const hobbiesData = [
    { text: "Photography", image: img1 },
    { text: "Cooking", image: img2 },
    { text: "3D Animation", image: img3 },
    { text: "Reading", image: img4 },
    { text: "Hiking", image: "/assets/hobby-hiking.jpg" },
    { text: "Coding", image: "/assets/hobby-coding.jpg" },
];

const HobbiesSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        // ✨ Text fade-in
        gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                },
            }
        );

        // ✨ Image grid fade-in (staggered)
        gsap.fromTo(
            imageRefs.current,
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
            }
        );
    }, []);

    return (
        <Box
            ref={sectionRef}
            id="hobbies"
            sx={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                py: { xs: 8, md: 12 },
            }}
        >
            {/* ✨ Text Section */}
            <Container
                maxWidth="md"
                sx={{
                    textAlign: "center",
                    mb: { xs: 6, md: 8 },
                }}
            >
                <Box ref={textRef}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "text.secondary",
                            mb: 2,
                            letterSpacing: 0.5,
                        }}
                    >
                        When I'm not crafting digital experiences, I enjoy...
                    </Typography>
                    <Typography
                        variant="h2"
                        component="h3"
                        sx={{
                            fontWeight: 700,
                            color: "primary.main",
                            "& .highlight": {
                                color: (theme) => theme.palette.secondary.main,
                                backgroundColor: "rgba(255,255,255,0.08)",
                                px: 1.2,
                                py: 0.3,
                                borderRadius: "8px",
                                mx: 0.4,
                                display: "inline-block",
                            },
                        }}
                    >
                        <span className="highlight">Photography</span>,
                        <span className="highlight"> Cooking</span>, and
                        <span className="highlight"> 3D Animation</span>.
                    </Typography>
                </Box>
            </Container>

            {/* 🖼️ Image Grid */}
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                >
                    {hobbiesData.map((hobby, index) => (
                        <Grid

                            key={index}


                            size={{ xs: 12, sm: 6, md: 4 }}
                            display="flex"
                            justifyContent="center"
                        >
                            <Box
                                ref={(el: HTMLDivElement | null) => {
                                    imageRefs.current[index] = el;
                                }}
                                sx={{
                                    width: "100%",
                                    maxWidth: 300,
                                    height: 220,
                                    borderRadius: "20px",
                                    backgroundImage: `url(${hobby.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                                    border: "2px solid rgba(255,255,255,0.1)",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
                                    },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default HobbiesSection;
