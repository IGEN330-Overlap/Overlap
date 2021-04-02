import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import './PlaylistTitle.css';
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
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

    //show save error when there is an error with playlist
    const [showSaveAlert, setShowSaveAlert] = useState(false);

    const openPlaylist = (playlist_url) => {
      if (playlist_url) {
        window.open("playlist_url")
      }
      else window.open("https://open.spotify.com/")
    }

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
            setShowSaveAlert(true);
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
                {showSaveAlert ? 
                  <div className="save-error">
                    <AlertSave type="danger" message="Unable to save playlist!"/>
                  </div>
                : null }
                {showSaveAlert ? <div className="timeout"> {window.setTimeout(function(){setShowSaveAlert(false)}, 1750)} </div> : null}
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

//playlist save error alert
function AlertSave (props) {
  return(
    <div className="error-alert">
      <Alert variant={props.type}>
        <p>{props.message}</p>
      </Alert>
    </div>
  )
}

export default PlaylistTitle