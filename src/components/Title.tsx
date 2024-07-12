import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dashboardIcon from '../assets/dashboardIcon.png';
import '../Title.css';

const Title: React.FC = () => {
  return (
    <Box className="page-title" display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <img src={dashboardIcon} alt="Weather Icon" className="dashboard-icon" />
        <Typography variant="h4" component="h1" className="title-text">
          Dashboard del Clima
        </Typography>
      </Box>
      <Box className="nav-bar">
        <a href="#indicadores" className="nav-link">Indicadores</a>
        <a href="#tabla" className="nav-link">Tabla</a>
        <a href="#grafico" className="nav-link">Gráfico</a>
      </Box>
    </Box>
  );
};

export default Title;
