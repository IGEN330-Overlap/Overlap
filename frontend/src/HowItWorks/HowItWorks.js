import React, { useState, useEffect } from 'react';
import './HowItWorks.css';

import Navbar1 from "../Navbar/Navbar";
import small_logo from "../GroupProfilePage/MemberDisplay/logo small.svg";

import Collapse from "react-bootstrap/Collapse";

import danceability_graph from "./danceability.png";
import valence_graph from "./valence.png";
import energy_graph from "./energy.png";
// import popularity_graph from "./popularity.png";
import acousticness_graph from "./acoustiness.png";

const HowItWorks = (props) => {

    // get screen width to determine how many items in the carousel
    const [width, getWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            getWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    // mood collapse
    const [openHappy, setHappyOpen] = useState(false);
    const [openSad, setSadOpen] = useState(false);
    const [openChill, setChillOpen] = useState(false);
    const [openParty, setPartyOpen] = useState(false);

    const [graphType, setGraphType] = useState("danceability");

    const selectGraph = (type) => {
        setGraphType(type);
    }

    useEffect(() => {
        if (graphType === "danceability") {
            document.getElementById("graph-danceability").style.color = "var(--blue-color-6)";
            document.getElementById("graph-valence").style.color = "var(--off-white-color)";
            document.getElementById("graph-energy").style.color = "var(--off-white-color)";
            document.getElementById("graph-acousticness").style.color = "var(--off-white-color)";
        }
        else if (graphType === "valence") {
            document.getElementById("graph-valence").style.color = "var(--blue-color-6)";
            document.getElementById("graph-danceability").style.color = "var(--off-white-color)";
            document.getElementById("graph-energy").style.color = "var(--off-white-color)";
            document.getElementById("graph-acousticness").style.color = "var(--off-white-color)";
        }
        else if (graphType === "energy") {
            document.getElementById("graph-energy").style.color = "var(--blue-color-6)";
            document.getElementById("graph-valence").style.color = "var(--off-white-color)";
            document.getElementById("graph-danceability").style.color = "var(--off-white-color)";
            document.getElementById("graph-acousticness").style.color = "var(--off-white-color)";
        }
        else if (graphType === "acousticness") {
            document.getElementById("graph-acousticness").style.color = "var(--blue-color-6)";
            document.getElementById("graph-valence").style.color = "var(--off-white-color)";
            document.getElementById("graph-energy").style.color = "var(--off-white-color)";
            document.getElementById("graph-danceability").style.color = "var(--off-white-color)";
        }
        else {
            document.getElementById("graph-danceability").style.color = "var(--blue-color-6)";
            document.getElementById("graph-valence").style.color = "var(--off-white-color)";
            document.getElementById("graph-energy").style.color = "var(--off-white-color)";
            document.getElementById("graph-acousticness").style.color = "var(--off-white-color)";
        }
    }, [graphType])

    return (
        <div className="hiw-root">
            <Navbar1 />
            <div className="hiw-info">
                <div className="hiw-insights">
                    <div className="hiw-content">
                        <h1><strong>My Insights + Comparisons</strong></h1>
                        <div className="under-bar"></div>
                        <div className="hiw-flex">
                            <div className="graphics">
                                <div className="user-bubble">
                                    <h3>Your Top Music</h3>
                                </div>
                                <div className="friend-bubble">
                                    <h3>Their Top Music</h3>
                                </div>
                            </div>
                            <div className="text-box">
                                <h2><strong>My Insights</strong></h2>
                                <p>
                                    Your insights show you your top three most listened to tracks and artists. 
                                    We take data from your <span>short-term</span>, <span>medium-term</span>, and <span>long-term</span> listening habits. 
                                    In order to make the information dynamic and relevant to you, we prioritize your short-term and medium-term songs and artists.
                                    Every time you log in, we can collect new data from you. So you may notice that, if you log in a few weeks from now, your top tracks and artists may have changed.
                                </p>
                                <h2><strong>Comparisons</strong></h2>
                                <p>
                                    When you click on a friend, you compare <span>your top tracks and artists</span> with <span>their top tracks and artists</span>.
                                    The songs and artists that you see here are the <span>overlap</span> between your top ~125 tracks and top ~80 artists with theirs.
                                    We wanted to give you a little bit of insight into what each of your friends listens to and how they compare to your listening habits.
                                    If it tells you that you don't have any in common, that doesn't mean you don't listen to any of the same music!
                                    It just means that, currently, there is no overlap in your <span>top</span> tracks or artists.
                                </p>
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
                                <p>
                                    There are a few steps to generating your top tracks playlist. 
                                    First, we find <span>common top tracks</span> within the selected group of people.
                                    If a track appears within the top songs of <span>at least half of the group</span>, we will add it to the playlist.
                                    We then take the average of key track properties (ie. energy, danceability, valence) within the top tracks of the group to create a <span>representative music profile</span>.
                                    The rest of the playlist is populated with popular songs from Spotify that <span>match that profile</span>.
                                </p>
                                <h2><strong>Moods</strong></h2>
                                <p>
                                    To create your mood based playlists, we have specified a few characteristics that each playlist should have. 
                                    Each mood has a set list of <span>three corresponding genres</span> and <span>defined track properties</span>. 
                                    Next, we find <span>common songs</span> within the top tracks of the selected group of people and use those as seed tracks for the playlist.
                                    Based on these characteristics and tracks, we can create a tailored mood-based playlist just for you.
                                    <br></br><br></br>
                                    <span>Click into each of the moods {width > 780 ? "on the right" : "below"} to see a sneak peak of some of the characteristics we chose :)</span>
                                </p>
                            </div>
                            <div className="graphics">
                                <div className="mood-icons">
                                    <div className="mood" onClick={()=>{setHappyOpen(!openHappy); setSadOpen(false); setChillOpen(false); setPartyOpen(false)}}>
                                        <h3>
                                            <svg className="mood-emoji" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path className="mood-color" id="happy" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.508 13.941c-1.513 1.195-3.174 1.931-5.507 1.931-2.335 0-3.996-.736-5.509-1.931l-.492.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.492-.493zm.492-3.939l-.755.506s-.503-.948-1.746-.948c-1.207 0-1.745.948-1.745.948l-.754-.506c.281-.748 1.205-2.002 2.499-2.002 1.295 0 2.218 1.254 2.501 2.002zm-7 0l-.755.506s-.503-.948-1.746-.948c-1.207 0-1.745.948-1.745.948l-.754-.506c.281-.748 1.205-2.002 2.499-2.002 1.295 0 2.218 1.254 2.501 2.002z"/>
                                            </svg>
                                            Happy
                                        </h3>
                                        <Collapse in={openHappy}>
                                            <div className="collapse-playlistgeneration">
                                                <h5><span>Seed Genre: </span>Summer</h5>
                                                <h5><span>Target Valence: </span>85%</h5>
                                                <h5><span>Target Energy: </span>70%</h5>
                                            </div>
                                        </Collapse>  
                                    </div>
                                    <div className="mood" onClick={()=>{setHappyOpen(false); setSadOpen(!openSad); setChillOpen(false); setPartyOpen(false)}}>
                                        <h3>
                                            <svg className="mood-emoji" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path className="mood-color" id="sad" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.001 14c-2.332 0-4.145 1.636-5.093 2.797l.471.58c1.286-.819 2.732-1.308 4.622-1.308s3.336.489 4.622 1.308l.471-.58c-.948-1.161-2.761-2.797-5.093-2.797zm-3.501-6c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/>
                                            </svg>
                                            Sad
                                        </h3>
                                        <Collapse in={openSad}>
                                            <div className="collapse-playlistgeneration">
                                                <h5><span>Seed Genre: </span>Rainy-day</h5>
                                                <h5><span>Target Valence: </span>10%</h5>
                                                <h5><span>Target Acousticness: </span>70%</h5>
                                            </div>
                                        </Collapse> 
                                    </div>
                                    <div className="mood" onClick={()=>{setHappyOpen(false); setSadOpen(false); setChillOpen(!openChill); setPartyOpen(false)}}>
                                        <h3>
                                            <svg className="mood-emoji" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path className="mood-color" id="chill" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c3.691 0 6.915 2.016 8.647 5h-17.294c1.732-2.984 4.956-5 8.647-5zm0 20c-5.514 0-10-4.486-10-10 0-1.045.163-2.052.461-3h1.859c.606 1.518 1.929 3 3.986 3 2.477 0 2.153-2.31 3.694-2.31s1.218 2.31 3.695 2.31c2.055 0 3.379-1.482 3.984-3h1.86c.298.948.461 1.955.461 3 0 5.514-4.486 10-10 10zm5.508-8.059l.492.493c-1.127 1.72-3.199 3.566-5.999 3.566-2.801 0-4.874-1.846-6.001-3.566l.492-.493c1.513 1.195 3.174 1.931 5.509 1.931 2.333 0 3.994-.736 5.507-1.931z"/>
                                            </svg>
                                            Chill
                                        </h3>
                                        <Collapse in={openChill}>
                                            <div className="collapse-playlistgeneration">
                                                <h5><span>Seed Genre: </span>Ambient</h5>
                                                <h5><span>Target Energy: </span>50%</h5>
                                                <h5><span>Target Danceability: </span>35%</h5>
                                            </div>
                                        </Collapse> 
                                    </div>
                                    <div className="mood" onClick={()=>{setHappyOpen(false); setSadOpen(false); setChillOpen(false); setPartyOpen(!openParty)}}>
                                        <h3>
                                            <svg className="mood-emoji" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path className="mood-color" id="party" d="M12.939 21.27c-1.623-1.903-2.436-3.029-4.277-4.185-1.141-.717-2.04-1.702-2.662-2.651l.512-.512.001.001c2.482 1.961 4.757 2.255 9.434 2.255 0 0 1.226 1.214 2.42 2.623 2.74 3.229-2.233 6.215-5.428 2.469zm-2.057.664c-4.988-.559-8.882-4.798-8.882-9.934 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.168-.701 4.172-1.879 5.812.48.643.802 1.331.95 2.028 1.821-2.103 2.929-4.84 2.929-7.84 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c.319 0 .633-.023.946-.048-.943-.653-1.358-1.181-2.064-2.018zm4.618-13.934c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm-7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/>
                                            </svg>
                                            Party
                                        </h3>
                                        <Collapse in={openParty}>
                                            <div className="collapse-playlistgeneration">
                                                <h5><span>Seed Genre: </span>Dance</h5>
                                                <h5><span>Target Danceability: </span>85%</h5>
                                                <h5><span>Target Popularity: </span>75%</h5>
                                            </div>
                                        </Collapse> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hiw-genres">
                    <div className="hiw-content">
                        <h1><strong>Genres</strong></h1>
                        <div className="under-bar"></div>
                        <div className="hiw-flex">
                            <div className="graphics">
                                <div className="genre-display">
                                    <div className="genre-bar">                                        
                                        <div className="bar-1"></div>
                                        <h3>25%</h3>
                                    </div>
                                    <div className="genre-bar">
                                        <div className="bar-2"></div>
                                        <h3>18%</h3>
                                    </div>
                                    <div className="genre-bar">                                        
                                        <div className="bar-3"></div>
                                        <h3>14%</h3>
                                    </div>
                                    <div className="genre-bar">                                        
                                        <div className="bar-4"></div>
                                        <h3>12%</h3>
                                    </div>
                                    <div className="genre-bar">                                        
                                        <div className="bar-5"></div>
                                        <h3>11%</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="text-box">
                                <p>
                                    Every artist is assigned <span>five different genres</span>. 
                                    In order to determine the top genres within the group, we first collect the individual genres from <span>each person's list of top artists</span>.
                                    We also count how many times each genre appears for that user. 
                                    The top genres are then added together to create a combined list of genres within the group, as well as how many artists are associated with that genre.
                                    <br></br><br></br>
                                    The percentage that you see next to each bar is actually only out of the <span>top quarter of the full list of genres</span>. 
                                    We chose to do this because, especially with larger groups, it is likely that only the top 25% of genres are relevant to the majority of people.
                                    We get approximately 30 genres from each person and sometimes even the <span>fifth top genre</span> for one person represents <span>less than 5%</span> of their listening habits. 
                                    So don't worry if the percentages seem low, comparatively, they're actually very high!
                                </p>
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
                                <p>
                                    The top tracks displayed are the <span>combined top tracks</span> of everyone in your group. 
                                    We combine everyone's top track information, then count <span>how many times each song appears</span>. 
                                    We populate the Top Tracks display starting with the songs that appear the most frequently across the individual top tracks. 
                                    Within the list of songs that appear the same number of times, there is no particular order to which they are shown.
                                </p>
                                <h2><strong>Top Artists</strong></h2>
                                <p>
                                    The top artists work the same way as the top tracks.
                                    We combine the top artists of all of the people in your group, then count the <span>number of people that listen to each artist</span>. 
                                    Again, there is no particular order to the artists that have the same number of listeners. 
                                    If half or more of your group has very similar music taste, it is likely that their top artists will dominate the podium.
                                </p>  
                            </div>
                            <div className="graphics">
                                <div className="podium-display">
                                    <div className="top-artist-podiums">
                                        <div className="artist-podium">
                                            <img className="icon" src={small_logo} alt="logo"/>
                                            <div className="podium-2"><strong>#2</strong></div>
                                        </div>
                                        <div className="artist-podium">
                                            <img className="icon" src={small_logo} alt="logo"/>
                                            <div className="podium-1"><strong>#1</strong></div>
                                        </div>
                                        <div className="artist-podium">
                                            <img className="icon" src={small_logo} alt="logo"/>
                                            <div className="podium-3"><strong>#3</strong></div>
                                        </div>
                                    </div>
                                    <div className="podium-stand"></div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hiw-musicstats">
                    <div className="hiw-content">
                        <h1><strong>Music Stats</strong></h1>
                        <div className="under-bar"></div>
                        <div className="hiw-flex">
                            <div className="graphics">
                                <img className="hiw-graph" 
                                    src={graphType === "danceability" ? danceability_graph :
                                            graphType === "valence" ? valence_graph :
                                            graphType === "energy" ? energy_graph :
                                            graphType === "acousticness" ? acousticness_graph :
                                            danceability_graph} alt={graphType}></img>
                                <div className="graph-select">
                                    <h3 className="graph-type" id="graph-danceability" onClick={()=>selectGraph("danceability")}>Danceability</h3>
                                    <h3 className="graph-type" id="graph-valence" onClick={()=>selectGraph("valence")}>Valence</h3>
                                    <h3 className="graph-type" id="graph-energy" onClick={()=>selectGraph("energy")}>Energy</h3>
                                    <h3 className="graph-type" id="graph-acousticness" onClick={()=>selectGraph("acousticness")}>Acousticness</h3>
                                    {/* <h3>Acoustiness</h3>
                                    <h3>Instrumentalness</h3>
                                    <h3>Liveness</h3>
                                    <h3>Speechiness</h3> */}
                                </div>
                            </div>
                            <div className="text-box">
                                <p>
                                    Spotify assigns every track a set of specific attributes. 
                                    These attributes include <span>danceability, energy, valence, acoustiness, instrumentalness</span> and <span>track popularity</span>, among others. 
                                    We have created a musical profile for you by finding the <span>average</span> of each of these attributes <span>within your top tracks</span>.
                                    Each of these values fall on a scale from 0 to 100, but we found that the distribution is often <span>skewed</span>. 
                                    This can be seen in the average Spotify distributions shown {width > 780 ? " on the left." : " above."} 
                                    <br></br><br></br>
                                    You'll notice that the music stats you see within your group have a much <span>smaller range</span>.  
                                    Each display is <span>scaled</span> to more clearly show you the difference between the average listening habits of your group members.
                                    Here you can compare how danceable, energetic, sad, happy, or popular your music taste is relative to that of your friends. 
                                </p>
                            </div>     
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks;