import React from "react";
import Header from "./Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { projectFirestore } from './firebase';
import Select from 'react-select';
import './App.css';
const Home = ({ l }) => {
    const role = [
        { value: 'admin', label: 'admin' },
        { value: 'donor', label: 'donor' },
        { value: 'volunteer', label: 'volunteer' },
        { value: 'ngo', label: 'ngo' }
    ]
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFound, setIsFound] = useState(false);
    var validated = false;
    async function sub(e) {
        e.preventDefault();
        var role = e.target.role.value;
        validated = false;
        console.log(email, password, role);
        await projectFirestore.collection("users").where('email', '==', email).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();
                console.log("CHECKING");
                if ((email === data.email) && data.email) {
                    if ((password === data.password) && data.password) {
                        if ((role === data.role) && data.role) {
                            sessionStorage.setItem("name", data.name);
                            setIsFound(true);
                            validated = true;
                            console.log("SETTING");
                        }
                    }
                }
            });
        })
        console.log("VALIDATING",isFound,validated);
        if (validated) {
            toast.success('AUTHICATION SUCCESSFULL!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            var url = '/' + role;
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("role", role);
            
            window.location.href = url;
        } else {
            toast.error('AUTHENTICATION FAILED!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <div>
            <Header />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="container">
                <div className="row">
                    <div className="col-2" />
                    <div className="col-8">
                        <form className="myform" onSubmit={(event) => { sub(event) }}>
                            <div className="form-outline mb-4">
                                <input type="text" required id="email" className="form-control" placeholder="Enter E-Mail" onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="form-outline mb-4">
                                <input type="password" required id="password" className="form-control" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div className="form-outline">
                                <Select defaultValue={role[1]} placeholder="Select Role" name="role" options={role} required />
                            </div>
                            <div className="form-outline mb-4 fbt">
                                <button type="submit fbt" className="btn btn-primary">LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;