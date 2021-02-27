import React from 'react';
import './PlaylistPage.css';
import { PlaylistTracks } from './PlaylistTracks/PlaylistTracks';
import PlaylistTitle from './PlaylistTitle/PlaylistTitle';
import Navbar1 from "../Navbar/Navbar";

export const PlaylistPage = (props) => {
    return(     
        <div className="playlist-landing-root">
            <Navbar />
            <div className="playlist-page-content">
                <div className="playlist-components">
                    <div className="playlist-page-name">
                        <PlaylistTitle />
                    </div>
                    <div className="playlist-page-tracks-container">
                        <PlaylistTracks />
                    </div>
                </div>
            </div>
        </div>
    )
}

