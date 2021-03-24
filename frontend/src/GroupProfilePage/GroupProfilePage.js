import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GroupProfilePage.css';

import MemberDisplay from './MemberDisplay/MemberDisplay';
import GroupName from './GroupName/GroupName';
import Navbar1 from "../Navbar/Navbar";
import PlaylistCarousel from "./PlaylistCarousel/PlaylistCarousel";
import { MyInsights, Comparisons } from './IndividualComparisons/IndividualComparisons';
//import { TopGenres } from './TopGenres/TopGenres';
import { GroupTopStats } from './TopStats/TopStats';
//import { MusicalProfile } from './MusicalProfile/MusicalProfile';
//import ScreenOverlay from '../ScreenOverlay/ScreenOverlay';

const axios = require("axios");

const GroupProfilePage = (props) => {

    // get refresh token
    const refreshToken = useSelector((state) => state.refreshToken)

    // get group code from url
    const url = new URL(window.location.href);
    const groupCode = url.pathname.replace("/authorized/group/", "");

    // get group name
    const groupList = useSelector((state) => state.groupList)
    var groupName
    var playlists
    var checkMember = ''
    groupList.map((group) => {
        if (group.groupCode === groupCode){
            checkMember = 'true'
            groupName = group.groupName
            playlists = group.playlists
        }
        return groupName;          
    })

    // get group users and assign to groupUsers variable
    const [groupUsers, setUsers] = useState('')

    useEffect (() => {
        if(groupCode !== null) {
            axios
            .get(process.env.REACT_APP_BACKEND_URL + "/groups/"+ groupCode + "/users")
            .then((data) => {
                setUsers(data.data)
            })
            .catch((err) => console.log(err))
        }
    }, [groupCode])
    
    // select member to compare
    const [member_id, setMemberID] = useState('');
    const toCompare = (value) => {
        setMemberID(value);
    }

    return ((checkMember === 'true') && groupUsers) 
    ? 
    (     
        <div className="group-landing-root">
            <div className="group-info-root">
                <div className="navbar">
                    <Navbar1 
                        toCompare={toCompare}
                    />
                </div>
                <div className="group-profile-page-components">
                    <div className="component-box"></div>
                    <div className="info-flex">
                        <div className="main-column-box"></div>
                        <div className="group-name">
                            <GroupName groupName={groupName} />
                        </div>
                        <div className="member-display">
                            {/* render members display when group users variable is populated */} 
                            <MemberDisplay 
                                groupUsers={groupUsers}
                                groupCode={groupCode} 
                                toCompare={toCompare}
                            />
                        </div>
                        <div className="individual-comparisons">
                        {/* if user has clicked on a member to compare, will render comparisons component
                            otherwise, render insights component */}
                            {member_id 
                            ? <Comparisons 
                                groupUsers={groupUsers} 
                                member_id={member_id} 
                                toCompare={toCompare} /> 
                            : <MyInsights />
                            }
                        </div>
                        <div className="playlist-carousel">
                            <PlaylistCarousel 
                                playlists={playlists} 
                                groupCode={groupCode} 
                                groupUsers={groupUsers} 
                                refreshToken={refreshToken}
                            />
                        </div>
                    </div> 
                </div>
            </div>
            {/*
            <div className="top-genres-display">
                <TopGenres groupUsers={groupUsers} />
            </div>
            */}
            <div className="group-top-tracks-display">
                <GroupTopStats groupUsers={groupUsers} />
            </div>
            {/*
            <div className="musical-profile-display">
                <MusicalProfile groupUsers={groupUsers} />
            </div>
            */}
        </div>
    )
    :
    // loading screen while checking if user is member of group
    <div className = "landing-root-error">
        {/* <ScreenOverlay text="Loading" /> */}
        {/* wrong group error if user is trying to access group they're not part of */}
        <div className = "wrong-group">
            Oops! It looks like you're not part of this group :(
            <Link to={"/authorized"} className="return-button">
                <svg
                    className="pp_backArrow_svg"
                    xmlns="http://www.w3.org/2000/svg"  
                    viewBox="0 0 24 24" >
                    <path d="M0 0h24v24H0z" 
                    fill="none"/>
                    <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"
                    fill="var(--off-white-color)"/>
                </svg>
                <strong>My Groups</strong>
            </Link>
        </div>
    </div>
}

export default GroupProfilePage;