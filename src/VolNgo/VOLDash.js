import React from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Logout from "./Logout";
import VOLHeader from "./VOLHeader";
import AllotedEvents from "./AllotedEvents";
import ApproveDonation from "./ApproveDonation";

const VOLDash = () => {
    const [autheticated, setAutheticated] = useState(false);
    const [load, setLoad] = useState(true);
    const [volEmail, setVolEmail] = useState('');
    useEffect(() => {
        if (load) {
            let role = sessionStorage.getItem("role");
            let email = sessionStorage.getItem("email");
            if (role === "volunteer") {
                setAutheticated(true);
                setVolEmail(email);
            }
            setLoad(false);
        }
    }, []);
    let { path } = useRouteMatch();
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
                <VOLHeader url={path} />
                <Switch>
                    <Route exact path={path}>
                        <Redirect to={`${path}/alloted`} />
                    </Route>
                    <Route path={`${path}/alloted`}>
                        <AllotedEvents user={volEmail} />
                    </Route>
                    <Route path={`${path}/approve`}>
                        <ApproveDonation user={volEmail} />
                    </Route>
                    <Route path={`${path}/logout`}>
                        <Logout />
                    </Route>
                </Switch>
            </>

        )
    }
}

export default VOLDash;