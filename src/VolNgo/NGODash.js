import React from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import NGOHeader from './NGOHeader';
import Logout from "./Logout";
import RequestDonation from "./RequestDonation";
import ApprovedDonation from "./ApprovedDonation";
import PendingDonation from "./PendingDonation";

const NGODash = () => {
    const [autheticated, setAutheticated] = useState(false);
    const [load, setLoad] = useState(true);
    const [ngoEmail, setNgoEmail] = useState('');
    useEffect(() => {
        if (load) {
            let role = sessionStorage.getItem("role");
            let email = sessionStorage.getItem("email");
            if (role === "ngo") {
                setAutheticated(true);
                setNgoEmail(email);
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
                <NGOHeader url={path} />
                <Switch>
                    <Route exact path={path}>
                        <Redirect to={`${path}/request`} />
                    </Route>
                    <Route path={`${path}/request`}>
                        <RequestDonation user={ngoEmail} />
                    </Route>
                    <Route path={`${path}/approved`}>
                        <ApprovedDonation user={ngoEmail} />
                    </Route>
                    <Route path={`${path}/pending`}>
                        <PendingDonation user={ngoEmail} />
                    </Route>
                    <Route path={`${path}/logout`}>
                        <Logout />
                    </Route>
                </Switch>
            </>
        )
    }
}

export default NGODash;