import './LandingPage.css';

//Home page component
//Takes loggedIn boolean as a prop
const LandingPage = (props) => {
    return (
        <div className="landing-root d-flex flex-column justify-content-center align-items-center">
            <a href="http://localhost:8888/" className="btn btn-sm login-button">
                Login with Spotify
            </a>
            <h1 className="white">
                hello
            </h1>
        </div>
    );
}

export default LandingPage;
