import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useRouteMatch,Switch,Route,Redirect } from "react-router-dom";
import NotFound from "./NotFound";
import Ongoing from "./Events/Ongoing";
import Upcoming from "./Events/Upcoming";
import Today from "./Events/Today";

const Events=()=>{
    let {path,url} = useRouteMatch();

    return(
        
        <div className="container-fluid full-w full-h">
            <div className="row full-h">
                <div className="col-3">
                    <div className="sidebar">
                        <h2>
                            EVENTS
                        </h2>
                    <button className="buttonClass" type="button">
                        <Link className="eventLink" to={`${url}/Ongoing`}>ONGOING</Link>
                    </button>
                    <button className="buttonClass" type="button">
                        <Link className="eventLink" to={`${url}/Upcoming`}>UPCOMING</Link>
                    </button>
                    </div>
                </div>
                <div className="col-9">
                <Switch>
                     <Route exact path={path}>
                        <Redirect to={`${path}/Ongoing`} />
                    </Route>
                    <Route path={`${path}/Ongoing`}>
                        <Today />
                    </Route>
                    <Route path={`${path}/Upcoming`}>
                        <Upcoming />
                    </Route>    
                    <Route component={NotFound} />
                </Switch>
                </div>
            </div>
        </div>

        
        )



};

export default Events;