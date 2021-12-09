import React from "react";
import MaterialTable from 'material-table';
import { projectFirestore } from '../firebase';
import tableIcons from "./icon";
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
        projectFirestore.collection("verifiedDonations").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
               // var id = element.id;
                var data = element.data();
               // data.id = id;
                setInfo(arr => [...arr, data]);
                //setLoad(false);
            });
        })
 } 
 //if(0==0){
   // Fetchdata();
//};
    return (
<div>
    <center>
        <h2>Details
            </h2>
            </center>
{
    info.map((data) => (
        <Frame Date={data.date}
        Donated={data.donated}
        Name={data.name}/>
        
    ))
    }
</div>
    );
    
}

const Frame = ({Date ,Donated , Name})=>{
    console.log(Date + " " + Name + " " + Donated);
    return(
        <center>
            <div className="div">
             
             <p>date : {Date}</p>
             <p>donated: {Donated}</p>
             <p>name : {Name}</p>
             </div>

        </center>
    );
}
export default Fulfilled;
/*
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
                        { title: 'Date', field: 'date' },
                        { title: 'Courier', field: 'courierName' },
                        { title: 'Tracking ID', field: 'trackingID' },
                    ]}
                  //  data={info}
                  title="Fulfilled Requests"
                  />
              </div>
                </div>*/
