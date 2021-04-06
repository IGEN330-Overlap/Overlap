import "./AuthorizedPage.css";
import GroupsComponent from "./GroupsComponent/GroupsComponent";
import CreateOrJoin from "./CreateOrJoin/CreateOrJoin";
import Navbar1 from "../Navbar/Navbar";

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
  return (
    <div className="landing-root">
        <Navbar1 />
      <div className="AuthorizedPage">
        <GroupsComponent refreshPage = {props.refreshPage}/>
        <CreateOrJoin />
      </div>
    </div>
  );
};

export default AuthorizedPage;
