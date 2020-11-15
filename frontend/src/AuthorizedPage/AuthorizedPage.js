import './AuthorizedPage.css';


const AuthorizedPage = (props) => {
    return (
        <div>
            <>{props.loggedIn && <h1>Hey you logged in, good shit buddy!</h1>}</>
            <>{!props.loggedIn && <a href="http://localhost:3000/">Hey you're not logged in! Click here to log in</a>}</>
            <p>{props.accessToken}</p>
        </div>
    );
}

export default AuthorizedPage;
