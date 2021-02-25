import React from 'react';
import './PlaylistCarousel.css';

import { Link, useRouteMatch } from 'react-router-dom';

import playlistcover1 from './playlist-cover1.jpg';
import playlistcover2 from './playlist-cover2.jpg';
import playlistcover3 from './playlist-cover3.jpeg';
import addButton from './add.svg';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';

/*take input from backend to create array of formed playlists */
const playlists = ['playlist1','playlist2','playlist3', 'playlist4','playlist5','playlist6', 'playlist1','playlist2','playlist3', 'playlist1','playlist2','playlist3'];
const cover_src = [playlistcover1, playlistcover2, playlistcover3, playlistcover1, playlistcover2, playlistcover3, playlistcover1, playlistcover2, playlistcover3, playlistcover1, playlistcover2, playlistcover3];

const PlaylistCarousel = (props) => {
    
    // linking 
    let { path, url } = useRouteMatch();
    
    // functions for opening and closing "Add Playlist" Modal
    const [AddPlaylistisOpen, setAddPlaylistIsOpen] = React.useState(false);
    const showAddPlaylistModal = () => {
        setAddPlaylistIsOpen(true);
    };
    const hideAddPlaylistModal = () => {
        setAddPlaylistIsOpen(false);
    };

    // this is code that uses React bootstrap Carousel

    return(
        <div className="playlist-container">
            <div><h1 className="text"><strong>Playlists</strong></h1></div>
            <div className="covers">
                <div onClick={showAddPlaylistModal} className="addPlaylist-container"> 
                    {/*link to add playlist*/}
                    <div className="addButton">
                        <img src={addButton} className="plus-symbol"/>
                    </div>
                    <div className="playlist-name">
                        <strong>Add Playlist</strong>
                    </div>
                </div>
                <Carousel interval={null} indicators={false} defaultActiveIndex={0}>
                    {playlists.map((playlist,i) => (
                        <Carousel.Item>
                        <div className="display-playlists">
                            <div className="playlistcover-container">
                                <Link to ="/authorized/PlaylistPage/PlaylistPage/" className="links">
                                     <img className="playlistcover" src={cover_src[i]} alt={playlist}></img>
                                     <div className="playlist-name">
                                         <strong>{playlist}</strong>
                                     </div>
                                 </Link>
                             </div>       
                        </div>
                        </Carousel.Item>
                    ))}

                </Carousel>

            </div>
            
            <Modal className="playlistModal" show={AddPlaylistisOpen} onHide={hideAddPlaylistModal} centered>
                <button onClick={hideAddPlaylistModal} centered><strong>Continue</strong></button>
            </Modal>

        </div>
    )
}
    
    // this uses regular bootstrap carousel but I don't know how to initialize it

    // return(
    //     <div className="playlist-container">
    //         <div><h1 className="text"><strong>Playlists</strong></h1></div>
    //         <div className="covers">
    //             <div onClick={showAddPlaylistModal} className="addPlaylist-container"> 
    //                 {/*link to add playlist*/}
    //                 <div className="addButton">
    //                     <img src={addButton} className="plus-symbol"/>
    //                 </div>
    //                 <div className="playlist-name">
    //                     <strong>Add Playlist</strong>
    //                 </div>
    //             </div>
        
    //             {/*playlist cover display */}
    //             <div className="multi-carousel" id="myCarousel">
    //                 <div>
    //                     <a type="button" className="carousel-control-prev" href="#myCarousel" data-slide="prev">PREV</a>
    //                     <a type="button" className="carousel-control-next" href="#myCarousel" data-slide="next">NEXT</a>
    //                 </div>

    //                 <div className="multi-carousel-inner">
    //                     {playlists.map((playlist,i) => (
    //                         <div className="multi-carousel-item">
    //                             <div className="playlistcover-container">
    //                                 <Link to ="/authorized/PlaylistPage/PlaylistPage/" className="links">
    //                                     <img className="playlistcover" src={cover_src[i]} alt={playlist}></img>
    //                                     <div className="playlist-name">
    //                                         <strong>{playlist}</strong>
    //                                     </div>
    //                                 </Link>
    //                             </div>          
    //                         </div>        
    //                     ))}
    //                 </div>
    //             </div>
    //         </div>

    //         <Modal className="playlistModal" show={AddPlaylistisOpen} onHide={hideAddPlaylistModal} centered>
    //             <button onClick={hideAddPlaylistModal} centered><strong>Continue</strong></button>
    //         </Modal>
            
    //     </div>
    // )
    


    // this uses another carousel code I forgot where but I also don't know how to initialize it

    // return(
    //     <div className="playlist-container">
    //         <div><h1 className="text"><strong>Playlists</strong></h1></div>
    //         <div className="covers">
    //             <div onClick={showAddPlaylistModal} className="addPlaylist-container"> 
    //                 {/*link to add playlist*/}
    //                 <div className="addButton">
    //                     <img src={addButton} className="plus-symbol"/>
    //                 </div>
    //                 <div className="playlist-name">
    //                     <strong>Add Playlist</strong>
    //                 </div>
    //             </div>
        
    //             {/*playlist cover display */}
    //             <div className="carousel slide">
    //                     <div className="carousel-inner">
    //                         {playlists.map((playlist,i) => (
    //                             <div className="carousel-item">
    //                                 <div className="display-playlists">
    //                                     <div className="playlistcover-container">
    //                                         <Link to ="/authorized/PlaylistPage/PlaylistPage/" className="links">
    //                                             <img className="playlistcover" src={cover_src[i]} alt={playlist}></img>
    //                                             <div className="playlist-name">
    //                                                 <strong>{playlist}</strong>
    //                                             </div>
    //                                         </Link>
    //                                     </div>       
    //                                 </div>
    //                             </div>
    //                         ))}
    //                     </div>
                        
    //                     <a className="carousel-control-prev" role="button" href="#">
    //                         <span area-hidden="true" class="carousel-control-prev-icon"></span>
    //                         <span className="sr-only">Previous</span>
    //                     </a>
    //                     <a className="carousel-control-next" role="button" href="#">
    //                         <span area-hidden="true" class="carousel-control-next-icon"></span>
    //                         <span className="sr-only">Next</span>
    //                     </a>
    //         </div>

    //         <Modal className="playlistModal" show={AddPlaylistisOpen} onHide={hideAddPlaylistModal} centered>
    //             <button onClick={hideAddPlaylistModal} centered><strong>Continue</strong></button>
    //         </Modal>
            
    //     </div>
    // )


    

export default PlaylistCarousel;
