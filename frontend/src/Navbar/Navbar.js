import './Navbar.css';
import logo from '../overlap-logo.svg';
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';


const groupnames = ['Group 1', 'Boop', 'Group 2', 'Group 3', 'Group 4'];

const Navbar1 = (props) => {

    // let { path, url } = useRouteMatch();

    return (
        <Navbar bg="transparent" variant="dark" expand="sm">
            <Navbar.Brand href="/authorized/"><img width="75" height="30" src= {logo} alt="logo"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="My Groups" id="basic-nav-dropdown">
                        {groupnames.map((group,i) => (
                        <div>
                        <NavDropdown.Item> <Link to = "/authorized/GroupProfilePage">{group}</Link></NavDropdown.Item>
                        </div>))}
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/authorized/">New Group</NavDropdown.Item>
                        </NavDropdown> 
                    <Nav.Link bg="white" href="/authorized/AboutUs/">About Us</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Button variant='info' size='sm'>Logout</Button>
                    </Nav>
            </Navbar.Collapse>
        </Navbar>
    );  
}


export default Navbar1;
