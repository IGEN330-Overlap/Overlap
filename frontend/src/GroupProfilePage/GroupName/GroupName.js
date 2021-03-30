import React from 'react';
import './GroupName.css';

// display group name on group profile page

const GroupName = ({groupName, createdDate}) => {

    return(
    <div className="group-name-container">
        <h1 className="text"><strong>{groupName}</strong></h1>
        <h4 className="created-date"><strong>Created On: {createdDate.substr(0, 10)}</strong></h4>
        <div className="under-bar"></div>
    </div>
    )
}

export default GroupName;