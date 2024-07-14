import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../Subtitles.css';
import morningImage from '../assets/sunrise.jpeg';
import afternoonImage from '../assets/afternoon.jpeg';
import nightImage from '../assets/night.png';

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

  const getGreetingImage = (): string => {
    const hours = time.getHours();
    if (hours >= 6 && hours < 12) {
      return morningImage;
    } else if (hours >= 12 && hours < 18) {
      return afternoonImage;
    } else {
      return nightImage;
    }
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
      <img src={getGreetingImage()} alt="Greeting" style={{ width: '100%', height: 'auto' }} />
    </Box>
  );
};

export default Clock;

