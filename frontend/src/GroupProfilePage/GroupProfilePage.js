import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateGroupList } from '../Redux/Actions.js';
import Modal from 'react-bootstrap/Modal';
import { ReactComponent as DownArrow} from './down-arrow.svg';
import './GroupProfilePage.css';

import MemberDisplay from "./MemberDisplay/MemberDisplay";
import GroupName from "./GroupName/GroupName";
import Navbar1 from "../Navbar/Navbar";
import PlaylistCarousel from "./PlaylistCarousel/PlaylistCarousel";
import { MyInsights, Comparisons } from './IndividualComparisons/IndividualComparisons';
import { TopGenres } from './TopGenres/TopGenres';
import { GroupTopStats } from './TopStats/TopStats';
import { MusicalProfile } from './MusicalProfile/MusicalProfile';
import ScreenOverlay from '../ScreenOverlay/ScreenOverlay';

const axios = require("axios");

const GroupProfilePage = (props) => {
  const dispatch = useDispatch();

  // get refresh token
  const refreshToken = useSelector((state) => state.refreshToken);

  // get group code from url
  const url = new URL(window.location.href);
  const groupCode = url.pathname.replace("/authorized/group/", "");
  const spotifyID = useSelector((state) => state.userObject);

  const history = useHistory();

  // get group name
  const groupList = useSelector((state) => state.groupList);

  const [groupUsers, setUsers] = useState("");
  const [groupName, setGroupName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [createdDate, setCreatedDate] = useState("");

  const [checkMember, setCheckMember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setLoading = (state) => {
    setIsLoading(state);
  }

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshPage = () => {
    setRefreshTrigger(refreshTrigger + 1);
  }

  useEffect(() => {
    if (groupCode !== null) {
      //start loading
      setLoading(true);

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
        setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            //end loading
            setLoading(false);
        });
    }
  }, [groupCode, groupList, groupName, refreshTrigger]);

  // get screen width and height
  const [width, getWidth] = useState(window.innerWidth)
  const [height, getHeight] = useState(window.innerHeight)

  useEffect(() => {
      const handleResize = () => {
          getWidth(window.innerWidth)
          getHeight(window.innerHeight)
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, [])

  //functions for opening and closing "Leave Group" Modal
  const [LeaveisOpen, setLeaveIsOpen] = React.useState(false);
  const showLeaveModal = () => {
    setLeaveIsOpen(true);
  };
  const hideLeaveModal = () => {
    setLeaveIsOpen(false);
  };

  function leaveGroup() {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/groups/leave", {
        groupCode: groupCode,
        spotifyID: spotifyID.userID,
      })
      .then((data) => {
        console.log(data.data.return);
        axios
          .get(process.env.REACT_APP_BACKEND_URL + "/users/" + spotifyID.userID + "/groups")
          .then((data) => {
            dispatch(updateGroupList(data.data));
            console.log(data.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    history.push("/authorized/")
  }

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
    return <ScreenOverlay text="Collecting your group's information" />;
  } else if (checkMember && groupUsers && !isLoading) {
    return (
      <div className="group-landing-root">
        <div className="group-info-root">
            <Navbar1 />
          <div className="group-profile-page-components">
            <div className="component-box"></div>
            <div className="info-flex">
              <div className="main-column-box"></div>
              <div className="group-name">
                <GroupName 
                  groupCode={groupCode} 
                  groupName={groupName} 
                  createdDate={createdDate} 
                  setLoading={setLoading}
                  refreshPage={refreshPage}
                  />
                <div className="leave-group" onClick={showLeaveModal}>
                  {width > 720 ? <h2>Leave Group</h2> : null }
                  <svg className="exit-icon" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" id="fi_3580175">
                      <path className="exit-icon-part" d="m480.971 239.029-90.51-90.509a24 24 0 0 0 -33.942 0 24 24 0 0 0 0 33.941l49.54 49.539h-262.059a24 24 0 0 0 -24 24 24 24 0 0 0 24 24h262.059l-49.54 49.539a24 24 0 0 0 33.942 33.941l90.51-90.51a24 24 0 0 0 0-33.941z"></path>
                      <path className="exit-icon-part" d="m304 392a24 24 0 0 0 -24 24v24h-208v-368h208v24a24 24 0 0 0 48 0v-32a40 40 0 0 0 -40-40h-224a40 40 0 0 0 -40 40v384a40 40 0 0 0 40 40h224a40 40 0 0 0 40-40v-32a24 24 0 0 0 -24-24z"></path>
                  </svg>
                </div>
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
                  setLoading={setLoading}
                />
              </div>              
            </div>
            {width > 600 ? 
              <div className="gp-scroll">
                {height > 720 ? "Scroll for more!" : null}
                  <DownArrow className="gp-downArrow" />
              </div>
              : null
            }
          </div>
      </div>

      <div className="top-genres-display">
          <TopGenres groupUsers={groupUsers} />
      </div>
      <div className="top-stats-display">
          <GroupTopStats groupUsers={groupUsers}/>
      </div>
      <div className="musical-profile-display">
          <MusicalProfile groupUsers={groupUsers} />
      </div>

      {/* Leave group modal */}
      <Modal
          className="modalcss"
          show={LeaveisOpen}
          onHide={hideLeaveModal}
          centered
        >
          <Modal.Body className="in-modal">
            <h5 className="modal-text modal-head">
              <strong>Are you sure you want to leave?</strong>
            </h5>
            <h4 className="modal-text">
              <strong>{groupName}</strong>
            </h4>
            <p>
              <button
                className="btn-in-modal leave-buttons"
                onClick={() => {
                  hideLeaveModal();
                  leaveGroup();
                }}
              >
                Yes, I'm sure.
              </button>
            </p>
            <p>
              <button
                onClick={hideLeaveModal}
                className="btn-in-modal leave-buttons"
              >
                No, I want to stay!
              </button>
            </p>
          </Modal.Body>
        </Modal>
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