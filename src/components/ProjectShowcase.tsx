// src/components/ProjectShowcase.tsx

import { useRef } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import ProjectTile from './ProjectTile';
import { featuredProjects } from '../data/projects'

const ProjectShowcase = () => {
    // 1. Ref for the entire section (This gets PINNED by ScrollTrigger)
    const sectionRef = useRef<HTMLDivElement>(null);
    // 2. Ref for the INNER container (This gets ANIMATED HORIZONTALLY)
    const innerWrapRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // ----------------------------------------------------
        // ⭐️ Horizontal Scroll Logic with Pinning ⭐️
        // ----------------------------------------------------

        const innerWrap = innerWrapRef.current;
        if (!innerWrap) return;

        // Calculate the total width to scroll based on the content width
        // window.innerWidth is roughly the start width, and we scroll the difference.
        // SCROLL WIDTH = Total Content Width - Viewport Width
        const totalScrollWidth = innerWrap.scrollWidth - window.innerWidth;

        // Use a GSAP Timeline for precise control (though a simple tween works here too)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true, // ⭐️ Crucial: Pins the section to the viewport
                scrub: 1,  // Links the animation smoothly to the scroll
                start: 'top top',
                // Sets the duration of the pin. The section stays pinned until the
                // horizontal scroll is complete.
                end: `+=${totalScrollWidth}`,
            },
        });

        // Animate the inner wrapper's X position from 0 (start) to the calculated width (end)
        tl.to(innerWrap, {
            x: -totalScrollWidth, // Moves content to the left by the total distance
            ease: 'none',
        });

        // ----------------------------------------------------
        // Optional: Individual Tile Scroll-Triggered Animation (e.g., Fade-in)
        // ----------------------------------------------------
        // Since the content is moving, you can add Parallax or opacity changes here,
        // though the horizontal motion is the primary attractive animation.

    }, { scope: sectionRef });

    return (
        <Box
            ref={sectionRef}
            id='projects'
            sx={{
                position: 'relative',
                height: '100vh', // This dictates the space it occupies before pinning
                width: '100vw',
            }}
        >
            <Container maxWidth={false} sx={{ py: 8 }}>
                <Typography variant="h3" component="h2" sx={{ mb: 4, ml: 4 }}>
                    Featured Works
                </Typography>
            </Container>

            {/* ⭐️ INNER WRAPPER - This is the element that gets moved HORIZONTALLY */}
            <Box
                ref={innerWrapRef}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    p: '0 64px', // Padding on left/right for the start/end view
                    height: 'calc(100vh - 150px)', // Adjust height relative to the pin
                }}
            >
                {featuredProjects.map((project) => (
                    <ProjectTile key={project.id} project={project} />
                ))}

                {/* Final CTA Tile to push the end of the scroll */}
                <Box sx={{ width: '400px', flexShrink: 0, textAlign: 'center' }}>
                    <Typography variant="h4">Ready for the next big thing?</Typography>
                    <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                        Let's Talk
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProjectShowcase;