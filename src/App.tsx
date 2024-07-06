import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import BasicTable from './components/BasicTable';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import ControlPanel from './components/ControlPanel';
import WeatherChart from './components/WeatherChart';
import { useEffect, useState } from 'react';
import './App.css'

function App() {

  {/* Variable de estado y función de actualización */ }

  let [indicators, setIndicators] = useState([])

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

      let dataToIndicators = new Array()

      {/* 
        Análisis, extracción y almacenamiento del contenido del XML 
        en el arreglo de resultados
                   */}

      let nombreCiudad = xml.getElementsByTagName("name")[0]
      const ciudad = nombreCiudad.textContent;

      let nombrePais = xml.getElementsByTagName("country")[0]
      const pais = nombrePais.textContent;

      let location = xml.getElementsByTagName("location")[1]
      dataToIndicators.push([ciudad, "País", pais])

      let latitude = location.getAttribute("latitude")
      dataToIndicators.push(["Latitud", "Valor", latitude])

      let longitude = location.getAttribute("longitude")
      dataToIndicators.push(["Longitud", "Valor", longitude])

      let valorPrecipitacion = xml.getElementsByTagName("precipitation")[0]
      let probabilidadPrecipitacion = valorPrecipitacion.getAttribute("probability")
      dataToIndicators.push(["Precipitación", "Probabilidad", probabilidadPrecipitacion])

      let velocidadViento = xml.getElementsByTagName("windSpeed")[0]
      let valorVelocidadViento = velocidadViento.getAttribute("mps")
      let unidadesVelocidadViento = velocidadViento.getAttribute("unit")
      dataToIndicators.push(["Velocidad del viento", unidadesVelocidadViento, valorVelocidadViento])

      let temperatura = xml.getElementsByTagName("temperature")[0]
      let valorTemperatura = temperatura.getAttribute("value")
      let valorCelsius = parseFloat(valorTemperatura) - 273.15
      let valorCelsiusFixed = parseFloat(valorCelsius.toFixed(2));
      let valorCelsiusFixedConGrado = `${valorCelsiusFixed}°C`;
      dataToIndicators.push(["Temperatura", "Celsius", valorCelsiusFixedConGrado])


      let seSienteComo = xml.getElementsByTagName("feels_like")[0]
      let valorSeSienteComo = seSienteComo.getAttribute("value")
      let valorCelsiusSeSienteComo = parseFloat(valorSeSienteComo) - 273.15
      let valorCelsiusSeSienteComoFixed = parseFloat(valorCelsiusSeSienteComo.toFixed(2))
      let valorCelsiusSeSienteComoConGrado = `${valorCelsiusSeSienteComoFixed}°C`;
      dataToIndicators.push(["Se siente como", "Celsius", valorCelsiusSeSienteComoConGrado]);
      //console.log(dataToIndicators)

      {/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */ }

      let indicatorsElements = Array.from(dataToIndicators).map(
        (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
      )

      {/* Modificación de la variable de estado mediante la función de actualización */ }

      setIndicators(indicatorsElements)

    })()

  }, [])

  return (
    <Grid container spacing={5}>
      <Grid xs={6} lg={4}>

        {indicators[0]}

        {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

      </Grid>

      <Grid xs={6} lg={4}>

        {indicators[1]}

        {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

      </Grid>

      <Grid xs={6} lg={4}>

        {indicators[2]}

        {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

      </Grid>

      <Grid xs={6} md={4} lg={3}>

        {indicators[3]}

      </Grid>

      <Grid xs={6} md={4} lg={3}>

        {indicators[4]}

      </Grid>

      <Grid xs={6} md={4} lg={3}>

        {indicators[5]}

      </Grid>

      <Grid xs={6} md={4} lg={3}>

        {indicators[6]}

      </Grid>

      {/* <Grid xs={6} sm={4} md={3} lg={6}>

        <Summary></Summary>

      </Grid> */}

      <Grid xs={12} md={6} lg={12} >

        <BasicTable />

      </Grid>

      <Grid xs={12} lg={8}>

        <WeatherChart></WeatherChart>

      </Grid>

      <Grid xs={12} lg={4}>

        <ControlPanel />

      </Grid>
    </Grid>
  )
}

export default App
