import './AuthorizedPage.css';
import GroupsComponent from './GroupsComponent/GroupsComponent';
import CreateOrJoin from './CreateOrJoin/CreateOrJoin';
import { Link } from 'react-router-dom';

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
    return (

        <div className="AuthorizedPage">
            {/* && operator allows conditional rendering of the component */}

            <>{props.loggedIn && <GroupsComponent/>}</>
            <>{props.loggedIn && <CreateOrJoin/>}</>

             {/*link to group page*/}
             <>{props.loggedIn && <Link to ="GroupProfilePage/GroupProfilePage">Sample Group</Link>}</>

        </div>
    );
}

export default AuthorizedPage;
