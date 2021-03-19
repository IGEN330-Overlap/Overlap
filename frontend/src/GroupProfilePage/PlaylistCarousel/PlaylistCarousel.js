import React from "react";
import "./PlaylistCarousel.css";

import { Link} from "react-router-dom";

import playlistcover1 from "./playlist-cover1.jpg";
import playlistcover2 from "./playlist-cover2.jpg";
import playlistcover3 from "./playlist-cover3.jpeg";
import addButton from "./add.svg";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";

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

  // functions for opening and closing "Add Playlist" Modal
  const [AddPlaylistisOpen, setAddPlaylistIsOpen] = React.useState(false);
  const showAddPlaylistModal = () => {
    setAddPlaylistIsOpen(true);
  };
  const hideAddPlaylistModal = () => {
    setAddPlaylistIsOpen(false);
  };

  var playlistUsers = []
  var checkDuplicate = false
  var index
  const selectUser = (userID, position) => {
    if (playlistUsers.length === 0) {
      playlistUsers.push(userID)
      document.getElementById("select-bubble").style.backgroundColor = "lightblue"
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
        document.getElementById("select-bubble").style.backgroundColor = "white"
      }
      else if(checkDuplicate === false){
        playlistUsers.push(userID)
        document.getElementById("select-bubble").style.backgroundColor = "lightblue"
      }
    }
    checkDuplicate = false
    index = ''
    console.log(playlistUsers)
  }
  
  const selectAll = () => {
    playlistUsers = []
    groupUsers.map((user) => {
      playlistUsers.push(user.userID)
      return playlistUsers
    })
    console.log(playlistUsers)
  }

  // generate playlist
  // need to add alerts to tell users if no one is selected or if there is no playlist title
  const generatePlaylist = () => {
    if (playlistUsers.length !== 0) {
      var input_playlistName = document.getElementById("newPlaylistName").value
        if (input_playlistName === "") {
          console.log('No playlist name entered!')
        }
        else if (input_playlistName !== "") {
          axios
          .post(process.env.REACT_APP_BACKEND_URL+"/groups/generatePlaylist", {
              groupCode: groupCode,
              userIDs: playlistUsers,
              refreshToken: refreshToken,
              playlistName: input_playlistName,
          })
          .then((data) => {
              console.log(data)
          })
          .catch((err) => {
              console.log(err);
          });
        }
    }
  }

  // get playlist info
  var playlistInfo = []
  playlists.map((playlist,i) => {
    playlistInfo[i] = ({name: playlist.playlistName, tracks: playlist.tracks, id: playlist._id})
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
        <Carousel interval={null} indicators={false} defaultActiveIndex={0}>
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
      >
          {/* add code to generate playlist
            post request to /groups/build/playlist
            require: groupCode, userID (array IDs of people part of the playlist), playlistName
            automatic inputs: groupCode
            user inputs: select people for userID, enter playlist name 
          */}
          <div className="playlistModal">
            <h2><strong>Generate a Playlist!</strong></h2>
            <h4>Select whose songs you want in this playlist:</h4>
            <div className="select-playlist-users">
                <div className="select-a-user" id="select-bubble" onClick={() => selectAll()}>
                  <strong>Select All</strong>
                </div>
                {groupUsers.map((user, i) => (
                  <div
                    className="select-a-user"
                    id="select-bubble"
                    onClick={() => selectUser(user.userID, i)}>
                    <strong>{user.name}</strong>
                  </div>
                ))}
            </div>
            <div className="playlist-moods">
              section for moods/top tracks toggle
            </div>
            <div className="name-the-playlist">
              <h4>Give your playlist a name!</h4>
              {/*create alert to tell user playlist title is too long */}
              <input type="text" className="name-input" placeholder="Enter Playlist Name" maxlength="25" id="newPlaylistName"/>
            </div>
            <button onClick={() => {hideAddPlaylistModal(); generatePlaylist()}} centered className="generate-button">
              <strong>Generate Playlist</strong>
            </button>
          </div>
      </Modal>
    </div>
  );
};

export default PlaylistCarousel;
