import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./events.css";
import { Link,useRouteMatch,Switch,Route,Redirect } from "react-router-dom";
import NotFound from "./NotFound";
import Requests from "./NGO/requests";
import Allocation from "./NGO/allocation";
import Fulfilled from "./NGO/fulfilled";
import Pending from "./NGO/pending";


const Ngo = () => {
    let {path,url} = useRouteMatch();
    return(
        <div className="container-fluid full-w full-h">
            <div className="row full-h">
                <div className="col-3">
                    <div className="sidebar">
                        <h2>
                            NGO
                        </h2>
                    <button className="buttonClass" type="button">
                        <Link className="eventLink" to={`${url}/pending_req`}>PENDING REQUESTS</Link>
                    </button>
                    <button className="buttonClass" type="button">
                        <Link className="eventLink" to={`${url}/fulfilled_req`}>FULFILLED REQUESTS</Link>
                    </button>
                    <button className="buttonClass" type="button">
                        <Link className="eventLink" to={`${url}/pending_ngo`}>PENDING NGO</Link>
                    </button>
                    <button className="buttonClass" type="button">
                        <Link className="eventLink" to={`${url}/approved_ngo`}>APPROVED NGO</Link>
                    </button>
                    </div>
                </div>
                <div className="col-9">
                <Switch>
                    <Route exact path={path}>
                        <Redirect to={`${path}/pending_req`} />
                    </Route>
                    <Route path={`${path}/pending_req`}>
                        <Pending />
                    </Route>
                    <Route path={`${path}/fulfilled_req`}>
                        <Fulfilled />
                    </Route>
                    <Route path={`${path}/pending_ngo`}>
                        <Requests />
                    </Route>
                    <Route path={`${path}/approved_ngo`}>
                        <Allocation />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
                </div>
            </div>
        </div>
    );
};
export default Ngo;