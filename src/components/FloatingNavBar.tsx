import { useRef, useCallback, useState, useEffect } from 'react';
import { Box, IconButton, Tooltip, Zoom } from '@mui/material';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CallIcon from '@mui/icons-material/Call';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const navItems = [
  { id: 'hero', icon: HomeFilledIcon, label: 'Home', color: '#00D1FF' },
  { id: 'projects', icon: DashboardIcon, label: 'Projects', color: '#FFC300' },
  { id: 'about', icon: AccountBoxIcon, label: 'About', color: '#00FF7F' },
  { id: 'contact', icon: CallIcon, label: 'Contact', color: '#FF00A6' },
];

const FloatingNav = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isHidden, setIsHidden] = useState(false);

  // Scroll to specific section with GSAP
  const scrollToSection = useCallback((id: string) => {
    const targetElement = document.getElementById(id);
    if (!targetElement) return;
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: targetElement, offsetY: 0 },
      ease: 'power2.inOut',
    });
  }, []);

  // Detect active section using ScrollTrigger
  useGSAP(() => {
    navItems.forEach((item) => {
      ScrollTrigger.create({
        trigger: `#${item.id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(item.id);
          }
        },
      });
    });
  }, []);

  // Hide / Show nav when scrolling
  useEffect(() => {
    let lastScroll = window.scrollY;
    let ticking = false;

    const updateNav = () => {
      const currentScroll = window.scrollY;
      const navElement = navRef.current;

      if (!navElement) return;

      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down → hide
        if (!isHidden) {
          setIsHidden(true);
          gsap.to(navElement, {
            y: 120,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      } else {
        // Scrolling up → show
        if (isHidden) {
          setIsHidden(false);
          gsap.to(navElement, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHidden]);

  return (
    <Box
      ref={navRef}
      sx={{
        position: 'fixed',
        bottom: 30,
        left: 30,
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 1.5,
        borderRadius: 5,
        backgroundColor: 'rgba(15, 15, 15, 0.7)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        const IconComponent = item.icon;

        return (
          <Tooltip
            key={item.id}
            title={item.label}
            placement="right"
            arrow
            TransitionComponent={Zoom}
          >
            <IconButton
              onClick={() => scrollToSection(item.id)}
              sx={{
                my: 0.5,
                width: 55,
                height: 55,
                borderRadius: 3,
                backgroundColor: isActive
                  ? item.color
                  : 'rgba(255,255,255,0.05)',
                color: isActive ? '#000' : '#bbb',
                boxShadow: isActive
                  ? `0 0 15px ${item.color}66`
                  : '0 0 10px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  backgroundColor: isActive
                    ? item.color
                    : 'rgba(255,255,255,0.15)',
                  color: isActive ? '#000' : item.color,
                  boxShadow: `0 0 20px ${item.color}aa`,
                },
              }}
            >
              <IconComponent fontSize="medium" />
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default FloatingNav;
