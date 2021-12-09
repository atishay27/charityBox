import React from "react";

import { Button, Card } from 'react-bootstrap';
import { Row, Col } from "react-bootstrap";
import { Carousel } from 'react-bootstrap';
import firebase from "firebase";
import "./juhi.css"
//import firebase from "../firebase";
import PushNotification from '../pushNotification';
import logo192 from "../../src/VolNgo/image/vol.jpg"
import logo193 from "../../src/VolNgo/image/vol2.jpg"
import logo194 from "../../src/VolNgo/image/vol.gif"
import logo195 from "../../src/VolNgo/image/volslide.jpg"
import logo196 from "../../src/VolNgo/image/NGO.jpg"
import logo197 from "../../src/VolNgo/image/vol.gif"
import cvol from "../../src/VolNgo/image/collage-vounteer.jpg"
import RequestMsg from "./request";
import { Routes, Route } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Link
} from "react-router-dom";



function Volunteer() {
  return (
   
    <div className="container"><Router>
      <div className="container">
        <h1>Become a Volunteer</h1>
        <h5>We provide our volunteers the opportunity to grow through selfless action. You can contribute in any of the below ways –
        </h5>
      </div>
      <div className="container">
        <h5>
          Use your talents to spread happiness ?
        </h5>
      </div>
      <div className="container">
        <h5>Whatever talent you have, we are sure you can somehow make use of it to spread happiness with us ? !!</h5>
        <p>Write to us at
          abc@gamil.com with your resume mentioning what type of volunteering opportunities you are looking for. Keep the subject line as “Volunteer: name,skillset”.</p>
        <h6> Happy Volunteering ?</h6>
      </div>
    
      <div className="container">
        <Carousel fade>
          <Carousel.Item>
            <img
              className="i"
              src={logo195}
              alt="First slide"
            />
            <Carousel.Caption className="d">
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="i"
              src={logo196}
              alt="Second slide"
            />
            <Carousel.Caption className="d">
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="i"
              src={logo197}
              alt="Third slide"
            />
            <Carousel.Caption className="d">
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
     
      <div className="container">
        <Row><Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img className="imagecss" variant="top" src={logo193} />
            <Card.Body>
              <Card.Title>POST HOMEMAKER THINGS</Card.Title>
              <Card.Text>
                If you are a Homemaker, be our Society representative and help us organize drives at your society
              </Card.Text>
              <Button variant="primary">ADD</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img className="imagecss" variant="top" src={logo193} />
            <Card.Body>
              <Card.Title>POST HOMEMAKER THINGS</Card.Title>
              <Card.Text>
                If you are a Homemaker, be our Society representative and help us organize drives at your society
              </Card.Text>
              <Button variant="primary">ADD</Button>
            </Card.Body>
          </Card>
        </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img className="imagecss" variant="top" src={logo192} />
              <Card.Body>
                <Card.Title>POST PHOTOGRAPH</Card.Title>
                <Card.Text>
                  If you are a photographer, you can make our special kids happy. They sooooooo love posing and getting clicked.
                  .................................
             
               
                </Card.Text>
                <Button variant="primary">ADD</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img className="imagecss" variant="top" src={logo194} />
              <Card.Body>
                <Card.Title>POST ANIMATION</Card.Title>
                <Card.Text>
                  If you are creative and good at animations, you can make small animated videos that motivate people to donate for the cause.
                
                </Card.Text>
                
                <Button variant="primary" >ADD</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <Switch>
          <Route path="/RequestMsg">
            <RequestMsg />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
  )
}

export default Volunteer;