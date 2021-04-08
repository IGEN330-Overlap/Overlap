import './LandingPage.css';
import logo from './overlap large.svg';
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

//Home page component
//Takes loggedIn boolean as a prop
const LandingPage = (props) => {
    const refreshToken = useSelector((state) => state.refreshToken);

    //URL for login
    //REACT_APP_BACKEND_URL exists on production, and login url will correctly route to the backend.
    //On heroku deployment, the login url would exist directly on the root url.
    const login_url = process.env.REACT_APP_BACKEND_URL + "/login"

    return (
        <div className="landing-root d-flex flex-column justify-content-center align-items-center">
            <div className="landing-redirect">
                <Link to="/how-it-works" className="landing-access"><strong>How It Works</strong></Link>
                <div className="vertical-line"></div>
                <Link to="/about" className="landing-access"><strong>About Us</strong></Link>
            </div>
            <div className="logo-container">
                <img src={logo} alt="logo" />
            </div>
            <div className="welcome-container">
                <h2 className="intro-message"> Welcome to <span className="purple">overlap</span>. <br></br>Make listening with friends easy.</h2>
            </div>
            <a href={login_url} className="btn btn-sm login-button">
                Continue
            </a>
            {/* Redirect if already authenticated */}
            {(refreshToken != null && refreshToken !== "" && props.faultyLogin === false) && <Redirect to="/authorized" />}
        </div>
    );
}

export default LandingPage;
