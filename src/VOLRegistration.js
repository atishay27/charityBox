import React from 'react';
import Header from "./Header";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { projectFirestore } from './firebase';
import Volunteer from './VolNgo/volunteer';
//import "./ngovol.css"
import { Router } from '@material-ui/icons';
import Home from './Home';
import { Link,Route,Switch} from 'react-router-dom';
import { Button } from 'react-bootstrap';
const VOLRegistraion = () => {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    var isError = false;
    async function checkValidation(e) {
        if (!(password === confirmPassword)) {
            isError = true;
            toast.error("PASSWORD & CONFIRM PASSWORD IS NOT MATCHING!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        const ngo = projectFirestore.collection('users');
        const snapshot = await ngo.where('email', '==', email).get();
        if (!snapshot.empty) {
            isError = true;
            console.log("USER EXIST");
            toast.error("USER ALREADY EXIST!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        return;
    }
    async function sub(e) {
        e.preventDefault();
        isError = false;
        await checkValidation(e);
        if (isError) {
            toast.error("CANNOT SEND YOUR REQUEST!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return;
        } else {
            projectFirestore.collection("users").add({
                name: name,
                contact: contact,
                email: email,
                password: password,
                role:"volunteer"
            })
                .then((docRef) => {
                    toast.success('REQUEST SUBMITTED SUCCESSFULLY!!!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch((error) => {
                    toast.error(error, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    setEmail("");
                    setName("");
                    setContact(""); 
                    setPassword("");
                    setConfirmPassword("");
                });
        }
       
    }
    return (
        
        <div>

            <Header />
            <Volunteer />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="container formMarginBot">
                <div className="row">
                    <div className="col-2" />
                    <div className="col-8">
                        <form className="myform" onSubmit={(event) => { sub(event) }}>
                        <div className="form-outline mb-4 required-field">
                        <input type ="text" required id="name" className="form-control" placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="form-outline mb-4 required-field">
                        <input type ="number" required id="contact" className="form-control" placeholder="Contact No" onChange={(e) => { setContact(e.target.value) }} />
                        </div>
                       

                       
                      <div className="form-outline mb-4 required-field">
                        <input type ="text" required id="email" className="form-control" placeholder="Enter E-Mail" onChange={(e) => { setEmail(e.target.value)}} />
                        </div>

                        <div className="form-outline mb-4 required-field">
                        <input type ="password" required id="password" className="form-control" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />

                        </div>
                        <div className="form-outline mb-4 required-field">
                        <input type ="password" required id="confirm-password" className="form-control" placeholder="Enter Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        </div>
                        
                        <div className="form-outline mb-4 fbt">
                        <button type ="submit fbt" className="btn btn-primary" >REGISTER</button>
                        </div>
                        <div className="form-outline required-field">
                        <small><i>Required Fields</i></small>
                       
                        </div>
                        <Button  variant="outline-success" as={Link} to={"/home"}>BACK TO LOGIN PAGE</Button>
                        </form>
                        </div>
                        <div className="col-2" />
                    </div>
                </div>
                <Switch>
            <Route path="/home">
                <Home />
              </Route>
              </Switch>
            </div>
        
            )
}

            export default VOLRegistraion;