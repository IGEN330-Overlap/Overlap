import React from 'react'
import { useSelector } from 'react-redux'
import './IndividualComparisons.css';

export const MyInsights = (props) => {
       
    const getTopArtists = useSelector((state) => state.userObject.topArtists).slice(0,3);
    const myTopArtists = []
    getTopArtists.map((artist,i) => {
        myTopArtists[i]=({artist: artist.artistName, icon: artist.imageURL})
        return myTopArtists
    })

    const getTopTracks = useSelector((state) => state.userObject.topTracks).slice(0,3);
    const myTopTracks = []
    getTopTracks.map((track,i) => {
        myTopTracks[i] = ({track: track.trackName, artist: track.artistName, icon: track.imageURL})
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
                            <img className="artist-icon" src={artist.icon} alt={artist.artist}></img>
                            <div className="artist-name">
                                <h5><strong>{[i+1]} / </strong></h5>
                                <strong className="artist">{artist.artist.toUpperCase()}</strong>
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
                            <img className="track-icon" src={track.icon} alt={track.track}/>
                            <div className="track-info">    
                                <div className="track-title">    
                                    <strong>{track.track.toUpperCase()}</strong>
                                </div>
                                <div className="track-artist">
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

export const Comparisons = ({member_id, toCompare}) => {
    
    // user top artists and tracks
    const getTopArtists = useSelector((state) => state.userObject.topArtists)
    const myTopArtists = []
    getTopArtists.map((artist,i) => {
        myTopArtists[i]=({artist: artist.artistName, icon: artist.imageURL})
        return myTopArtists
    })

    const getTopTracks = useSelector((state) => state.userObject.topTracks)
    const myTopTracks = []
    getTopTracks.map((track,i) => {
        myTopTracks[i]=({track:track.trackName, artist: track.artistName, icon: track.imageURL})
        return myTopTracks
    })

    // compare top artists and tracks
    var compare_name = ''
    var compare_info = ''
    const getGroupUsers = useSelector((state) => state.groupUsers)
    getGroupUsers.map((user) => {
        if (user.userID === member_id){
            compare_name = user.name
            compare_info = user
        }
        return compare_name
    })

    var userCompareArtists = []
    var userCompareTracks = []

    compare_info.topArtists.map((artist,i) => {
        userCompareArtists[i] = ({artist: artist.artistName, icon: artist.imageURL})
        return userCompareArtists
    })
    
    compare_info.topTracks.map((track,i) => {
        userCompareTracks[i] = ({track: track.trackName, artist: track.artistName, icon: track.imageURL})
        return userCompareTracks
    })

    // find up to three common artists
    const compareArtists = []
    const compareTracks = []

    myTopArtists.map((myArtist, i) => {
        userCompareArtists.map((compArtist, j) => {
            if(myArtist.artist === compArtist.artist){
                compareArtists.push({rank: i+j, artist: myArtist.artist, icon: myArtist.icon})
            }
            return null
        })
        return null
    })

    compareArtists.sort(function(a,b){
        return a.rank - b.rank
    })

    myTopTracks.map((myTrack, i) => {
        userCompareTracks.map((compTrack, j) => {
            if(myTrack.track === compTrack.track){
                compareTracks.push({rank: i+j, track: myTrack.track, artist: myTrack.artist, icon: myTrack.icon})
            }
            return null
        })
        return null
    })
    
    compareTracks.sort(function(a,b){
        return a.rank - b.rank
    })
    
    return(
        <div className="comparisons">
            <div className="return-to-insights">
                <h4><strong onClick={() => toCompare()}> Return to Personal Insights</strong></h4>
            </div>
            <div className="d-flex">
                <h1><strong>You & {compare_name}</strong></h1>
            </div>
            
            <div className="under-bar"></div>
            
            
            <div className="top-artists">
                <h2><strong>Top Artists</strong></h2>
                <div className="artist-display">
                    {compareArtists.slice(0,3).map((artist,i) => (
                        <div className="artist-container">
                            <img className="artist-icon" src={artist.icon} alt={artist.artist}></img>
                            <div className="artist-name">
                                <h5><strong>{[i+1]} / </strong></h5>
                                <strong className="artist">{artist.artist.toUpperCase()}</strong>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
            <div className="top-tracks">
                <h2><strong>Top Tracks</strong></h2>                                                                      
                <div className="track-display">
                    {compareTracks.slice(0,3).map((track,i) => (
                        <div className="track-container">
                            <h3><strong>{[i+1]}</strong></h3>
                            <img className="track-icon" src={track.icon} alt={track.track}/>
                            <div className="track-info">
                                <div className="track-title">    
                                    <strong>{track.track.toUpperCase()}</strong>
                                </div>
                                <div className="track-artist">
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