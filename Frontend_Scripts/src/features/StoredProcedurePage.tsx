import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/store';
import { doStored } from './athletesSlice';
import { DataGrid } from '@mui/x-data-grid';
import { MedalCount } from '../interfaces/Stored';

export default function StoredProcedurePage() {
    const  {medalsCounted} = useAppSelector(state => state.athletes)
    const dispatch = useAppDispatch();

    const [rows, setRows] = React.useState<MedalCount[]>([]);
    const columns = [
        { field: 'Discipline', headerName: 'Discipline', width: 250  },
        { field: 'Country', headerName: 'Event', width: 175 },
        { field: 'Medal_Count', headerName: 'Medal Count', width: 100 },
        { field: 'Gold', headerName: 'Gold', width: 100 },
        { field: 'Silver', headerName: 'Silver', width: 100 },
        { field: 'Bronze', headerName: 'Bronze', width: 100 }
    ]

    const [searchParam, setSearchParam] = React.useState({
        noc: "United States",
        sd : "SUMMARY",
        num : "3"
    });

    React.useEffect(()=>{
        setRows(medalsCounted);
    },[medalsCounted])

    const handleSubmit =(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            noc: searchParam.noc,
            sd : searchParam.sd,
            num : parseInt(searchParam.num)
        }
        dispatch(doStored(data))
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
                <InputLabel id="demo-simple-select-label">Summary / Detailed</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchParam.sd}
                    label="SUMMARY/DETAILED"
                    onChange={e => setSearchParam({...searchParam, sd: e.target.value})}
                >
                    <MenuItem value={"SUMMARY"}>Summary</MenuItem>
                    <MenuItem value={"DETAILED"}>Detailed</MenuItem>
                </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
            <TextField
                onChange={e => setSearchParam({...searchParam, num: e.target.value})}
                value={searchParam.num}
                fullWidth 
                type='number'
                label="Number"/> 
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
        {rows && columns &&
            <DataGrid rows={rows} columns={columns} getRowId={Math.random}/>
        }
    </Container>
  )
}

/*
<TextField
onChange={e => setSearchParam({...searchParam, sd: e.target.value})} 
value={searchParam.sd} 
fullWidth 
label="Summary/Detailed"/> */