import './CreateOrJoin.css';
import React from "react";
import Collapse from 'react-bootstrap/Collapse';
import arrow from './right.svg';


//Component to display Create a new group or Join a group component
const CreateOrJoin = (props) => {
    
    const [openCreate, setCreateOpen] = React.useState(false);
    const [openJoin, setJoinOpen] = React.useState(false);
    
    return (
        //Flexbox for creating or joining new group
        <div className="CreateOrJoinBox d-flex flex-column align-left">
            <a
                onClick={() => setCreateOpen(!openCreate)}
                aria-controls="example-collapse-text"
                aria-expanded={openCreate}
            >
            <h5 className="openCollapse">+   Create a new group</h5>
            {/* INPUT AND CONTINUE DON'T DO ANYTHING/LINK TO ANYTHING -- also continue button does not change colour on hover need to fix*/}
            </a>
            <Collapse in={openCreate}>
                <div id="example-collapse-text">
                    <input type="text" className="input" placeholder="Enter Group Name" size="15"/>
                    <a className="continue-arrow"><img className="arrow" src={arrow}/></a>
                </div>
            </Collapse>

            <a
                onClick={() => setJoinOpen(!openJoin)}
                aria-controls="example-collapse-text"
                aria-expanded={openJoin}
            >
            <h5 className="openCollapse">+   Join a group</h5>
            {/* INPUT AND CONTINUE DON'T DO ANYTHING/LINK TO ANYTHING --  also continue button does not change colour on hover need to fix*/}
            </a>
            <Collapse in={openJoin}>
                <div id="example-collapse-text">
                    <input type="text" className="input" placeholder="Enter Group Code" size="15"/>
                    <a className="continue-arrow"><img className="arrow" src={arrow}/></a>
                </div>
            </Collapse>

        </div>
    );
}

export default CreateOrJoin;