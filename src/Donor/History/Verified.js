import React from "react";
import { useEffect, useState } from "react";
import MaterialTable from 'material-table';
//import tableIcons from "./icons";
import { projectFirestore } from '../../firebase';
import { Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verified = () => {
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
    projectFirestore.collection("verifiedDonations").where('email', '==', email).get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var id = element.id;
        var add = element.add;
        var data = element.data();
        data.id = id;
        data.add = add;

        setInfo(arr => [...arr, data]);
        setLoad(false);
        console.log('id', data.id)
        
        console.log('add', data.addd)
        const points1= data.points
        console.log("Points",data.points)
        const pointsAdded = data.addd
        if (pointsAdded === 'no') {
          projectFirestore.collection("users").where('email', '==', email).get().then((querySnapshot) => {
            querySnapshot.forEach(element1 => {
              var userID = element1.id;
              var userData= element1.data();  
              var oldPoints=parseInt(userData.points);
              console.log("User Points",oldPoints)
              var newPoints= oldPoints + points1
              console.log("NewPoints",newPoints)
              console.log("Email",email)
              projectFirestore.collection("users").doc(userID).update({points:newPoints});
              projectFirestore.collection("verifiedDonations").doc(id).update({addd:"yes"});
              
            })
          })
        }
      });
    })
  };
  //points add



  return (
    <div>
      <div className="myTable" style={{ maxWidth: "85%" }}>
        <MaterialTable

          columns={[
            { title: 'Event', field: 'event' },
            { title: 'Quantity', field: 'donated' },
            { title: 'Points Earned', field: 'points' }
          ]}
          data={info}
          title="Verified Donations"

        />
      </div>

    </div>
  )
}
export default Verified;

