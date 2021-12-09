import React, { useState, useEffect } from "react";
import '../App.css';
import firebase from "firebase";
import './query.css';


const RegisterPageNgo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameNgo, setNameNgo] = useState("");
  
  const [loader, setLoader] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    var db = firebase.firestore();
    db.collection('pendingNGORegistration')
      .add({
        email: email,
        password:password,
        name:nameNgo,

        
      }).then(() => {
        setLoader(false);
        alert('Registration successful');
      })
      .catch((error) => {
        alert(error.nameNgo);
        setLoader(false);
      });
    setEmail("");
    setPassword("");
    setNameNgo("");
    
  };
  return (
    <div className="container22">
      <form onSubmit={handleSubmit}>
        <h1>For New NGO </h1><br />
        <label>EMAIL</label><br />
        <input className="box" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>PASSWORD</label><br />
        <input className="box" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <label>NGO NAME</label><br />
        <input className="box" value={nameNgo} onChange={(e) => setNameNgo(e.target.value)} /><br />
       
        <button className="box2" type="submit">REGISTER</button>
      </form>
    </div>
  );
};
export default RegisterPageNgo;