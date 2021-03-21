import './LandingPage.css';
import logo from './overlap large.svg';
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

//Home page component
//Takes loggedIn boolean as a prop
const LandingPage = (props) => {
    const refreshToken = useSelector((state) => state.refreshToken);

    return (
        <div className="landing-root d-flex flex-column justify-content-center align-items-center">
            <div className="landing-about">
                <a className="about-us-access" href="/about"><strong>About Us</strong></a>
            </div>
            <div className="logo-container">
                <img src={logo} alt="logo" />
            </div>
            <div className="welcome-container">
                <h2 className="intro-message"> Welcome to <span className="purple">overlap</span>. <br></br>Make listening with friends easy.</h2>
            </div>
            <a href={process.env.REACT_APP_BACKEND_URL + "/login"} className="btn btn-sm login-button">
                Log in with Spotify
            </a>
            {/* Redirect if already authenticated */}
            {(refreshToken != null && refreshToken !== "" && props.faultyLogin === false) && <Redirect to="/authorized" />}
        </div>
    );
}

export default LandingPage;
