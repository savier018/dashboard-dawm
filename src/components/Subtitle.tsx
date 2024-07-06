import Typography from '@mui/material/Typography';

interface Config {
    title?: String;
}

export default function Subtitle(config: Config) {
    return (
            <Typography component="h2" variant="h5" color="black" gutterBottom textAlign="left">
                {config.title} 
            </Typography>
    )
}