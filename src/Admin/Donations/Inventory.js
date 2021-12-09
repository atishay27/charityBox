import React from "react";
import { Progress, Card, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import "./status.css";
import { projectFirestore } from '../../firebase';
import { useEffect, useState } from "react";
import { Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inventory = () => {
    const [load, setLoad] = useState(true);
    const [received, setReceived] = useState(0);
    const [disbursed, setDisbursed] = useState(0);
    const [receivedTarget, setReceivedTarget] = useState(0);
    const [disbursedTarget, setDisbursedTarget] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newReceivedTarget, setNewReceivedTarget] = useState(0);
    const [newDisbursedTarget, setNewDisbursedTarget] = useState(0);
    const [oldData, setOldData] = useState({});
    useEffect(() => {
        if (load) {
            Fetchdata();
        }
    }, []);
    const Fetchdata = () => {
        setLoad(false);
        projectFirestore.collection("inventory").doc("RECEIVED").get().then((querySnapshot) => {
            var data = querySnapshot.data();
            setReceived(parseInt(data.clothes));
            setReceivedTarget(parseInt(data.target));
        });
        projectFirestore.collection("inventory").doc("DISBURSED").get().then((querySnapshot) => {
            var data = querySnapshot.data();
            setDisbursed(parseInt(data.clothes));
            setDisbursedTarget(parseInt(data.target));
        });
    };
    const showModal = (oldData) => {
        setOldData({});
        setNewDisbursedTarget(disbursedTarget);
        setNewReceivedTarget(receivedTarget);
        setIsModalVisible(true);
        setOldData(oldData);
    };
    const handleCancel = () => {
        setOldData({});
        setNewDisbursedTarget(disbursedTarget);
        setNewReceivedTarget(receivedTarget);
        setIsModalVisible(false);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        projectFirestore.collection("inventory").doc("RECEIVED").update({
            target: parseInt(newReceivedTarget)
          });
          projectFirestore.collection("inventory").doc("DISBURSED").update({
            target: parseInt(newDisbursedTarget)
          });
          toast.success('TARGET UPDATED!!!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          Fetchdata();

    };
    return (
        <div>
            <div className="row">
                <div className="site-card-border-less-wrapper topMargin">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="CLOTHES RECEIVED" className="alCentre" bordered={false} style={{ width: 300 }}>
                                <Progress size="large" type="dashboard" format={() => `${received}`} percent={parseInt(((received / receivedTarget) * 100))} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="CLOTHES DISBURSED" className="alCentre" bordered={false} style={{ width: 300 }}>
                                <Progress size="large" type="dashboard" format={() => `${disbursed}`} percent={parseInt(((disbursed / disbursedTarget) * 100))} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="CLOTHES AVAILABLE" className="alCentre" bordered={false} style={{ width: 300 }}>
                                <Progress size="large" type="dashboard" format={() => `${received - disbursed}`} percent={parseInt(((received - disbursed) / received) * 100)} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-5" />
                <div className="col-2">
                <button className="btn btn-primary" onClick={showModal}>UPDATE TARGETS</button>
                </div>
                <div className="col-5" />
            </div>
            <Modal title="Dispatch Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div className="container">
                    <div className="row">
                        <div className="col-2" />
                        <div className="col-8">
                            <form className="myform">
                                <div className="form-outline mb-4">
                                    <input type="number" required className="form-control" value={newReceivedTarget} onChange={(e) => { setNewReceivedTarget(e.target.value) }}/>
                                    <span><i><center>RECEIVED TARGET</center></i></span>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="number" required className="form-control" value={newDisbursedTarget} onChange={(e) => { setNewDisbursedTarget(e.target.value) }}/>
                                    <span><i><center>DISBURSED TARGET</center></i></span>
                                </div>
                            </form>
                        </div>
                        <div className="col-2" />
                    </div>
                </div>
            </Modal>
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
    )
}

export default Inventory;