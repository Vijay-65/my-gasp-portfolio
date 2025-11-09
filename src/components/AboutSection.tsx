// src/components/AboutSection.tsx

import { useRef } from 'react';
import { Box, Typography, Container, Grid, Divider } from '@mui/material';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AboutSection = () => {
    // Ref for the entire section (the trigger)
    const sectionRef = useRef<HTMLDivElement>(null);
    // Ref for the image/headshot (for subtle Parallax)
    const imageRef = useRef<HTMLDivElement>(null);
    // Ref for the content/text (for sequenced reveal)
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // ----------------------------------------------------
        // 1. SCROLL-TRIGGERED ANIMATION: Image/Headshot Parallax
        // ----------------------------------------------------
        // We want the image to move slightly as the user scrolls through the section.
        gsap.to(imageRef.current, {
            y: 50, // Moves the image 50 pixels down over the scroll duration
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom', // Start when the top of the section enters the viewport
                end: 'bottom top',   // End when the bottom of the section leaves the viewport
                scrub: 1, // Smoothly link animation to scroll
            },
        });

        // ----------------------------------------------------
        // 2. SCROLL-TRIGGERED REVEAL: Staggered Content Entrance
        // ----------------------------------------------------
        // Use optional chaining and ensure the ref exists before using it
        const contentElement = contentRef.current;
        if (!contentElement) return; // Add an early return if the ref is null

        // Cast contentElement to HTMLElement if TypeScript complains about the second argument
        const contentItems = gsap.utils.toArray('.about-item', contentElement as HTMLElement);

        // Create a Timeline for precise sequencing
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: contentElement, // Use the checked element as the trigger
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });

        // Sequence 1: Main Title Slides In
        tl.from(contentItems[0] as HTMLElement, { // ⭐️ Cast the single element
            y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
        })
            // Sequence 2: Sub-content items stagger in
            .from(contentItems.slice(1) as HTMLElement[], { // ⭐️ Cast the slice (array)
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.15,
            }, '<0.2');

    }, { scope: sectionRef });

    return (
        <Box
            ref={sectionRef}
            id='about'
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                py: 10,
                backgroundColor: 'background.paper', // Slightly lighter background for contrast
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={8} alignItems="center">

                    {/* LEFT COLUMN: Headshot / Image (Animated) */}
                    <Grid size={{ xs: 12, md: 5 }} >
                        <Box ref={imageRef} sx={{ position: 'relative', textAlign: { xs: 'center', md: 'left' } }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: { xs: 300, md: 500 },
                                    maxWidth: 400,
                                    margin: { xs: '0 auto', md: 0 },
                                    borderRadius: 4,
                                    // Placeholder for your actual image
                                    backgroundColor: 'secondary.main',
                                    backgroundImage: 'url(/assets/your-headshot.jpg)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    boxShadow: 8,
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* RIGHT COLUMN: Bio / Content (Staggered Reveal) */}
                    <Grid size={{ xs: 12, md: 7 }} >
                        <Box ref={contentRef}>

                            {/* Main Title (about-item 0) */}
                            <Typography
                                variant="h2"
                                component="h2"
                                className="about-item"
                                sx={{ mb: 4, color: 'primary.main' }}
                            >
                                The Architect Behind the Pixels
                            </Typography>

                            {/* Bio Paragraphs (about-item 1 & 2) */}
                            <Typography variant="body1" className="about-item" sx={{ mb: 3 }}>
                                {/* Replace with your actual bio */}
                                I'm a seasoned UI/UX and Front-End specialist dedicated to building performance-optimized, attractive, and accessible web experiences. My process combines strategic product thinking with pixel-perfect execution, ensuring every micro-interaction serves a purpose.
                            </Typography>

                            <Divider className="about-item" sx={{ my: 4 }} />

                            {/* Key Skills/Facts (about-item 3, 4, 5) */}
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 6 }}>
                                    <Typography variant="h6" className="about-item">
                                        **Specialty:** Animated UI / GSAP
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Typography variant="h6" className="about-item">
                                        **Tools:** React, MUI, TypeScript
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="h6" className="about-item">
                                        **Location:** Global (Remote)
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