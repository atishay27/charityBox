import React from "react";
import { useEffect, useState } from "react";
import MaterialTable from 'material-table'
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import "./table.css";
import { projectFirestore } from '../../firebase';
import tableIcons from "../icons";
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { Timestamp } from "@firebase/firestore";

const Update = () => {
  const [info, setInfo] = useState([]);
  const [load, setLoad] = useState(true);
  const [oldName, setOldName] = useState('');
  const [oldBusiness, setOldBusiness] = useState('');
  const [oldDiscount, setOldDiscount] = useState(0);
  const [oldMOV, setOldMOV] = useState('');
  const [oldMaxDisc, setOldMaxDisc] = useState('');
  const [oldPrefix, setPrefix] = useState('');
  const [oldValidFrom, setValidFrom] = useState('');
  const [oldValidUpto, setValidUpto] = useState('');
  const [oldPoints, setPoints] = useState('');
  const [id, setId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    if (load) {
      Fetchdata();
    }
  }, []);
  function myDate(myDate) {
    var mydate = new Date(myDate);
    var day = mydate.getDate()
    var month = ["01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12"][mydate.getMonth()];
      if(day<10){
        day = "0"+day;
      }
    var str = mydate.getFullYear() +'-' +month + '-' +day;
    
    return str;
  }
  const Fetchdata = () => {
    projectFirestore.collection("coupons").get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var id = element.id;
        var data = element.data();
        data['valid_from'] = data['valid_from'].toDate();
        data['valid_upto'] = data['valid_upto'].toDate();
        data.id = id;
        setInfo(arr => [...arr, data]);
        setLoad(false);
      });
    })
  }
  const showModal = (oldData) => {
    setOldName('');
    setOldBusiness('');
    setOldDiscount(0);
    setOldMOV('');
    setOldMaxDisc('');
    setPrefix('');
    setValidFrom('');
    setValidUpto('');
    setPoints('');
    setIsModalVisible(true);
    setOldName(oldData.name);
    setOldBusiness(oldData.business);
    setOldDiscount(oldData.discount);
    setOldMOV(oldData.min_ord_val);
    setOldMaxDisc(oldData.max_disc);
    setPrefix(oldData.prefix);
    setValidFrom(myDate(oldData.valid_from));
    setValidUpto(myDate(oldData.valid_upto));
    setPoints(oldData.points);
    setId(oldData.id);
  };

  const handleOk = () => {
    projectFirestore.collection("coupons").doc(id).update({
      name: oldName,
      prefix: oldPrefix,
      business: oldBusiness,
      discount: parseInt(oldDiscount),
      min_ord_val: parseInt(oldMOV),
      max_disc: parseInt(oldMaxDisc),
      valid_from: new Date(oldValidFrom),
      valid_upto: new Date(oldValidUpto),
      points: parseInt(oldPoints),
    });
    toast.success('EVENT UPDATED!!!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setIsModalVisible(false);
    setOldName('');
    setOldBusiness('');
    setOldDiscount(0);
    setOldMOV('');
    setOldMaxDisc('');
    setPrefix('');
    setValidFrom('');
    setValidUpto('');
    setPoints('');
    setInfo([]);
    Fetchdata();
  };
  const handleCancel = () => {
    setOldName('');
    setOldBusiness('');
    setOldDiscount(0);
    setOldMOV('');
    setOldMaxDisc('');
    setPrefix('');
    setValidFrom('');
    setValidUpto('');
    setPoints('');
    setIsModalVisible(false);
  };
  return (
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
        data={info}
        title="Coupon's Detail"
        actions={[
          {
            icon: () => <Edit />,
            tooltip: 'Edit Coupon',
            onClick: (event, rowData) => showModal(rowData)
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: 'Delete Coupon',
            onClick: (event, rowData) => {
              projectFirestore.collection("coupons").doc(rowData.id).delete();
              toast.success('COUPON DELETED!!!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
              setInfo([]);
              Fetchdata();
            }
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
      <Modal title="Update Coupon" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <div className="container">
          <div className="row">
            <div className="col-2" />
            <div className="col-8">
              <form className="myform">
                <div className="form-outline mb-4">
                  <input type="text" required className="form-control" placeholder="Enter Coupon Name" value={oldName} onChange={(e) => { setOldName(e.target.value) }} />
                  <span><i><center>COUPON NAME</center></i></span>
                </div>
                <div className="form-outline mb-4">
                  <div className="row justify-content-between">
                    <div className="col-6">
                      <input type="text" required className="form-control" placeholder="Enter Business" value={oldBusiness} onChange={(e) => { setOldBusiness(e.target.value) }} />
                      <span><i><center>BUSINESS NAME</center></i></span>
                    </div>
                    <div className="col-6">
                      <input type="number" pattern="^[0-9]*$" required className="form-control" placeholder="Enter Discount" value={oldDiscount} onChange={(e) => { setOldDiscount(e.target.value) }} />
                      <span><i><center>DISCOUNT %</center></i></span>
                    </div>
                  </div>
                </div>
                <div className="form-outline mb-4">
                  <div className="row justify-content-between">
                    <div className="col-6">
                      <input type="number" pattern="^[0-9]*$" required className="form-control" placeholder="Enter Minimum Order Value" value={oldMOV} onChange={(e) => { setOldMOV(e.target.value) }} />
                      <span><i><center>MINIMUM ORDER VALUE</center></i></span>
                    </div>
                    <div className="col-6">
                      <input type="text" required className="form-control" placeholder="Enter Maximum Discount" value={oldMaxDisc} onChange={(e) => { setOldMaxDisc(e.target.value) }} />
                      <span><i><center>MAXIMUM DISCOUNT</center></i></span>
                    </div>
                  </div>
                </div>
                <div className="form-outline mb-4">
                  <input type="text" required className="form-control" placeholder="Enter PREFIX" value={oldPrefix} onChange={(e) => { setPrefix(e.target.value) }} />
                  <span><i><center>COUPON CODE</center></i></span>
                </div>
                <div className="form-outline mb-4">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <input type="text" required className="form-control" placeholder="Enter Valid From" value={oldValidFrom} onChange={(e) => { setValidFrom(e.target.value) }} />
                      <span><i><center>VALID FROM</center></i></span>
                    </div>
                    <div className="col-4">
                      <input type="text" required className="form-control" placeholder="Enter Valid Upto" value={oldValidUpto} onChange={(e) => { setValidUpto(e.target.value) }} />
                      <span><i><center>VALID UPTO</center></i></span>
                    </div>
                    <div className="col-4">
                      <input type="text" required className="form-control" placeholder="Enter Points" value={oldPoints} onChange={(e) => { setPoints(e.target.value) }} />
                      <span><i><center>POINTS</center></i></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-2" />
          </div>
        </div>
      </Modal>
    </div>

  );
};

export default Update;