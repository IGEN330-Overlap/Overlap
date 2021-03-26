import React from 'react';
import './PlaylistPage.css';
import { useSelector } from 'react-redux';

import { Link} from "react-router-dom";

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
            <div className="navbar">
                <Navbar1 />
            </div>
            <div className="backToProfile">
                <Link to={"/authorized/group/" + groupCode} className="pp_backArrow">
                    <svg
                        className="pp_backArrow_svg"
                        xmlns="http://www.w3.org/2000/svg"  
                        viewBox="0 0 24 24" >
                        <path d="M0 0h24v24H0z" 
                        fill="none"/>
                        <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
                    </svg>
                    Back to Group Profile
                </Link>
            </div>
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

