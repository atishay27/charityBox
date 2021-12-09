import React, { useState, useEffect } from "react";
import '../App.css';
import firebase from "firebase";
import './query.css';


const RegisterPageVolunteer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameVol, setNameVol] = useState("");
  
  const [loader, setLoader] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    var projectFirestore = firebase.firestore();
    projectFirestore.collection('users')
      .add({
        email: email,
        password:password,
        nameVol:nameVol,

        
      }).then(() => {
        setLoader(false);
        alert('Registration successful');
      })
      .catch((error) => {
        alert(error.password);
        setLoader(false);
      });
    setEmail("");
    setPassword("");
    setNameVol("");
    
  };
  return (
    <div className="container22">
      <form onSubmit={handleSubmit}>
        <h1>For New volunteer </h1><br />
        <label>Volunteer Name</label><br />
        <input className="box" value={nameVol} onChange={(e) => setNameVol(e.target.value)} /><br />
        <label>EMAIL</label><br />
        <input className="box" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>PASSWORD</label><br />
        <input className="box" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button className="box2" type="submit">REGISTER</button>
      </form>
    </div>
  );
};
export default RegisterPageVolunteer;