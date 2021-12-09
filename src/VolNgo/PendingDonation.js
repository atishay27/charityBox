import React from "react";
import MaterialTable from 'material-table';
import tableIcons from "./icon";
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase";
import "./table.css";

const PendingDonation = ({ user }) => {
    const [info, setInfo] = useState([]);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        if (load) {
            Fetchdata();
        }
    }, []);
    const Fetchdata = () => {
        setInfo([]);
        projectFirestore.collection("pendingRequests").where('email', '==', user).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var id = element.id;
                var data = element.data();
                data.id = id;
                setInfo(arr => [...arr, data]);
                setLoad(false);
            });
        })
    }
    return (
        <div className="container">
            <div className="myTable" style={{ maxWidth: "85%" }}>
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'E-Mail', field: 'email' },
                        { title: 'Clothes Requested', field: 'requested', type: 'numeric' },
                        { title: 'ADDRESS', field: 'address' },
                    ]}
                    data={info}
                    title="PENDING REQUEST"
                />
            </div>
        </div>
    )
}

export default PendingDonation;