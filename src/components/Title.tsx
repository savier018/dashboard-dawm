import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dashboardIcon from '../assets/dashboardIcon.png'
import '../Title.css'

const Title: React.FC = () => {
  return (
    <Box className="page-title" display="flex" alignItems="center" justifyContent="center">
      <img src={dashboardIcon} alt="Weather Icon" className="dashboard-icon"/>
      <Typography variant="h4" component="h1" align="center" className="title-text">
        Dashboard del Clima
      </Typography>
    </Box>
  );
};

export default Title;