import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateRefreshToken,
  updateUser,
  updateGroupList,
} from "./Redux/Actions.js";
import { Route, Switch, Redirect } from "react-router-dom";

import LandingPage from "./LandingPage/LandingPage";
import AuthorizedPage from "./AuthorizedPage/AuthorizedPage";
import AboutUs from "./AboutUs/AboutUs";
import GroupProfilePage from "./GroupProfilePage/GroupProfilePage";
import { PlaylistPage } from "./PlaylistPage/PlaylistPage";
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

  //select refresh token state from redux store
  const refreshToken = useSelector((state) => state.refreshToken);

  //Get group list from a user upon login
  const userObject = useSelector((state) => state.userObject);

  //Update refresh token on App render
  //if refresh token is provided in callback URL, set the localstorage to contain refresh token, and dispatch update for redux store
  if (params.refresh_token !== "" && params.refresh_token !== undefined) {
    localStorage.setItem("refreshToken", params.refresh_token);
    dispatch(updateRefreshToken(params.refresh_token));
  }
  //else if localStorage contains refresh token, dispatch update for redux store
  else if (localStorage.getItem("refreshToken") !== undefined) {
    dispatch(updateRefreshToken(localStorage.getItem("refreshToken")));
  }

  //User Effect hook for logging in the user with API upon refreshToken update
  useEffect(() => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/users/login", {
        refreshToken: refreshToken,
      })
      .then((data) => {
        dispatch(updateUser(data.data.return));
      })
      .catch((err) => console.log(err));
  }, [refreshToken]);

  //User Effect to get user group list when userObject is updated
  useEffect(() => {
    if (userObject != null) {
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL +
            "/users/" +
            userObject.userID +
            "/groups"
        )
        .then((data) => {
          dispatch(updateGroupList(data.data));
        })
        .catch((err) => console.log(err));
    }
  }, [userObject]);

  //Start return statement
  return (
    <div className="App">
      {/* Redirect if not logged in with spotify */}
      {refreshToken.length === 0 && <Redirect to="/" />}
      <Switch>
        {/* Route for root */}
        <Route path="/" render={() => <LandingPage />} exact={true} />
        {/* Router for authorized reroute from backend authorization */}
        <Route
          path="/authorized"
          render={() => <AuthorizedPage />}
          exact={true}
        />
        <Route path="/authorized/AboutUs" render={() => <AboutUs />} />
        <Route
          path="/authorized/GroupProfilePage"
          render={() => <GroupProfilePage />}
        />
        <Route
          path="/authorized/PlaylistPage"
          render={() => <PlaylistPage />}
        />
      </Switch>
    </div>
  );
}

export default App;
