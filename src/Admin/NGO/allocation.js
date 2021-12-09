import React from "react";
import MaterialTable from 'material-table'
import tableIcons from "../icons";
import fakeData from './fakeData2.json';
import "./table.css";
import { useEffect, useState } from "react";
import { projectFirestore } from '../../firebase';

const Allocation = () =>{
  const [info, setInfo] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (load) {
      Fetchdata();
    }
  }, []);
  const Fetchdata = () => {
    setInfo([]);
    projectFirestore.collection("approvedNGO").get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var id = element.id;
        var data = element.data();
        data.id = id;
        setInfo(arr => [...arr, data]);
        setLoad(false);
      });
    })
  }
      return(
        <div className="myTable" style={{maxWidth: "85%"}}>
          <MaterialTable
          icons={tableIcons}
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'E-Mail', field: 'email'},
              { title: 'Clothes Requested', field: 'requested', type: 'numeric'},
              { title: 'Clothes Received', field: 'received', type: 'numeric'},
              { title: 'Pending Request', field: 'pending', type: 'numeric'}
            ]}
            data={info}
            title="Approved NGO'S"
          />
          </div>
          
    );
}

export default Allocation;