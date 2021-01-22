import MemberDisplay from '../GroupProfile/MemberDisplay/MemberDisplay';
import './AuthorizedPage.css';
import { Link } from 'react-router-dom';

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
    return (
        <div>
            {/* && operator allows conditional rendering of the component */}
            <>{props.loggedIn && <h1>Hey you logged in, good shit buddy!</h1>}</>
            <>{!props.loggedIn && <a href="http://localhost:3000/">Hey you're not logged in! Click here to log in</a>}</>
            <p>{props.accessToken}</p>
             {/*link to group page*/}
             <>{props.loggedIn && <Link to ="GroupProfile/GroupProfile">Sample Group</Link>}</>
        </div>
    );
}

export default AuthorizedPage;
