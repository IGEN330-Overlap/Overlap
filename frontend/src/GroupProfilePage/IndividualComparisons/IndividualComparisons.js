import React from 'react'
import { useSelector } from 'react-redux'
import './IndividualComparisons.css';

// import icon1 from './conan.JPG'
// import icon6 from './heroe.JPG';
// import icon7 from './running.JPG';
// import icon8 from './elephant.JPG';
// import icon10 from './joji.JPG';
// import icon11 from './ts.JPG';

// const compareArtists = ['Joji','conan gray','taylor swift']
// const compareArtistsIcons = [icon10,icon1,icon11]

// const compareTracks = ['Heroes - 2017 Remaster','We Come Running','Come A Little Closer']
// const compareTracksArtist = ['David Bowie','Youngblood Hawke','Cage The Elephant']
// const compareTracksIcon = [icon6,icon7,icon8]

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
                                <div className="track-title">    
                                    <strong>{track.toUpperCase()}</strong>
                                </div>
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

export const Comparisons = ({member_id, toCompare}) => {
    
    // user top artists and tracks
    const getTopArtists = useSelector((state) => state.userObject.topArtists)
    const myTopArtists = []
    const myTopArtistsIcons = []
    getTopArtists.map((artist,i) => {
        myTopArtists[i]=artist.artistName
        myTopArtistsIcons[i]=artist.imageURL
        return myTopArtists
    })

    const getTopTracks = useSelector((state) => state.userObject.topTracks)
    const myTopTracks = []
    const myTopTracksArtist = []
    const myTopTracksIcon = []
    getTopTracks.map((track,i) => {
        myTopTracks[i]=track.trackName
        myTopTracksArtist[i]=track.artistName
        myTopTracksIcon[i]=track.imageURL
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
    var userCompareArtistsIcons = []
    var userCompareTracks = []
    var userCompareTracksArtist = []
    var userCompareTracksIcon = []

    compare_info.topArtists.map((artist,i) => {
        userCompareArtists[i] = artist.artistName
        userCompareArtistsIcons[i] = artist.imageURL
        return userCompareArtists
    })
    
    compare_info.topTracks.map((track,i) => {
        userCompareTracks[i] = track.trackName
        userCompareTracksArtist[i] = track.artistName
        userCompareTracksIcon[i] = track.imageURL
        return userCompareTracks
    })

    // find up to three common artists
    const compareArtists = []
    const compareArtistsIcons = []
    const compareTracks = []
    const compareTracksArtist = []
    const compareTracksIcon = []

    myTopArtists.map((myArtist, i) => {
        userCompareArtists.map((compArtist, j) => {
            if(myArtist === compArtist){
                compareArtists.push({artist: myArtist, rank: i+j})
                compareArtistsIcons.push(myTopArtistsIcons[i])
            }
            return null
        })
        return null
    })
    console.log(compareArtists)

    myTopTracks.map((myTrack, i) => {
        userCompareTracks.map((compTrack, j) => {
            if(myTrack === compTrack){
                compareTracks.push({track: myTrack, rank: i+j})
                compareTracksArtist.push(myTopTracksArtist[i])
                compareTracksIcon.push(myTopTracksIcon[i])
            }
            return null
        })
        return null
    })
    console.log(compareTracks)

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
                            <img className="artist-icon" src={compareArtistsIcons[i]} alt={artist.artist}></img>
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
                            <img className="track-icon" src={compareTracksIcon[i]} alt={track.track}/>
                            <div className="track-info">
                                <div className="track-title">    
                                    <strong>{track.track.toUpperCase()}</strong>
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