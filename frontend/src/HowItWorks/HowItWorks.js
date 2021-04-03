import React from 'react';
import './HowItWorks.css'

import Navbar1 from "../Navbar/Navbar";

const HowItWorks = (props) => {
    return (
        <div className="hiw-root">
            <Navbar1 />
            <div className="hiw-info">
                <div className="hiw-insights">
                    <div className="hiw-content">
                        <h1><strong>My Insights + Comparisons</strong></h1>
                        <div className="under-bar"></div>
                        <div className="hiw-flex">
                            <div className="text-box">
                                <h2><strong>My Insights</strong></h2>
                                <h2><strong>Comparisons</strong></h2>
                            </div>
                            <div className="graphics">
                                <div className="user-bubble">
                                    <h3>Your Music</h3>
                                </div>
                                <div className="friend-bubble">
                                    <h3>Their Music</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hiw-playlistgeneration">
                <div className="hiw-content">
                        <h1><strong>Playlist Generation</strong></h1>
                        <div className="under-bar"></div>
                        <div className="hiw-flex">
                            <div className="text-box">
                                <h2><strong>Top Tracks</strong></h2>
                                <h2><strong>Moods</strong></h2>
                            </div>
                            <div className="graphics">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="hiw-genres">
                    <div className="hiw-content">
                        <h1><strong>Genres</strong></h1>
                        <div className="under-bar"></div>
                        <div className="hiw-flex">
                            <div className="text-box">

                            </div>
                            <div className="graphics">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="hiw-topstats">
                    <div className="hiw-content">
                        <h1><strong>Tracks + Artists</strong></h1>
                        <div className="under-bar"></div>
                        <div className="hiw-flex">
                            <div className="text-box">
                                <h2><strong>Top Tracks</strong></h2>
                                <h2><strong>Top Artists</strong></h2>  
                            </div>
                            <div className="graphics">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="hiw-musicstats">
                    <div className="hiw-content">
                        <h1><strong>Music Stats</strong></h1>
                        <div className="under-bar"></div>
                        <div className="hiw-flex">
                            <div className="text-box">

                            </div>
                            <div className="graphics">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks;