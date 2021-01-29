import './AuthorizedPage.css';
import GroupsComponent from './GroupsComponent/GroupsComponent';
import CreateOrJoin from './CreateOrJoin/CreateOrJoin';

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
    return (
        // STILL NEEDS TO BE FORMATTED
        <div className="AuthorizedPage d-flex justify-content-center align-items-center">
            {/* && operator allows conditional rendering of the component */}
            <>{props.loggedIn && <GroupsComponent/>}</>
            <>{props.loggedIn && <CreateOrJoin/>}</>
        </div>
    );
}

export default AuthorizedPage;
