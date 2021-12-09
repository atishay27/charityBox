import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useRouteMatch,Switch,Route,Redirect } from "react-router-dom";
import Create from "./Events/Create";
import Ongoing from "./Events/Ongoing";
import NotFound from "./NotFound";
import "./events.css";

const Events = () =>{
    let {path,url} = useRouteMatch();
    return(
        <div className="container-fluid full-w full-h">
            <div className="row full-h">
                <div className="col-3">
                    <div className="sidebar">
                        <h2>
                            EVENTS
                        </h2>
                    <button type="button" className="buttonClass">
                        <Link className="eventLink" to={`${url}/modify`}>MODIFY</Link>
                    </button>
                    <button type="button" className="buttonClass">
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
                        <Ongoing />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
                </div>
            </div>
        </div>
    )
}

export default Events;