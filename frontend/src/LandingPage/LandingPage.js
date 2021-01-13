import './LandingPage.css';
import logo from './overlap large.svg';


//Home page component
//Takes loggedIn boolean as a prop
const LandingPage = (props) => {
    return (
        <div className="landing-root d-flex flex-column justify-content-center align-items-center">
            <img src={logo} className="large-logo" alt="logo" />
            <h2 className="white"> Welcome to <span className="purple">overlap</span>. <br></br>Make listening with friends easy.
            </h2>
            <a href={process.env.REACT_APP_BACKEND_URL} className="btn btn-sm login-button">
                Log in with Spotify
            </a>
           
        </div>
    );
}

export default LandingPage;
