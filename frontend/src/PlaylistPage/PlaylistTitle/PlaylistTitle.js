import './PlaylistTitle.css';
import dog from './puppy-icon.jpg';

const PlaylistTitle = (props) => {
    return (
        <div className="playlist-info-root">
            <div className="playlist-page-cover-container">
                <img className="playlist-page-cover" src={dog} alt="dog" />
            </div>
            <div className="playlist-info-save">
                <div className="title-container">
                    <h2 className="white"> Playlist Title </h2>
                </div>
                <div className="btn btn-sm playlist-button">
                    Save Playlist
                </div>
            </div>
        </div>
    );
}

export default PlaylistTitle