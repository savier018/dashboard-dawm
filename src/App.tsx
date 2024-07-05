import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import BasicTable from './components/BasicTable';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import ControlPanel from './components/ControlPanel';
import WeatherChart from './components/WeatherChart';
import './App.css'

function App() {

  return (
    <Grid container spacing={5}>
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
