import './CreateOrJoin.css';
import React, { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { updateGroupName } from '../../Redux/Actions.js';

import Collapse from 'react-bootstrap/Collapse';

const axios = require("axios");

//Component to display Create a new group or Join a group component
const CreateOrJoin = (props) => {
    
    const dispatch = useDispatch();

    // //Join an existing group
    // useEffect(() => {
    //     axios
    //       .post(process.env.REACT_APP_BACKEND_URL + "/groups/join", {

    //       })
    //       .then
    //       .catch((err) => console.log(err));
    // }, []);

    const [openCreate, setCreateOpen] = React.useState(false);
    const [openJoin, setJoinOpen] = React.useState(false);
    
    //Log name of group

    function setGroupName(){
        var input_name = document.getElementById("newGroupName").value
        dispatch(updateGroupName(input_name))
        console.log(input_name)
    }

    const groupName = useSelector(state => state.groupName);
    const spotifyID = useSelector(state => state.userObject.userID);
    
    //Create new group
    useEffect(() => {
        axios
          .post(process.env.REACT_APP_BACKEND_URL + "/groups/create", {
            name: groupName,
            spotifyID: spotifyID,
          })
          .then((data) => {
              console.log(data.data.return);
          })
          .catch((err) => console.log(err));
    }, [groupName]);

    return (
        //Flexbox for creating or joining new group
        <div className="CreateOrJoinBox d-flex flex-column align-left">
            <div
                onClick={() => setCreateOpen(!openCreate)}
                aria-controls="example-collapse-text"
                aria-expanded={openCreate}
            >
            <h5 className="openCollapse">+   Create a new group</h5>
            {/* INPUT AND CONTINUE DON'T DO ANYTHING/LINK TO ANYTHING */}
            </div>
            <Collapse in={openCreate}>
                <div id="example-collapse-text" className="collapseBody">
                    <input type="text" className="input" placeholder="Enter Group Name" size="15" id="newGroupName"/>
                    <div className="continue-arrow" onClick={setGroupName}>
                        <svg 
                            height="429.92093pt" 
                            viewBox="0 0 429.92093 429.92093" 
                            width="429.92093pt" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow">
                            
                            <path d="m366.960938 62.960938c-83.949219-83.949219-220.054688-83.949219-304 0-83.949219 83.945312-83.949219 220.050781 0 304 83.945312 83.945312 220.050781 83.945312 304 0 83.945312-83.949219 83.945312-220.054688 0-304zm-50.300782 159.097656-92.5 92.5c-1.875 1.890625-4.4375 2.9375-7.101562 2.902344-2.652344-.011719-5.195313-1.050782-7.097656-2.902344-1.871094-1.867188-2.925782-4.402344-2.925782-7.046875s1.054688-5.183594 2.925782-7.050781l75.5-75.5h-200.5c-5.523438 0-10-4.476563-10-10 0-5.523438 4.476562-10 10-10h200.5l-75.5-75.5c-3.894532-3.894532-3.894532-10.207032 0-14.101563 3.894531-3.890625 10.207031-3.890625 14.097656 0l92.5 92.5c3.828125 3.945313 3.875 10.203125.101562 14.199219zm0 0"/>
                            
                        </svg>
                    </div>
                </div>
            </Collapse>

            <div
                onClick={() => setJoinOpen(!openJoin)}
                aria-controls="example-collapse-text"
                aria-expanded={openJoin}
            >
            <h5 className="openCollapse">+   Join a group</h5>
            {/* INPUT AND CONTINUE DON'T DO ANYTHING/LINK TO ANYTHING */}
            </div>
            <Collapse in={openJoin}>
                <div id="example-collapse-text" className="collapseBody">
                    <input type="text" className="input" placeholder="Enter Group Code" size="15"/>
                    <div className="continue-arrow">
                        <svg 
                            height="429.92093pt" 
                            viewBox="0 0 429.92093 429.92093" 
                            width="429.92093pt" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow">
                            
                            <path d="m366.960938 62.960938c-83.949219-83.949219-220.054688-83.949219-304 0-83.949219 83.945312-83.949219 220.050781 0 304 83.945312 83.945312 220.050781 83.945312 304 0 83.945312-83.949219 83.945312-220.054688 0-304zm-50.300782 159.097656-92.5 92.5c-1.875 1.890625-4.4375 2.9375-7.101562 2.902344-2.652344-.011719-5.195313-1.050782-7.097656-2.902344-1.871094-1.867188-2.925782-4.402344-2.925782-7.046875s1.054688-5.183594 2.925782-7.050781l75.5-75.5h-200.5c-5.523438 0-10-4.476563-10-10 0-5.523438 4.476562-10 10-10h200.5l-75.5-75.5c-3.894532-3.894532-3.894532-10.207032 0-14.101563 3.894531-3.890625 10.207031-3.890625 14.097656 0l92.5 92.5c3.828125 3.945313 3.875 10.203125.101562 14.199219zm0 0"/>
                            
                        </svg></div>
                </div>
            </Collapse>

        </div>
    );
}

export default CreateOrJoin;