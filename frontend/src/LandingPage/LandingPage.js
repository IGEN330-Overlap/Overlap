import './LandingPage.css';
import logo from './overlap large.svg';


//Home page component
//Takes loggedIn boolean as a prop
const LandingPage = (props) => {
    return (
        <div className="landing-root d-flex flex-column justify-content-center align-items-center">
            <div className="logo-container">
                <img src={logo} alt="logo" />
            </div>
            <div className="welcome-container">
                <h2 className="intro-message"> Welcome to <span className="purple">overlap</span>. <br></br>Make listening with friends easy.</h2>
            </div>
            <a href={process.env.REACT_APP_BACKEND_URL + "/login"} className="btn btn-sm login-button">
                Log in with Spotify
            </a>
        </div>
    );
}

export default LandingPage;
