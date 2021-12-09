import React from "react";
import "./status.css";
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import { projectFirestore } from '../../firebase';
import { useEffect, useState } from "react";
import { parse } from "@babel/core";
import { Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Status = () => {
    const [load, setLoad] = useState(true);
    const [info, setInfo] = useState([]);
    const [thisMonthClothesDonated, setThisMonthClothesDonated] = useState(0);
    const [thisMonthActiveDonor, setThisMonthActiveDonor] = useState(0);
    const [prevMonthClothesDonated, setPrevMonthClothesDonated] = useState(0);
    const [prevMonthActiveDonor, setPrevMonthActiveDonor] = useState(0);
    const [thisMonthEventsConducted, setThisMonthEventsConducted] = useState(0);
    const [prevMonthEventsConducted, setPrevMonthEventsConducted] = useState(0);
    const [clothesTarget, setClothesTarget] = useState(0);
    const [eventsTarget, setEventsTarget] = useState(0);
    const [donorsTarget, setDonorsTarget] = useState(0);
    const [newClothesTarget, setNewClothesTarget] = useState(0);
    const [newEventsTarget, setNewEventsTarget] = useState(0);
    const [newDonorsTarget, setNewDonorsTarget] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        if (load) {
            Fetchdata();
        }
    }, []);
    const showModal = (oldData) => {
        setNewClothesTarget(clothesTarget);
        setNewDonorsTarget(donorsTarget);
        setNewEventsTarget(eventsTarget);
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setNewClothesTarget(0);
        setNewDonorsTarget(0);
        setNewEventsTarget(0);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        projectFirestore.collection("target").doc("CLOTHES").update({
            number: parseInt(newClothesTarget)
        });
        projectFirestore.collection("target").doc("DONORS").update({
            number: parseInt(newDonorsTarget)
        });
        projectFirestore.collection("target").doc("EVENTS").update({
            number: parseInt(newEventsTarget)
        });
        toast.success('TARGET VALUES UPDATED!!!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        Fetchdata();
    };
    const Fetchdata = () => {
        setLoad(false);
        var thisMonthClothes = 0;
        var thisMonthDonor = 0;
        var prevMonthClothes = 0;
        var prevMonthDonor = 0;
        var thisMonthEvents = 0;
        var prevMonthEvents = 0;
        var thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setMinutes(0);
        thisMonth.setHours(0);
        thisMonth.setSeconds(0);
        var prevMonth = new Date()
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        prevMonth.setDate(1);
        prevMonth.setMinutes(0);
        prevMonth.setHours(0);
        prevMonth.setSeconds(0);
        console.log(thisMonth.toString());
        console.log(prevMonth.toString());
        projectFirestore.collection("verifiedDonations").where('date', '>', thisMonth).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();
                thisMonthClothes = thisMonthClothes + parseInt(data['donated']);
                thisMonthDonor = thisMonthDonor + 1;
            });
            setThisMonthClothesDonated(thisMonthClothes);
            setThisMonthActiveDonor(thisMonthDonor);
        })
        projectFirestore.collection("verifiedDonations").where('date', '<', thisMonth).where('date', '>', prevMonth).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();
                prevMonthClothes = prevMonthClothes + parseInt(data['donated']);
                prevMonthDonor = prevMonthDonor + 1;
            });
            setPrevMonthClothesDonated(prevMonthClothes);
            setPrevMonthActiveDonor(prevMonthDonor);
        })
        projectFirestore.collection("events").where('endDateTime', '<', thisMonth).where('endDateTime', '>', prevMonth).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                prevMonthEvents = prevMonthEvents + 1;
            });
            setPrevMonthEventsConducted(prevMonthEvents);

        })
        projectFirestore.collection("events").where('endDateTime', '>', thisMonth).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                thisMonthEvents = thisMonthEvents + 1;
            });
            setThisMonthEventsConducted(thisMonthEvents);
        })
        projectFirestore.collection("target").doc("CLOTHES").get().then((querySnapshot) => {
            var data = querySnapshot.data();
            setClothesTarget(parseInt(data.number));
        });
        projectFirestore.collection("target").doc("DONORS").get().then((querySnapshot) => {
            var data = querySnapshot.data();
            setDonorsTarget(parseInt(data.number));
        });
        projectFirestore.collection("target").doc("EVENTS").get().then((querySnapshot) => {
            var data = querySnapshot.data();
            setEventsTarget(parseInt(data.number));
        });
        setLoad(false);

    }

    return (
        <div className="container">
            <div className="container myCont">
                <div className="row  myHead">
                    <div className="col-12">
                        <h3 className="alCentre">THIS MONTH</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="card p-3 text-center" style={{ "width": "18rem" }}>
                            <Progress size="large" type="dashboard" format={() => `${thisMonthActiveDonor}`} percent={parseInt((thisMonthActiveDonor / donorsTarget) * 100)} />
                            <div className="card-body">
                                <h5 className="card-title">TOTAL DONOR'S</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card p-3 text-center" style={{ "width": "18rem" }}>
                            <Progress size="large" type="dashboard" format={() => `${thisMonthClothesDonated}`} percent={parseInt((thisMonthClothesDonated / clothesTarget) * 100)} />
                            <div className="card-body">
                                <h5 className="card-title">CLOTHES RECEIVED</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card p-3 text-center" style={{ "width": "18rem" }}>
                            <Progress size="large" type="dashboard" format={() => `${thisMonthEventsConducted}`} percent={parseInt((thisMonthEventsConducted / eventsTarget) * 100)} />
                            <div className="card-body">
                                <h5 className="card-title">EVENT'S CONDUCTED</h5>
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
                        <div className="card p-3 text-center" style={{ "width": "18rem" }}>
                            <Progress size="large" type="dashboard" format={() => `${prevMonthActiveDonor}`} percent={parseInt((prevMonthActiveDonor / donorsTarget) * 100)} />
                            <div className="card-body">
                                <h5 className="card-title">TOTAL DONOR'S</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card p-3 text-center" style={{ "width": "18rem" }}>
                            <Progress size="large" type="dashboard" format={() => `${prevMonthClothesDonated}`} percent={parseInt((prevMonthClothesDonated / clothesTarget) * 100)} />
                            <div className="card-body">
                                <h5 className="card-title">CLOTHES RECEIVED</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card p-3 text-center" style={{ "width": "18rem" }}>
                            <Progress size="large" type="dashboard" format={() => `${prevMonthEventsConducted}`} percent={parseInt((prevMonthEventsConducted / eventsTarget) * 100)} />
                            <div className="card-body">
                                <h5 className="card-title">EVENT'S CONDUCTED</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-4">
                <div className="col-5" />
                <div className="col-3">
                    <button className="btn btn-primary" onClick={showModal}>UPDATE TARGETS</button>
                </div>
                <div className="col-4" />
            </div>
            <Modal title="Dispatch Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div className="container">
                    <div className="row">
                        <div className="col-2" />
                        <div className="col-8">
                            <form className="myform">
                                <div className="form-outline mb-4">
                                    <input type="number" required className="form-control" value={newClothesTarget} onChange={(e) => { setNewClothesTarget(e.target.value) }} />
                                    <span><i><center>CLOTHES TARGET</center></i></span>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="number" required className="form-control" value={newDonorsTarget} onChange={(e) => { setNewDonorsTarget(e.target.value) }} />
                                    <span><i><center>DONOR TARGET</center></i></span>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="number" required className="form-control" value={newEventsTarget} onChange={(e) => { setNewEventsTarget(e.target.value) }} />
                                    <span><i><center>EVENTS TARGET</center></i></span>
                                </div>
                            </form>
                        </div>
                        <div className="col-2" />
                    </div>
                </div>
            </Modal>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
        </div>
    )
};

export default Status;