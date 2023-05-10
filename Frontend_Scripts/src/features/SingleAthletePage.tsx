import { Container, Grid, Typography } from '@mui/material';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/store';
import { getAthlete } from './athletesSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';



export default function SingleAthletePage() {
    const dispatch = useAppDispatch();
    const { athletename } = useParams();
    const  { singleAthlete } = useAppSelector(state => state.athletes)

    React.useEffect(()=>{
        console.log(athletename)
        const data = {
            name: athletename,
            noc: "",
            discipline: "",
        }
        dispatch(getAthlete(data));
    },[athletename])

    React.useEffect(()=>{
        console.log('singleathlete');
        console.log(singleAthlete)
    },[singleAthlete])

    async function deletehandler(){
        const data = {
            name: athletename,
        }
        //TODO: implement the delete here
        const response = await axios.post("http://35.209.11.236/deleteathlete",data);
        if(response.status!=500){
            alert("delete sucsessfull, go back to main page to see results (REFRESH PAGE)")
        }else{
            alert("Delete failed")
        }
    }


  return (
        <Container>
            <Typography variant='h4' fontWeight={600}>
                Athlete Page 
            </Typography>
            <Typography variant='h5' fontWeight={600}>
                {singleAthlete?.A_Name} 
            </Typography>
            <Typography variant='h6' fontWeight={600}>
                  {singleAthlete?.NOC} -- {singleAthlete?.Discipline}
            </Typography>
            <button onClick={()=>{deletehandler()}}>click to delete player</button>
            <Link to={`/updateathlete/${athletename}`} >
                <Typography variant="h6">Click to go to update athlete page </Typography>
            </Link>
        </Container>
  )
}
