import React from 'react';
import './GroupProfilePage.css';
import { useState } from 'react';

import MemberDisplay from './MemberDisplay/MemberDisplay';
import GroupName from './GroupName/GroupName';
import Navbar1 from "../Navbar/Navbar";
import PlaylistCarousel from "./PlaylistCarousel/PlaylistCarousel";
import { MyInsights, Comparisons } from './IndividualComparisons/IndividualComparisons';

const GroupProfilePage = (props) => {

    const [member_id, selectMember] = useState('');
    function toCompare(value){
        selectMember(value);
    }

    return(     
        <div className="landing-root">
            <div className="navbar">
                <Navbar1 />
            </div>
            <div className="group-profile-page-components">
                <div className="component-box"></div>
                <div className="d-flex">
                    <div className="main-column">
                        <div className="main-column-box"></div>
                        <div className="group-name">
                            <GroupName />
                        </div>
                        <div className="member-display">
                            <MemberDisplay toCompare={toCompare}/>
                        </div>
                        <div className="playlist-carousel">
                            <PlaylistCarousel />
                        </div>
                    </div> 
                    <div className="individual-comparisons">
                        {member_id 
                            ? <Comparisons member_id={member_id} toCompare={toCompare} /> 
                            : <MyInsights />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupProfilePage;