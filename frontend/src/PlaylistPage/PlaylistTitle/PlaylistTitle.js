import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import './PlaylistTitle.css';
import Modal from "react-bootstrap/Modal";
import dog from './puppy-icon.jpg';

const axios = require("axios");

const PlaylistTitle = ({playlistName, playlistID, groupCode, createdDate}) => {

    const [SavedisOpen, setSavedIsOpen] = useState(false);
    const showSavedModal = () => {
         setSavedIsOpen(true);
    };
    const hideSavedModal = () => {
         setSavedIsOpen(false);
    };

    const openPlaylist = () => { window.open("https://open.spotify.com/")}

    var refreshToken = useSelector((state) => state.refreshToken)

    const addToSpotify = () => {
        axios
        .post(process.env.REACT_APP_BACKEND_URL+"/groups/AddToSpotify", {
            playlistID: playlistID,
            refreshToken: refreshToken,
            groupCode: groupCode,
        })
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    //console.log(createdDate);
    
    let createdDay;
    let createdMonth;
    let createdYear;

    if (createdDate !== undefined) {
        createdDay = createdDate.day;
        createdMonth = createdDate.month;
        createdYear = createdDate.year;
    }

    return (
        <div className="playlist-info-root">
            <div className="playlist-page-cover-container">
                <img className="playlist-page-cover" src={dog} alt={playlistName} />
            </div>
            <div className="playlist-info-save">
                <div className="title-container">
                    <h2 className="white"> {playlistName} </h2>
                </div>

                {createdDate !== undefined ? <h4 className="created-date"><strong>Created On: {createdMonth + " " + createdDay + ", " + createdYear}</strong></h4> : ''}
                <div className="btn btn-sm playlist-button" 
                    onClick={() => {
                        addToSpotify();
                        showSavedModal();
                    }}>
                    Save Playlist to Spotify
                </div>
            </div>
        <>
        <Modal
          className="modalcss"
          show={SavedisOpen}
          onHide={hideSavedModal}
          centered
        >
          <Modal.Body className="in-modal">
            <h5 className="modal-text modal-head">
              <strong>Playlist Saved!</strong>
            </h5>
            <p>
              <button
                className="btn-in-modal leave-buttons"
                onClick= { ()=> {openPlaylist(); hideSavedModal()}}
              >
                Open Spotify Webplayer
              </button>
            </p>
            <p>
              <button
                onClick={hideSavedModal}
                className="btn-in-modal leave-buttons"
              >
                Back to overlap
              </button>
            </p>
          </Modal.Body>
        </Modal>
        </>   
        </div>
    );
}

export default PlaylistTitle