import "./Navbar.css";
import logo from "../overlap-logo.svg";
import logo_dark from "../overlap-logo-dark.svg";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateRefreshToken, updateUser } from "../Redux/Actions";
// import GroupIcon from "./group.svg";

const Navbar1 = ({ playlistType }) => {
  //useDispatch hook for redux
  const dispatch = useDispatch();

  //useHistory for redirect
  const history = useHistory();

  const handleLogout = () => {
    dispatch(updateRefreshToken(""));
    dispatch(
      updateUser({
        email: "",
        imageURL: "",
        musicalProfile: {
          acousticness: 0,
          danceability: 0,
          energy: 0,
          instrumentalness: 0,
          speechiness: 0,
          trackPopularity: 0,
          valence: 0,
        },
        name: "",
        refreshToken: "",
        topArtists: [],
        topTracks: [],
        userID: "",
      })
    );
    localStorage.clear();
    history.push("/");
  };

  //get group list from redux states
  const groupList = useSelector((state) => state.groupList);

  //get userObject from redux state
  const userObject = useSelector((state) => state.userObject);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (
      userObject == null ||
      userObject.refreshToken === "" ||
      userObject.refreshToken == null
    ) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [userObject]);

  //order groupList from most recent to oldest
  function sortGroupList(a, b) {
    if (b.createdAt > a.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;

    return 0;
  }
  groupList.sort(sortGroupList);

  return (
    <div
      className={
        playlistType === "happy" ||
        playlistType === "chill" ||
        playlistType === "sad"
          ? "navbar-stuff-dark"
          : "navbar-stuff"
      }
    >
      <Navbar bg="var(--primary-color-main)" variant="dark" expand="md">
        {isLoggedIn && (
          <Navbar.Brand as={Link} to="/authorized/">
            <img
              width="75"
              height="30"
              src={
                playlistType === "happy" ||
                playlistType === "chill" ||
                playlistType === "sad"
                  ? logo_dark
                  : logo
              }
              alt="logo"
            />
          </Navbar.Brand>
        )}
        {!isLoggedIn && (
          <Navbar.Brand as={Link} to="/">
            <img width="75" height="30" src={logo} alt="logo" />
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isLoggedIn && (
              <NavDropdown title="My Groups" id="basic-nav-dropdown">
                {groupList.length !== 0 ? (
                  groupList.map((group, i) => (
                    <div key={i}>
                      <NavDropdown.Item
                        as={Link}
                        to={"/authorized/group/" + group.groupCode}
                      >
                        {group.groupName}
                      </NavDropdown.Item>
                    </div>
                  ))
                ) : (
                  <NavDropdown.Item as={Link} to={"/authorized/"}>
                    Create/Join a Group
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            )}

            {isLoggedIn && (
              <Nav.Link
                as={Link}
                to={"/authorized/user/" + userObject.userID}
                bg="white"
                className="navbar-link"
              >
                My Music Profile
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/how-it-works" bg="white">
              How It Works
            </Nav.Link>
            <Nav.Link as={Link} to="/about" bg="white">
              About Us
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            {isLoggedIn && (
              <Button onClick={handleLogout} variant="secondary" size="sm">
                Logout
              </Button>
            )}
            {!isLoggedIn && (
              <Button as={Link} to="/" variant="secondary" size="sm">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navbar1;
