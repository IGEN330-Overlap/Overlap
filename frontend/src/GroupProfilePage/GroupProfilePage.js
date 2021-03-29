import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GroupProfilePage.css';

import MemberDisplay from "./MemberDisplay/MemberDisplay";
import GroupName from "./GroupName/GroupName";
import Navbar1 from "../Navbar/Navbar";
import PlaylistCarousel from "./PlaylistCarousel/PlaylistCarousel";
import { MyInsights, Comparisons } from './IndividualComparisons/IndividualComparisons';
//import { TopGenres } from './TopGenres/TopGenres';
import { GroupTopStats } from './TopStats/TopStats';
import { MusicalProfile } from './MusicalProfile/MusicalProfile';
import ScreenOverlay from '../ScreenOverlay/ScreenOverlay';
import iceberg from '../AuthorizedPage/iceberg.svg';

const axios = require("axios");

const GroupProfilePage = (props) => {
  // get refresh token
  const refreshToken = useSelector((state) => state.refreshToken);

  // get group code from url
  const url = new URL(window.location.href);
  const groupCode = url.pathname.replace("/authorized/group/", "");

  const history = useHistory();

  // get group name
  const groupList = useSelector((state) => state.groupList);

  const [groupUsers, setUsers] = useState("");
  const [groupName, setGroupName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [createdDate, setCreatedDate] = useState("");

  const [checkMember, setCheckMember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (groupCode !== null) {
      //start loading
      setIsLoading(true);

      axios
        .get(process.env.REACT_APP_BACKEND_URL + "/groups/"+ groupCode + "/users")
        .then((data) => {
            setUsers(data.data)

        //check if user belongs to group
        groupList.map((group) => {
        if (group.groupCode === groupCode) {
            setCheckMember(true);
            setGroupName(group.groupName);
            setPlaylists(group.playlists);
            setCreatedDate(group.createdAt);
        }
        return groupName;
        });

        //end loading
        setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            //end loading
            setIsLoading(false);
        });
    }
  }, [groupCode, groupList, groupName]);

  // select member to compare
  const [member_id, selectMember] = useState("");
  function toCompare(value) {
    selectMember(value);
  }
    
  useEffect (() => {
    return history.listen((location) => {
        selectMember("");
    })
  }, [history])

  if (groupList.length === 0 || isLoading) {
    return <ScreenOverlay text="Collecting your group's information..." />;
  } else if (checkMember && groupUsers && !isLoading) {
    return (
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
                <GroupName groupName={groupName} createdDate={createdDate} />
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
                {member_id ? (
                  <Comparisons
                    groupUsers={groupUsers}
                    member_id={member_id}
                    toCompare={toCompare}
                  />
                ) : (
                  <MyInsights />
                )}
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
                
            {/* <div className="top-genres-display">
                <TopGenres groupUsers={groupUsers} />
            </div>
            <div className="musical-profile-display">
                <MusicalProfile groupUsers={groupUsers} />
            </div> */}
           
        </div>

        <div className="profile_iceberg">
          <img src={iceberg} alt="decorative iceberg" />
        </div>

          {/* <div className="top-genres-display">
              <TopGenres groupUsers={groupUsers} />
          </div> */}
          <div className="top-stats-display">
              <GroupTopStats groupUsers={groupUsers}/>
          </div>
          <div className="musical-profile-display">
              <MusicalProfile groupUsers={groupUsers} />
          </div>
      </div>
    </div>
    );
  } else if (!isLoading && !checkMember) {
    return (
      <div className="landing-root-error">
        <div className="wrong-group">
          Oops! It looks like you're not part of this group!
          <div>
            <Link to={"/authorized"} className="return-button">
                <svg
                    className="error-return-arrow"
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
      </div>
    );
  } else {
    return <div className="landing-root-base"></div>;
  }
};

export default GroupProfilePage;
