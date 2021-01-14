import './GroupsComponent.css';

//can't get three-dot or search icon to work
//also don't get how to implement breakpoints

//Component to display groups on Groups page
const GroupsComponent = (props) => {
    return (
        // Flexbox for whole component to make sure transition from mobile to desktop is smooth
        <div className="GroupsComponent d-flex flex-column align-left">
            
            {/* Flexbox for Existing Groups */}
            <div className="YourGroupsBox d-flex flex-column align-items-left">
                <h1 className="title"><strong>Groups</strong></h1>
                { /*search bar */}
                <div className="search-bar">
                    <i class="glyphicon glyphicon-search"></i>
                    <input type="text" class="input-search" placeholder="search"/>
                </div>

                { /*list of groups */}
                <div className="group-list">
                    <div className="group-item d-flex">
                        <div><a>Group 1</a></div>
                        <div class="ml-auto"><a><img className="three-dots" src="/three-dots.svg"/></a></div>
                    </div>
                    <div className="group-item d-flex">
                        <div><a>Group 1</a></div>
                        <div class="ml-auto"><a><img className="three-dots" src="/three-dots.svg"/></a></div>
                    </div>
                    <div className="group-item d-flex">
                        <div><a>Group 1</a></div>
                        <div class="ml-auto"><a><img className="three-dots" src="/three-dots.svg"/></a></div>
                    </div>
                </div>   
            </div>

            {/* Flexbox for creating or joining new group */}
            <div className="JoinOrCreateBox d-flex flex-column align-items-left">
                <div className="CreateNewGroup">
                    <a>+ Create a new group</a>
                </div>
                <div className="JoinGroup">
                    <a>+ Join a group</a>
                </div>
            </div>
        </div>
    );
}

export default GroupsComponent;