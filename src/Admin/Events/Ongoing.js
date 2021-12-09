import React from "react";
import { useEffect, useState } from "react";
import MaterialTable from 'material-table'
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import tableIcons from "../icons";
import "./table.css";
import { Modal } from 'antd';
import { projectFirestore } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Ongoing = () => {
  const [info, setInfo] = useState([]);
  const [load, setLoad] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oldName, setOldName] = useState('');
  const [oldAddress, setOldAddress] = useState('');
  const [oldStartDate, setOldStartDate] = useState('');
  const [oldStartTime, setOldStartTime] = useState('');
  const [oldEndTime, setOldEndTime] = useState('');
  const [id, setId] = useState('');
  const showModal = (oldData) => {
    setOldName('');
    setOldAddress('');
    setOldStartDate('');
    setOldStartTime('');
    setOldEndTime('');
    setIsModalVisible(true);
    setOldName(oldData.name);
    setOldAddress(oldData.address);
    setOldStartDate(myDate(oldData.startDateTime));
    setOldStartTime(myTime(oldData.startDateTime));
    setOldEndTime(myTime(oldData.endDateTime));
    setId(oldData.id);
  };

  const handleOk = () => {
    projectFirestore.collection("events").doc(id).update({
      name: oldName,
      address: oldAddress,
      startDateTime: new Date(oldStartDate+" "+oldStartTime),
      endDateTime: new Date(oldStartDate +" "+ oldEndTime),
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
    setOldAddress('');
    setOldStartDate('');
    setOldStartTime('');
    setOldEndTime('');
    setInfo([]);
    Fetchdata();
  };

  const handleCancel = () => {
    setOldName('');
    setOldAddress('');
    setOldStartDate('');
    setOldStartTime('');
    setOldEndTime('');
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (load) {
      Fetchdata();
    }
  }, []);
  const Fetchdata = () => {
    projectFirestore.collection("events").get().then((querySnapshot) => {
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
  function myDate(myDate) {
    var mydate = new Date(myDate);
    var day = mydate.getDate()
    var month = ["01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12"][mydate.getMonth()];
    if (day < 10) {
      day = "0" + day;
    }
    var str = mydate.getFullYear() + '-' + month + '-' + day;

    return str;
  }
  function myTime(d) {
    let hour = d.getHours();
    let minute = d.getMinutes();
    let seconds = d.getSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    return hour+":"+minute+":"+seconds;;
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
        actions={[
          {
            icon: () => <Edit />,
            tooltip: 'Edit Event',
            onClick: (event, rowData) => showModal(rowData)
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: 'Delete Event',
            onClick: (event, rowData) => {
              projectFirestore.collection("events").doc(rowData.id).delete();
              toast.success('EVENT DELETED!!!', {
                position: "top-center",
                autoClose: 2000,
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
      <Modal title="Update Event" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <div className="container">
          <div className="row">
            <div className="col-2" />
            <div className="col-8">
              <form className="myform">
                <div className="form-outline mb-4">
                  <input type="text" required id="eventName" className="form-control" placeholder="Enter Event Name" value={oldName} onChange={(e) => { setOldName(e.target.value) }} />
                </div>
                <div className="form-outline mb-4">
                  <textarea required className="form-control" id="eventAddress" rows="4" placeholder="Enter Full Address" value={oldAddress} onChange={(e) => { setOldAddress(e.target.value) }}></textarea>
                </div>
                <div className="form-outline mb-4">
                  <div className="row justify-content-between">
                    <div className="col-4">
                      <input type="text" required name="startDate" className="form-control" placeholder="Enter Start Date" value={oldStartDate} onChange={(e) => { setOldStartDate(e.target.value) }} />
                    </div>
                    <div className="col-4">
                      <input type="text" required name="startTime" className="form-control" placeholder="Enter Start Time" value={oldStartTime} onChange={(e) => { setOldStartTime(e.target.value) }} />
                    </div>
                    <div className="col-4">
                      <input type="text" required name="endTime" className="form-control" placeholder="Enter End Time" value={oldEndTime} onChange={(e) => { setOldEndTime(e.target.value) }} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-2" />
          </div>
        </div>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={2000}
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

export default Ongoing;