import React from 'react';
import './PlaylistTracks.css';        

export const PlaylistTracks = ({playlistTracks, playlistType}) => {

    //get track info
    var trackInfo = []
    playlistTracks.map((track, i) => {
        trackInfo[i] = ({track: track.trackName, artist: track.artistName, icon: track.imageURL, url: track.linkURL})
        return trackInfo
    })

    //open with song with spotify
    const openSong = (song_url) => {
        window.open(song_url)
    }

    return(
        <div className="playlist-tracks-container">
            <div className="playlist-page-tracks">
                <div className="track-display">
                    {trackInfo.map((track,i) => (
                        <div key={i} className={playlistType === "top" || playlistType === "party" ? "track-container-dark" : "track-container"} onClick={()=>openSong(track.url)}>
                            <div className={playlistType === "top" || playlistType === "party" ? "track-number-dark" : "track-number"}>
                                <h3><strong>{[i+1]}</strong></h3>
                            </div>
                            <img className="track-icon" src={track.icon} alt={track.track}/>
                            <div className="track-info">    
                                <h3><strong>{track.track}</strong></h3>
                                <div className={playlistType === "top" || playlistType === "party" ? "track-artist-dark" : "track-artist"}>
                                    <strong>{track.artist}</strong>
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
