import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./events.css";
import { Link,useRouteMatch,Switch,Route,Redirect } from "react-router-dom";
import NotFound from "./NotFound";
import Status from "./Donations/Status";
import Inventory from "./Donations/Inventory";
import Total from "./Donations/Total";

const Donations = () =>{
    let {path,url} = useRouteMatch();
    return(
        <div className="container-fluid full-w full-h">
            <div className="row full-h">
                <div className="col-3">
                    <div className="sidebar">
                        <h2>
                            DONATIONS
                        </h2>
                    <button type="button" className="buttonClass">
                        <Link className="eventLink" to={`${url}/status`}>STATUS</Link>
                    </button>
                    <button type="button" className="buttonClass">
                        <Link className="eventLink" to={`${url}/modify`}>MODIFY</Link>
                    </button>
                    <button type="button" className="buttonClass">
                        <Link className="eventLink" to={`${url}/inventory`}>INVENTORY</Link>
                    </button>
                    </div>
                </div>
                <div className="col-9">
                <Switch>
                    <Route exact path={path}>
                        <Redirect to={`${path}/status`} />
                    </Route>
                    <Route path={`${path}/status`}>
                        <Status />
                    </Route>
                    <Route path={`${path}/modify`}>
                        <Total />
                    </Route>
                    <Route path={`${path}/inventory`}>
                        <Inventory />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
                </div>
            </div>
        </div>
    );
};
export default Donations;