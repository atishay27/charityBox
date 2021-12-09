import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import Subscribe from "./volunteer";
import firebase from 'firebase';
import Fulfilled from './verificationDonor';
import {
  BrowserRouter as Router,
  Switch,
  Link
} from "react-router-dom";
import Ngopartner from "./ngopartner";
import Ourwork from "./ourwork";
import Ourstory from "./ourstory";
import Volunteer from "./volunteer";
import Personalquery from "./personalquery";
import Contact from "./contact";
import Ongoing from "./table";
import RegisterPageVolunteer from "./registerPageVolunteer";

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
export default class NavbarComp extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Charity Box</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link as={Link} to={"/registerPageVolunteer"}>registration pageVOLUNTEER</Nav.Link>
                  <Nav.Link as={Link} to={"/volunteer"}>VOLUNTEER</Nav.Link>

                  <Nav.Link as={Link} to={"/Ongoing"}>EVENTS</Nav.Link>
                  <Nav.Link as={Link} to={"/Fulfilled "}>Verifiy</Nav.Link>
                  

                  <NavDropdown title="CONTACT US" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to={"/contact"}>+91827398127</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/personalquery"}>QUERY</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Button onClick={Subscribe3} variant="outline-success">Get notification</Button>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div>
            <Switch>
            <Route path="/registerPageVolunteer">
                <RegisterPageVolunteer />
              </Route>
              <Route path="/volunteer">
                <Volunteer />
              </Route>
              <Route path="/ngopartner">
                <Ngopartner />
              </Route>
              <Route path="/personalquery">
                <Personalquery />
              </Route>
              <Route path="/Ongoing">
                <Ongoing />
              </Route>
              <Route path="/Fulfilled ">
                <Fulfilled />
                </Route>
             
              <Route path="/contact">
                <Contact />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}