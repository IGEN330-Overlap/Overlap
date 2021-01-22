import React from 'react';
import './GroupProfile.css';
import MemberDisplay from './MemberDisplay/MemberDisplay';
import GroupName from './GroupName/GroupName';

const GroupProfile = (props) => {
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

export default GroupProfile;