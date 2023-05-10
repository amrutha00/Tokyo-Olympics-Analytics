import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { Athlete } from '../interfaces/Athlete';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { advancedOne } from './athletesSlice';

export default function AdvanceQueryOnePage() {
    const [searchParam, setSearchParam] = React.useState({
        noc: "United States of America"
    });
    const dispatch = useAppDispatch();
    const  { athletes, errors} = useAppSelector(state => state.athletes)




    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();

        dispatch(advancedOne(searchParam));

    }
  return (
    <Container>
        <Typography variant="h5" fontWeight={'bold'} sx={{mt: 5}}>List of Athletes from the country in Athletics!</Typography>
        <Grid spacing={2} container>
            <Grid item xs={12}>
            <TextField
            onChange={e => setSearchParam({...searchParam, noc: e.target.value})} 
            value={searchParam.noc} 
            fullWidth 
            label="NOC"/> 
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
      {athletes &&
        athletes.map((athlete,index) => (
          <Grid item key={index} xs={4} >
            <Link to={`/singleathlete/${athlete.A_Name}`}>
                <h4> {athlete.A_Name}</h4>
                
                <h4>{athlete.NOC}</h4>
            </Link>

              {/*<GameCard game={game}/>*/}

          </Grid>
        ))}
    </Grid>
    </Container>
    
  )
}
