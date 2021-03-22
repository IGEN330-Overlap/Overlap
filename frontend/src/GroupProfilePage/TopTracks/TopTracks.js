import React from 'react';
import './TopTracks.css';

export const GroupTopTracks = ({groupUsers}) => {

    //combine all top tracks into one array
    var allTopSongs = []
    var allTrackIDs = []
    groupUsers.map((user) => {
        user.topTracks.map((track) => {
            allTopSongs.push(track)
            allTrackIDs.push(track.trackID)
            return allTopSongs
        })
        return allTrackIDs
    })
    console.log(allTopSongs)

    let counts = allTrackIDs.reduce((a,c) => {
        a[c] = (a[c] || 0) + 1;
        return a
    },{})
    console.log(counts)

    //order songs in terms of occurrences
    let maxTrackOccurrences = Math.max(...Object.values(counts))

    var groupFrequentTracks = []
    while (maxTrackOccurrences > 0) {
        groupFrequentTracks.push(Object.keys(counts).filter(
            (k) => counts[k] === maxTrackOccurrences
        ))
        maxTrackOccurrences = maxTrackOccurrences - 1;
    }
    console.log(groupFrequentTracks)

    var groupTopSongs = []
    groupFrequentTracks.map(tracks => {
        tracks.map(trackID => {
            allTopSongs.map(track => {
                if (trackID === track.trackID) {
                    groupTopSongs.push(track)
                }
                return groupTopSongs
            })
            return groupTopSongs
        })
    })
    
    console.log(groupTopSongs)  

    return(
        <div className="top-tracks-root">
            <div className="top-tracks-heading">
                <h1 className="text"><strong>Top Tracks</strong></h1>
                <div className="under-bar"></div>
            </div>
        </div>
    )
}
