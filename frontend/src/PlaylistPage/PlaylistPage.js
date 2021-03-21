import React from 'react';
import './PlaylistPage.css';
import { useSelector } from 'react-redux';

import { PlaylistTracks } from './PlaylistTracks/PlaylistTracks';
import PlaylistTitle from './PlaylistTitle/PlaylistTitle';
import Navbar1 from "../Navbar/Navbar";

export const PlaylistPage = (props) => {

    // get playlist code from url
    const url = new URL(window.location.href);
    const playlistID = url.pathname.replace("/authorized/playlist/","")

    // get information from playlist ID
    const groupList = useSelector((state) => state.groupList)
    var playlistName
    var playlistTracks
    var check_member = ''
    var groupCode
    groupList.map((group) => {
        group.playlists.map((playlist, i) => {
            if (playlist._id === playlistID) {
                check_member = 'true'
                playlistName = playlist.playlistName
                playlistTracks = playlist.tracks
                groupCode = group.groupCode
            }
            return playlistTracks
        })
        return groupList;
    })

    return (check_member === 'true')
    ?
    (     
        <div className="playlist-landing-root">
            <Navbar1 />
            <div className="playlist-page-content">
                <div className="playlist-components">
                    <div className="playlist-page-name">
                        <PlaylistTitle playlistName={playlistName} playlistID={playlistID} groupCode={groupCode}/>
                    </div>
                    <div className="playlist-page-tracks-container">
                        <PlaylistTracks playlistTracks={playlistTracks} />
                    </div>
                </div>
            </div>
        </div>
    )
    :
    // loading screen while checking if user can access this playlist
    <div className = "landing-root-error">
        <div className = "loading-message">Collecting your playlist tracks...</div>
        {/* wrong group error if user is trying to access playlist they're not part of */}
        <div className = "wrong-group">
            Oops! It looks like this playlist does not exist :(
            <div>
                <a href="/authorized/" className = "return-button">Take me back to my groups!</a>
            </div>
        </div>
    </div>
}

