import React, { useState, useEffect } from 'react';
import './GroupProfilePage.css';
import { useSelector } from 'react-redux';

import MemberDisplay from './MemberDisplay/MemberDisplay';
import GroupName from './GroupName/GroupName';
import Navbar1 from "../Navbar/Navbar";
import PlaylistCarousel from "./PlaylistCarousel/PlaylistCarousel";
import { MyInsights, Comparisons } from './IndividualComparisons/IndividualComparisons';

const axios = require("axios");

const GroupProfilePage = (props) => {

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
            .get("/groups/"+ groupCode + "/users")
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

    return (checkMember === 'true') 
    ? 
    (     
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
                            <GroupName groupName = {groupName} />
                        </div>
                        <div className="member-display">
                            {/* render members display when group users variable is populated */}
                            {groupUsers && <MemberDisplay groupUsers={groupUsers} toCompare={toCompare} groupCode={groupCode}/>}
                        </div>
                        <div className="playlist-carousel">
                            <PlaylistCarousel playlists={playlists} />
                        </div>
                    </div> 
                    <div className="individual-comparisons">
                        {/* if user has clicked on a member to compare, will render comparisons component
                            otherwise, render insights component */}
                        {member_id 
                            ? <Comparisons groupUsers={groupUsers} member_id={member_id} toCompare={toCompare} /> 
                            : <MyInsights />}
                    </div>
                </div>
            </div>
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