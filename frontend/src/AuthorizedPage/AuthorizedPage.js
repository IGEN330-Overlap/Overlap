import "./AuthorizedPage.css";
import GroupsComponent from "./GroupsComponent/GroupsComponent";
import CreateOrJoin from "./CreateOrJoin/CreateOrJoin";
import Navbar1 from "../Navbar/Navbar";

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
  return (
    <div className="landing-root">
      <div className="navbar">
        <Navbar1 />
      </div>
      <div className="AuthorizedPage">
        <GroupsComponent />
        <CreateOrJoin />
      </div>
    </div>
  );
};

export default AuthorizedPage;
