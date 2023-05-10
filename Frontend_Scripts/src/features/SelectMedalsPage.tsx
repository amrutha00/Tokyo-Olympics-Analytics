import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { getSelectMedals, getTopThree } from './athletesSlice';
import { Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Medal } from '../interfaces/Medals';

export default function SelectMedalsPage() {
    const  { selectMedals } = useAppSelector(state => state.athletes)
    const dispatch = useAppDispatch();
    const [rows, setRows] = React.useState<Medal[]>([]);
    const columns = [
        { field: 'G_Rank', headerName: 'Global Rank' },
        { field: 'NOC', headerName: 'Country', width: 200 },
        { field: 'Gold', headerName: 'Gold', width: 100 },
        { field: 'Silver', headerName: 'Silver', width: 100 },
        { field: 'Bronze', headerName: 'Bronze', width: 100 },
        { field: 'Total', headerName: 'Total', width: 100 },
        { field: 'Total_Rank', headerName: 'Total Rank', width: 100 }
    ]

    React.useEffect(()=>{
        dispatch(getSelectMedals({}))
    },[dispatch])

    React.useEffect(()=>{
        setRows(selectMedals);
    },[selectMedals])
  return (
    <Container>
        <Typography variant="h3" fontWeight={'bold'} sx={{mt: 5}}>Medals By Country</Typography>
        {rows && columns &&
            <DataGrid rows={rows} columns={columns} getRowId={Math.random}/>
        }
    </Container>
  )
}