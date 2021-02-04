import React from 'react';
import './GroupProfilePage.css';
import MemberDisplay from './MemberDisplay/MemberDisplay';
import GroupName from './GroupName/GroupName';
import Navbar from "../Navbar/Navbar";
import PlaylistCarousel from "./PlaylistCarousel/PlaylistCarousel";

const GroupProfilePage = (props) => {
    return(     
        <div className="landing-root">
            <Navbar />
            <div className="group-name">
                <GroupName />
            </div>
            <div className="member-display">
                <MemberDisplay />
            </div>
            <div className="playlist-carousel">
                <PlaylistCarousel />
            </div>
        </div>
    )
}

export default GroupProfilePage;