//React, redux, and react-router imports
import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateRefreshToken,
  updateUser,
  updateGroupList,
} from "./Redux/Actions.js";
import { Route, Switch, Redirect } from "react-router-dom";

//Component Imports
import LandingPage from "./LandingPage/LandingPage";
import AuthorizedPage from "./AuthorizedPage/AuthorizedPage";
import AboutUs from "./AboutUs/AboutUs";
import GroupProfilePage from "./GroupProfilePage/GroupProfilePage";
import { PlaylistPage } from "./PlaylistPage/PlaylistPage";
import ScreenOverlay from "./ScreenOverlay/ScreenOverlay";
import "./App.css";

const axios = require("axios");

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

function App() {
  //Get url hash parameters
  const params = getHashParams();

  //use dispatch function from redux react
  const dispatch = useDispatch();

  //select state from redux store
  const refreshToken = useSelector((state) => state.refreshToken);
  const userObject = useSelector((state) => state.userObject);

  //useState hook for faulty login attempts
  const [faultyLogin, setFaultyLogin] = useState(false);

  //useState hook for page loading
  const [isLoading, setIsLoading] = useState(false);

  //Update refresh token on App render
  //if refresh token exists in localstorage, dispatch update
  //else if refresh token is provided in callback URL, set the localstorage to contain refresh token, and dispatch update for redux store
  if (
    localStorage.getItem("refreshToken") !== undefined &&
    localStorage.getItem("refreshToken") !== null
  ) {
    dispatch(updateRefreshToken(localStorage.getItem("refreshToken")));
  } else if (
    params.refresh_token !== "" &&
    params.refresh_token !== undefined &&
    params.refresh_token !== null
  ) {
    localStorage.setItem("refreshToken", params.refresh_token);
    dispatch(updateRefreshToken(params.refresh_token));
  }

  //User Effect hook for logging in the user with API upon refreshToken update
  useEffect(() => {
    //Start loading
    setIsLoading(true);

    axios
      .post("/users/login", {
        refreshToken: refreshToken,
      })
      .then((data) => {
        //if login is unsuccessful, reset refresh token
        if (data.data.error) {
          dispatch(updateRefreshToken(""));
          localStorage.clear();
          setFaultyLogin(true);
        }
        //if login is sucessful, update user object
        else {
          dispatch(updateUser(data.data.return));
          setFaultyLogin(false);
        }

        //Stop loading
        setIsLoading(false);
      })
      .catch((err) => {
        //Stop loading
        setIsLoading(false);

        console.log(err);
      });
  }, [refreshToken]);

  //User Effect to get user group list when userObject is updated
  useEffect(() => {
    if (userObject != null) {
      if (userObject.userID !== "") {
        axios
          .get("/users/" + userObject.userID + "/groups")
          .then((data) => {
            dispatch(updateGroupList(data.data));
          })
          .catch((err) => console.log(err));
      }
    }
  }, [userObject]);

  //Start return statement
  return (
    <div className="App">
      {/* Redirect if not logged in with spotify */}
      {(refreshToken == null ||
        refreshToken.length === 0 ||
        refreshToken === "" ||
        faultyLogin) &&
        isLoading === false && <Redirect to="/" />}
      <Switch>
        {/* Route for root */}
        <Route
          path="/"
          render={() => <LandingPage faultyLogin={faultyLogin} />}
          exact={true}
        />
        {/* Router for authorized reroute from backend authorization */}
        <Route
          path="/authorized"
          render={() => (
            <Fragment>
              <AuthorizedPage />
              {/* If page loading, render loading overlay */}
              {isLoading && <ScreenOverlay text="Retreiving Data" />}
            </Fragment>
          )}
          exact={true}
        />
        <Route path="/about" render={() => <AboutUs />} />
        <Route path="/authorized/group" render={() => <GroupProfilePage />} />
        <Route path="/authorized/playlist" render={() => <PlaylistPage />} />
      </Switch>
    </div>
  );
}

export default App;
