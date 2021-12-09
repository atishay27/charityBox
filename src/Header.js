import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    Nav,
    NavbarBrand
} from 'reactstrap';
import { Link } from "react-router-dom";
//<NavLink href="/admin">Admin Dashboard</NavLink>
const Header = ({url}) =>{
    const [isOpen, setIsOpen] = React.useState(false);
    return(
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">CharityBox</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to="/NGOReg">NGO Registration</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/DonorReg">Donor Registration</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/VolReg">Volunteer Registration</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
};

export default Header;