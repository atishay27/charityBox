import React from "react";
import MaterialTable from 'material-table';
import tableIcons from "./icon";
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase";
import "./table.css";
import { Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const ApproveDonation = ({ user }) => {
    const [info, setInfo] = useState([]);
    const [load, setLoad] = useState(true);
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [receivedClothes, setReceivedClothes] = useState(0);
    const [donationData, setDonationData] = useState([]);
    const showModal = (oldData) => {
        setReceivedClothes(oldData.clothes);
        setDonationData(oldData);
        setIsModalVisible(true);
    }
    const handleCancel = () => {
        setIsModalVisible(false);
        setDonationData([]);
    }
    async function handleOk() {
        var received = 0;
        const inventory = projectFirestore.collection('inventory');
        await inventory.doc("RECEIVED").get().then((querySnapshot) => {
            var data = querySnapshot.data();
            received = parseInt(data.clothes);
        });
        await projectFirestore.collection("verifiedDonations").add({
            addd: "no",
            donated: parseInt(receivedClothes),
            email: donationData.donorEmail,
            name: donationData.donorName,
            points: parseInt((parseInt(receivedClothes) * 10)),
            event: donationData.eventName,
            date: new Date(),
            volunteer: user
        })
        await inventory.doc("RECEIVED").update({
            clothes: parseInt(received + parseInt(receivedClothes))
        });
        await projectFirestore.collection("pendingDonations").doc(donationData.id).delete();
        toast.success("DONATION APPROVED", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        setData([]);
        Fetchdata2();
        setIsModalVisible(false);
    }
    useEffect(() => {
        setData([]);
        if (load) {
            Fetchdata();
        }
    }, []);
    useEffect(() => {
        if (info.length === 0) {
            console.log("EMPTY ARRAY");
        } else {
            Fetchdata2();
        }
    }, [info])
    const Fetchdata = () => {
        setInfo([]);
        setData([]);
        projectFirestore.collection("events").where('volunteer', 'array-contains', user).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var id = element.id;
                setInfo(arr => [...arr, id]);
                setLoad(false);
            });
        })
    }
    const Fetchdata2 = () => {
        console.log("INFO: ", info);
        setData([]);
        projectFirestore.collection("pendingDonations").where('eventID', 'in', info).get().then((querySnapshot) => {
            setData([]);
            querySnapshot.forEach(element => {
                var id = element.id;
                var data = element.data();
                data.id = id;
                setData(arr => [...arr, data]);
            });
        })
    }
    return (
        <div className="container">
            <div className="myTable" style={{ maxWidth: "85%" }}>
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        { title: 'Event Name', field: 'eventName' },
                        { title: 'Donor E-Mail', field: 'donorEmail' },
                        { title: 'clothes', field: 'clothes', type: 'numeric' },
                    ]}
                    data={data}
                    title="Donation Detail's"
                    actions={[
                        {
                            icon: () => <button className="btn btn-primary">CONFIRM</button>,
                            tooltip: 'Confirm Donation',
                            onClick: (event, rowData) => showModal(rowData)
                        },
                        {
                            icon: () => <DeleteOutline />,
                            tooltip: 'Delete Donation',
                            onClick: (event, rowData) => {
                                projectFirestore.collection("pendingDonations").doc(rowData.id).delete();
                                toast.success('DONATION DELETED!!!', {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                });
                                setData([]);
                                Fetchdata2();
                            }
                        }
                    ]}
                />
            </div>
            <Modal title="Dispatch Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div className="container">
                    <div className="row">
                        <div className="col-2" />
                        <div className="col-8">
                            <form className="myform">
                                <div className="form-outline mb-4">
                                    <input type="text" required className="form-control" value={receivedClothes} placeholder="Enter Clothes" onChange={(e) => { setReceivedClothes(e.target.value) }} />
                                    <span><i><center>RECEIVED CLOTHES</center></i></span>
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
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default ApproveDonation;