import './IndividualComparisons.css';

import icon1 from './conan.JPG'
import icon2 from './valley.JPG';
import icon3 from './daniel.JPG';
import icon4 from './drivers.JPG';
import icon5 from './3nights.JPG';
import icon6 from './heroe.JPG';
import icon7 from './running.JPG';
import icon8 from './elephant.JPG';
import icon10 from './joji.JPG';
import icon11 from './ts.JPG';

const myTopArtists = ['conan gray','valley','daniel caesar']
const myTopArtistsIcons = [icon1,icon2,icon3]

const myTopTracks = ['Heather','drivers license','3 Nights']
const myTopTracksArtist = ['Conan Gray','Olivia Rodrigo','Dominic Fike']
const myTopTracksIcon = [icon1,icon4,icon5]

const compareArtists = ['Joji','conan gray','taylor swift']
const compareArtistsIcons = [icon10,icon1,icon11]

const compareTracks = ['Heroes - 2017 Remaster','We Come Running','Come A Little Closer']
const compareTracksArtist = ['David Bowie','Youngblood Hawke','Cage The Elephant']
const compareTracksIcon = [icon6,icon7,icon8]

export const MyInsights = (props) => {
    return(
        <div className="my-insights">
            <h1><strong>My Insights</strong></h1>
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
            <h4><strong>Click on a friend to compare stats!</strong></h4>
        </div>
    )
}

export const Comparisons = ({name, toCompare}) => {
    return(
        <div className="comparisons">
            <h1><strong>You & {name}</strong></h1>
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
                                <strong>{track.toUpperCase()}</strong>
                                <div className="track-artist">
                                    <strong>{compareTracksArtist[i]}</strong>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
            <h4><strong onClick={() => toCompare()}>Click here to return to your personal insights!</strong></h4>
        </div>
    )
}