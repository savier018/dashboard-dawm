import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Title: React.FC = () => {
  return (
    <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
      <Typography variant="h4" component="h1" align="center">
        Dashboard del Clima
      </Typography>
    </Box>
  );
};

export default Title;