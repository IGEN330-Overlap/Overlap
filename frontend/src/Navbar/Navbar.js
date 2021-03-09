import './Navbar.css';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from '../overlap-logo.svg';
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {updateGroupName} from '../Redux/Actions.js';

const groupnames = ['Group 1', 'Group 2', 'Group 3', 'Group 4'];

const Navbar1 = (props) => {

    const dispatch = useDispatch();
    const groupList = useSelector(state => state.groupList);

    const setCurrentGroup = (group) => {
        dispatch(updateGroupName(group.groupName))
    }


    return (
        <div className='navbar-stuff'>
        <Navbar bg="transparent" variant="dark" expand="sm">
            <Navbar.Brand as={Link} to = "/authorized/"><img width="75" height="30" src= {logo} alt="logo"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="My Groups" id="basic-nav-dropdown">
                        {groupList.map((group,i) => (
                            <div>
                                <NavDropdown.Item as={Link} to="GroupProfilePage/GroupProfilePage" onClick={() => setCurrentGroup(group)} >{group.groupName}</NavDropdown.Item>
                            </div>
                            ))
                        }
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to = "/authorized/">New Group</NavDropdown.Item>
                    </NavDropdown> 
                    <Nav.Link as={Link} to = "/authorized/AboutUs" bg="white">About Us</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <Button as={Link} to ="/" variant='secondary' size='sm'>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
    );  
}


export default Navbar1;
