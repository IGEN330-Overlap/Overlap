import './AuthorizedPage.css';

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
    return (
        <div>
            {/* && operator allows conditional rendering of the component */}
            <>{props.loggedIn && <h1>Hey you logged in, good shit buddy!</h1>}</>
            <>{!props.loggedIn && <a href="http://localhost:3000/">Hey you're not logged in! Click here to log in</a>}</>
            <p>{props.accessToken}</p>
        </div>
    );
}

export default AuthorizedPage;
