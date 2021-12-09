
import React, { useState, useEffect } from "react";
import '../App.css';
import firebase from "firebase";
import './query.css';


const RequestCloth = () => {
  const [email, setEmail] = useState("");
  const [clothNumber, setClothNumber] = useState("");

  const [loader, setLoader] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    var   db = firebase.firestore();
    db.collection('users').doc("NGO")
      .set({
        email: email,
        clothNumber: clothNumber,
    
      }).then(() => {
        setLoader(false);
        alert('Request has been submitted');
      })
      .catch((error) => {
        alert(error.clothNumber);
        setLoader(false);
      });
    setEmail("");
    setClothNumber("");
    
  };
  return (
    <div className="container22">
      <form onSubmit={handleSubmit}>
        <h1>REQUEST </h1><br />
        <label>EMAIL</label><br />
        <input className="box" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>ENTER NUMBER OF CLOTHES</label><br />
        <input className="box" value={clothNumber} onChange={(e) => setClothNumber(e.target.value)} /><br />
        
        <button className="box2" type="submit">REQUEST</button>
      </form>
    </div>
  );
};
export default RequestCloth;