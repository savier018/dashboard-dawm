import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const WeatherChart: React.FC = () => {
    const [chartData, setChartData] = useState([['Fecha-Hora', 'Temperatura (°C)', 'Humedad (%)', 'Velocidad del viento (m/s)']]);

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

            const tiempo = xml.getElementsByTagName('time');
            const data = [];

            for (let i = 0; i < tiempo.length; i++) {
                let timeFrom = tiempo[i].getAttribute('from');
                let temperatura = parseFloat(tiempo[i].getElementsByTagName('temperature')[0].getAttribute('value')) - 273.15;
                let temperatureCelsiusFixed = parseFloat(temperatura.toFixed(2));
                let humedad = parseFloat(tiempo[i].getElementsByTagName('humidity')[0].getAttribute('value'));
                let velocidadViento = parseFloat(tiempo[i].getElementsByTagName('windSpeed')[0].getAttribute('mps'));
                data.push([timeFrom, temperatureCelsiusFixed, humedad, velocidadViento]);
            }

            setChartData([['Fecha-Hora', 'Temperatura (°C)', 'Humedad (%)', 'Velocidad del viento (m/s)'], ...data]);
        })()
    }, [])

    const options = {
        title: 'Temperatura, humedad, velocidad del viento vs Hora',
        hAxis: { 
            title: 'Time',
            textStyle: {
                fontSize: 10 // Ajusta el tamaño del texto
            },
         },
        legend: { position: 'bottom' }
    };

    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="500px"
            data={chartData}
            options={options}
        />
    );
};

export default WeatherChart;


