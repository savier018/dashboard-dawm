import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

interface WeatherChartProps {
    selectedVariable: string;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ selectedVariable }) => {
    const [chartData, setChartData] = useState([]);
    const temperatureData = [];
    const humidityData = [];
    const windSpeedData = [];

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
                temperatureData.push([timeFrom, temperatureCelsiusFixed]);

                let humedad = parseFloat(tiempo[i].getElementsByTagName('humidity')[0].getAttribute('value'));
                humidityData.push([timeFrom, humedad]);

                let velocidadViento = parseFloat(tiempo[i].getElementsByTagName('windSpeed')[0].getAttribute('mps'));
                windSpeedData.push([timeFrom, velocidadViento]);

                data.push([timeFrom, humedad, temperatureCelsiusFixed, velocidadViento]);            
            }

            switch(selectedVariable) {
                case "Temperatura":
                    setChartData([['Fecha-Hora', 'Temperatura (°C)'], ...temperatureData]);
                    break;
                case "Humedad":
                    setChartData([['Fecha-Hora', 'Humedad (%)'], ...humidityData]);
                    break;
                case "Velocidad del viento":
                    setChartData([['Fecha-Hora', 'Velocidad del viento (m/s)'], ...windSpeedData]);
                    break;
                case "Todas las variables":
                    setChartData([['Fecha-Hora', 'Humedad (%)', 'Temperatura (°C)', 'Velocidad del viento (m/s)'], ...data]);
                    break;
                default:
                    setChartData([['Fecha-Hora', 'Humedad (%)', 'Temperatura (°C)', 'Velocidad del viento (m/s)'], ...data]);
            }
        })();
    }, [selectedVariable]);

    const options = {
        title: `Gráfico de ${selectedVariable}`,
        hAxis: { 
            textStyle: {
                fontSize: 10 
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