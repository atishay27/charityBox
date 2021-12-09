import React, { useState, useEffect } from "react";
import '../App.css';
import firebase from "firebase";
import './query.css';


const Personalquery = () => {
  const [email, setEmail] = useState("");
  const [regarding, setRegarding] = useState("");
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    var db = firebase.firestore();
    db.collection('Personalquery')
      .add({
        email: email,
        regarding: regarding,
        query: query,
      }).then(() => {
        setLoader(false);
        alert('Message has been submitted');
      })
      .catch((error) => {
        alert(error.query);
        setLoader(false);
      });
    setEmail("");
    setRegarding("");
    setQuery("");
  };
  return (
    <div className="container22">
      <form onSubmit={handleSubmit}>
        <h1>QUERY</h1><br />
        <label>EMAIL</label><br />
        <input className="box" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>WHAT IS IT REGARDING</label><br />
        <input className="box" value={regarding} onChange={(e) => setRegarding(e.target.value)} /><br />
        <label>QUERY</label><br />
        <textarea className="box" value={query} onChange={(e) => setQuery(e.target.value)} /><br />
        <button className="box2" type="submit">SEND</button>
      </form>
    </div>
  );
};
export default Personalquery;