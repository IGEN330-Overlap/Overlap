import './Navbar.css';
import logo from '../overlap-logo.svg';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import React from 'react';

const Navbar1 = (props) => {
    return (
        <Navbar bg="transparent" variant="dark" expand="sm">
            <Navbar.Brand href="/authorized/"><img width="75" height="30" src= {logo} alt="logo"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="My Groups" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/authorized/GroupProfilePage/">Group 1</NavDropdown.Item>
                        <NavDropdown.Item href="#">Group 2</NavDropdown.Item>
                        <NavDropdown.Item href="#">Group 3</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/authorized/">New Group</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link bg="white" href="/authorized/AboutUs/">About Us</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );  
}


export default Navbar1;
