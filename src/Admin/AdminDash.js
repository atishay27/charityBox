import React from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Events from "./Events";
import Ngo from "./Ngo";
import Donations from "./Donations";
import NotFound from "./NotFound";
import Coupons from "./Coupons";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
const AdminDash = () => {
    const [autheticated, setAutheticated] = useState(false);
    const [load, setLoad] = useState(true);
    
    useEffect(() => {
        if(load){
            let role = sessionStorage.getItem("role");
            
            if(role === "admin"){
                setAutheticated(true);
                
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
                <AdminHeader url={path} />
                <Switch>
                    <Route exact path={path}>
                        <Redirect to={`${path}/events`} />
                    </Route>
                    <Route path={`${path}/events`}>
                        <Events />
                    </Route>
                    <Route path={`${path}/donations`}>
                        <Donations />
                    </Route>
                    <Route path={`${path}/ngo`}>
                        <Ngo />
                    </Route>
                    <Route path={`${path}/coupons`}>
                        <Coupons />
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

export default AdminDash;