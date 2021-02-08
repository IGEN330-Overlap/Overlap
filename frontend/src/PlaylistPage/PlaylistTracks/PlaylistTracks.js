import React from 'react';
import './PlaylistTracks.css';        

/* import information for tracks */
import icon1 from './conan.JPG'
import icon2 from './elephant.JPG';
import icon3 from './running.JPG';
import icon4 from './drivers.JPG';
import icon5 from './3nights.JPG';
import icon6 from './heroe.JPG';

const playlistTrack = ['Heather','Come A Little Closer sdjg sdgpojsdg sdgo','We Come Running','drivers license','3 Nights','Heroes - 2017 Remaster','Heather','Come A Little Closer','We Come Running','drivers license','3 Nights','Heroes - 2017 Remaster','Heather','Come A Little Closer','We Come Running','drivers license','3 Nights','Heroes - 2017 Remaster','Heather','Come A Little Closer','We Come Running','drivers license','3 Nights','Heroes - 2017 Remaster','Heather','Come A Little Closer','We Come Running','drivers license','3 Nights','Heroes - 2017 Remaster']
const playlistArtist = ['Conan Gray','Cage The Elephant','Youngblood Hawke','Olivia Rodrigo','Dominic Fike','David Bowie','Conan Gray','Cage The Elephant','Youngblood Hawke','Olivia Rodrigo','Dominic Fike','David Bowie','Conan Gray','Cage The Elephant','Youngblood Hawke','Olivia Rodrigo','Dominic Fike','David Bowie','Conan Gray','Cage The Elephant','Youngblood Hawke','Olivia Rodrigo','Dominic Fike','David Bowie','Conan Gray','Cage The Elephant','Youngblood Hawke','Olivia Rodrigo','Dominic Fike','David Bowie']
const playlistTrackIcon = [icon1,icon2,icon3,icon4,icon5,icon6,icon1,icon2,icon3,icon4,icon5,icon6,icon1,icon2,icon3,icon4,icon5,icon6,icon1,icon2,icon3,icon4,icon5,icon6,icon1,icon2,icon3,icon4,icon5,icon6]

export const PlaylistTracks = (props) => {
    return(
        <div className="playlist-container">
            <div className="playlist-tracks">
                <div className="track-display">
                    {playlistTrack.map((track,i) => (
                        <div className="track-container">
                            <div className="track-number">
                                <h3><strong>{[i+1]}</strong></h3>
                            </div>
                            <img className="track-icon" src={playlistTrackIcon[i]} alt={track}/>
                            <div className="track-info">    
                                <h3><strong>{track.toUpperCase()}</strong></h3>
                                <div className="track-artist">
                                    <strong>{playlistArtist[i]}</strong>
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
