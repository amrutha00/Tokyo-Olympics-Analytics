import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GetAthletesPage from './features/GetAthletesPage';
import InsertAthletePage from './features/InsertAthletePage';
import { useAppDispatch } from './store/store';
import { getAthletes } from './features/athletesSlice';
import SingleAthletePage from './features/SingleAthletePage';
import AdvanceQueryOnePage from './features/AdvanceQueryOnePage';
import AdvanceQueryTwoPage from './features/AdvanceQueryTwoPage';
import UpdateAthletePage from './features/UpdateAthletePage';
import TopThreesPage from './features/TopThreesPage';
import SelectMedalsPage from './features/SelectMedalsPage';
import StoredProcedurePage from './features/StoredProcedurePage';
import UpdateTopThreePage from './features/UpdateTopThreePage';

function App() {
  const dispatch = useAppDispatch();


  
  const initApp = React.useCallback(async () => {
    const data = {
      name: "test",
      noc: "",
      discipline: "",
    }
    await dispatch(getAthletes(data));
  },[dispatch]);

  useEffect(()=> {
    initApp();
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetAthletesPage/>}/>
        <Route path="/singleathlete/:athletename" element={<SingleAthletePage/>}/>
        <Route path="/updateathlete/:athletename" element={<UpdateAthletePage/>}/>
        <Route path="/createathlete" element = {<InsertAthletePage/>}/>
        <Route path="/advancedqueryone" element ={<AdvanceQueryOnePage/>}/>
        <Route path="/advancedquerytwo" element ={<AdvanceQueryTwoPage/>}/>
        <Route path="/topthrees" element ={<TopThreesPage/>}/>
        <Route path="/selectmedals" element ={<SelectMedalsPage/>}/>
        <Route path="/storedprocedure" element ={<StoredProcedurePage/>}/>
        <Route path="/updatetopthree" element ={<UpdateTopThreePage/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
