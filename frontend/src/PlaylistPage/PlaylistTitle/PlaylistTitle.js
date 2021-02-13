import './PlaylistTitle.css';
import dog from './puppy-icon.jpg';

const PlaylistTitle = (props) => {
    return (
        <div className="playlist-root d-flex flex-column justify-content-center align-items-center">
            <div className="playlist-page-cover-container">
                <img src={dog} alt="dog" />
            </div>
            <div className="title-container">
                <h2 className="white"> Playlist Title </h2>
            </div>
            <a className="btn btn-sm playlist-button">
                Save Playlist
            </a>
        </div>
    );
}

export default PlaylistTitle