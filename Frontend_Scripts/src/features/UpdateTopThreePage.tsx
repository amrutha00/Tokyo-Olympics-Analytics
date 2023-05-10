import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/store';
import { doStored, updateTopThree } from './athletesSlice';
import { DataGrid } from '@mui/x-data-grid';
import { MedalCount } from '../interfaces/Stored';

export default function UpdateTopThreePage() {
    const  {updateTopThreeResponse} = useAppSelector(state => state.athletes)
    const dispatch = useAppDispatch();


    const [searchParam, setSearchParam] = React.useState({
        noc: "Japan", 
        color : "Gold", 
        discipline : "Artistic Gymnastics", 
        event : "Men's All-Around"
    });


    const handleSubmit =(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Udate Top Three Parameters", searchParam)
        dispatch(updateTopThree(searchParam))
    }

  return (
    <Container>
        <Grid spacing={2} container> 
        <Typography variant="h2" fontWeight={'bold'} sx={{mt: 5}}>Stored Procedure</Typography>
            <Grid item xs={12}>
                <TextField
                onChange={e => setSearchParam({...searchParam, noc: e.target.value})} 
                value={searchParam.noc} 
                fullWidth 
                label="NOC"/>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Medal Color</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchParam.color}
                    label="Medal Color"
                    onChange={e => setSearchParam({...searchParam, color: e.target.value})}
                >
                    <MenuItem value={"Gold"}>Gold</MenuItem>
                    <MenuItem value={"Silver"}>Silver</MenuItem>
                    <MenuItem value={"Bronze"}>Bronze</MenuItem>
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
            <TextField
                onChange={e => setSearchParam({...searchParam, discipline: e.target.value})}
                value={searchParam.discipline}
                fullWidth 
                label="Discipline"/> 
            </Grid>
            <Grid item xs={12}>
            <TextField
                onChange={e => setSearchParam({...searchParam, event: e.target.value})}
                value={searchParam.event}
                fullWidth 
                label="Event"/> 
            </Grid>
            <Grid item>
                    <Button 
                    onClick={handleSubmit}
                    variant="contained" 
                    disableElevation
                    >
                    Update
                    </Button>
            </Grid>

            {(updateTopThreeResponse != null) &&
            <Grid item xs={12} >
                <Typography variant="h4" fontWeight={'bold'} sx={{mt: 5}}>Database Response: </Typography>
                {Object.entries(updateTopThreeResponse).map(([key, value]) => {
                    return (<Typography variant="h6"  sx={{mt: 5}}>{key}: {value} </Typography>);
                }) }
                
            </Grid>
            }
        </Grid>
        
    </Container>
  )
}