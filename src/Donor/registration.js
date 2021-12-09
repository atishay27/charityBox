import React, { useState } from "react";
import "./donor.css";
import { projectFirestore } from '../firebase';
import { Link, useRouteMatch, Switch, Route, Redirect } from "react-router-dom";

const Registration = () => {

    let { path, url } = useRouteMatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        projectFirestore.collection('users').add({
            name: name,
            email: email,
            password: password,
            mobile: mobile,
            role: "donor",
            points: 0,
        })
            .then(() => {
                alert('Registered');
            })
            .catch((error) => {
                alert(error.message);
            })

        setName("");
        setPassword("");
        setEmail("");
        setMobile();
    }

    return (
        <form className="form" onSubmit=
            {handleSubmit}>
            <h1>Registration</h1>
            <label>Name</label>
            <input placeholder="Name"
                value={name} type="text"
                onChange={(e) => setName(e.target.value)} /> <br />

            <label>Email</label>
            <input placeholder="Email"
                value={email} type="email"
                onChange={(e) => setEmail(e.target.value)} /><br />

            <label>Password</label>
            <input placeholder="Password" type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} /><br />

            <label>Mobile</label>
            <input placeholder="Number" type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)} /><br />
            
            <label>Role</label>
            <input placeholder="Donor" value="donor" disabled /><br />
            <button type="submit">Submit</button>
        </form>

    )
}
export default Registration;