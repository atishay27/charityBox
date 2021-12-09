import React from "react";
import MaterialTable from 'material-table';
import tableIcons from "./icon";
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase";
import "./table.css";

const ApprovedDonation = ({ user }) => {
    const [info, setInfo] = useState([]);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        if (load) {
            Fetchdata();
        }
    }, []);
    const Fetchdata = () => {
        setInfo([]);
        projectFirestore.collection("fulfilledRequests").where('email', '==', user).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var id = element.id;
                var data = element.data();
                data.id = id;
                if (data['date']) {
                    data['date'] = data['date'].toDate();
                }
                setInfo(arr => [...arr, data]);
            });
            setLoad(false);
        })
    }
    return (
        <div className="container">
            <div className="myTable" style={{ maxWidth: "85%" }}>
                <MaterialTable
                    icons={tableIcons}
                    detailPanel={rowData => {
                        return (
                            <div className="detailPanel">
                                <table className="mytabStyle">
                                    <tr className="mytabStyle">
                                        <th colSpan={2} className="myHeader">DISPATCH ADDRESS</th>
                                        <td colSpan={4} className="mytabStyle" >{rowData.address}</td>
                                    </tr>
                                </table>
                            </div>
                        )
                    }}
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'E-Mail', field: 'email' },
                        { title: 'Clothes Sent', field: 'disbursed' },
                        { title: 'Date', field: 'date', type: 'date' },
                        { title: 'Courier', field: 'courierName' },
                        { title: 'Tracking ID', field: 'trackingID' },
                    ]}
                    data={info}
                    title="Fulfilled Requests"
                />
            </div>
        </div>
    )
}

export default ApprovedDonation;