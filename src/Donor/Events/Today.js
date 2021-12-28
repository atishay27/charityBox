import React from "react";
import { useEffect, useState } from "react";
import MaterialTable from 'material-table';
import tableIcons from "./icons";
import { projectFirestore } from '../../firebase';
import { Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Today = () => {
    const [info, setInfo] = useState([]);
    const [load, setLoad] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [oldData, setOldData] = useState({});
    const [noOfClothes, setNoOfClothes] = useState('');
    const DonorEmail = sessionStorage.getItem("email");
    const DonorName = sessionStorage.getItem("name");
    useEffect(() => {
        if (load) {
            Fetchdata();
        }
    }, []);
    const Fetchdata = () => {
        var today = new Date();
        var tommorow = new Date();
        tommorow.setDate(tommorow.getDate() + 1);
        projectFirestore.collection("events").where('endDateTime', '<', tommorow).where('endDateTime', '>', today).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var id = element.id;
                var data = element.data();
                data.id = id;
                if (data['startDateTime'] && data['endDateTime']) {
                    data['startDateTime'] = data['startDateTime'].toDate();
                    data['endDateTime'] = data['endDateTime'].toDate();
                }
                setInfo(arr => [...arr, data]);
                setLoad(false);
            });
        })
    };
    const showModal = (oldData) => {
        setNoOfClothes('');
        setOldData({});
        setIsModalVisible(true);
        setOldData(oldData);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        projectFirestore.collection("pendingDonations").add({
            eventName: oldData.name,
            donorEmail: DonorEmail,
            clothes: parseInt(noOfClothes),
            eventID: oldData.id,
            donorName: DonorName
        })
        setOldData({});
        setInfo([]);
        Fetchdata();
        setNoOfClothes('');
        toast.success('DONATION REQUEST SUBMITTED!!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    };
    const handleCancel = () => {
        setNoOfClothes('');
        setOldData({});
        setIsModalVisible(false);
    }
    return (
        <div>
            <div className="myTable" style={{ maxWidth: "85%" }}>
                <MaterialTable
                    icons={tableIcons}
                    detailPanel={rowData => {
                        return (
                            <div className="detailPanel">
                                <table className="mytabStyle">
                                    <tr className="mytabStyle">
                                        <th className="myHeader">ADDRESS</th>
                                        <td className="mytabStyle">{rowData.address}</td>
                                    </tr>
                                </table>

                            </div>
                        )
                    }}
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'City', field: 'city' },
                        { title: 'Area', field: 'area' },
                        { title: 'Event Date', field: 'startDateTime', type: 'date' },
                        { title: 'Start Time', field: 'startDateTime', type: 'time' },
                        { title: 'End Time', field: 'endDateTime', type: 'time' },
                    ]}
                    data={info}
                    title="Event Detail's"
                    actions={[
                        {
                            icon: () => <button className="btn btn-primary">DONATE</button>,
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
            <Modal title="Donation Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div className="container">
                    <div className="row">
                        <div className="col-2" />
                        <div className="col-8">
                            <form className="myform">
                                <div className="form-outline mb-4">
                                    <input type="text" required className="form-control" value={noOfClothes} placeholder="Enter No Of Clothes" onChange={(e) => { setNoOfClothes(e.target.value) }} />
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

export default Today;