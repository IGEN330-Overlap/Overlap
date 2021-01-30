import MemberDisplay from '../GroupProfilePage/MemberDisplay/MemberDisplay';
import './AuthorizedPage.css';
<<<<<<< HEAD
import Navbar from "../Navbar/Navbar";
=======
import GroupsComponent from './GroupsComponent/GroupsComponent';
import CreateOrJoin from './CreateOrJoin/CreateOrJoin';
import { Link } from 'react-router-dom';
>>>>>>> master

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
    return (
        // STILL NEEDS TO BE FORMATTED
        <div className="AuthorizedPage d-flex justify-content-center align-items-center">
            {/* && operator allows conditional rendering of the component */}
<<<<<<< HEAD
            <>{props.loggedIn && <h1>Hey you logged in, good shit buddy!</h1>}</>
            <>{!props.loggedIn && <a href="http://localhost:3000/">Hey you're not logged in! Click here to log in</a>}</>
            <p>{props.accessToken}</p>
            <Navbar></Navbar>
=======

            <>{props.loggedIn && <GroupsComponent/>}</>
            <>{props.loggedIn && <CreateOrJoin/>}</>

             {/*link to group page*/}
             <>{props.loggedIn && <Link to ="GroupProfilePage/GroupProfilePage">Sample Group</Link>}</>

>>>>>>> master
        </div>
    );
}

export default AuthorizedPage;
