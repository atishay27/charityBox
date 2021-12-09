import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useRouteMatch,Switch,Route,Redirect } from "react-router-dom";
import NotFound from "./NotFound";
import Pending from "./History/Pending";
import Verified from "./History/Verified";
import Coupons from "./History/Coupons";

const History=()=>{
    let {path,url} = useRouteMatch();

    return(
        
        <div className="container-fluid full-w full-h">
            <div className="row full-h">
                <div className="col-3">
                    <div className="sidebar">
                        <h2>
                            HISTORY
                        </h2>
                    <button className="buttonClass" type="button">
                        <Link className="eventLink" to={`${url}/Pending`}>PENDING</Link>
                    </button>
                    <button className="buttonClass" type="button">
                        <Link className="eventLink" to={`${url}/Verified`}>VERIFIED</Link>
                    </button>
                    <button className="buttonClass" type="button">
                        <Link className="eventLink" to={`${url}/Coupons`}>Coupons</Link>
                    </button>
                    </div>
                </div>
                <div className="col-9">
                <Switch>
                     <Route exact path={path}>
                        <Redirect to={`${path}/Verified`} />
                    </Route>
                    <Route path={`${path}/Pending`}>
                        <Pending />
                    </Route>
                    <Route path={`${path}/Verified`}>
                        <Verified />
                    </Route> 
                    <Route path={`${path}/Coupons`}>
                        <Coupons />    
                    </Route>   
                    <Route component={NotFound} />
                </Switch>
                </div>
            </div>
        </div>

        
        )



};

export default History;