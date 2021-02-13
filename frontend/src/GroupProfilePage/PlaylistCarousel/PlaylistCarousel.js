import React from 'react';
import './PlaylistCarousel.css';

import { Link, useRouteMatch } from 'react-router-dom';

import playlistcover1 from './playlist-cover1.jpg';
import playlistcover2 from './playlist-cover2.jpg';
import playlistcover3 from './playlist-cover3.jpeg';
import addButton from './add.svg';
import Modal from 'react-bootstrap/Modal';

/*take input from backend to create array of formed playlists */
const playlists = ['playlist1','playlist2','playlist3', 'playlist1','playlist2','playlist3', 'playlist1','playlist2','playlist3', 'playlist1','playlist2','playlist3'];
const cover_src = [playlistcover1, playlistcover2, playlistcover3, playlistcover1, playlistcover2, playlistcover3, playlistcover1, playlistcover2, playlistcover3, playlistcover1, playlistcover2, playlistcover3];

const PlaylistCarousel = (props) => {
    
    // linking 
    let { path, url } = useRouteMatch();
    
    // functions for opening and closing "Add Playlist" Modal
    const [AddPlaylistisOpen, setAddPlaylistIsOpen] = React.useState(false);
    const showAddPlaylistModal = () => {
        setAddPlaylistIsOpen(true);
    };
    const hideAddPlaylistModal = () => {
        setAddPlaylistIsOpen(false);
    };

    return(
        <div className="playlist-container">
            <div><h1 className="playlist-title-text"><strong>Playlist</strong></h1></div>
            <div className="covers">
                <div onClick={showAddPlaylistModal} className="addPlaylist-container"> 
                    {/*link to add playlist*/}
                    <div className="addButton">
                        <img src={addButton} className="plus-symbol"/>
                    </div>
                    <div className="playlist-name">
                        <strong>Add Playlist</strong>
                    </div>
                </div>
        
                {/*playlist cover display */}
                <div className="display-playlists">
                    {playlists.map((playlist,i) => (
                        <div className="playlistcover-container">
                            <Link to ="/authorized/PlaylistPage/PlaylistPage/" className="links">
                                <img className="playlistcover" src={cover_src[i]} alt={playlist}></img>
                                <div className="playlist-name">
                                    <strong>{playlist}</strong>
                                </div>
                            </Link>
                        </div>
                    ))
                    }
                </div>
            </div>
            <Modal className="playlistModal" show={AddPlaylistisOpen} onHide={hideAddPlaylistModal} centered>
                <button onClick={hideAddPlaylistModal} centered><strong>Continue</strong></button>
            </Modal>

        </div>
    )
}

export default PlaylistCarousel;
