import React from 'react';
import './GroupProfilePage.css';
import MemberDisplay from './MemberDisplay/MemberDisplay';
import GroupName from './GroupName/GroupName';

const GroupProfilePage = (props) => {
    return(
        <div className="landing-root">
            <div className="group-name">
                <GroupName />
            </div>
            <div className="member-display">
                <MemberDisplay />
            </div>
        </div>
    )
}

export default GroupProfilePage;