import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import '../Subtitles.css'

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
    return `Hora del día ${hours}:${minutes}`;
  };

  return (
    <Typography component="h2" variant="h5" color="black" gutterBottom textAlign="left" className="clock-text">
        {formatTime(time)}
    </Typography>
  );
};

export default Clock;
