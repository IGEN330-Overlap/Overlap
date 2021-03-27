import React, { useState, useEffect } from "react";
import "./GroupProfilePage.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MemberDisplay from "./MemberDisplay/MemberDisplay";
import GroupName from "./GroupName/GroupName";
import Navbar1 from "../Navbar/Navbar";
import PlaylistCarousel from "./PlaylistCarousel/PlaylistCarousel";
import ScreenOverlay from "../ScreenOverlay/ScreenOverlay";
import {
  MyInsights,
  Comparisons,
} from "./IndividualComparisons/IndividualComparisons";
// import { TopGenres } from './TopGenres/TopGenres';
// import { MusicalProfile } from './MusicalProfile/MusicalProfile';
import iceberg from "../AuthorizedPage/iceberg.svg";

const axios = require("axios");

const GroupProfilePage = (props) => {
  // get refresh token
  const refreshToken = useSelector((state) => state.refreshToken);

  // get group code from url
  const url = new URL(window.location.href);
  const groupCode = url.pathname.replace("/authorized/group/", "");

  // get group name
  const groupList = useSelector((state) => state.groupList);

  const [groupName, setGroupName] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const [checkMember, setCheckMember] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  //   React.useEffect(() => {
  //     //start loading
  //     setIsloading(true);

  //     groupList.map((group) => {
  //       if (group.groupCode === groupCode) {
  //         setCheckMember(true);
  //         setGroupName(group.groupName);
  //         setPlaylists(group.playlists);
  //       }
  //       return groupName;
  //     });

  //     //end loading
  //     setIsloading(false);
  //   },
  //   [groupCode, groupList, groupName]);

  // get group users and assign to groupUsers variable
  const [groupUsers, setUsers] = useState("");

  useEffect(() => {
    if (groupCode !== null) {
      //start loading
      setIsloading(true);

      axios
        .get(
          process.env.REACT_APP_BACKEND_URL + "/groups/" + groupCode + "/users"
        )
        .then((data) => {
          setUsers(data.data);

          //check if user belongs to group
          groupList.map((group) => {
            if (group.groupCode === groupCode) {
              setCheckMember(true);
              setGroupName(group.groupName);
              setPlaylists(group.playlists);
            }
            return groupName;
          });

          //end loading
          setIsloading(false);
        })
        .catch((err) => {
          console.log(err);
          //end loading
          setIsloading(false);
        });
    }
  }, [groupCode, groupList, groupName]);

  // select member to compare
  const [member_id, selectMember] = useState("");
  function toCompare(value) {
    selectMember(value);
  }

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
          </div>
        </div>

        <div className="profile_iceberg">
          <img src={iceberg} alt="decorative iceberg" />
        </div>

        {/* <div className="top-genres-display">
              <TopGenres groupUsers={groupUsers} />
          </div>
          <div className="musical-profile-display">
              <MusicalProfile groupUsers={groupUsers} />
          </div> */}
      </div>
    );
  } else if (!isLoading && !checkMember) {
    return (
      <div className="landing-root-error">
        <div className="wrong-group">
          Oops! It looks like you're not part of this group!
          <div>
            <Link to="/authorized" className="return-button">
              Take me back to my groups!
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
