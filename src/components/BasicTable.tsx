import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../TableStyles.css';

export default function BasicTable() {

    const [weatherData, setWeatherData] = useState([]);

    {/* Hook: useEffect */ }

    useEffect(() => {

        (async () => {

            {/* Request */ }

            let API_KEY = "acd89c554aa31e18546c9194118b8bea"
            let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
            let savedTextXML = await response.text();

            {/* XML Parser */ }

            const parser = new DOMParser();
            const xml = parser.parseFromString(savedTextXML, "application/xml");

            {/* Arreglo para agregar los resultados */ }

            let dataTable = new Array()
            let tiempo = xml.getElementsByTagName('time');

            for (let i = 0; i < tiempo.length; i++) {
                const tiempoDesde = tiempo[i].getAttribute("from")
                const tiempoHasta = tiempo[i].getAttribute("to")

                let temperatura = tiempo[i].getElementsByTagName("temperature")[0]
                let valorTemperatura = temperatura.getAttribute("value")
                let valorCelsius = parseFloat(valorTemperatura) - 273.15
                let valorCelsiusFixed = parseFloat(valorCelsius.toFixed(2));
                let valorCelsiusFixedConGrado = `${valorCelsiusFixed}°C`;

                let velocidadViento = tiempo[i].getElementsByTagName("windSpeed")[0]
                let valorVelocidadViento = velocidadViento.getAttribute("mps")

                let humedad = tiempo[i].getElementsByTagName("humidity")[0]
                let valorHumedad = humedad.getAttribute("value")

                let presion = tiempo[i].getElementsByTagName("pressure")[0]
                let valorPresion = presion.getAttribute("value")


                dataTable.push({ tiempoDesde, tiempoHasta, valorCelsiusFixedConGrado, valorVelocidadViento, valorHumedad, valorPresion })
            }

            setWeatherData(dataTable);
        })()
    }, [])

    return (
        <TableContainer component={Paper} className="table-container">
            <Table aria-label="simple table" className="custom-table">
                <TableHead>
                    <TableRow>
                        <TableCell className="header-cell" sx={{ color: 'white', fontWeight: 'bold' }}>Hora (desde)</TableCell>
                        <TableCell className="header-cell" sx={{ color: 'white', fontWeight: 'bold' }}>Hora (hasta)</TableCell>
                        <TableCell align="center" className="header-cell" sx={{ color: 'white', fontWeight: 'bold' }}>Temperatura (°C)</TableCell>
                        <TableCell align="center" className="header-cell" sx={{ color: 'white', fontWeight: 'bold' }}>Velocidad del Viento (m/s)</TableCell>
                        <TableCell align="center" className="header-cell" sx={{ color: 'white', fontWeight: 'bold' }}>Humedad (%)</TableCell>
                        <TableCell align="center" className="header-cell" sx={{ color: 'white', fontWeight: 'bold' }}>Presión (hPa)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weatherData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.tiempoDesde}</TableCell>
                            <TableCell>{row.tiempoHasta}</TableCell>
                            <TableCell align="center">{row.valorCelsiusFixedConGrado}</TableCell>
                            <TableCell align="center">{row.valorVelocidadViento}</TableCell>
                            <TableCell align="center">{row.valorHumedad}</TableCell>
                            <TableCell align="center">{row.valorPresion}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}