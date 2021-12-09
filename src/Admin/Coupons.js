import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./events.css";
import { Link,useRouteMatch,Switch,Route,Redirect } from "react-router-dom";
import NotFound from "./NotFound";
import Create from "./Coupons/Create";
import Update from "./Coupons/Update";

const Coupons=()=>{
    let {path,url} = useRouteMatch();
    return(
        <div className="container-fluid full-w full-h">
            <div className="row full-h">
                <div className="col-3">
                    <div className="sidebar">
                        <h2>
                            COUPONS
                        </h2>
                    <button className="buttonClass" type="button">
                        <Link className="eventLink" to={`${url}/modify`}>MODIFY</Link>
                    </button>
                    <button className="buttonClass" type="button">
                        <Link className="eventLink" to={`${url}/create`}>CREATE</Link>
                    </button>
                    </div>
                </div>
                <div className="col-9">
                <Switch>
                    <Route exact path={path}>
                        <Redirect to={`${path}/modify`} />
                    </Route>
                    <Route path={`${path}/create`}>
                        <Create />
                    </Route>
                    <Route path={`${path}/modify`}>
                        <Update />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
                </div>
            </div>
        </div>
    )
};

export default Coupons;