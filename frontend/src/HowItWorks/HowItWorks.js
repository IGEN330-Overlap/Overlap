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
                                <p>
                                    Your insights show you your top three most listened to tracks and artists. 
                                    We take data from your <span>short-term</span>, <span>medium-term</span>, and <span>long-term</span> listening. 
                                    In order to make the information dynamic and relevant to you, we prioritize your short-term and medium-term songs and artists.
                                    You may notice that, if you log in two weeks from now, your top tracks and artists have changed.
                                </p>
                                <h2><strong>Comparisons</strong></h2>
                                <p>
                                    When you click on a friend, you compare <span>your top tracks and artists</span> with <span>their top tracks and artists</span>.
                                    The songs and artists that you see here are the <span>overlap</span> in each of your most listened to music.
                                    We wanted to give you a little bit of insight into what each of your friends listen to and how they compare to your listening habits.
                                    If it tells you you don't have any in common, that doesn't mean you don't listen to any of the same music!
                                    It just means that, currently, there is no overlap in your <span>top</span> tracks or artists.
                                </p>
                            </div>
                            <div className="graphics">
                                <div className="user-bubble">
                                    <h3>Your Top Music</h3>
                                </div>
                                <div className="friend-bubble">
                                    <h3>Their Top Music</h3>
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