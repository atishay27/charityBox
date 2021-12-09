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
function Subscribe3() {
    const msg = firebase.messaging();
    msg.requestPermission().then(() => {
      return msg.getToken();
    }).then(volunteerToken => {
      alert("Notification is on");
      let Token = firebase.database().ref().child('volunteerToken').child(volunteerToken);
      Token.set(volunteerToken);
    })
  }
const VOLHeader = ({url}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return(
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">VOLUNTEER PANEL</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto myUl" navbar>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/alloted`}>ALLOTED EVENTS</Link> 
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/approve`}>APPROVE DONATION</Link> 
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/logout`}>LOGOUT</Link> 
                        </NavItem>
                        <Button onClick={Subscribe3} className="btn btn-success" style={{marginLeft: "50px"}}>Get notification</Button>
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    )
}

export default VOLHeader;