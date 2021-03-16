import React from 'react';
import './GroupName.css';

// display group name on group profile page

const GroupName = ({groupName}) => {

    return(
    <div className="group-name-container">
        <h1 className="text"><strong>{groupName}</strong></h1>
        <div className="under-bar"></div>
    </div>
    )
}

export default GroupName;