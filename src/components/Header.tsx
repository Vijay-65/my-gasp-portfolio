import { useRef, useCallback, useState, useEffect } from 'react';
import { Box, Typography, Link, Button } from '@mui/material';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false); // 👈 track header visibility

  const scrollToSection = useCallback((id: string) => {
    const targetElement = document.getElementById(id);
    if (!targetElement) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: targetElement, offsetY: 100 },
      ease: "power2.inOut",
    });
  }, []);

  // -------------------------------
  // SCROLL-BASED HEADER MORPH
  // -------------------------------
  useGSAP(() => {
    const container = containerRef.current;
    const accentLine = accentLineRef.current;
    if (!container || !accentLine) return;

    gsap.to(container, {
      width: '80%',
      height: 60,
      borderRadius: 10,
      backgroundColor: 'rgba(26, 26, 26, 0.98)',
      backdropFilter: 'blur(10px)',
      border: '1px solid #1A1A1A',
      duration: 0.3,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: 'body',
        start: 'top -50',
        end: 'top -100',
        scrub: true,
      },
    });

    gsap.to(accentLine, {
      opacity: 1,
      scaleX: 1,
      duration: 0.4,
      scrollTrigger: {
        trigger: 'body',
        start: 'top -100',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: headerRef });

  // -------------------------------
  // AUTO HIDE / SHOW ON SCROLL
  // -------------------------------
  useEffect(() => {
    let lastScroll = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down → hide
        if (!isHidden) {
          setIsHidden(true);
          gsap.to(headerRef.current, {
            y: -120, // slide up
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      } else {
        // Scrolling up → show
        if (isHidden) {
          setIsHidden(false);
          gsap.to(headerRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHidden]);

  return (
    <Box
      ref={headerRef}
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        pt: 4,
        transition: 'transform 0.4s ease, opacity 0.4s ease',
      }}
    >
      {/* ⭐️ CAPSULE CONTAINER ⭐️ */}
      <Box
        ref={containerRef}
        sx={{
          width: '90%',
          maxWidth: '900px',
          height: 70,
          margin: '0 auto',
          borderRadius: 20,
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'border 0.3s ease',
        }}
      >
        {/* Logo / Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            cursor: 'pointer',
            zIndex: 10,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#fff',
            '&:hover': {
              color: 'primary.main',
              transform: 'scale(1.05)',
              transition: 'all 0.2s ease',
            },
          }}
          onClick={() => scrollToSection('hero')}
        >
          Ragavan
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 3, zIndex: 10 }}>
          {['About', 'Projects', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.toLowerCase());
              }}
              color="inherit"
              sx={{
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                letterSpacing: '0.5px',
                color: '#ddd',
                position: 'relative',
                '&:hover': {
                  color: 'primary.main',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: -4,
                  width: '100%',
                  height: 2,
                  backgroundColor: 'primary.main',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                  transformOrigin: 'right',
                },
                '&:hover::after': {
                  transform: 'scaleX(1)',
                  transformOrigin: 'left',
                },
              }}
            >
              {item}
            </Link>
          ))}
        </Box>

        {/* Hire Me Button */}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => scrollToSection('contact')}
          sx={{
            zIndex: 10,
            textTransform: 'none',
            fontWeight: 600,
            px: 2.5,
            borderRadius: 10,
            boxShadow: '0 0 10px rgba(0, 200, 255, 0.3)',
            '&:hover': {
              boxShadow: '0 0 20px rgba(0, 200, 255, 0.6)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Hire Me
        </Button>

        {/* Accent Line */}
        <Box
          ref={accentLineRef}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: 'primary.main',
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
            opacity: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default Header;
