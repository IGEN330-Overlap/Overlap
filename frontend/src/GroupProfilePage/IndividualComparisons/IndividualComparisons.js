import './IndividualComparisons.css';
import icon1 from './conan.JPG'
import icon2 from './valley.JPG';
import icon3 from './daniel.JPG';

const myTopArtists = ['conan gray','valley','daniel caesar']
const myTopArtistsIcons = [icon1,icon2,icon3]

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
                                    <strong>{artist.toUpperCase()}</strong>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export const Comparisons = (props) => {
    return(
        <div className="comparisons">

        </div>
    )
}