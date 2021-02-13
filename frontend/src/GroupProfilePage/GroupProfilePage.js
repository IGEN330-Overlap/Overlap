import React from 'react';
import './GroupProfilePage.css';
import { useState } from 'react';

import { Link, useRouteMatch } from 'react-router-dom';
import MemberDisplay from './MemberDisplay/MemberDisplay';
import GroupName from './GroupName/GroupName';
import Navbar from "../Navbar/Navbar";
import PlaylistCarousel from "./PlaylistCarousel/PlaylistCarousel";
import { MyInsights, Comparisons } from './IndividualComparisons/IndividualComparisons';

const GroupProfilePage = (props) => {

    let { path, url } = useRouteMatch();

    const [name, selectMember] = useState('');
    function toCompare(value){
        selectMember(value);
    }

    return(     
        <div className="landing-root">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="box">
                <div className="group-name">
                    <GroupName />
                </div>
            </div>
            <div className="playlist-carousel">
                <PlaylistCarousel />
            </div>
            <div className="d-flex">
                <div className="member-display">
                    <MemberDisplay toCompare={toCompare}/>
                </div>
                <div className="individual-comparisons">
                    {name 
                        ? <Comparisons name={name} toCompare={toCompare} /> 
                        : <MyInsights />}
                </div>
            </div>
            
            <br></br>
            <Link to ="/authorized/PlaylistPage/PlaylistPage/" className="links">Sample Playlist</Link>
        </div>
    )
}

export default GroupProfilePage;