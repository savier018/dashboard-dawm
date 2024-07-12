import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../Subtitles.css';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <Box className="clock-container" sx={
      { display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', p: 2, 
      borderRadius: 2, 
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', 
      backgroundColor: '#ffffff' ,
      }}>
      <Typography component="h2" variant="h5" color="black" gutterBottom textAlign="center" className="clock-date">
        {formatDate(time)}
      </Typography>
      <Typography component="h1" variant="h3" color="black" gutterBottom textAlign="center" className="clock-time">
        {formatTime(time)}
      </Typography>
    </Box>
  );
};

export default Clock;

