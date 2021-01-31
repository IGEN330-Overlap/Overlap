import './IndividualComparisons.css';
import icon1 from './conan.JPG'
import icon2 from './valley.JPG';
import icon3 from './daniel.JPG';
import icon4 from './drivers.JPG';
import icon5 from './3nights.JPG';

const myTopArtists = ['conan gray','valley','daniel caesar']
const myTopArtistsIcons = [icon1,icon2,icon3]

const myTopTracks = ['Heather','drivers license','3 Nights']
const myTopTracksArtist = ['Conan Gray','Olivia Rodrigo','Dominic Fike']
const myTopTracksIcon = [icon1,icon4,icon5]

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
                                    <strong>{[i+1]} / {artist.toUpperCase()}</strong>
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
            <h4><strong>Click on a friend to compare your stats!</strong></h4>
        </div>
    )
}

export const Comparisons = (props) => {
    return(
        <div className="comparisons">
            <h1><strong>Comparing You and {props.name}</strong></h1>
            <div className="under-bar"></div>

            <div className="top-artists">
                <h2><strong>Top Artists</strong></h2>
                <div className="artist-display">
                    {myTopArtists.map((artist,i) => (
                        <div className="artist-container">
                            <img className="artist-icon" src={myTopArtistsIcons[i]} alt={artist}></img>
                            <div className="artist-name">
                                    <strong>{[i+1]} / {artist.toUpperCase()}</strong>
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
            <h4><strong>Click here to return to your personal insights!</strong></h4>
        </div>
    )
}