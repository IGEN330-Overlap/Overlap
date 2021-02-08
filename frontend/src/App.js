import React from "react";
import './App.css';
import LandingPage from './LandingPage/LandingPage';
import AuthorizedPage from './AuthorizedPage/AuthorizedPage';
import { Route, Switch } from 'react-router-dom';
import AboutUs from './AboutUs/AboutUs';
import GroupProfilePage from './GroupProfilePage/GroupProfilePage';
import { PlaylistPage } from './PlaylistPage/PlaylistPage';

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

//App is the root of react router
function App() {
  const params = getHashParams();

  const [loggedIn, setLoggedIn] = React.useState((params.access_token) ? true : false);

  return (
    <div className="App">
      <Switch>
        {/* Route for root */}
        <Route path='/' render={() => <LandingPage accessToken={params.access_token} />} exact={true} />
        {/* Router for authorized reroute from backend authorization */}
        <Route 
          path='/authorized' 
          render={() => (
            <AuthorizedPage 
              loggedIn={loggedIn} 
              accessToken={params.access_token}
              refreshToken={params.refresh_token} 
            />
          )} 
          exact={true} 
        />
        <Route path='/authorized/AboutUs' render={() => <AboutUs />}/>
        <Route 
          path='/authorized/GroupProfilePage' 
          render={() => (
            <GroupProfilePage
              loggedIn={loggedIn}
              accessToken={params.access_token}
              refreshToken={params.refresh_token}
            />
          )}
        />
        <Route 
          path="/authorized/PlaylistPage" 
          render={() => (
            <PlaylistPage 
              loggedIn={loggedIn}
              accessToken={params.access_token}
              refreshToken={params.refresh_token}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
