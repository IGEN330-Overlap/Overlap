import "./AuthorizedPage.css";
import GroupsComponent from "./GroupsComponent/GroupsComponent";
import CreateOrJoin from "./CreateOrJoin/CreateOrJoin";
import Navbar1 from "../Navbar/Navbar";
import iceberg from './iceberg.svg';

//takes accessToken string and loggedIn boolean as props
const AuthorizedPage = (props) => {
  return (
    <div className="landing-root">
        <Navbar1 />
      <div className="AuthorizedPage">
        <GroupsComponent />
        <CreateOrJoin />
        <div className="groups_iceberg">
          <img src={iceberg} alt="decorative iceberg"/>
        </div>
      </div>
    </div>
  );
};

export default AuthorizedPage;
