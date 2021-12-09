import React from "react";
import { useEffect, useState } from "react";
import MaterialTable from 'material-table';
import { projectFirestore } from "../../firebase";
import tableIcons from "../icon";

const Coupons =()=>{
  const [info, setInfo] = useState([]);
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    setData([]);
    if (load) {
        Fetchdata();
    }
}, []);
useEffect(() => {
  setData([]);
  if (info.length === 0) {
      console.log("EMPTY ARRAY");
  } else {
      setData([]);
      Fetchdata2();
  }
}, [info])
const Fetchdata2 = () => {
  console.log("INFO: ", info);
  setData([]);
  projectFirestore.collection("coupons").where('prefix', 'in', info).get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
          var id = element.id;
          var data = element.data();
          data['valid_from'] = data['valid_from'].toDate();
        data['valid_upto'] = data['valid_upto'].toDate();
          data.id = id;
          setData(arr => [...arr, data]);
      });
  })
}
async function Fetchdata() {
  projectFirestore.collection('users').where('email','==',email).get().then((querySnapshot) => {
    querySnapshot.forEach(element => {
      var id = element.id;
      var data = element.data();
      data.id = id;
      setLoad(false);
      setInfo(data['coupon-code'])
    });
  })
};
  return(
    <div className="container">
      <div className="myTable" style={{ maxWidth: "85%" }}>
      <MaterialTable
        icons={tableIcons}
        detailPanel={rowData => {

          return (
            <div className="detailPanel">
              <table className="mytabStyle">
                <tr className="mytabStyle">
                  <th colSpan={2} className="myHeader">Business Associated</th>
                  <td colSpan={4} className="mytabStyle" >{rowData.business}</td>
                </tr>
                <tr>
                  <th colSpan={1} className="myHeader">Discount Percentage</th>
                  <td colSpan={1} className="mytabStyle" >{rowData.discount}%</td>
                  <th colSpan={1} className="myHeader">Maximum Discount</th>
                  <td colSpan={1} className="mytabStyle" >₹ {rowData.max_disc}</td>
                  <th colSpan={1} className="myHeader">Minimum Order Value</th>
                  <td colSpan={1} className="mytabStyle" >₹ {rowData.min_ord_val}</td>
                </tr>
              </table>

            </div>
          )
        }}
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Points', field: 'points' },
          { title: 'Prefix', field: 'prefix' },
          { title: 'Valid From', field: 'valid_from', type: 'date', },
          { title: 'Valid Upto', field: 'valid_upto', type: 'date', },
        ]}
        data={data}
        title="REEDEMED COUPON'S"
      />
      </div>
    </div>
  )
}

export default Coupons;