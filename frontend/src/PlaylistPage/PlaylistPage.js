import React from 'react';
import './PlaylistPage.css';
import { PlaylistTracks } from './PlaylistTracks/PlaylistTracks';
import Navbar from "../Navbar/Navbar";

export const PlaylistPage = (props) => {
    return(     
        <div className="playlist-landing-root">
            <Navbar />
            <div className="playlist-components">
                <div className="playlist-tracks-container">
                    <PlaylistTracks />
                </div>
            </div>
        </div>
    )
}

