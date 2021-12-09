import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import './header.css';
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    Nav,
    NavbarBrand
} from 'reactstrap';

const AdminHeader = ({url}) =>{
    const [isOpen, setIsOpen] = React.useState(false);
    return(
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">ADMIN PANEL</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto myUl" navbar>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/events`}>EVENTS</Link> 
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/donations`}>DONATIONS</Link> 
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/ngo`}>NGO</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/coupons`}>COUPONS</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={`${url}/logout`}>LOGOUT</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
};

export default AdminHeader;