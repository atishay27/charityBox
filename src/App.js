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
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
export default App;

/*import firebase from "./firebase";
function App() { 

  React.useEffect(()=>{
    const msg=firebase.messaging();
    msg.requestPermission().then(()=>{
      return msg.getToken();                                
    }).then(token=>{
      console.log('Token:',token)
    }).catch(()=>{
      console.log('error');
    })
  })
  return (
    <div >
    </div>
  );
}

export default App;*/
