import './GroupsComponent.css';

//Component to display groups on Groups page
const GroupsComponent = (props) => {
    return (
        <div className="GroupsComponent d-flex flex-column align-left">
            <h1 className="title item"><strong>Groups</strong></h1>
            <div className="YourGroupsBox d-flex flex-column align-items-left">
                { /*search bar */}
                <div className="search-bar item">
                    <i class="glyphicon glyphicon-search"></i>
                    <input type="text" class="input-search" placeholder="search"/>
                </div>
                { /*list of groups */}
                <ul className="group-list item">
                    <li><a>Group 1</a></li>
                    <li><a>Group 2</a></li>
                    <li><a>Group 3</a></li>
                </ul>   
            </div>
            <div className="JoinOrCreateBox d-flex flex-column align-items-left">
                <a>
                    <i class="glyphicon glyphicon-plus"></i>
                    <h6>Create a new group</h6>
                </a>
                <a>
                    <i class="glyphicon glyphicon-plus"></i>
                    <h6>Join a group</h6>
                </a>
            </div>
        </div>
    );
}

export default GroupsComponent;