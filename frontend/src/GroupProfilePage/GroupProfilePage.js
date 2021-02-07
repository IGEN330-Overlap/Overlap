import React from 'react';
import './GroupProfilePage.css';
import { Link, useRouteMatch } from 'react-router-dom';
import MemberDisplay from './MemberDisplay/MemberDisplay';
import GroupName from './GroupName/GroupName';
import Navbar from "../Navbar/Navbar";

const GroupProfilePage = (props) => {

    let { path, url } = useRouteMatch();

    return(     
        <div className="landing-root">
            <Navbar />
            <div className="group-name">
                <GroupName />
            </div>
            <div className="member-display">
                <MemberDisplay />
            </div>
            <br></br>
            <Link to ="/authorized/PlaylistPage/PlaylistPage/" className="links">Sample Playlist</Link>
        </div>
    )
}

export default GroupProfilePage;