import React from "react";
import "./PlaylistCarousel.css";

import { Link} from "react-router-dom";

import playlistcover1 from "./playlist-cover1.jpg";
import playlistcover2 from "./playlist-cover2.jpg";
import playlistcover3 from "./playlist-cover3.jpeg";
import addButton from "./add.svg";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";

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

const PlaylistCarousel = ({playlists}) => {

  // functions for opening and closing "Add Playlist" Modal
  const [AddPlaylistisOpen, setAddPlaylistIsOpen] = React.useState(false);
  const showAddPlaylistModal = () => {
    setAddPlaylistIsOpen(true);
  };
  const hideAddPlaylistModal = () => {
    setAddPlaylistIsOpen(false);
  };

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
        className="playlistModal"
        show={AddPlaylistisOpen}
        onHide={hideAddPlaylistModal}
        centered
      >
        <button onClick={hideAddPlaylistModal} centered>
          <strong>Continue</strong>
        </button>
      </Modal>
    </div>
  );
};

export default PlaylistCarousel;
