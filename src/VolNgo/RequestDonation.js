import React from "react";
import { useState } from 'react';
import { projectFirestore } from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestDonation = ({ user }) => {
    const [clothesRequested, setClothesRequested] = useState(0);
    async function sub(e) {
        e.preventDefault();
        var received = 0;
        var disbursed = 0;
        var NGOdata = {};
        const inventory = projectFirestore.collection('inventory');
        await projectFirestore.collection("inventory").doc("RECEIVED").get().then((querySnapshot) => {
            var data = querySnapshot.data();
            received = parseInt(data.clothes);
        });
        await projectFirestore.collection("inventory").doc("DISBURSED").get().then((querySnapshot) => {
            var data = querySnapshot.data();
            disbursed = parseInt(data.clothes);
        });
        await projectFirestore.collection("approvedNGO").doc(user).get().then((querySnapshot) => {
            var data = querySnapshot.data();
            NGOdata = data;
        });
        const availableData = received - disbursed;
        if(availableData<=0){
            console.log(availableData);
            toast.error("CLOTHES NOT AVAILABLE AT THE MOMENT", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }else if(availableData < clothesRequested){
            console.log(availableData);
            toast.error("REQUEST LESS NO OF CLOTHES", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }else{
            inventory.doc("DISBURSED").update({
                clothes: parseInt(disbursed + parseInt(clothesRequested))
            });
            projectFirestore.collection("pendingRequests").add({
                address: NGOdata.address,
                email: NGOdata.email,
                name: NGOdata.name,
                requested: parseInt(clothesRequested)
            });
            await projectFirestore.collection("approvedNGO").doc(user).update({
                requested: parseInt(NGOdata.requested + parseInt(clothesRequested)),
                pending: parseInt(NGOdata.pending + parseInt(clothesRequested)),
            });
            toast.success("REQUEST SUCCESSFULLY PROCESSED", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

        }
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-2" />
                <div className="col-8">
                    <form className="myform" onSubmit={(event) => { sub(event) }}>
                        <div className="form-outline mb-4">
                            <input type="number" required id="clothes" className="form-control" placeholder="NO OF CLOTHES REQUIRED" 
                            onChange={(e) => { setClothesRequested(e.target.value) }} />
                        </div>
                        <div className="form-outline mb-4 fbt">
                            <button type="submit fbt" className="btn btn-primary">REQUEST CLOTHES</button>
                        </div>
                    </form>
                </div>
            </div>
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
        </div>
    )
}

export default RequestDonation;