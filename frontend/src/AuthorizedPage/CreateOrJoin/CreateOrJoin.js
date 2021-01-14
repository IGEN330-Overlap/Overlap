import './CreateOrJoin.css';

//Component to display Create a new group or Join a group component
const CreateOrJoin = (props) => {
    return (
        //Flexbox for creating or joining new group
        <div className="CreateOrJoinBox d-flex flex-column align-left">
            <div className="CreateNewGroup">
                <a>+ Create a new group</a>
            </div>
            <div className="JoinGroup">
                <a>+ Join a group</a>
            </div>
        </div>
    );
}

export default CreateOrJoin;