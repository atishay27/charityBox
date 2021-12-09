import React from "react";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './UserProfile';
import firebase from "./firebase";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    Nav,
    NavbarBrand
} from 'reactstrap';
import { projectFirestore } from './firebase';
import Select from 'react-select';
import './App.css';

const Registration = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const role = [
        { value: 'admin', label: 'admin' },
        { value: 'donor', label: 'donor' },
        { value: 'volunteer', label: 'volunteer' },
        { value: 'NGO', label: 'NGO' }
    ]

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [loader, setLoader] = useState(false);
    const sub = (e) => {
        e.preventDefault();
        var role = e.target.role.value;
    
      setLoader(true);
      if (role=='admin'){
      projectFirestore.collection('mainregistration').doc('ADMIN')

        .set({
          email: email,
          password:password,
          role:role,
  
          
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
    
    }
    else if (role=='NGO'){
        projectFirestore.collection('mainregistration').doc('NGO')
  
          .set({
            email: email,
            password:password,
            role:role,
    
            
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
      
      }
     else if (role=='donor'){
      projectFirestore.collection('mainregistration').doc('DONOR')

        .set({
          email: email,
          password:password,
          role:role,
  
          
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
    
    }
    else if (role=='NGO'){
        projectFirestore.collection('mainregistration').doc('NGO')
  
          .set({
            email: email,
            password:password,
            role:role,
    
            
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
      
      }
     else if (role=='volunteer'){
      projectFirestore.collection('mainregistration').doc('VOLUNTEER')

        .set({
          email: email,
          password:password,
          role:role,
  
          
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
    
    }
    
    };




{/*const Registration = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const role = [
        { value: 'admin', label: 'admin' },
        { value: 'donor', label: 'donor' },
        { value: 'volunteer', label: 'volunteer' }
        { value: 'NGO', label: 'NGO' }
    ]

    const [email, setEmail] = useState("");
    const [setpassword, setPassword] = useState("");
    const [isFound, setIsFound] = useState(false);

    const sub = (e) => {
        e.preventDefault();
        var role = e.target.role.value;
        console.log(email, setpassword, role);
        projectFirestore.collection("users").
        .add({
            email: email,
            setpassword:setpassword,
            role:role,

     
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
    
  };        });
        })
       
        }else{
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
*/}    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">CharityBox</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />  
                <Collapse isOpen={isOpen} navbar>
                </Collapse>
            </Navbar>
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
                                <button type="submit fbt" className="btn btn-primary">REGISTRATION</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration;