import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/store';
import { useParams } from 'react-router-dom';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { getAthlete } from './athletesSlice';


export default function UpdateAthletePage() {
  //TODO: pass parameters to here
  const { athletename } = useParams();

  const  { singleAthlete } = useAppSelector(state => state.athletes)
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParam] = React.useState({
    name: athletename,
    discipline: "",
  });
  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();

    const response = await axios.post("http://35.209.11.236/updateathlete",searchParam);

    if(response.status!=500){
      alert("update sucsessfull!!, go back to main page to see results (REFRESH PAGE)")
    }else{
        alert("Update failed")
    }
    dispatch(getAthlete({name:"" /*TODO*/,noc:"",discipline:"" }))
  }

  return (
    <Container>
      <Typography variant="h2" fontWeight={'bold'} sx={{mt: 5}}>Update Disciple</Typography>
      <Typography variant="h4" fontWeight={'bold'} sx={{mt: 5}}>For: {athletename}</Typography>
       <Grid spacing={2} container> 
          <Grid item xs={12}>
          <TextField
          onChange={e => setSearchParam({...searchParam, discipline: e.target.value})}
          value={searchParam.discipline}
          fullWidth 
          label="Discipline"/> 
          </Grid>
          <Grid item>
                  <Button 
                  onClick={handleSubmit}
                  variant="contained" 
                  disableElevation
                  >
                  Submit
                  </Button>
              </Grid>
      </Grid>
    </Container>
  )
}
