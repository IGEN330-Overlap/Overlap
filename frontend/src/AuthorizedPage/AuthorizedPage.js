import "./AuthorizedPage.css";
import GroupsComponent from "./GroupsComponent/GroupsComponent";
import CreateOrJoin from "./CreateOrJoin/CreateOrJoin";

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
  return (
    <div className="AuthorizedPage">
      <GroupsComponent />
      <CreateOrJoin />
    </div>
  );
};

export default AuthorizedPage;
