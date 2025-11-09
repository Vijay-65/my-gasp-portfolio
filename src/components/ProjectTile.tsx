// src/components/ProjectTile.tsx

import { Box, Typography } from '@mui/material';
import type { Project } from '../types/project';

interface ProjectTileProps {
  project: Project;
}

const ProjectTile: React.FC<ProjectTileProps> = ({ project }) => {
  return (
    <Box
      // ⭐️ Crucial: Define the width of the tile for horizontal calculation
      sx={{
        width: 'calc(100vw - 128px)', // Full viewport width minus some padding
        height: '80vh',
        flexShrink: 0, // Prevents the box from shrinking
        marginRight: '64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        p: 6,
        // Placeholder for the attractive background image/visual
        backgroundImage: `url(${project.imageUrl})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        // Subtle overlay for text readability
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)',
        }
      }}
    >
      <Typography variant="caption" sx={{ color: project.color, fontWeight: 700, zIndex: 1 }}>
        {project.discipline}
      </Typography>
      <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, zIndex: 1, lineHeight: 1.1 }}>
        {project.title}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary', zIndex: 1 }}>
        Click to view detailed case study
      </Typography>
    </Box>
  );
};

export default ProjectTile;