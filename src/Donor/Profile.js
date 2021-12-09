import React, { useState, useEffect, useRef } from "react";
//import "./form.css";
import Select from 'react-select';
import { DatePicker, Space, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import { projectFirestore } from '../firebase';
import '../App.css';
import { useHistory } from 'react-router-dom';



const { RangePicker } = DatePicker;
const Create = () => {
    const history = useHistory();
    const email = sessionStorage.getItem("email");
    const user1 = projectFirestore.collection("users")
    const [user, setUser] = useState([])
    const [currUser, setCurrUser] = useState()
    const [loader, setLoader] = useState(true)
    
    function getUser() {
        user1.where('email', '==', email).onSnapshot((querySnapshot) => {
            const userss = []
            querySnapshot.forEach((doc) => {
                setUser(userss)
                setCurrUser(userss.name)
                console.log("user",userss)
                console.log("id",currUser)
                userss.push(doc.data())
                console.log(user.name)
            })

            setLoader(false)
        })
    }

    useEffect(() => {

        getUser()
        console.log('ss', user);

    }, [])
    const [userState,setUserState]=useState({name:"",mobile:"",address:""})
  
    const handleSubmit = (e) => {
        projectFirestore.collection("users").where('email', '==', email).get().then((querySnapshot) => {
            querySnapshot.forEach(element1 => {
                var userID = element1.id;
                console.log('element1',element1.data())
                projectFirestore.collection("users").doc(userID).update({
                    name:userState.name===""?element1.data().name:userState.name,
                    mobile:userState.mobile===""?element1.data().mobile:userState.mobile,
                    address:userState.address===""?element1.data().address:userState.address,
                })
                    .then(() => {
                        history.push("/donor/Event")
                    })
                    .catch((error) => {
                        alert(error.message);
                    })

            }
            )
        })
        }

    return (
        <div className="container">

            <div className="row">
                <div className="col-2" />
                <div className="col-8">
                    <h1 align="center">PROFILE</h1>
                    <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className="myform">
                        {/* INFO */}
                        {loader === false && (user.map((user) =>
                            <div key={user}>
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline ">
                                            <span><i><center>Name</center></i></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <input type="text" className="form-control" placeholder={user.name} value={userState.name} onChange={(e) => setUserState((old)=>{return {name:e.target.value,address:old.address,mobile:old.mobile}})}  ></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <span><i><center>Mobile</center></i></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <input type="number" className="form-control" value={userState.mobile} onChange={(e) => setUserState((old)=>{return {name:old.name,address:old.address,mobile:e.target.value}})} placeholder={user.mobile} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <span><i><center>Address</center></i></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <textarea className="form-control" rows="2" value={userState.address} onChange={(e) => setUserState((old)=>{return {name:old.name,address:e.target.value,mobile:old.mobile}})} placeholder={user.address} ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <span><i><center>E-Mail</center></i></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <input type="email" className="form-control" placeholder={user.email} disabled />
                                        </div>
                                    </div>
                                </div>
                                <center><button type="submit" className="btn btn-primary" >EDIT</button></center>
                               
                            </div>
                        ))}
                        
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default Create;