import React from 'react';
import './TopTracks.css';

import Carousel from "react-bootstrap/Carousel";

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

    let counts = allTrackIDs.reduce((a,c) => {
        a[c] = (a[c] || 0) + 1;
        return a
    },{})

    //order songs in terms of occurrences
    let maxTrackOccurrences = Math.max(...Object.values(counts))

    var groupFrequentTracks = []
    while (maxTrackOccurrences > 0) {
        groupFrequentTracks.push(Object.keys(counts).filter(
            (k) => counts[k] === maxTrackOccurrences
        ))
        maxTrackOccurrences = maxTrackOccurrences - 1;
    }

    var groupTopSongs = []
    groupFrequentTracks.map((tracks) => {
        tracks.map(trackID => {
            allTopSongs.map((track) => {
                if (trackID === track.trackID){
                    groupTopSongs.push(track)
                }
                return groupTopSongs
            })
            return groupTopSongs
        })
        return groupTopSongs
    })

    //remove duplicates
    let groupUniqueSongs = groupTopSongs.filter(
        (v, i, a) => a.findIndex((t) => t.trackID === v.trackID) === i
    );

  // Add 4 elements at a time to carousel array
  let carouselTracks = [];
  for (let i = 0; i < groupUniqueSongs.length; i += 9) {
    let threeTracks = groupUniqueSongs.slice(i, i + 9);

    let carouselElement = threeTracks.map((track, i) => {
      return (
        <div className="track-container" key={i}>
            <h3><strong>{[i+1]}</strong></h3>
            <img className="track-icon" src={track.imageURL} alt={track.trackName}/>
            <div className="track-info">
                <div className="track-title">    
                    <strong>{track.trackName.toUpperCase()}</strong>
                </div>
                <div className="track-artist">
                    <strong>{track.artistName}</strong>
                </div>
            </div>
        </div>
      );
    });
    carouselTracks.push(carouselElement);
  }

    return(
        <div className="top-tracks-root">
            <div className="top-tracks-heading">
                <h1 className="text"><strong>Top Tracks</strong></h1>
                <div className="under-bar"></div>
                    {/* {groupUniqueSongs.slice(0,18).map((track,i) => (
                        <div className="track-container" key={i}>
                            <h3><strong>{[i+1]}</strong></h3>
                            <img className="track-icon" src={track.imageURL} alt={track.trackName}/>
                            <div className="track-info">
                                <div className="track-title">    
                                    <strong>{track.trackName.toUpperCase()}</strong>
                                </div>
                                <div className="track-artist">
                                    <strong>{track.artistName}</strong>
                                </div>
                            </div>
                        </div>
                    ))
                    } */}

                <Carousel interval={null} indicators={false} defaultActiveIndex={0} className="top-tracks-carousel">
                    {carouselTracks.map((element, i) => (
                        <Carousel.Item key={i}>
                        <div className="group-tracks">{element}</div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}
