import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./PlaylistCarousel.css";

import { updateGroupList } from "../../Redux/Actions.js";

import { Link, useHistory } from "react-router-dom";

import happy_cover from "./Happy.jpg";
import sad_cover from "./Sad.jpg";
import chill_cover from "./Chill.jpg";
import party_cover from "./Party.jpg";
import topTracks_cover from "./TopTracks.png";
import default_cover from "./default.png";
import {ReactComponent as AddSVG} from "./add.svg";
import closeButton from "./close-x.svg";

import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Collapse from 'react-bootstrap/Collapse';
import Alert from 'react-bootstrap/Alert';

const axios = require('axios')

const PlaylistCarousel = ({playlists, groupUsers, groupCode, refreshToken, setLoading}) => {

  const userObject = useSelector((state) => state.userObject)
  
  const dispatch = useDispatch();

  const history = useHistory();
  
  // functions for opening and closing "Add Playlist" Modal
  const [AddPlaylistisOpen, setAddPlaylistIsOpen] = React.useState(false);
  const showAddPlaylistModal = () => {
    setAddPlaylistIsOpen(true);
    setPlaylistType("");
    setPlaylistUsers([]);
  };
  const hideAddPlaylistModal = () => {
    setAddPlaylistIsOpen(false);
    setPlaylistType("");
    setMoodSelectionOpen(false);
    setTopTrackSelectionOpen(false);
    setPlaylistUsers([]);
  };

  const [playlistUsers, setPlaylistUsers] = useState([]);
  var checkDuplicate = false;
  var control;

  // const [playlistCode, setPlaylistCode] = useState('');

  //alert for not enough people
  const [showNoUsersAlert, setShowNoUsersAlert] = useState(false);

  //alert for no playlist type selected
  const [showNoTypeAlert, setShowNoTypeAlert] = useState(false);

  //alert for no playlist name
  const [showPlaylistNameAlert, setShowPlaylistNameAlert] = useState(false);

  // select users and check if user is already selected
  const selectUser = (userID, position) => {
    if (playlistUsers.length === 0) {
      setPlaylistUsers([...playlistUsers, userID]);
      document.getElementById("select-bubble-" + position).style.backgroundColor = "var(--blue-color-main)";
    }  
    else if (playlistUsers.length !== 0) {
      playlistUsers.map((user, i) => {
        if(user === userID) {
          setPlaylistUsers(playlistUsers.filter(user => user !== userID));
          document.getElementById("select-bubble-" + position).style.backgroundColor = "var(--primary-color-1)";
          if(playlistUsers.length === groupUsers.length) {
            document.getElementById("select-bubble").style.backgroundColor = "var(--primary-color-1)";
          }
          checkDuplicate = true;
        }
        return playlistUsers;
      })
      if(checkDuplicate === false){
        setPlaylistUsers([...playlistUsers, userID]);
        document.getElementById("select-bubble-" + position).style.backgroundColor = "var(--blue-color-main)";
        if(playlistUsers.length === (groupUsers.length-1)) {
          document.getElementById("select-bubble").style.backgroundColor = "var(--blue-color-main)";
        }
      }
    }
    checkDuplicate = false;
  }
  
  // select all users or remove all users if everyone is already selected
  const selectAll = () => {
    if(playlistUsers.length === groupUsers.length){
      setPlaylistUsers([])
      groupUsers.map((user, i) => {
        document.getElementById("select-bubble").style.backgroundColor = "var(--primary-color-1)";
        document.getElementById("select-bubble-" + i).style.backgroundColor = "var(--primary-color-1)";
        return playlistUsers;
      })
    }
    else {
      var allUsers = [];
      groupUsers.map((user, i) => {
        allUsers.push(user.userID)
        document.getElementById("select-bubble").style.backgroundColor = "var(--blue-color-main)";
        document.getElementById("select-bubble-" + i).style.backgroundColor = "var(--blue-color-main)";
        return playlistUsers;
      })
      setPlaylistUsers(allUsers);
    }
  }

  // mood collapse
  const [openMoodSelection, setMoodSelectionOpen] = useState(false)
  const [openTopTrackSelection, setTopTrackSelectionOpen] = useState(false)

  const [playlistType, setPlaylistType] = useState("");
  const selectPlaylistType = (type) => {
    if(type === "" && openMoodSelection) {
      document.getElementById("toptracks-select").style.backgroundColor = "var(--off-white-color)";
      document.getElementById("toptracks-select").style.filter = "none";
      document.getElementById("moods-select").style.backgroundColor = "var(--off-white-color)";
      document.getElementById("moods-select").style.filter = "none";
    }
    else if((type === "Top Tracks") && openTopTrackSelection) {
      type = "";
      document.getElementById("toptracks-select").style.backgroundColor = "var(--off-white-color)";
      document.getElementById("toptracks-select").style.filter = "none";
    }
    else if((type === "Top Tracks") && !openTopTrackSelection) {
      document.getElementById("toptracks-select").style.backgroundColor = "var(--neutral-color-1)";
      document.getElementById("toptracks-select").style.filter = "drop-shadow(1px 1px 2px var(--primary-color-2))";
      document.getElementById("moods-select").style.backgroundColor = "var(--off-white-color)";
      document.getElementById("moods-select").style.filter = "none";
    }
    else if(type !== "Top Tracks") {
      document.getElementById("moods-select").style.backgroundColor = "var(--neutral-color-1)";
      document.getElementById("moods-select").style.filter = "drop-shadow(1px 1px 2px var(--primary-color-2))";
      document.getElementById("toptracks-select").style.backgroundColor = "var(--off-white-color)";
      document.getElementById("toptracks-select").style.filter = "none";

      if(type === "happy") {
        document.getElementById("happy").style.color = "var(--blue-color-6)";
        document.getElementById("happy").style.fill = "var(--blue-color-6)";
        document.getElementById("sad").style.color = "var(--primary-color-main)";
        document.getElementById("sad").style.fill = "var(--primary-color-main)";
        document.getElementById("chill").style.color = "var(--primary-color-main)";
        document.getElementById("chill").style.fill = "var(--primary-color-main)";
        document.getElementById("party").style.color = "var(--primary-color-main)";
        document.getElementById("party").style.fill = "var(--primary-color-main)";
      }
      else if(type === "sad") {
        document.getElementById("happy").style.color = "var(--primary-color-main)";
        document.getElementById("happy").style.fill = "var(--primary-color-main)";
        document.getElementById("sad").style.color = "var(--blue-color-6)";
        document.getElementById("sad").style.fill = "var(--blue-color-6)";
        document.getElementById("chill").style.color = "var(--primary-color-main)";
        document.getElementById("chill").style.fill = "var(--primary-color-main)";
        document.getElementById("party").style.color = "var(--primary-color-main)";
        document.getElementById("party").style.fill = "var(--primary-color-main)";
      }
      else if(type === "chill") {
        document.getElementById("happy").style.color = "var(--primary-color-main)";
        document.getElementById("happy").style.fill = "var(--primary-color-main)";
        document.getElementById("sad").style.color = "var(--primary-color-main)";
        document.getElementById("sad").style.fill = "var(--primary-color-main)";
        document.getElementById("chill").style.color = "var(--blue-color-6)";
        document.getElementById("chill").style.fill = "var(--blue-color-6)";
        document.getElementById("party").style.color = "var(--primary-color-main)";
        document.getElementById("party").style.fill = "var(--primary-color-main)";
      }
      else if(type === "party") {
        document.getElementById("happy").style.color = "var(--primary-color-main)";
        document.getElementById("happy").style.fill = "var(--primary-color-main)";
        document.getElementById("sad").style.color = "var(--primary-color-main)";
        document.getElementById("sad").style.fill = "var(--primary-color-main)";
        document.getElementById("chill").style.color = "var(--primary-color-main)";
        document.getElementById("chill").style.fill = "var(--primary-color-main)";
        document.getElementById("party").style.color = "var(--blue-color-6)";
        document.getElementById("party").style.fill = "var(--blue-color-6)";
      }
      else {
        document.getElementById("happy").style.color = "var(--primary-color-main)";
        document.getElementById("happy").style.fill = "var(--primary-color-main)";
        document.getElementById("sad").style.color = "var(--primary-color-main)";
        document.getElementById("sad").style.fill = "var(--primary-color-main)";
        document.getElementById("chill").style.color = "var(--primary-color-main)";
        document.getElementById("chill").style.fill = "var(--primary-color-main)";
        document.getElementById("party").style.color = "var(--primary-color-main)";
        document.getElementById("party").style.fill = "var(--primary-color-main)";
      }
    }
    else {
      document.getElementById("toptracks-select").style.backgroundColor = "var(--off-white-color)";
      document.getElementById("toptracks-select").style.filter = "none";
      document.getElementById("moods-select").style.backgroundColor = "var(--off-white-color)";
      document.getElementById("moods-select").style.filter = "none";
    }
    setPlaylistType(type);
  }

  //If key press for new group input is "Enter", run edit group name function
  const handleGenerateKeyPress = (e) => {
    if(e.key === "Enter") {
        generatePlaylist();
    }
  }

  // generate playlist
  const generatePlaylist = () => {
    if (playlistUsers.length > 1) {
      var input_playlistName = document.getElementById("newPlaylistName").value
        if (input_playlistName === "") {
          setShowPlaylistNameAlert(true);
          console.log('No playlist name entered!');
          document.getElementById("generate-playlist-button").style.cursor = "not-allowed" 
        }
        else if (playlistType === "" || playlistType ==="Moods") {
          setShowNoTypeAlert(true);
          console.log("No mood selected");
        }
        else if (input_playlistName !== "" && playlistType !== "") {
          if(playlistType === "Top Tracks") {
            axios
            .post(process.env.REACT_APP_BACKEND_URL + "/groups/generatePlaylist", {
                groupCode: groupCode,
                userIDs: playlistUsers,
                refreshToken: refreshToken,
                playlistName: input_playlistName,
            })
            .then((data) => {
                console.log(data);
                axios
                .get(process.env.REACT_APP_BACKEND_URL + "/users/" + userObject.userID + "/groups")
                .then((data) => {
                  dispatch(updateGroupList(data.data));
                })
                .catch((err) => {
                  console.log(err);
                })
                history.push("/authorized/playlist/"+data.data.playlist.playlistCode);
            })
            .catch((err) => {
                console.log(err);
            });
          }
          else if (playlistType !== "Top Tracks") {
            axios
            .post(process.env.REACT_APP_BACKEND_URL + "/groups/generateMoodsPlaylist", {
                groupCode: groupCode,
                userIDs: playlistUsers,
                refreshToken: refreshToken,
                playlistName: input_playlistName,
                selectedMood: playlistType,
            })
            .then((data) => {
                console.log(data);
                axios
                .get(process.env.REACT_APP_BACKEND_URL + "/users/" + userObject.userID + "/groups")
                .then((data) => {
                  dispatch(updateGroupList(data.data));
                })
                .catch((err) => {
                  console.log(err);
                })
                history.push("/authorized/playlist/"+data.data.playlist.playlistCode);
            })
            .catch((err) => {
                console.log(err);
            });
          }

          // close playlist generate modal
          hideAddPlaylistModal()
          setLoading(true);
        }
    }
    else {
      setShowNoUsersAlert(true);
      console.log("Please select at least one more person!");
    }
  }


  // delete playlist functionality
  const [isDelete, setIsDelete] = useState(false);
  const [deletePlaylistName, setDeletePlaylistName] = useState('');
  const [deletePlaylistID, setDeletePlaylistID] = useState('');

  // delete playlist modal
  const [showDelete, setShowDelete] = useState(false)
  const showDeleteModal = (playlistName, playlistID) => {
    setDeletePlaylistName(playlistName);
    setDeletePlaylistID(playlistID);
    setShowDelete(true);
  }
  const hideDeleteModal = () => {
    setDeletePlaylistName('');
    setDeletePlaylistID('');
    setShowDelete(false);
  }

  const deletePlaylist = () => {
    axios
    .post(process.env.REACT_APP_BACKEND_URL + "/groups/deletePlaylist", {
        groupCode: groupCode,
        playlistID: deletePlaylistID,
    })
    .then((data) => {
        console.log(data.data);
        axios
        .get(process.env.REACT_APP_BACKEND_URL + "/users/" + userObject.userID + "/groups")
        .then((data) => {
          dispatch(updateGroupList(data.data));
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => console.log(err));

    hideDeleteModal();
    setLoading(true);
  }

  // get playlist info
  let playlistInfo = []
  playlists.map((playlist,i) => (
    playlistInfo[i] = ({name: playlist.playlistName, tracks: playlist.tracks, id: playlist._id, type: playlist.playlistType, code: playlist.playlistCode})
  ))
  playlistInfo.reverse()

  // Add 4 elements at a time to carousel array
  let carouselArray = [];
  for (let i = 0; i < playlistInfo.length; i += 4) {
    let fourPlaylists = playlistInfo.slice(i, i + 4);

    let carouselElement = fourPlaylists.map((playlist, i) => {
      return (
        <div className="playlistcover-container" key={i}>
          {isDelete ? <div className="delete-playlist-bubble">
            <img className="delete-playlist-x" src={closeButton} alt="delete" onClick={()=>showDeleteModal(playlist.name, playlist.id)}/>
          </div> : null }
          <Link to={playlist.code !== undefined ? "/authorized/playlist/" + playlist.code : "/authorized/playlist/" + playlist.id} className="playlist-links">
            <img
              className="playlistcover"
              src={playlist.type === "top" ? topTracks_cover : 
                  (playlist.type === "happy" ? happy_cover : 
                  (playlist.type === "chill" ? chill_cover :
                  (playlist.type === "sad" ? sad_cover :
                  (playlist.type === "party" ? party_cover : default_cover))))}
              alt={playlist.name}
            ></img>
            <div className="playlist-name">
              <strong>{playlist.name}</strong>
            </div>
          </Link>
        </div>
      );
    });
    carouselArray.push(carouselElement);
  }

  return (
    <div className="playlist-container">
      <div>
        <h1 className="text">
          <strong>Playlists</strong>
          {playlistInfo.length > 0 ?
          <div className="playlist-edit">
              {isDelete ? <h5 onClick={()=>setIsDelete(false)}><strong>Cancel</strong></h5> : <h5 onClick={()=>setIsDelete(true)}><strong>Edit</strong></h5>}
          </div>
          : null
          }
        </h1>
      </div>
      <div className="covers">
        <div onClick={showAddPlaylistModal} className="addPlaylist-container">
          {/*link to add playlist*/}
          <div className="addButton">
            <AddSVG className="plus-symbol" alt="Add Playlist Button"/>
          </div>
          <div className="playlist-name">
            <strong>Add Playlist</strong>
          </div>
        </div>
        {playlistInfo.length < 5 ? control=false : control=true}
        <Carousel interval={null} indicators={control} controls={control} defaultActiveIndex={0} className="playlist-carousel-carousel">
          {carouselArray.map((element, i) => (
            <Carousel.Item key={i}>
              <div className="display-playlists">{element}</div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <Modal
          className="modalcss edit-name-modal"
          show={showDelete}
          onHide={hideDeleteModal}
          centered
        >
          <Modal.Body className="in-modal">
            <h5 className="modal-text modal-head">
              <strong>Are you sure you want to delete this playlist for the whole group?</strong>
            </h5>
            <h4 className="modal-text">
              <strong>{deletePlaylistName}</strong>
            </h4>
            <p>
              <button
                className="btn-in-modal leave-buttons"
                onClick={() => {
                  deletePlaylist()
                }}
              >
                Yes, I'm sure.
              </button>
            </p>
            <p>
              <button
                onClick={hideDeleteModal}
                className="btn-in-modal leave-buttons"
              >
                No, I'll keep it.
              </button>
            </p>
          </Modal.Body>
        </Modal>

      <Modal
        show={AddPlaylistisOpen}
        onHide={hideAddPlaylistModal}
        centered="true"
        className="playlist-add-modal"
      >
        <Modal.Header>
          <Modal.Title>
            <div className="generate-playlist-title">
              <h2 id="generate-playlist-button"><strong>Generate a Playlist!</strong></h2>
              <img src={closeButton} alt="close" className="cancel-generate" onClick={hideAddPlaylistModal}/>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="playlistModal">
            <h4><span className="generate-step">STEP 1: </span>Choose people to contribute to this playlist</h4>
            <div className="select-playlist-users">
                <div className="select-all-users" id="select-bubble" onClick={() => selectAll()}>
                  <strong>Select All</strong>
                </div>
                <div className="select-playlist-users-container">
                  {groupUsers.map((user, i) => (
                    <div 
                      key={i}
                      className="select-a-user"
                      id={"select-bubble-"+i}
                      onClick={() => selectUser(user.userID, i)}>
                      <strong>{user.name}</strong>
                    </div>
                  ))}
                </div>
            </div>
            <div className="playlist-generation-options">
              {/* temporary mood stuff */}
              <h4><span className="generate-step">STEP 2: </span>Select the type of playlist you want to make</h4>
              <div className="option-container">
                <div className="toptracks-option" id="toptracks-select">
                  <div 
                      className="playlist-options" 
                      onClick={()=>{
                        setTopTrackSelectionOpen(!openTopTrackSelection); 
                        setMoodSelectionOpen(false);
                        selectPlaylistType("Top Tracks")}}
                      aria-controls="example-collapse-text"
                      aria-expanded={openTopTrackSelection}
                    >
                      <strong>Top Tracks</strong>
                  </div>
                  <Collapse in={openTopTrackSelection}>
                    <div id="example-collapse-text" className="collapse-top-content">
                      <p>Generate your group's favourite playlist based on everyone's top tracks.</p>
                    </div>
                  </Collapse>                 
                </div>
                <div className="vertical-line"></div>
                <div className="mood-options" id="moods-select">
                  <div 
                    className="playlist-options" 
                    onClick={()=>{
                      setMoodSelectionOpen(!openMoodSelection); 
                      setTopTrackSelectionOpen(false); 
                      selectPlaylistType("")}}
                    aria-controls="example-collapse-text"
                    aria-expanded={openMoodSelection}
                  >
                      <strong>Moods Based</strong>
                  </div>
                  <Collapse in={openMoodSelection}>
                    <div id="example-collapse-text" className="collapse-mood-content">
                      <p>Select a mood:</p>
                      <div className="mood-playlist-options">
                        <div className="playlist-mood" id="happy" onClick={()=>selectPlaylistType("happy")}>
                          <div className="playlist-mood-emoji">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path className="playlist-mood-color" id="happy" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.508 13.941c-1.513 1.195-3.174 1.931-5.507 1.931-2.335 0-3.996-.736-5.509-1.931l-.492.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.492-.493zm.492-3.939l-.755.506s-.503-.948-1.746-.948c-1.207 0-1.745.948-1.745.948l-.754-.506c.281-.748 1.205-2.002 2.499-2.002 1.295 0 2.218 1.254 2.501 2.002zm-7 0l-.755.506s-.503-.948-1.746-.948c-1.207 0-1.745.948-1.745.948l-.754-.506c.281-.748 1.205-2.002 2.499-2.002 1.295 0 2.218 1.254 2.501 2.002z"/>
                            </svg>
                          </div>
                          <h5>Happy</h5>
                        </div>
                        <div className="playlist-mood" id="sad" onClick={()=>selectPlaylistType("sad")}>
                          <div className="playlist-mood-emoji">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path className="playlist-mood-color" id="sad" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.001 14c-2.332 0-4.145 1.636-5.093 2.797l.471.58c1.286-.819 2.732-1.308 4.622-1.308s3.336.489 4.622 1.308l.471-.58c-.948-1.161-2.761-2.797-5.093-2.797zm-3.501-6c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/>
                          </svg>
                          </div>
                          <h5>Sad</h5>
                        </div>
                        <div className="playlist-mood" id="chill" onClick={()=>selectPlaylistType("chill")}>
                          <div className="playlist-mood-emoji">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path className="playlist-mood-color" id="chill" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c3.691 0 6.915 2.016 8.647 5h-17.294c1.732-2.984 4.956-5 8.647-5zm0 20c-5.514 0-10-4.486-10-10 0-1.045.163-2.052.461-3h1.859c.606 1.518 1.929 3 3.986 3 2.477 0 2.153-2.31 3.694-2.31s1.218 2.31 3.695 2.31c2.055 0 3.379-1.482 3.984-3h1.86c.298.948.461 1.955.461 3 0 5.514-4.486 10-10 10zm5.508-8.059l.492.493c-1.127 1.72-3.199 3.566-5.999 3.566-2.801 0-4.874-1.846-6.001-3.566l.492-.493c1.513 1.195 3.174 1.931 5.509 1.931 2.333 0 3.994-.736 5.507-1.931z"/>
                            </svg>
                          </div>
                          <h5>Chill</h5>
                        </div>
                        <div className="playlist-mood" id="party" onClick={()=>selectPlaylistType("party")}>
                          <div className="playlist-mood-emoji">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path className="playlist-mood-color" id="party" d="M12.939 21.27c-1.623-1.903-2.436-3.029-4.277-4.185-1.141-.717-2.04-1.702-2.662-2.651l.512-.512.001.001c2.482 1.961 4.757 2.255 9.434 2.255 0 0 1.226 1.214 2.42 2.623 2.74 3.229-2.233 6.215-5.428 2.469zm-2.057.664c-4.988-.559-8.882-4.798-8.882-9.934 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.168-.701 4.172-1.879 5.812.48.643.802 1.331.95 2.028 1.821-2.103 2.929-4.84 2.929-7.84 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c.319 0 .633-.023.946-.048-.943-.653-1.358-1.181-2.064-2.018zm4.618-13.934c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm-7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/>
                            </svg>
                          </div>
                          <h5>Party</h5>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
            <div className="name-the-playlist">
              <h4><span className="generate-step">STEP 3: </span>Give your playlist a name!</h4>
              {/*create alert to tell user playlist title is too long */}
            </div>
            <div className="name-playlist">
              <input type="text" className="name-input" placeholder="Enter Playlist Name" maxLength="25" id="newPlaylistName" onKeyPress={handleGenerateKeyPress}/>
            </div>
            <div className="generate-playlist">
              <button onClick={() => generatePlaylist()} centered="true" className="generate-button">
                <strong>Generate Playlist</strong>
              </button>
              {showNoUsersAlert ? 
              <div className="playlist-error">
                  <AlertPlaylistGenerate type="warning" message="Not enough users selected!"/>
              </div>
              : null}
              {showNoUsersAlert ? <div className="timeout"> {window.setTimeout(function(){setShowNoUsersAlert(false)}, 1500)} </div> : null}
              {showNoTypeAlert ? 
              <div className="playlist-error">
                  <AlertPlaylistGenerate type="warning" message="No playlist type selected!"/>
              </div>
              : null}
              {showNoTypeAlert ? <div className="timeout"> {window.setTimeout(function(){setShowNoTypeAlert(false)}, 1500)} </div> : null}
              {showPlaylistNameAlert ? 
              <div className="playlist-error">
                  <AlertPlaylistGenerate type="warning" message="No playlist name entered!"/>
              </div>
              : null}
              {showPlaylistNameAlert ? <div className="timeout"> {window.setTimeout(function(){setShowPlaylistNameAlert(false)}, 1500)} </div> : null}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

function AlertPlaylistGenerate (props) {
  return(
    <div className="error-alert">
      <Alert variant={props.type}>
        <p>{props.message}</p>
      </Alert>
    </div>
  )
}

export default PlaylistCarousel;
