import "./Navbar.css";
import logo from "../overlap-logo.svg";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRefreshToken } from "../Redux/Actions";

const groupnames = ["Group 1", "Group 2", "Group 3", "Group 4"];

const Navbar1 = (props) => {
  //useDispatch hook for redux
  const dispatch = useDispatch();

  const handleLogout = () => {
      dispatch(updateRefreshToken(""));
      localStorage.clear();
  };

  return (
    <div className="navbar-stuff">
      <Navbar bg="transparent" variant="dark" expand="sm">
        <Navbar.Brand as={Link} to="/authorized/">
          <img width="75" height="30" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="My Groups" id="basic-nav-dropdown">
              {groupnames.map((group, i) => (
                <div key={i}>
                  <NavDropdown.Item as={Link} to="/authorized/group/groupcode">
                    {group}
                  </NavDropdown.Item>
                </div>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/authorized/">
                New Group
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/authorized/about" bg="white">
              About Us
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Button onClick={handleLogout} variant="secondary" size="sm">
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navbar1;
