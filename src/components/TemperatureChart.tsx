import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';


const WeatherChart: React.FC = () => {
    const [chartData, setChartData] = useState([]);

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

                let temperaturaMaxima = parseFloat(tiempo[i].getElementsByTagName('temperature')[0].getAttribute('max')) - 273.15;
                let temperatureMaximaCelsiusFixed = parseFloat(temperaturaMaxima.toFixed(2));

                let temperaturaMinima = parseFloat(tiempo[i].getElementsByTagName('temperature')[0].getAttribute('min')) - 273.15;
                let temperatureMinimaCelsiusFixed = parseFloat(temperaturaMinima.toFixed(2));

                data.push([timeFrom, temperatureMaximaCelsiusFixed, temperatureMinimaCelsiusFixed]);            
            }

            setChartData([['Fecha-Hora', 'Temperatura Máxima (°C)', 'Temperatura Mínima (°C)'], ...data]);
        })();
    }, []);

    const options = {
        title: 'Gráfico de Temperatura Máxima vs Mínima',
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