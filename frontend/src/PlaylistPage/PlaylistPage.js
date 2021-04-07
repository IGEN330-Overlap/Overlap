import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './PlaylistPage.css';
import logo_small from '../GroupProfilePage/MemberDisplay/logo small.svg';

import { PlaylistTracks } from './PlaylistTracks/PlaylistTracks';
import PlaylistTitle from './PlaylistTitle/PlaylistTitle';
import Navbar1 from "../Navbar/Navbar";
import ScreenOverlay from "../ScreenOverlay/ScreenOverlay";

export const PlaylistPage = (props) => {

    // get playlist code from url
    const url = new URL(window.location.href);
    const playlistID = url.pathname.replace("/authorized/playlist/","")

    // get information from playlist ID
    const groupList = useSelector((state) => state.groupList)

    const [playlistName, setPlaylistName] = useState("");
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [groupCode, setGroupCode] = useState("");
    const [contributors, setPlaylistContributors] = useState([]);
    const [createdDate, setCreatedDate] = useState("");
    
    const [checkMember, setCheckMember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(playlistID !== null) {
            //start loading
            setIsLoading(true);
            
            //check if user can access playlist
            groupList.map((group) => {
                group.playlists.map((playlist, i) => {
                    if (playlist._id === playlistID) {
                        setCheckMember(true);
                        setPlaylistName(playlist.playlistName);
                        setPlaylistTracks(playlist.tracks);
                        setGroupCode(group.groupCode);
                        setCreatedDate(playlist.createDate);
                        setPlaylistContributors(playlist.contributors);
                    }
                    return playlistTracks;
                })
                return groupList;
            })

            //end loading
            setIsLoading(false);
        }
    }, [playlistID, groupList, playlistTracks, contributors]);

    var contributorsInfo = []
    contributors.map((contributor, i) => {
        contributorsInfo[i] = ({name: contributor.name, icon: contributor.userImageURL ? contributor.userImageURL : logo_small  })
        return contributorsInfo
    })

    if (isLoading || groupList.length === 0){
        return <ScreenOverlay text="Collecting your playlist tracks..." />;
    } else if (checkMember && !isLoading) {
        return (
            <div className="playlist-landing-root">
                    <Navbar1 />
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
                            <PlaylistTitle playlistName={playlistName} playlistID={playlistID} groupCode={groupCode} />
                            <div className= "contributor-component">
                            {contributorsInfo.map((contributor,i) => (
                                <div className="contributor-container" key={i}>
                                <img className="contributor-icon" src={contributor.icon} alt={contributor}></img>
                                {/* <div className="contributor-name"> {contributor.name} </div> */}
                                </div>
                            ))} 
                            
                        </div>
                        </div>
                        <div className="playlist-page-tracks-container">
                            <PlaylistTracks playlistTracks={playlistTracks} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (!isLoading && !checkMember) {
        return(
            <div className = "landing-root-error">
            {/* wrong group error if user is trying to access playlist they're not part of */}
            <div className = "wrong-playlist">
                Oops! It looks like this playlist does not exist :(
                <Link to={"/authorized"} className="return-button">
                    <svg
                        className="error-return-arrow"
                        xmlns="http://www.w3.org/2000/svg"  
                        viewBox="0 0 24 24" >
                        <path d="M0 0h24v24H0z" 
                        fill="none"/>
                        <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"
                        fill="var(--off-white-color)"/>
                    </svg>
                    <strong>My Groups</strong>
                </Link>
            </div>
        </div>
        );
    } else {
        return <div className="landing-root-base"></div>;
    }
};
