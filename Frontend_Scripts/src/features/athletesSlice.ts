import { Alert } from "@mui/material";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Athlete } from "../interfaces/Athlete";
import { Event } from "../interfaces/Event";
import { Medal } from "../interfaces/Medals";
import { MedalCount, StoredStatus } from "../interfaces/Stored";
import { DatabaseResponse } from "../interfaces/DatabaseResponse";
import { SportsEvent } from "../interfaces/SportsEvent";

interface AthleteState{
    athletes: Athlete[];
    singleAthlete: Athlete | null;
    loading: boolean;
    errors: any;
    topThrees: Event[];
    selectMedals: Medal[];
    medalsCounted: MedalCount[];
    updateTopThreeResponse: DatabaseResponse | null;
    sportsEvents: SportsEvent[];
}

const initialState: AthleteState = {
    athletes: [],
    singleAthlete: null,
    loading: false,
    errors: null,
    topThrees: [],
    selectMedals:[],
    medalsCounted:[],
    updateTopThreeResponse: null,
    sportsEvents:[]
}

//actions are processes that get data from backend
export const getAthletes = createAsyncThunk<Athlete[],Object>(
    "athletes/getAthletes",
    async (data, thunkAPI) => {
        try {
            console.log("Making get request")
            const response = await axios.post("http://35.209.11.236/selectathlete",data);
            console.log("request sucsess");
            
            return response.data;
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
    }
)

//actions are processes that get data from backend
export const getAthlete = createAsyncThunk<Athlete,Object>(
    "athletes/getAthlete",
    async (data, thunkAPI) => {
        try {
            console.log("Making get request")
            const response = await axios.post("http://35.209.11.236/selectathlete",data);
            console.log("get Athlete");
            console.log(response);
            //get the first element
            console.log(response.data[2])
            return response.data[2];
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
    }
)

//actions are processes that get data from backend
export const advancedOne = createAsyncThunk<Athlete[],Object>(
    "athletes/advancedOne",
    async (data, thunkAPI) => {
        try {
            console.log("Making get request")
            const response = await axios.post("http://35.209.11.236/advancedquery1",data);
            console.log("request sucsess");
            
            return response.data;
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
    }
)

//actions are processes that get data from backend
export const advancedTwo = createAsyncThunk<SportsEvent[],Object>(
    "athletes/advancedTwo",
    async (data, thunkAPI) => {
        try {
            console.log("Making get request")
            const response = await axios.post("http://35.209.11.236/advancedquery2",data);
            console.log("request sucsess");
            
            return response.data;
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getTopThree = createAsyncThunk<Event[],Object>(
    "athletes/getTopThree",
    async (data, thunkAPI) => {
        try {
            console.log("Making get request")
            const response = await axios.post("http://35.209.11.236/selecttop3",data);
            console.log("request sucsess");
            return response.data;
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getSelectMedals = createAsyncThunk<Medal[],Object>(
    "athletes/getSelectMedals",
    async (data, thunkAPI) => {
        try {
            console.log("Making get request")
            const response = await axios.post("http://35.209.11.236/selectmedals",data);
            console.log("request sucsess");
            return response.data;
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const doStored = createAsyncThunk<[MedalCount[],StoredStatus],Object>(
    "athletes/doStored",
    async (data, thunkAPI) => {
        try {
            console.log("Making get request")
            const response = await axios.post("http://35.209.11.236/stored",data);
            console.log("request sucsess");
            return response.data;
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateTopThree = createAsyncThunk<DatabaseResponse | null ,Object>(
    "athletes/updateTopThree",
    async (data, thunkAPI) => {
        try {
            console.log("Making get request")
            const response = await axios.post("http://35.209.11.236/updatetop3",data);
            console.log("request sucsess");
            return response.data;
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
    }
)



//reducers -> reduce to a specific state -> changes state
export const athleteSlice = createSlice({
    name: "athletes",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAthletes.pending, (state, _)=>{
            state.loading = true;
        })
        builder.addCase(getAthletes.fulfilled, (state, action)=>{
            state.athletes = action.payload; //getGames payload
            state.loading = false;
        })
        builder.addCase(getAthletes.rejected,(state,action)=> {
            state.loading = false;
            state.errors = action.payload; // you can get the errors because get games returns errors
            alert("get Athletes did not work")
        })
        builder.addCase(getAthlete.pending, (state, _)=>{
            state.loading = true;
        })
        builder.addCase(getAthlete.fulfilled, (state, action)=>{
            state.singleAthlete = action.payload; //getGames payload
            state.loading = false;
        })
        builder.addCase(getAthlete.rejected,(state,action)=> {
            state.loading = false;
            state.errors = action.payload; // you can get the errors because get games returns errors
            alert("get Athlete did not work")
        })
        builder.addCase(advancedOne.pending, (state, _)=>{
            state.loading = true;
        })
        builder.addCase(advancedOne.fulfilled, (state, action)=>{
            state.athletes = action.payload; //getGames payload
            state.loading = false;
        })
        builder.addCase(advancedOne.rejected,(state,action)=> {
            state.loading = false;
            state.errors = action.payload; // you can get the errors because get games returns errors
            alert("search did not work")
        })
        builder.addCase(advancedTwo.pending, (state, _)=>{
            state.loading = true;
        })
        builder.addCase(advancedTwo.fulfilled, (state, action)=>{
            state.sportsEvents = action.payload; //getGames payload
            state.loading = false;
        })
        builder.addCase(advancedTwo.rejected,(state,action)=> {
            state.loading = false;
            state.errors = action.payload; // you can get the errors because get games returns errors
            alert("search did not work")
        })
        //Get top three
        builder.addCase(getTopThree.pending, (state, _)=>{
            state.loading = true;
        })
        builder.addCase(getTopThree.fulfilled, (state, action)=>{
            state.topThrees = action.payload; 
            state.loading = false;
        })
        builder.addCase(getTopThree.rejected,(state,action)=> {
            state.loading = false;
            state.errors = action.payload; // you can get the errors because get games returns errors
            alert("Select Top 3 did not work")
        })
        //getSelectMedals
        builder.addCase(getSelectMedals.pending, (state, _)=>{
            state.loading = true;
        })
        builder.addCase(getSelectMedals.fulfilled, (state, action)=>{
            state.selectMedals = action.payload; 
            state.loading = false;
        })
        builder.addCase(getSelectMedals.rejected,(state,action)=> {
            state.loading = false;
            state.errors = action.payload; // you can get the errors because get games returns errors
            alert("select medals did not work")
        })
        //medalsStored
        builder.addCase(doStored.pending, (state, _)=>{
            state.loading = true;
        })
        builder.addCase(doStored.fulfilled, (state, action)=>{
            state.medalsCounted = action.payload[0]; 
            alert(JSON.stringify(action.payload[1]))
            state.loading = false;
        })
        builder.addCase(doStored.rejected,(state,action)=> {
            state.loading = false;
            state.errors = action.payload; // you can get the errors because get games returns errors
            alert("stored procedure did not work")
        })
        
        //updateTopThree
        builder.addCase(updateTopThree.pending, (state, _)=>{
            state.loading = true;
        })
        builder.addCase(updateTopThree.fulfilled, (state, action)=>{
            if (action.payload!=null){
                state.updateTopThreeResponse = action.payload;
            }
            state.loading = false;
        })
        builder.addCase(updateTopThree.rejected,(state,action)=> {
            state.loading = false;
            state.errors = action.payload; // you can get the errors because get games returns errors
            alert("update top 3 did not work")
        })
    }
})

export default athleteSlice.reducer; 
//export const {  } = athleteSlice.actions;