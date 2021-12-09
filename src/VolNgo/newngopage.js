import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Subscribe from "./volunteer";
import firebase from 'firebase';
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
import MainRegistrationPage from "../MainRegistrationPage";
import RequestCloth from "./RequestClothes";
import Fulfilled2 from "./RecieveClothNgo";
import RegisterPageNgo from "./registerPageNgo";
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


export default class NavbarComp2 extends Component {
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
              
                <Nav.Link as={Link} to={"/MainRegistrationPage"}>registration</Nav.Link>
                  <Nav.Link as={Link} to={"/ngopartner"}>NGO PARTNER</Nav.Link>
                  <Nav.Link as={Link} to={"/Ongoing"}> EVENTS</Nav.Link>
                  <Nav.Link as={Link} to={"/RequestCloth"}>REQUEST</Nav.Link>
                  <Nav.Link as={Link} to={"/Fulfilled2"}>DETAIL</Nav.Link>
                  <NavDropdown title="CONTACT US" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to={"/contact"}>+91827398127</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/personalquery"}>QUERY</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Button onClick={Subscribe4} variant="outline-success">Get notification</Button>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div>
            <Switch>
            <Route path="/MainRegistrationPage">
                <MainRegistrationPage />
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
                <Route path="/requestCloth">
                <RequestCloth />
              
              </Route>
                <Route path="/Fulfilled2">
                <Fulfilled2 />
              
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