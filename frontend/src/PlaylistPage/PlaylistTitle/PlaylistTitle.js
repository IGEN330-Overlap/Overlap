import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ScreenOverlay from '../../ScreenOverlay/ScreenOverlay';
import './PlaylistTitle.css';
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

import happy_cover from "../../GroupProfilePage/PlaylistCarousel/Happy.jpg";
import sad_cover from "../../GroupProfilePage/PlaylistCarousel/Sad.jpg";
import chill_cover from "../../GroupProfilePage/PlaylistCarousel/Chill.jpg";
import party_cover from "../../GroupProfilePage/PlaylistCarousel/Party.jpg";
import topTracks_cover from "../../GroupProfilePage/PlaylistCarousel/TopTracks.png";
import default_cover from "../../GroupProfilePage/PlaylistCarousel/default.png";

const axios = require("axios");

const PlaylistTitle = ({playlistName, playlistID, playlistType, groupCode, createdDate}) => {

    const [SavedisOpen, setSavedIsOpen] = useState(false);
    const showSavedModal = () => {
         setSavedIsOpen(true);
         setRedirectSpotify(false);
    };
    const hideSavedModal = () => {
         setSavedIsOpen(false);
    };

    const [playlistURL, setPlaylistURL] = useState('');
    const [redirectSpotify, setRedirectSpotify] = useState(false);
    const [loadingRedirect, setLoadingRedirect] = useState(false);

    //show save error when there is an error with playlist
    const [showSaveAlert, setShowSaveAlert] = useState(false);

    // const openPlaylist = ()=> {
    //   if (playlistURL !== undefined && playlistURL !== '') {
    //     window.open(playlistURL)
    //   }
    //   else window.open("https://open.spotify.com/")
    // }

    useEffect (() => {
      if (redirectSpotify && playlistURL !== '') {
        if (playlistURL !== undefined) {
          window.open(playlistURL);
        } 
        else window.open("https://open.spotify.com/");
      }
    },[playlistURL, redirectSpotify] )

    let cover = '';
    if (playlistType === "top") cover = topTracks_cover;
    else if (playlistType === "happy") cover = happy_cover;
    else if (playlistType === "sad") cover = sad_cover;
    else if (playlistType === "chill") cover = chill_cover;
    else if (playlistType === "party") cover = party_cover;
    else cover = default_cover;

    var refreshToken = useSelector((state) => state.refreshToken)

    const addToSpotify = () => {
        axios
        .post(process.env.REACT_APP_BACKEND_URL+"/groups/AddToSpotify", {
            playlistID: playlistID,
            refreshToken: refreshToken,
            groupCode: groupCode,
        })
        .then((data) => {
            setPlaylistURL(data.data.playlistLinkURL);
            console.log(data);
            setLoadingRedirect(false);
        })
        .catch((err) => {
            setShowSaveAlert(true);
            console.log(err);
            setLoadingRedirect(false);
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
                <img className="playlist-page-cover" src={cover} alt={playlistName} />
            </div>
            <div className="playlist-info-save">
                <div className="title-container">
                    <h2 className={playlistType === "top" || playlistType === "party" ? "white" : "dark"}> {playlistName} </h2>
                </div>

                {createdDate !== undefined ? <h4 className={playlistType === "top" || playlistType === "party" ? "created-date-dark" : "created-date"}><strong>Created On: {createdMonth + " " + createdDay + ", " + createdYear}</strong></h4> : ''}
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
                onClick= { ()=> {setRedirectSpotify(true); hideSavedModal(); setLoadingRedirect(true)}}
              >
                Open Spotify Webplayer
              </button>
            </p>
            <p>
              <button
                onClick={hideSavedModal}
                className="btn-in-modal leave-buttons"
              >
                Back to Overlap
              </button>
            </p>
          </Modal.Body>
        </Modal>
        {loadingRedirect ? <ScreenOverlay text="Taking you to Spotify" /> : null}
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