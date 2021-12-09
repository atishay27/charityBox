import React from 'react';
import Header from "./Header";
import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { projectFirestore } from './firebase';

const NGORegistartion = () => {
    const [name, setName] = useState("");
    const [address, SetAddress] = useState("");
    const [founder, setFounder] = useState("");
    const [founded, setFounded] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [workArea, setWorkArea] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    var isError = false;
    async function checkValidation(e) {
        if(!(password === confirmPassword)){
            isError=true;
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
        const ngo = projectFirestore.collection('pendingNGORegistration');
        const snapshot = await ngo.where('email', '==', email).get();
        if (!snapshot.empty) {
            isError=true;
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
            projectFirestore.collection("pendingNGORegistration").add({
                name: name,
                address: address,
                founded: founded,
                founder: founder,
                email: email,
                website: website,
                workArea: workArea,
                password: password
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
                });
        }
    }
    return (
        <div>
            <Header />
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
                                <input type="text" required id="name" className="form-control" placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="form-outline mb-4 required-field">
                                <textarea required className="form-control" id="address" rows="4" placeholder="Enter Full Address" onChange={(e) => { SetAddress(e.target.value) }}></textarea>
                            </div>
                            <div className="form-outline mb-4">
                                <div className="row justify-content-between">
                                    <div className="col-6 required-field">
                                        <input type="text" required className="form-control" id="founderName" placeholder="Enter Founder Name" onChange={(e) => { setFounder(e.target.value) }} />
                                    </div>
                                    <div className="col-6 required-field">
                                        <input type="text" required className="form-control" id="foundedYear" placeholder="Enter Founded Year" onChange={(e) => { setFounded(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-outline mb-4">
                                <div className="row justify-content-between">
                                    <div className="col-6 required-field">
                                        <input type="text" required id="email" className="form-control" placeholder="Enter E-Mail" onChange={(e) => { setEmail(e.target.value)}} />
                                    </div>
                                    <div className="col-6 required-field">
                                        <input type="text" required className="form-control" id="website" placeholder="Enter Website" onChange={(e) => { setWebsite(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-outline mb-4 required-field">
                                <input type="text" required className="form-control" id="workArea" placeholder="Enter Work Area" onChange={(e) => { setWorkArea(e.target.value) }} />
                            </div>
                            <div className="form-outline mb-4">
                                <div className="row justify-content-between">
                                    <div className="col-6 required-field">
                                        <input type="password" required id="password" className="form-control" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />

                                    </div>
                                    <div className="col-6 required-field">
                                        <input type="password" required id="confirm-password" className="form-control" placeholder="Enter Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-outline mb-4 fbt">
                                <button type="submit fbt" className="btn btn-primary">REGISTER</button>
                            </div>
                            <div className="form-outline required-field">
                                <small><i>Required Fields</i></small>
                            </div>
                        </form>
                    </div>
                    <div className="col-2" />
                </div>
            </div>
        </div>
    )
}

export default NGORegistartion;