import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Box from '@mui/material/Box';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart: React.FC = () => {
    const [chartData, setChartData] = useState<{ labels: string[], datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number }[] } | null>(null);

    useEffect(() => {
        (async () => {
            let API_KEY = "acd89c554aa31e18546c9194118b8bea";
            let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
            let savedTextXML = await response.text();

            const parser = new DOMParser();
            const xml = parser.parseFromString(savedTextXML, "application/xml");

            const tiempo = xml.getElementsByTagName('time');
            const humidityData: { label: string, value: number }[] = [];

            for (let i = 0; i < tiempo.length; i++) {
                let timeFrom = tiempo[i].getAttribute('from');
                let humedad = parseFloat(tiempo[i].getElementsByTagName('humidity')[0].getAttribute('value'));
                humidityData.push({ label: timeFrom || '', value: humedad });
            }

            const labels = humidityData.map(item => item.label);
            const values = humidityData.map(item => item.value);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Humedad (%)',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        })();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Humedad por Fecha-Hora',
                color: 'black',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'black',
                },
            },
            y: {
                ticks: {
                    color: 'black',
                },
            },
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px auto', 
                width: '90%',
                maxWidth: '1100px'
            }}
        >
            {chartData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>Cargando datos...</p>
            )}
        </Box>
    );
};

export default BarChart;

