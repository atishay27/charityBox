import React from "react";
import MaterialTable from 'material-table';
import tableIcons from "./icon";
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase";
import "./table.css";

const AllotedEvents = ({ user }) => {
    const [info, setInfo] = useState([]);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        if (load) {
            Fetchdata();
        }
    }, []);
    const Fetchdata = () => {
        setInfo([]);
        projectFirestore.collection("events").where('volunteer', 'array-contains', user).get().then((querySnapshot) => {
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
    }
    return (
        <div className="myTable" style={{ maxWidth: "85%" }}>
            <MaterialTable
                icons={tableIcons}
                detailPanel={rowData => {
                    const volunteers = rowData.volunteer;
                    const allVolunteers = volunteers.map((number) => <td className="mytabStyle2">{number}</td>);
                    const mycolspan = volunteers.length;
                    return (
                        <div className="detailPanel">
                            <table className="mytabStyle">
                                <tr className="mytabStyle">
                                    <th className="myHeader">ADDRESS</th>
                                    <td className="mytabStyle" colSpan={mycolspan}>{rowData.address}</td>
                                </tr>
                                <tr>
                                    <th className="myHeader">VOLUNTEER</th>
                                    {allVolunteers}
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
            />
        </div>
    )
}

export default AllotedEvents;