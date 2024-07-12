import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import '../Subtitles.css';

interface Config {
    title?: string;
    imageSrc?: string;
    width?: string;
}

export default function Subtitle(config: Config) {
    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',  
                justifyContent: 'center',  
                borderRadius: '20px',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
                padding: '20px',
                backgroundColor: '#3d46eb',
                width: config.width || 'auto',
            }}
            className='box-container'
        >
            {config.imageSrc && (
                <img src={config.imageSrc} alt="subtitle icon" className="subtitle-icon" />
            )}
            <Typography
                component="h2"
                variant="h4"
                color="white"
                gutterBottom
                textAlign="center"
                marginTop="10px" 
            >
                {config.title}
            </Typography>
        </Paper>
    );
}
