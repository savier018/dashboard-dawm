import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './App.css'

function App() {

  return (
    <Grid container spacing={5}>
    <Grid xs={12} sm={4} md={3} lg={2}>1</Grid>
    <Grid xs={6} sm={4} md={3} lg={2}>2</Grid>
    <Grid xs={6} sm={4} md={3} lg={2}>3</Grid>
    <Grid xs={12} sm={4} md={3} lg={2}>4</Grid>
    <Grid xs={6} sm={4} md={6} lg={2}>5</Grid>
    <Grid xs={6} sm={4} md={6} lg={2}>6</Grid>
  </Grid>
  )
}

export default App
