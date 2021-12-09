import React from "react";
import MaterialTable from 'material-table';
import { projectFirestore } from '../../firebase';
import tableIcons from "../icons";
import { useEffect, useState } from "react";


const Fulfilled = () => {
    const [info, setInfo] = useState([]);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        if (load) {
            Fetchdata();
        }
    }, []);
    const Fetchdata = () => {
        projectFirestore.collection("fulfilledRequests").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var id = element.id;
                var data = element.data();
                data.id = id;
                if (data['date']) {
                    data['date'] = data['date'].toDate();
                  }
                setInfo(arr => [...arr, data]);
                setLoad(false);
            });
        })
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
                        { title: 'Date', field: 'date',type: 'date' },
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

export default Fulfilled;