
import React from "react";
import { useEffect, useState } from "react";
import MaterialTable from 'material-table';
import tableIcons from "./icon";
import { projectFirestore } from '../firebase';
import { Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Points = () => {
    let [points,setPoints]=useState();
    const [info, setInfo] = useState([]);
    const [load, setLoad] = useState(true);
    const [coupon,setCoupon]= useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [oldData, setOldData] = useState({});
    const [couponVal, setCouponVal] = useState();
    const DonorEmail = sessionStorage.getItem("email");
    useEffect(() => {
        if (load) {
            Fetchdata();
        }
    }, []);
    const Fetchdata = () => {
        var today = new Date();
        var tommorow = new Date();
        tommorow.setDate(tommorow.getDate() + 1);
        projectFirestore.collection("coupons").get().then((querySnapshot) => {
          querySnapshot.forEach(element => {
            var id = element.id;
            var data = element.data();
            //setCouponVal(data.points)
            // console.log("Coupncal",couponVal)

            data.id = id;
            if (data['valid_from'] && data['valid_upto']) {
                data['valid_from'] = data['valid_from'].toDate();
                data['valid_upto'] = data['valid_upto'].toDate();
            }
            setCoupon(data.name)
            setInfo(arr => [...arr, data]);
            setLoad(false);
          });
        })
        projectFirestore.collection("users").where('email','==',DonorEmail).get().then((querySnapshot) => {
            querySnapshot.forEach(element1 => {
                var id=element1.id
                var data1 = element1.data();
                console.log(id)
                setPoints(()=>data1.points)
                console.log("as ",data1.points)
            })
        })
      };
      const showModal = (oldData) => {
          console.log(oldData,"OLD DATA")
        setIsModalVisible(true);
        setOldData(oldData);
        setCouponVal(oldData.points)
        console.log("Coupnval",couponVal)

        projectFirestore.collection("coupons").where('prefix','==',oldData.prefix).get().then((querySnapshot) => {
            console.log("inside dv",oldData.prefix)
            querySnapshot.forEach(element => {
              var id = element.id;
            //   var data = element.data();
            console.log("points",oldData.points)
                          })
        })
    


    };
    const handleOk = () => {
        let couponsOld=[];
        setIsModalVisible(false);
        projectFirestore.collection("users").where('email','==',DonorEmail).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var userID = element.id;
                var userData= element.data(); 
                const newVolunteer = {};
                var data = element.data()
                console.log("user",userID)
                
                if(data['coupon-code'])
                couponsOld=data['coupon-code']
                if(couponsOld.includes(oldData.prefix)){
                    toast.success('Coupon Already Redeemed Try Another One', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      });
                      return
                }
                console.log("Coupons Old",couponsOld)
                 if(data.points>=couponVal){
                     console.log("yes value greater ")
                     var newPoints= parseInt(data.points) - parseInt(couponVal)
                     projectFirestore.collection("users").doc(userID).update({ 
                        "coupon-code":[oldData.prefix,...couponsOld],
                        "points": newPoints
                    })
                    toast.success('COUPON REDEEMED', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      });
                      
                }
                else(
                    toast.error('NOT SUFFICIENT POINTS', {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                    })
                    )
                
            });
            
        })
        
        setOldData({});
        setInfo([]);
        Fetchdata();
        
    };
    const handleCancel = () => {
        setOldData({});
        setIsModalVisible(false);
    }
    return (
        <div className="container">
            <div className="myTable" style={{ maxWidth: "85%" }}>
            <h6 style={{textAlign:"right"}}>Your Points:{points}</h6>
                <MaterialTable
                    icons={tableIcons}
                    options={{
                        search: false
                      }}
                    columns={[
                        { title: 'Name', field: 'business' },
                        { title: 'Discount Upto', field: 'max_disc' },
                        { title: 'Min Order Value', field:'min_ord_val' },
                        { title: 'Points Required', field: 'points' },
                        { title: 'Valid Upto', field: 'valid_upto', type: 'date' },
                    ]}
                    data={info}
                    title="Coupon's"
                    actions={[
                        {
                            icon: () => <button className="btn btn-primary">REDEEM</button>,
                            tooltip: 'Redeem',
                            onClick: (event, rowData) => showModal(rowData)
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
             <Modal title="Coupon" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div className="container">
                    <div className="row">
                        <div className="col-2" />
                        <div className="col-8">
                            <form className="myform">
                                <div className="form-outline mb-4">
                                    <center><span><h4>Want to Redeem Coupon</h4></span></center>
                                </div>
                            </form>
                        </div>
                        <div className="col-2" />
                    </div>
                </div>
            </Modal> 
        </div> 
    )
}

export default Points;