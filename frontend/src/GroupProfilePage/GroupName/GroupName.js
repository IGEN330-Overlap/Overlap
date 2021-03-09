import React from 'react';
import { useSelector } from 'react-redux';
import './GroupName.css';

const GroupName = (props) => {
    const groupName = useSelector(state => state.currentGroup.groupName)

    return(
    <div className="group-name-container">
        <h1 className="text"><strong>{groupName}</strong></h1>
        <div className="under-bar"></div>
    </div>
    )
}

export default GroupName;