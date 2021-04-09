import React, { useState, useEffect } from 'react';
import './TopStats.css';

import Carousel from "react-bootstrap/Carousel";

export const GroupTopStats = ({groupUsers}) => {

    //open song with spotify
    const openSong = (song_url) => {
        window.open(song_url)
    }

    //open artist with spotify
    const openArtist = (artist_url) => {
        window.open(artist_url)
    }

    //braiding arrays function
    const braidArrays = (target_array, ...arrays) => {
        for (let i=0; i < Math.max(...arrays.map(a => a.length)); i++) {
            arrays.forEach((array) => {
                if (array[i] !== undefined) target_array.push(array[i]);
            })
        }
        return target_array;
    }

    //combine all top tracks into one array
    var allTopSongs = []
    var allTrackIDs = []
 
    braidArrays(allTopSongs, ...groupUsers.map(user => user.topTracks))
    allTopSongs.map((track) => {
        allTrackIDs.push(track.trackID)
        return allTrackIDs
    })

    let track_counts = allTrackIDs.reduce((a,c) => {
        a[c] = (a[c] || 0) + 1;
        return a
    },{})

    //order songs in terms of occurrences
    let maxTrackOccurrences = Math.max(...Object.values(track_counts))
    let trackOccurences = maxTrackOccurrences

    var groupFrequentTracks = []
    while (trackOccurences > 0) {
        groupFrequentTracks.push(Object.keys(track_counts).filter(
            (k) => track_counts[k] === trackOccurences
        ))
        trackOccurences -= 1;
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

    // get screen width to determine how many items in the carousel
    const [width, getWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            getWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    
    var num_tracks
    if (width >= 1200) {
        num_tracks = 9
    }
    else if (width >= 800) {
        num_tracks = 6
    }
    else if (width < 800) {
        num_tracks = 3
    }

    // Add 4 elements at a time to carousel array
    let carouselTracks = [];
    for (let i = 0; (i < groupUniqueSongs.length) && (i <  18); i += num_tracks) {
        let threeTracks = groupUniqueSongs.slice(i, i + num_tracks);

        let carouselElement = threeTracks.map((track, j) => {
        return (
            <div className="track-container" key={j} onClick={()=>openSong(track.linkURL)}>
                <h3><strong>{[i+j+1]}</strong></h3>
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

     //combine all top artists into one array
     var allTopArtists = []
     var allArtistIDs = []
  
     braidArrays(allTopArtists, ...groupUsers.map(user => user.topArtists))
     allTopArtists.map((artist) => {
         allArtistIDs.push(artist.artistID)
         return allArtistIDs
     })

    let artist_counts = allArtistIDs.reduce((a,c) => {
        a[c] = (a[c] || 0) + 1;
        return a
    },{})

    //order artists in terms of occurrences
    let maxArtistOccurrences = Math.max(...Object.values(artist_counts))
    let artistOccurences = maxArtistOccurrences

    var groupFrequentArtists = []
    while (artistOccurences > 0) {
        groupFrequentArtists.push(Object.keys(artist_counts).filter(
            (k) => artist_counts[k] === artistOccurences
        ))
        artistOccurences -= 1;
    }

    // console.log(groupFrequentArtists)
    
    var groupTopArtists = []
    groupFrequentArtists.map((artists) => {
        artists.map(artistID => {
            allTopArtists.map((artist) => {
                if (artistID === artist.artistID){
                    groupTopArtists.push(artist)
                }
                return groupTopArtists
            })
            return groupTopArtists
        })
        return groupTopArtists
    })

    //remove duplicates
    let groupUniqueArtists = groupTopArtists.filter(
        (v, i, a) => a.findIndex((t) => t.artistID === v.artistID) === i
    );

    return(
        <div className="top-stats-root">
            <div className="top-stats-content">
                <div className="top-stats-heading">
                    <h1 className="text"><strong>Top Tracks</strong></h1>
                    <div className="under-bar"></div>
                </div>
                <div className="top-tracks-root">
                    <Carousel interval={null} indicators={false} defaultActiveIndex={0} className="top-tracks-carousel">
                        {carouselTracks.map((element, i) => (
                            <Carousel.Item key={i}>
                                <div className="group-tracks">{element}</div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className="top-artists-root">
                    <div className="top-artist-info">
                        <div className="top-artist-heading">
                            <h1 className="text"><strong>Top Artists</strong></h1>
                            <div className="under-bar"></div>
                        </div>
                        <div className="top-artist-list">
                            {groupUniqueArtists.slice(0,5).map((artist, i) => (
                                <div className="top-artist-container" onClick={()=>openArtist(artist.linkURL)} key={i}>
                                    <div className="artist-index"><strong>#{[i+1]}</strong></div>
                                    <div className="artist-name"><strong>{artist.artistName}</strong></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="podium-display">
                        <div className="top-artist-podiums">
                            <div className="artist-podium" id="fourth-place" onClick={()=> groupUniqueArtists[3] ? openArtist(groupUniqueArtists[3].linkURL) : ''}>
                                <img className="artist-icon" 
                                    src={groupUniqueArtists[3] ? groupUniqueArtists[3].imageURL : 'Unable to find artist'} 
                                    alt={groupUniqueArtists[3] ? groupUniqueArtists[3].artistName : 'Unable to find artist'}
                                />
                                <div className="podium-4"><strong>#4</strong></div>
                            </div>
                            <div className="artist-podium" id="second-place" onClick={()=> groupUniqueArtists[1] ? openArtist(groupUniqueArtists[1].linkURL) : ''}>
                                <img className="artist-icon" 
                                    src={groupUniqueArtists[1] ? groupUniqueArtists[1].imageURL : 'Unable to find artist'} 
                                    alt={groupUniqueArtists[1] ? groupUniqueArtists[1].artistName : 'Unable to find artist'}
                                />
                                <div className="podium-2"><strong>#2</strong></div>
                            </div>
                            <div className="artist-podium" id="first-place" onClick={()=> groupUniqueArtists[0] ? openArtist(groupUniqueArtists[0].linkURL) : ''}>
                                <img className="artist-icon" 
                                    src={groupUniqueArtists[0] ? groupUniqueArtists[0].imageURL : 'Unable to find artist'} 
                                    alt={groupUniqueArtists[0] ? groupUniqueArtists[0].artistName : 'Unable to find artist'}
                                />
                                <div className="podium-1"><strong>#1</strong></div>
                            </div>
                            <div className="artist-podium" id="third-place" onClick={()=> groupUniqueArtists[2] ? openArtist(groupUniqueArtists[2].linkURL) : ''}>
                                <img className="artist-icon" 
                                    src={groupUniqueArtists[2] ? groupUniqueArtists[2].imageURL : 'Unable to find artist'} 
                                    alt={groupUniqueArtists[2] ? groupUniqueArtists[2].artistName : 'Unable to find artist'}
                                />
                                <div className="podium-3"><strong>#3</strong></div>
                            </div>
                            
                            <div className="artist-podium" id="fifth-place" onClick={()=> groupUniqueArtists[4] ? openArtist(groupUniqueArtists[4].linkURL) : ''}>
                                <img className="artist-icon" 
                                    src={groupUniqueArtists[4] ? groupUniqueArtists[4].imageURL : 'Unable to find artist'} 
                                    alt={groupUniqueArtists[4] ? groupUniqueArtists[4].artistName : 'Unable to find artist'}
                                />
                                <div className="podium-5"><strong>#5</strong></div>
                            </div>
                        </div>
                        <div className="podium-stand"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
