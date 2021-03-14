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
    const url = window.location.href
    const groupCode = url.replace("http://localhost:3000/authorized/group/","")

    // get group name
    const groupList = useSelector((state) => state.groupList)
    var groupName
    var checkMember = ''
    groupList.map((group,i) => {
        if (group.groupCode === groupCode){
            // add function to check if user is member of group
            checkMember = 'true'
            groupName = group.groupName
        }
        return groupName;
    })

    // get group users
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
                            {groupUsers && <MemberDisplay groupUsers={groupUsers} toCompare={toCompare}/>}
                        </div>
                        <div className="playlist-carousel">
                            <PlaylistCarousel />
                        </div>
                    </div> 
                    <div className="individual-comparisons">
                        {member_id 
                            ? <Comparisons groupUsers={groupUsers} member_id={member_id} toCompare={toCompare} /> 
                            : <MyInsights />}
                    </div>
                </div>
            </div>
        </div>
    )
    :
    <div className = "landing-root">
        <div className = "loading-message">Loading...</div>
        <div className = "wrong-group">Sorry, it looks like you're not part of this group!</div>
    </div>
}

export default GroupProfilePage;