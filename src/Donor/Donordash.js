import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    Link
} from "react-router-dom";
import Navbar from "./Navbar";
import Event from "./Event";
import Points from "./Points";
import Profile from "./Profile"
import NotFound from "./NotFound";
import History from "./History";
import Registration from "./registration";
import '../App.css'
import { projectFirestore } from '../firebase';
import Logout from './Logout';

const DonorDash = () => {
    let { path } = useRouteMatch();
    //User Name
    //userInfo
    const email = sessionStorage.getItem("email");
    const name = sessionStorage.getItem("name");
    const [user, setUser] = useState([]);
    const [loader, setLoader] = useState(true);
    const [autheticated, setAutheticated] = useState(false);
    const [load, setLoad] = useState(true);
    const [donorEmail, setDonorEmail] = useState('');
    useEffect(() => {
        if (load) {
            let role = sessionStorage.getItem("role");
            let email = sessionStorage.getItem("email");
            if (role === "donor") {
                setAutheticated(true);
                setDonorEmail(email);
            }
            setLoad(false);
        }
    }, []);
    if (!autheticated) {
        return (
            <div>
                <h1>LOGIN REQUIRED</h1>
                <Link className="nav-link" to={`/`}>LOGIN</Link>
            </div>
        )
    } else {
        return (
            <>
                <Navbar url={path} />
                <Switch>
                    <Route exact path={"/donor"}>
                        <h2>WELCOME TO CHARITY BOX</h2>
                        <div>
                            <h2>Hello, {name}</h2>
                            <h2>{email}</h2>
                        </div>
                    </Route>
                    <Route path={`${path}/Event`}>
                        <Event />
                    </Route>
                    <Route path={`${path}/points`}>
                        <Points />
                    </Route>
                    <Route path={`${path}/history`}>
                        <History />
                    </Route>
                    <Route path={`${path}/profile`}>
                        <Profile />
                    </Route>
                    <Route path={`${path}/logout`}>
                        <Logout />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </>
        )
    }
};

export default DonorDash;