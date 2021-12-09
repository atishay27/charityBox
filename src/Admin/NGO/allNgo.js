import React from "react";
import "./status.css";
import { Progress } from 'antd';
import 'antd/dist/antd.css';

const AllNgo = () =>{
    return(
        <div className="container">
            <div className="container myCont">
                <div className="row  myHead">
                    <div className="col-12">
                        <h3 className="alCentre">THIS MONTH</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="card p-3 text-center" style={{"width": "18rem"}}>
                            <Progress size="large" type="dashboard" format={()=> `${23}`} percent={75} />
                            <div className="card-body">
                                <h5 className="card-title">ACTIVE NGO'S</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                    <div className="card p-3 text-center" style={{"width": "18rem"}}>
                            <Progress size="large" type="dashboard" format={()=> `${230}`} percent={25} />
                            <div className="card-body">
                                <h5 className="card-title">REQUEST FULFILLED</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                    <div className="card p-3 text-center" style={{"width": "18rem"}}>
                            <Progress size="large" type="dashboard" format={()=> `${5}`} percent={80} />
                            <div className="card-body">
                                <h5 className="card-title">NGO'S APPROVED</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container myCont">
                <div className="row  myHead">
                    <div className="col-12">
                        <h3 className="alCentre">PREVIOUS MONTH</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="card p-3 text-center" style={{"width": "18rem"}}>
                            <Progress size="large" type="dashboard" format={()=> `${18}`} percent={65} />
                            <div className="card-body">
                                <h5 className="card-title">ACTIVE NGO'S</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                    <div className="card p-3 text-center" style={{"width": "18rem"}}>
                            <Progress size="large" type="dashboard" format={()=> `${430}`} percent={55} />
                            <div className="card-body">
                                <h5 className="card-title">REQUEST FULFILLED</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                    <div className="card p-3 text-center" style={{"width": "18rem"}}>
                            <Progress size="large" type="dashboard" format={()=> `${1}`} percent={30} />
                            <div className="card-body">
                                <h5 className="card-title">NGO'S APPROVED</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllNgo;