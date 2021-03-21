import React, { useState, useEffect } from 'react';
import './GroupProfilePage.css';
import { useSelector } from 'react-redux';

import MemberDisplay from './MemberDisplay/MemberDisplay';
import GroupName from './GroupName/GroupName';
import Navbar1 from "../Navbar/Navbar";
import PlaylistCarousel from "./PlaylistCarousel/PlaylistCarousel";
import { MyInsights, Comparisons } from './IndividualComparisons/IndividualComparisons';
import { TopGenres } from './TopGenres/TopGenres';
import { MusicalProfile } from './MusicalProfile/MusicalProfile';

const axios = require("axios");

const GroupProfilePage = (props) => {

    // get refresh token
    const refreshToken = useSelector((state) => state.refreshToken)

    // get group code from url
    const url = window.location.href
    const groupCode = url.replace("http://localhost:3000/authorized/group/","")

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
    const [member_id, selectMember] = useState('');
    function toCompare(value){
        selectMember(value);
    }

    return ((checkMember === 'true') &&  groupUsers) 
    ? 
    (     
        <div className="group-landing-root">
            <div className="group-info-root">
                <div className="navbar">
                    <Navbar1 />
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
            <div className="musical-profile-display">
                <MusicalProfile groupUsers={groupUsers} />
            </div>
            */}
        </div>
    )
    :
    // loading screen while checking if user is member of group
    <div className = "landing-root-error">
        <div className = "loading-message">Collecting your group's information...</div>
        {/* wrong group error if user is trying to access group they're not part of */}
        <div className = "wrong-group">
            Oops! It looks like you're not part of this group :(
            <div>
                <a href="/authorized" className = "return-button">Take me back to my groups!</a>
            </div>
        </div>
    </div>
}

export default GroupProfilePage;