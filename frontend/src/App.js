import React from "react";
import './App.css';
import HomePage from './HomePage/HomePage';
import AuthorizedPage from './AuthorizedPage/AuthorizedPage';
import { Route, Switch } from 'react-router-dom';

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

function App() {
  const params = getHashParams();

  const [loggedIn, setLoggedIn] = React.useState((params.access_token) ? true : false);

  return (
    <div className="App">
      <Switch>
        <Route path='/' render={() => <HomePage loggedIn={loggedIn} accessToken={params.access_token} />} exact={true} />
        <Route path='/authorized' render={() => <AuthorizedPage loggedIn={loggedIn} accessToken={params.access_token} />} exact={true} />
      </Switch>
    </div>
  );
}

export default App;
