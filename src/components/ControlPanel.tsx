import { useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ControlPanelProps {
    onVariableChange: (variable: string) => void;
}

export default function ControlPanel({ onVariableChange }: ControlPanelProps) {
    const [, setSelected] = useState(-1);
    const descriptionRef = useRef<HTMLDivElement>(null);

    const items = [
        { "name": "Humedad", "description": "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje." },
        { "name": "Temperatura", "description": "Medida de calor o frío expresada generalmente en grados Celsius o Fahrenheit." },
        { "name": "Velocidad del viento", "description": "Rapidez del aire en movimiento, medida generalmente en metros por segundo o kilómetros por hora." }
    ];

    const options = items.map((item, key) => <MenuItem key={key} value={key}>{item["name"]}</MenuItem>);

    const handleChange = (event: SelectChangeEvent) => {
        const idx = parseInt(event.target.value);
        setSelected(idx);
        console.log(items[idx].name)

        if (descriptionRef.current !== null) {
            descriptionRef.current.innerHTML = (idx >= 0) ? items[idx]["description"] : "";
        }

        if (idx >= 0) {
            onVariableChange(items[idx].name);
        } else {
            onVariableChange("");
        }
    };

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography mb={2} component="h3" variant="h6" color="primary">
                Variables Meteorológicas
            </Typography>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Variables</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        label="Variables"
                        defaultValue='-1'
                        onChange={handleChange}
                    >
                        <MenuItem key="-1" value="-1" disabled>Seleccione una variable</MenuItem>
                        {options}
                    </Select>
                </FormControl>
            </Box>

            <Typography ref={descriptionRef} mt={2} component="p" color="text.secondary" />
        </Paper>
    );
}