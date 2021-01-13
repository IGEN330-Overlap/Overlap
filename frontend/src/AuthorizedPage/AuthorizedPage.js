import './AuthorizedPage.css';
import GroupsComponent from './GroupsComponent/GroupsComponent';

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
    return (
        <div className="AuthorizedPage d-flex justify-content-center align-items-center">
            {/* && operator allows conditional rendering of the component */}
            <>{props.loggedIn && <GroupsComponent/>}</>
        </div>
    );
}

export default AuthorizedPage;
