import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./PlaylistCarousel.css";

import { updateGroupList } from "../../Redux/Actions.js";

import { Link} from "react-router-dom";

import playlistcover1 from "./playlist-cover1.jpg";
import playlistcover2 from "./playlist-cover2.jpg";
import playlistcover3 from "./playlist-cover3.jpeg";
import addButton from "./add.svg";
import closeButton from "./close-x.svg";
import happy from "./happy.svg";
import sad from "./sad.svg";
import chill from "./chill.svg";
import party from "./party.svg";

import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Collapse from 'react-bootstrap/Collapse';

const axios = require('axios')

const cover_src = [
  playlistcover1,
  playlistcover2,
  playlistcover3,
  playlistcover1,
  playlistcover2,
  playlistcover3,
  playlistcover1,
  playlistcover2,
  playlistcover3,
  playlistcover1,
  playlistcover2,
  playlistcover3,
  playlistcover1,
];

const PlaylistCarousel = ({playlists, groupUsers, groupCode, refreshToken}) => {

  const userObject = useSelector((state) => state.userObject)
  
  const dispatch = useDispatch();

  // functions for opening and closing "Add Playlist" Modal
  const [AddPlaylistisOpen, setAddPlaylistIsOpen] = React.useState(false);
  const showAddPlaylistModal = () => {
    setAddPlaylistIsOpen(true);
    setPlaylistType('')
  };
  const hideAddPlaylistModal = () => {
    setAddPlaylistIsOpen(false);
    setPlaylistType('')
  };

  var playlistUsers = []
  var checkDuplicate = false
  var index

  // select users and check if user is already selected
  const selectUser = (userID, position) => {
    if (playlistUsers.length === 0) {
      playlistUsers.push(userID)
      document.getElementById("select-bubble-"+position).style.backgroundColor = "var(--blue-color-main)"
    }  
    else if (playlistUsers.length !== 0) {
      playlistUsers.map((user, i) => {
        if(user === userID) {
          checkDuplicate = true
          index = i
        }
        return checkDuplicate
      })
      if(checkDuplicate === true){
        playlistUsers.splice(index, 1)
        document.getElementById("select-bubble-"+position).style.backgroundColor = "var(--primary-color-1)"
        if(playlistUsers.length !== groupUsers.length) {
          document.getElementById("select-bubble").style.backgroundColor = "var(--primary-color-1)"
        }
      }
      else if(checkDuplicate === false){
        playlistUsers.push(userID)
        document.getElementById("select-bubble-"+position).style.backgroundColor = "var(--blue-color-main)"
        if(playlistUsers.length === groupUsers.length) {
          document.getElementById("select-bubble").style.backgroundColor = "var(--blue-color-main)"
        }
      }
    }
    checkDuplicate = false
    index = ''
    console.log(playlistUsers)
  }
  
  // select all users or remove all users if everyone is already selected
  const selectAll = () => {
    if(playlistUsers.length === groupUsers.length){
      playlistUsers=[]
      groupUsers.map((user, i) => {
        document.getElementById("select-bubble").style.backgroundColor = "var(--primary-color-1)"
        document.getElementById("select-bubble-"+i).style.backgroundColor = "var(--primary-color-1)"
        return playlistUsers
      })
    }
    else {
      playlistUsers = []
      groupUsers.map((user, i) => {
        playlistUsers.push(user.userID)
        document.getElementById("select-bubble").style.backgroundColor = "var(--blue-color-main)"
        document.getElementById("select-bubble-"+i).style.backgroundColor = "var(--blue-color-main)"
        return playlistUsers
      })
    }
    console.log(playlistUsers)
  }

  // mood collapse
  const [openMoodSelection, setMoodSelectionOpen] = useState(false)
  const [openTopTrackSelection, setTopTrackSelectionOpen] = useState(false)

  const [playlistType, setPlaylistType] = useState("");
  const selectPlaylistType = (type) => {
    if((type === "Top Tracks") && !openTopTrackSelection) {
      document.getElementById("toptracks-select").style.backgroundColor = "var(--neutral-color-2)";
      document.getElementById("moods-select").style.backgroundColor = "var(--off-white-color)";
    }
    else if(type !== "Top Tracks") {
      document.getElementById("moods-select").style.backgroundColor = "var(--neutral-color-2)";
      document.getElementById("toptracks-select").style.backgroundColor = "var(--off-white-color)";
    }
    else {
      document.getElementById("toptracks-select").style.backgroundColor = "var(--off-white-color)";
      document.getElementById("moods-select").style.backgroundColor = "var(--off-white-color)";
    }
    setPlaylistType(type);
  }
  console.log(playlistType)

  // generate playlist
  // need to add alerts to tell users if no one is selected or if there is no playlist title
  const generatePlaylist = () => {
    if (playlistUsers.length > 1) {
      var input_playlistName = document.getElementById("newPlaylistName").value
        if (input_playlistName === "") {
          console.log('No playlist name entered!')
          document.getElementById("generate-playlist-button").style.cursor = "not-allowed" 
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
            })
            .catch((err) => {
                console.log(err);
            });
          }
          else if (playlistType !== "Top Tracks" && playlistType !== "Moods") {
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
            })
            .catch((err) => {
                console.log(err);
            });
          }

          // close playlist generate modal
          hideAddPlaylistModal()
        }
    }
    else {
      console.log("Please select at least one more person!")
    }
  }

  // get playlist info
  var playlistInfo = []
  playlists.map((playlist,i) => {
    playlistInfo[i] = ({name: playlist.playlistName, tracks: playlist.tracks, id: playlist._id})
    playlistInfo.reverse()
    return playlistInfo
  })

  // Add 4 elements at a time to carousel array
  let carouselArray = [];
  for (let i = 0; i < playlistInfo.length; i += 4) {
    let fourPlaylists = playlistInfo.slice(i, i + 4);

    let carouselElement = fourPlaylists.map((playlist, i) => {
      return (
        <div className="playlistcover-container" key={i}>
          <Link to={"/authorized/playlist/" + playlist.id} className="playlist-links">
            <img
              className="playlistcover"
              src={cover_src[i]}
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
        </h1>
      </div>
      <div className="covers">
        <div onClick={showAddPlaylistModal} className="addPlaylist-container">
          {/*link to add playlist*/}
          <div className="addButton">
            <img src={addButton} className="plus-symbol" alt="Add Playlist Button"/>
          </div>
          <div className="playlist-name">
            <strong>Add Playlist</strong>
          </div>
        </div>
        <Carousel interval={null} indicators={false} defaultActiveIndex={0} className="playlist-carousel-carousel">
          {carouselArray.map((element, i) => (
            <Carousel.Item key={i}>
              <div className="display-playlists">{element}</div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <Modal
        show={AddPlaylistisOpen}
        onHide={hideAddPlaylistModal}
        centered
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
                    <div id="example-collapse-text" className="collapse-content">
                      <p>This playlist is generated based on the top tracks of each user. It prioritizes songs that appear in multiple people's top tracks.</p>
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
                      selectPlaylistType("Moods")}}
                    aria-controls="example-collapse-text"
                    aria-expanded={openMoodSelection}
                  >
                      <strong>Moods Based</strong>
                  </div>
                  <Collapse in={openMoodSelection}>
                    <div id="example-collapse-text" className="collapse-content">
                    <p>What mood do you want?</p>
                      <div className="playlist-options" onClick={()=>selectPlaylistType("happy")}>
                        <img src={happy} alt="happy" className="playlist-mood-emoji"/>
                        Happy
                      </div>
                      <div className="playlist-options" onClick={()=>selectPlaylistType("sad")}>
                        <img src={sad} alt="sad" className="playlist-mood-emoji"/>
                        Sad
                      </div>
                      <div className="playlist-options" onClick={()=>selectPlaylistType("chill")}>
                        <img src={chill} alt="chill" className="playlist-mood-emoji"/>
                        Chill
                      </div>
                      <div className="playlist-options" onClick={()=>selectPlaylistType("party")}>
                        <img src={party} alt="party" className="playlist-mood-emoji"/>
                        Party
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
              <input type="text" className="name-input" placeholder="Enter Playlist Name" maxlength="25" id="newPlaylistName"/>
            </div>
            <div className="generate-playlist">
              <button onClick={() => generatePlaylist()} centered className="generate-button">
                <strong>Generate Playlist</strong>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PlaylistCarousel;
