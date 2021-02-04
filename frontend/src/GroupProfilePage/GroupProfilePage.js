import React from 'react';
import './GroupProfilePage.css';
import { useState } from 'react';

import MemberDisplay from './MemberDisplay/MemberDisplay';
import GroupName from './GroupName/GroupName';
import Navbar from "../Navbar/Navbar";
import { MyInsights, Comparisons } from './IndividualComparisons/IndividualComparisons';

const GroupProfilePage = (props) => {

    const [name, selectMember] = useState('');
    function toCompare(value){
        selectMember(value);
    }

    return(     
        <div className="landing-root">
            <Navbar />
            <div className="group-name">
                <GroupName />
            </div>
            <div className="d-flex">
                <div className="member-display">
                    <MemberDisplay toCompare={toCompare}/>
                </div>
                <div className="individual-comparisons">
                    {name 
                        ? <Comparisons name={name} toCompare={toCompare}/> 
                        : <MyInsights />}
                </div>
            </div>
            
        </div>
    )
}

export default GroupProfilePage;