// src/components/ContactSection.tsx

import { useRef } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null); 
  const ctaButtonRef = useRef<HTMLButtonElement>(null); 

  useGSAP(() => {
    // ----------------------------------------------------
    // 1. SCROLL-TRIGGERED COLOR SHIFT (Dramatic Reveal)
    // ----------------------------------------------------
    // Change the background color of the main body/container when this section enters.
    gsap.to(sectionRef.current, {
        backgroundColor: '#FFFFFF', // Shift to a bright white
        color: '#0A0A0A',           // Shift text color to black/dark
        ease: 'power1.inOut',
        scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',      // Start the transition when the section hits the middle of the viewport
            end: 'center center',     // Finish the transition quickly
            scrub: 0.5,               // Smoothly link the color transition to the scroll
        },
    });

    // ----------------------------------------------------
    // 2. CTA BUTTON HOVER ANIMATION (Attractive Micro-Interaction)
    // ----------------------------------------------------
    const button = ctaButtonRef.current;
    if (!button) return;

    // Create a GSAP timeline for the hover effect
    gsap.to(button, {
        scale: 1.05, // Subtle scale up
        boxShadow: '0 0 40px rgba(0, 209, 255, 0.6)', // Bright glow effect
        duration: 0.3,
        ease: 'power2.out',
        paused: true, // Start paused
        overwrite: true,
    }).reverse(); // Set to reverse so we can toggle it easily

    // Add event listeners using React/Vanilla JS
    button.addEventListener('mouseenter', () => gsap.to(button, { reversed: false }));
    button.addEventListener('mouseleave', () => gsap.to(button, { reversed: true }));

  }, { scope: sectionRef });

  return (
    <Box
      ref={sectionRef}
      id='contact'
      sx={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'background.default', // Start dark (inherited)
        color: 'text.primary',
        transition: 'background-color 0.5s, color 0.5s', // Ensure MUI transition for safety
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{ fontWeight: 700, mb: 3 }}
        >
          Ready to Elevate Your Product?
        </Typography>
        <Typography variant="h5" sx={{ mb: 6 }}>
          Let's discuss your next high-impact project, from concept to high-fidelity animation.
        </Typography>
        
        <Button 
          ref={ctaButtonRef}
          variant="contained" 
          color="primary"
          size="large"
          sx={{ 
            py: 2, 
            px: 6, 
            fontSize: '1.5rem',
            fontWeight: 700,
            borderRadius: 10, // Rounded button look
            transition: 'all 0.3s ease-out', // MUI transition for non-GSAP properties
          }}
        >
          Get in Touch Today
        </Button>
      </Container>
    </Box>
  );
};

export default ContactSection;