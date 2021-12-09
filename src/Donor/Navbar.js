import React,{ useState} from 'react'
import '../App.css'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    Nav,
    NavbarBrand
} from 'reactstrap';



const Navbarr = ({url}) =>{
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div>
        <Navbar color="dark" dark expand="md">
                <NavbarBrand href="#">DONOR PANEL</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto myUl" navbar>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/Event`}>EVENTS</Link> 
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/points`}>REDEEM COUPONS</Link> 
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/history`}>HISTORY</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/profile`}>PROFILE</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/logout`}>LOGOUT</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
    </div >
    )
}

export default Navbarr;