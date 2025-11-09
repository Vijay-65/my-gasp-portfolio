// src/styles/theme.ts

import { createTheme } from '@mui/material/styles';

// Define your custom dark theme
const theme = createTheme({
    palette: {
        mode: 'dark', // ⭐️ Sets the primary mode to Dark
        primary: {
            main: '#00D1FF', // A bright, electric blue for accents (CTA buttons, links)
        },
        secondary: {
            main: '#FF00A6', // A vibrant pink/magenta for secondary accents
        },
        background: {
            default: '#0A0A0A', // Deep black for a true contrast
            paper: '#1A1A1A',   // Slightly lighter black for cards/modals
        },
        text: {
            primary: '#FFFFFF', // Bright white text
            secondary: '#A0A0A0', // Light grey for subtle text
        },
    },
    typography: {
        fontFamily: ['Inter', 'sans-serif'].join(','), // Use a modern font
        h1: {
            fontSize: '4.5rem',
            fontWeight: 700,
            lineHeight: 1.1,
        },
        // Define other typography styles as needed (h2, h3, etc.)
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    // ⭐️ Crucial for smooth animation and full-page aesthetic
                    backgroundColor: '#0A0A0A',
                    scrollBehavior: 'smooth',
                    overflowX: 'hidden', // Prevents horizontal scroll from Parallax/GSAP side effects
                },
            },
        },
    },
});

export default theme;