import './AuthorizedPage.css';
import GroupsComponent from './GroupsComponent/GroupsComponent';
import CreateOrJoin from './CreateOrJoin/CreateOrJoin';

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
    return (
        <div className="AuthorizedPage d-flex justify-content-center align-items-center">
            {/* && operator allows conditional rendering of the component */}
            <>{props.loggedIn && <GroupsComponent/>}</>
            <>{props.loggedIn && <CreateOrJoin/>}</>
        </div>
    );
}

export default AuthorizedPage;
