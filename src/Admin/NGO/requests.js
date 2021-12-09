import React from "react";
import MaterialTable from 'material-table';
import { useEffect, useState } from "react";
import Check from '@material-ui/icons/Check';
import tableIcons from "../icons";
import "./table.css";
import { projectFirestore } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Requests = () => {
  const [info, setInfo] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (load) {
      Fetchdata();
    }
  }, []);
  const Fetchdata = () => {
    setInfo([]);
    projectFirestore.collection("pendingNGORegistration").get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var id = element.id;
        var data = element.data();
        data.id = id;
        setInfo(arr => [...arr, data]);
        setLoad(false);
      });
    })
  }
  const approve = (NGOdata) => {
    projectFirestore.collection("users").add({
      name: NGOdata.name,
      email: NGOdata.email,
      password: NGOdata.password,
      role: "ngo"
    });
    projectFirestore.collection("approvedNGO").doc(NGOdata.email).set({
      name: NGOdata.name,
      email: NGOdata.email,
      address: NGOdata.address,
      website: NGOdata.website,
      requested: 0,
      received: 0,
      pending: 0
    });
    projectFirestore.collection("pendingNGORegistration").doc(NGOdata.id).delete();
    setInfo([]);
    Fetchdata();
    toast.success('NGO APPROVED', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });

  }
  return (
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
                <tr className="mytabStyle">
                  <th className="myHeader">AREA OF WORK</th>
                  <td className="mytabStyle">{rowData.workArea}</td>
                </tr>
              </table>

            </div>
          )
        }}
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Website', field: 'website' },
          { title: 'E-Mail', field: 'email' },
          { title: 'Founder', field: 'founder' },
          { title: 'Founded', field: 'founded' },
        ]}
        data={info}
        title="Pending NGO'S"
        actions={[
          {
            icon: () => <Check />,
            tooltip: 'Approve NGO',
            onClick: (event, rowData) => approve(rowData)
          },
        ]}
      />
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

  );
};

export default Requests;