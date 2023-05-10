import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/store';
import { getAthletes } from './athletesSlice';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';

export default function InsertAthletePage() {
    const [searchParam, setSearchParam] = React.useState({
        name: "test",
        noc: "",
        discipline: "",
    });




    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        if (!searchParam.name || !searchParam.noc || !searchParam.discipline) {
          alert("Please fill in all required fields.");
          return;
        }
        const response = await axios.post("http://35.209.11.236/insertathlete",searchParam);

        if(response.status!=500){
          alert(JSON.stringify(response.data));
        }else{
            alert("Insert failed")
        }

    }

  return (
    <Container>
      <Typography variant="h2" fontWeight={'bold'} sx={{mt: 5}}>Create Athlete</Typography>
       <Grid spacing={2} container> 

      <Grid item xs={12}>
          <TextField
          onChange={e => setSearchParam({...searchParam, name: e.target.value})} 
          value={searchParam.name} 
          fullWidth 
          label="Name"/>
      </Grid>

      <Grid item xs={12}>
      <TextField
      onChange={e => setSearchParam({...searchParam, noc: e.target.value})} 
      value={searchParam.noc} 
      fullWidth 
      label="NOC"/> 
      </Grid>

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
