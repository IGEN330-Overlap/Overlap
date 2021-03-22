import "./Navbar.css";
import logo from "../overlap-logo.svg";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateRefreshToken } from "../Redux/Actions";

const Navbar1 = (props) => {
  //useDispatch hook for redux
  const dispatch = useDispatch();

  const handleLogout = () => {
      dispatch(updateRefreshToken(""));
      localStorage.clear();
  };

  //get group list from redux states
  const groupList = useSelector((state) => state.groupList)

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
              {groupList.map((group, i) => (
                <div key={i}>
                  <NavDropdown.Item as={Link} to={"/authorized/group/"+group.groupCode}>
                    {group.groupName}
                  </NavDropdown.Item>
                </div>
              ))}
            </NavDropdown>
            <Nav.Link as={Link} to="/about" bg="white">
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
