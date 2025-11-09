// src/components/Footer.tsx

import { Box, Typography, Container, Link, Grid } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'background.default', // Ensure it stays dark
                py: 4,
                borderTop: '1px solid',
                borderColor: 'background.paper', // Subtle line separator
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between" alignItems="center">

                    {/* Copyright */}
                    <Grid size={{ xs: 12, md: 6 }} >
                        <Typography variant="body2" color="text.secondary">
                            &copy; {new Date().getFullYear()} [Your Name]. All Rights Reserved.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Designed & Developed with React, MUI, and GSAP.
                        </Typography>
                    </Grid>

                    {/* Social Links */}
                    <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                        <Link href="#" color="primary.main" variant="body2" sx={{ mx: 1, textDecoration: 'none' }}>
                            LinkedIn
                        </Link>
                        <Link href="#" color="primary.main" variant="body2" sx={{ mx: 1, textDecoration: 'none' }}>
                            Dribbble
                        </Link>
                        <Link href="#" color="primary.main" variant="body2" sx={{ mx: 1, textDecoration: 'none' }}>
                            GitHub
                        </Link>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;