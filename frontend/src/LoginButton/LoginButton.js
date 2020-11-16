import './LoginButton.css';

//Takes active boolean as a prop
const LoginButton = (props) => {
    return (
        <>{props.active && <a href="http://localhost:8888/">
            <button className="button">
                Login with Spotify
            </button>
        </a>}

        </>
    );
}

export default LoginButton;
