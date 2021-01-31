import React from 'react';
import './GroupProfilePage.css';
import MemberDisplay from './MemberDisplay/MemberDisplay';
import GroupName from './GroupName/GroupName';
import Navbar from "../Navbar/Navbar";
import { MyInsights, Comparisons } from './IndividualComparisons/IndividualComparisons'

const GroupProfilePage = (props) => {
    return(     
        <div className="landing-root">
            <Navbar />
            <div className="group-name">
                <GroupName />
            </div>
            <div className="d-flex">
                <div className="member-display">
                    <MemberDisplay />
                </div>
                <div className="individual-comparisons">
                    <MyInsights />
                </div>
            </div>
        </div>
    )
}

export default GroupProfilePage;