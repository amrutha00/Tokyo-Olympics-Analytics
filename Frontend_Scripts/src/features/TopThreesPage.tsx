import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { getTopThree } from './athletesSlice';
import { Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Event } from '../interfaces/Event';

export default function TopThreesPage() {
    const  { topThrees } = useAppSelector(state => state.athletes)
    const dispatch = useAppDispatch();
    const [rows, setRows] = React.useState<Event[]>([]);
    const columns = [
        { field: 'Discipline', headerName: 'Discipline' },
        { field: 'D_Event', headerName: 'Event', width: 175 },
        { field: 'Gold', headerName: 'Gold', width: 200 },
        { field: 'Silver', headerName: 'Silver', width: 200 },
        { field: 'Bronze', headerName: 'Bronze', width: 200 }
    ]

    React.useEffect(()=>{
        dispatch(getTopThree({}))
    },[dispatch])

    React.useEffect(()=>{
        setRows(topThrees);
    },[topThrees])
  return (
    <Container>
        <Typography variant="h3" fontWeight={'bold'} sx={{mt: 5}}>Top Three's</Typography>
        {rows && columns &&
            <DataGrid rows={rows} columns={columns} getRowId={Math.random}/>
        }
    </Container>
  )
}

 /*
     <Container>
        <Grid container spacing={3} sx={{marginTop: 5}} >
        {topThrees &&
            topThrees.map((event,index) => (
            <Grid item key={index} xs={4} >
                <Typography>
                    <h4> {event.Discipline}</h4>
                    <h4>{event.D_Event}</h4>
                </Typography>
            </Grid>
            ))}
        </Grid>
    </Container>
 */ 