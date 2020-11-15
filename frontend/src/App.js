import React from "react";
import './App.css';
import LoginButton from './LoginButton/LoginButton'

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
  console.log(params);

  const [loggedIn, setLoggedIn] = React.useState((params.access_token) ? true : false);

  return (
    <div className="App">
      <LoginButton></LoginButton>
      <h1>{params.access_token}</h1>
    </div>
  );
}

export default App;
