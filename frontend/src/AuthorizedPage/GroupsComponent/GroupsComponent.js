import CreateOrJoin from '../CreateOrJoin/CreateOrJoin';
import './GroupsComponent.css';
import dots from './three-dots.svg';


//Component to display groups on Groups page
const GroupsComponent = (props) => {
    return (
        // Flexbox for existing groups
        <div className="YourGroupsBox d-flex flex-column align-left">
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
                        <div class="ml-auto"><a><img src={dots} className="three-dots" alt="three dot menu"/></a></div>
                    </div>
                    <div className="group-item d-flex">
                        <div><a>Group 1</a></div>
                        <div class="ml-auto"><a><img src={dots} className="three-dots" alt="three dot menu"/></a></div>
                    </div>
                    <div className="group-item d-flex">
                        <div><a>Group 1</a></div>
                        <div class="ml-auto"><a><img src={dots} className="three-dots" alt="three dot menu"/></a></div>
                    </div>
                </div>   
        </div>    
    );
}

export default GroupsComponent;