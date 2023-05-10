import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import axios from 'axios'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { getAthletes } from './athletesSlice'


export default function GetAthletesPage() {
    const  { athletes, errors} = useAppSelector(state => state.athletes)
    const dispatch = useAppDispatch();
    const [searchParam, setSearchParam] = React.useState({
        name: "test",
        noc: "",
        discipline: "",
    });
    const data = {
        name: "test",
        noc: "",
        discipline: "",
      }

    React.useEffect(()=>{
        console.log(athletes)
        console.log(errors)
    },[athletes,errors])

    const handleSubmit =(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch(getAthletes(searchParam))

    }



    async function tryGet(){
        const response = await axios.post("http://35.209.11.236/selectathlete",data);
        console.log(response);
    }

  return (
    <Container>

    <Typography variant="h2" fontWeight={'bold'} sx={{mt: 5}}>Athletes</Typography>
    <Link to={`/createathlete`}>
        <Typography variant="h6">Click to go to create page </Typography>
    </Link>
    <Link to={`/advancedqueryone`}>
        <Typography variant="h6">Advanced Query 1 </Typography>
    </Link>
    <Link to={`/advancedquerytwo`}>
        <Typography variant="h6">Advanced Query 2 </Typography>
    </Link>
    <Link to={`/topthrees`}>
        <Typography variant="h6">Top Threes </Typography>
    </Link>
    <Link to={`/selectmedals`}>
        <Typography variant="h6">Medals By Country </Typography>
    </Link>
    <Link to={`/storedprocedure`}>
        <Typography variant="h6"> Stored Procedure </Typography>
    </Link>
    <Link to={`/updatetopthree`}>
        <Typography variant="h6"> Update Top Three </Typography>
    </Link>
    <Typography variant='h2'sx={{mt: 5}}>    </Typography>
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
                Search
                </Button>
        </Grid>
    </Grid>
    <Grid container spacing={3} sx={{marginTop: 5}} >
      {athletes &&
        athletes.map((athlete,index) => (
          <Grid item key={index} xs={4} >
            <Link to={`/singleathlete/${athlete.A_Name}`}>
                <h4> {athlete.A_Name}</h4>
                <h4>{athlete.Discipline}</h4>
                <h6>{athlete.NOC}</h6>
            </Link>

              {/*<GameCard game={game}/>*/}

          </Grid>
        ))}
    </Grid>
  </Container>
  )
}

