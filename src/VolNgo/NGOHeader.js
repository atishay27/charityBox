import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import './header.css';
import firebase from 'firebase';
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    Nav,
    Button,
    NavbarBrand
} from 'reactstrap';
function Subscribe4() {
    const msg2 = firebase.messaging();
    msg2.requestPermission().then(() => {
      return msg2.getToken();
    }).then(ngoToken => {
      alert("Notification is on");
      let Token2 = firebase.database().ref().child('ngoToken').child(ngoToken);
      Token2.set(ngoToken);
    })
  }
const NGOHeader = ({url}) =>{
    const [isOpen, setIsOpen] = React.useState(false);
    return(
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">NGO PANEL</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto myUl" navbar>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/request`}>REQUEST DONATION</Link> 
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/approved`}>APPROVED REQUEST</Link> 
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/pending`}>PENDING REQUEST</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/logout`}>LOGOUT</Link>
                        </NavItem>
                        <Button onClick={Subscribe4} className="btn btn-success" style={{marginLeft: "50px"}}>Get notification</Button>
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}

export default NGOHeader;