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

      let location = xml.getElementsByTagName("location")[1]

      let geobaseid = location.getAttribute("geobaseid")
      dataToIndicators.push(["Location", "geobaseid", geobaseid])

      let latitude = location.getAttribute("latitude")
      dataToIndicators.push(["Location", "Latitude", latitude])

      let longitude = location.getAttribute("longitude")
      dataToIndicators.push(["Location", "Longitude", longitude])

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
      <Grid xs={6} lg={2}>

        {indicators[0]}

        {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

      </Grid>

      <Grid xs={6} lg={2}>

        {indicators[1]}

        {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

      </Grid>

      <Grid xs={6} lg={2}>

        {indicators[2]}

        {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

      </Grid>
      <Grid xs={6} md={4} lg={6}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      </Grid>
      <Grid xs={6} sm={4} md={3} lg={6}>
        <Summary></Summary>
      </Grid>
      <Grid xs={12} md={6} lg={12} >
        <BasicTable />
      </Grid>
      <Grid xs={12} lg={10}>
        <WeatherChart></WeatherChart>
      </Grid>
      <Grid xs={12} lg={2}>
        <ControlPanel />
      </Grid>
    </Grid>
  )
}

export default App
