import React from "react";
import { useEffect, useState } from "react";
import MaterialTable from 'material-table'
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import tableIcons from "../icons";
import "./table.css";
import { projectFirestore } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'antd';

const Total = () => {
  const [info, setInfo] = useState([]);
  const [load, setLoad] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newNoOfClothes, setNewNoOfCLothes] = useState(0);
  const [id, setId] = useState('');
  useEffect(() => {
    if (load) {
      Fetchdata();
    }
  }, []);
  const showModal = (oldData) => {
    setIsModalVisible(true);
    setNewNoOfCLothes(oldData.donated);
    setId(oldData.id);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    projectFirestore.collection("verifiedDonations").doc(id).update({
      donated: parseInt(newNoOfClothes),
      points: parseInt(newNoOfClothes*10)
    });
    toast.success('DONATION EDITED!!!', {
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
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setNewNoOfCLothes(0);
    setId('');
  };
  const Fetchdata = () => {
    projectFirestore.collection("verifiedDonations").get().then((querySnapshot) => {
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
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Event', field: 'event' },
            { title: 'Clothes Donated', field: 'donated', type: 'numeric' },
            { title: 'Reward Points', field: 'points', type: 'numeric' },
            { title: 'Verified By', field: 'volunteer' },
            { title: 'Donated On', field: 'date', type: 'date' }
          ]}
          data={info}
          title="Donations Detail's"
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
                projectFirestore.collection("verifiedDonations").doc(rowData.id).delete();
                toast.success('DONATION DELETED!!!', {
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
      </div>
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
      <Modal title="Dispatch Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <div className="container">
          <div className="row">
            <div className="col-2" />
            <div className="col-8">
              <form className="myform">
                <div className="form-outline mb-4">
                  <input type="number" required className="form-control" value={newNoOfClothes} onChange={(e) => { setNewNoOfCLothes(e.target.value) }} />
                  <span><i><center>DONATED CLOTHES</center></i></span>
                </div>
              </form>
            </div>
            <div className="col-2" />
          </div>
        </div>
      </Modal>
    </div>

  );
}

export default Total;