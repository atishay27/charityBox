import React from "react";
import MaterialTable from 'material-table';
import Check from '@material-ui/icons/Check';
import tableIcons from "../icons";
import "./table.css";
import { useEffect, useState } from "react";
import { projectFirestore } from '../../firebase';
import { Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Pending = () => {
    const [info, setInfo] = useState([]);
    const [load, setLoad] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [trackingID, setTrackingID] = useState('');
    const [courierName, setcourierName] = useState('');
    const [oldData, setOldData] = useState({});
    useEffect(() => {
        if (load) {
            Fetchdata();
        }
    }, []);
    const Fetchdata = () => {
        setInfo([]);
        projectFirestore.collection("pendingRequests").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var id = element.id;
                var data = element.data();
                data.id = id;
                setInfo(arr => [...arr, data]);
                setLoad(false);
            });
        })
    }
    const showModal = (oldData) => {
        setTrackingID('');
        setcourierName('');
        setOldData({});
        setIsModalVisible(true);
        setOldData(oldData);
    }
    async function handleOk() {
        var NGOdata = {};
        console.log(oldData.email);
        await projectFirestore.collection("approvedNGO").doc(oldData.email).get().then((querySnapshot) => {
            var data = querySnapshot.data();
            NGOdata = data;
        });
        setTrackingID('');
        setcourierName('');
        setIsModalVisible(false);
        var today = new Date();
        await projectFirestore.collection("fulfilledRequests").add({
            name: oldData.name,
            email: oldData.email,
            address: oldData.address,
            disbursed: oldData.requested,
            trackingID: trackingID,
            courierName: courierName,
            date: today
        });
        await projectFirestore.collection("pendingRequests").doc(oldData.id).delete();
        await projectFirestore.collection("approvedNGO").doc(oldData.email).update({
            pending: parseInt(NGOdata.pending - parseInt(oldData.requested)),
            received: parseInt(NGOdata.received + parseInt(oldData.requested))
        });
        setOldData({});
        setInfo([]);
        Fetchdata();
        toast.success('DISPATCH STATUS UPDATED!!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
    }
    const handleCancel = () => {
        setTrackingID('');
        setcourierName('');
        setOldData({});
        setIsModalVisible(false);
    }
    return (
        <div>
            <div className="myTable" style={{ maxWidth: "85%" }}>
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'E-Mail', field: 'email' },
                        { title: 'Address', field: 'address' },
                        { title: 'Clothes Requested', field: 'requested' },
                    ]}
                    data={info}
                    title="Pending Requests"
                    actions={[
                        {
                            icon: () => <Check />,
                            tooltip: 'Confirm Dispatch',
                            onClick: (event, rowData) => showModal(rowData)
                        },
                    ]}
                />
            </div>
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
            <Modal title="Dispatch Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div className="container">
                    <div className="row">
                        <div className="col-2" />
                        <div className="col-8">
                            <form className="myform">
                                <div className="form-outline mb-4">
                                    <input type="text" required className="form-control" value={trackingID} placeholder="Enter Tracking ID" onChange={(e) => { setTrackingID(e.target.value) }} />
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" required className="form-control" value={courierName} placeholder="Enter Courier Name" onChange={(e) => { setcourierName(e.target.value) }} />
                                </div>
                            </form>
                        </div>
                        <div className="col-2" />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Pending;