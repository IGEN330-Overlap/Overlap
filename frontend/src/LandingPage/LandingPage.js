import Navbar from '../Navbar/Navbar';
import './LandingPage.css';

//Home page component
//Takes loggedIn boolean as a prop
const LandingPage = (props) => {
    return (
        <div className="landing-root d-flex flex-column justify-content-center align-items-center">
            <a href={process.env.REACT_APP_BACKEND_URL} className="btn btn-sm login-button">
                Login with Spotify
            </a>
            <h1 className="white">
                hello
            </h1>
            <Navbar></Navbar>
        </div>
    );
}

export default LandingPage;
