import "./AuthorizedPage.css";
import GroupsComponent from "./GroupsComponent/GroupsComponent";
import CreateOrJoin from "./CreateOrJoin/CreateOrJoin";
import { useSelector } from "react-redux";

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
  //Select refreshToken state from Redux store
  const refreshToken = useSelector((state) => state.refreshToken);

  return (
    <div className="AuthorizedPage">
      {/* && operator allows conditional rendering of the component */}

      <>{refreshToken.length !== 0 && <GroupsComponent />}</>
      <>{refreshToken.length !== 0 && <CreateOrJoin />}</>
    </div>
  );
};

export default AuthorizedPage;
