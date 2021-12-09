import React from 'react';
//import firebase from 'firebase';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//import * as firebase from 'firebase/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDash from "./Admin/AdminDash";
import Home from "./Home";
import NotFound from "./NotFound";
//import NVDash from "./NVDash";
import VOLDash from './VolNgo/VOLDash';
import DonorDash from './Donor/Donordash';
import NGORegistartion from './NGORegistration';
import NGODash from './VolNgo/NGODash';
import DonorRegistartion from './DonorRegistration';
import VOLRegistraion from './VOLRegistration';
import Volunteer from './VolNgo/volunteer';
const App=() =>{
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/admin">
          <AdminDash />
        </Route>
        <Route path="/donor">
          <DonorDash />
        </Route>
        <Route path="/volunteer">
          <VOLDash />
        </Route>
        <Route path="/ngo">
          <NGODash />
        </Route>
        <Route path="/NGOReg">
          <NGORegistartion />
        </Route>
        <Route path="/DonorReg">
          <DonorRegistartion />
        </Route>
        <Route path="/VolReg">
          <VOLRegistraion />
        </Route>
        <Route path="/why-volunteer">
          <Volunteer />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
export default App;
