import React from 'react';
import './GroupProfilePage.css';        



export const PlaylistTracks = (props) => {
    return(
        <div className="playlist-tracks-container">
            <div className="playlist-tracks">
                <div className="track-display">
                    {myTopTracks.map((track,i) => (
                        <div className="track-container">
                            <h3><strong>{[i+1]}</strong></h3>
                            <img className="track-icon" src={myTopTracksIcon[i]} alt={track}/>
                            <div className="track-info">    
                                <strong>{track.toUpperCase()}</strong>
                                <div className="track-artist">
                                    <strong>{myTopTracksArtist[i]}</strong>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}
