import React from "react";
import { useEffect, useState } from "react";
import MaterialTable from 'material-table';
//import tableIcons from "./icons";
import { projectFirestore } from '../../firebase';
import { Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pending = () => {
  const [info, setInfo] = useState([]);
  const [load, setLoad] = useState(true);

  const [oldData, setOldData] = useState({});
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    if (load) {
      Fetchdata();
    }
  }, []);
  const Fetchdata = () => {
    projectFirestore.collection("pendingDonations").where('donorEmail', '==', email).get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var id = element.id;
        var data = element.data();
        data.id = id;
        setInfo(arr => [...arr, data]);
        setLoad(false);
        console.log("email",email)
      });
    })
  };

  return (
    <div>
      <div className="myTable" style={{ maxWidth: "85%" }}>
        <MaterialTable
          //icons={tableIcons}

          columns={[
            { title: 'Event', field: 'eventName' },
            { title: 'Quantity', field: 'clothes' },
          ]}
          data={info}
          title="Pending Donations "

        />
      </div>
      
    </div>
  )
}
export default Pending;

