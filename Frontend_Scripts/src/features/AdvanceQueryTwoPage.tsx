import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { Athlete } from '../interfaces/Athlete';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { advancedOne, advancedTwo } from './athletesSlice';

export default function AdvanceQueryTwoPage() {
    const [searchParam, setSearchParam] = React.useState({
        noc: "United States",
        discipline1: "Swimming",
        discipline2: "Athletics"
    });
    const dispatch = useAppDispatch();
    const  { sportsEvents, errors} = useAppSelector(state => state.athletes)




    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        dispatch(advancedTwo(searchParam)).then(() => {
         
          if (sportsEvents.length === 0) {
            
            alert("No results found");
          }
          else
          {
            console.log(sportsEvents.length);
          }
        });
        //dispatch(advancedTwo(searchParam));

    }
  return (
    <Container>
        <Typography variant="h5" fontWeight={'bold'} sx={{mt: 5}}>List of events in which the Country secured a Gold in the 1st and Silver in the 2nd discipline!</Typography>
        <Grid spacing={2} container>
            <Grid item xs={12}>
            <TextField
            onChange={e => setSearchParam({...searchParam, noc: e.target.value})} 
            value={searchParam.noc} 
            fullWidth 
            label="NOC"/> 
            </Grid>
            <Grid item xs={12}>
            <TextField
            onChange={e => setSearchParam({...searchParam, discipline1: e.target.value})} 
            value={searchParam.discipline1} 
            fullWidth 
            label="Discipline 1"/> 
            </Grid>
            <Grid item xs={12}>
            <TextField
            onChange={e => setSearchParam({...searchParam, discipline2: e.target.value})} 
            value={searchParam.discipline2} 
            fullWidth 
            label="Discipline2"/> 
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
        <Grid container spacing={3} sx={{marginTop: 5}} >
      {sportsEvents &&
        sportsEvents.map((event,index) => (
          <Grid item key={index} xs={4} >
                <h4>{event.Discipline}</h4>
                <h4>{event.D_Event}</h4>
          </Grid>
        ))}
    </Grid>
    </Container>
    
  )
}