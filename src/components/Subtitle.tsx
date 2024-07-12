import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../Subtitles.css'

interface Config {
    title?: String;
    imageSrc?: string;
}

export default function Subtitle(config: Config) {
    return (
        <Box display="flex" alignItems="center">
            {config.imageSrc && (
                <img src={config.imageSrc} alt="subtitle icon" className="subtitle-icon" />
            )}
            <Typography component="h2" variant="h5" color="black" gutterBottom textAlign="left" className="subtitle-text">
                {config.title}
            </Typography>
        </Box>
    );
}