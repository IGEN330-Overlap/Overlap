import React from 'react'
import { useSelector } from 'react-redux'
import './IndividualComparisons.css';

import icon1 from './conan.JPG'
import icon6 from './heroe.JPG';
import icon7 from './running.JPG';
import icon8 from './elephant.JPG';
import icon10 from './joji.JPG';
import icon11 from './ts.JPG';

const compareArtists = ['Joji','conan gray','taylor swift']
const compareArtistsIcons = [icon10,icon1,icon11]

const compareTracks = ['Heroes - 2017 Remaster','We Come Running','Come A Little Closer']
const compareTracksArtist = ['David Bowie','Youngblood Hawke','Cage The Elephant']
const compareTracksIcon = [icon6,icon7,icon8]

export const MyInsights = (props) => {
       
    const getTopArtists = useSelector((state) => state.userObject.topArtists).slice(0,3);
    const myTopArtists = []
    const myTopArtistsIcons = []
    getTopArtists.map((artist,i) => {
        myTopArtists[i]=artist.artistName
        myTopArtistsIcons[i]=artist.imageURL
        return myTopArtists
    })

    const getTopTracks = useSelector((state) => state.userObject.topTracks).slice(0,3);
    const myTopTracks = []
    const myTopTracksArtist = []
    const myTopTracksIcon = []
    getTopTracks.map((track,i) => {
        myTopTracks[i]=track.trackName
        myTopTracksArtist[i]=track.artistName
        myTopTracksIcon[i]=track.imageURL
        return myTopTracks
    })
    
    return(
        <div className="my-insights">
            <div className="d-flex">
                <h1><strong>My Insights</strong></h1>
            </div>
            <div className="under-bar"></div>

            <div className="top-artists">
                <h2><strong>Top Artists</strong></h2>
                <div className="artist-display">
                    {myTopArtists.map((artist,i) => (
                        <div className="artist-container">
                            <img className="artist-icon" src={myTopArtistsIcons[i]} alt={artist}></img>
                            <div className="artist-name">
                                <h5><strong>{[i+1]} / </strong></h5>
                                <strong className="artist">{artist.toUpperCase()}</strong>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
            <div className="top-tracks">
                <h2><strong>Top Tracks</strong></h2>
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

export const Comparisons = ({name, toCompare}) => {
    return(
        <div className="comparisons">
            <div className="return-to-insights">
                <h4><strong onClick={() => toCompare()}> Return to Personal Insights</strong></h4>
            </div>
            <div className="d-flex">
                <h1><strong>You & {name}</strong></h1>
                {/* <img className="arrow-icon">
                    
                </img>    */}
            </div>
            
            <div className="under-bar"></div>
            
            
            <div className="top-artists">
                <h2><strong>Top Artists</strong></h2>
                <div className="artist-display">
                    {compareArtists.map((artist,i) => (
                        <div className="artist-container">
                            <img className="artist-icon" src={compareArtistsIcons[i]} alt={artist}></img>
                            <div className="artist-name">
                                <h5><strong>{[i+1]} / </strong></h5>
                                <strong className="artist">{artist.toUpperCase()}</strong>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
            <div className="top-tracks">
                <h2><strong>Top Tracks</strong></h2>                                                                      
                <div className="track-display">
                    {compareTracks.map((track,i) => (
                        <div className="track-container">
                            <h3><strong>{[i+1]}</strong></h3>
                            <img className="track-icon" src={compareTracksIcon[i]} alt={track}/>
                            <div className="track-info">
                                <div className="track-title">    
                                    <strong>{track.toUpperCase()}</strong>
                                </div>
                                <div className="track-artist">
                                    <strong>{compareTracksArtist[i]}</strong>
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