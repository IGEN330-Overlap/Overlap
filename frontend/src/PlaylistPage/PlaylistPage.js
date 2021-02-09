import React from 'react';
import './PlaylistPage.css';
import PlaylistTitle from './PlaylistTitle/PlaylistTitle';
import Navbar from "../Navbar/Navbar";

const PlaylistPage = (props) => {
    return(     
        <div className="playlist-root">
            <Navbar />
            <div className="playlist-name">
                <PlaylistTitle />
            </div>
        </div>
    )
}

export default PlaylistPage;