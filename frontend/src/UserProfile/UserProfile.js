import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './UserProfile.css';

import Collapse from 'react-bootstrap/Collapse';
import Carousel from "react-bootstrap/Carousel";

import Navbar1 from "../Navbar/Navbar";
import { TopGenres } from '../GroupProfilePage/TopGenres/TopGenres';
import { GroupTopStats } from '../GroupProfilePage/TopStats/TopStats';
import ScreenOverlay from '../ScreenOverlay/ScreenOverlay';
import logo_small from '../GroupProfilePage/MemberDisplay/logo small.svg';


const UserProfile = (props) => {
  const spotifyID = useSelector((state) => state.userObject);
  const userArray = [spotifyID];

  // get screen width to determine how many items in the carousel
//   const [width, getWidth] = useState(window.innerWidth)

//   useEffect(() => {
//       const handleResize = () => {
//           getWidth(window.innerWidth)
//       }
//       window.addEventListener('resize', handleResize);
//       return () => window.removeEventListener('resize', handleResize);
//   }, [])

  //open song with spotify
  const openSong = (song_url) => {
    window.open(song_url)
    }
    
  //track popularity collapse
  const [openTrackPop, setTrackPopOpen] = useState(false);
  const trackPop = spotifyID.topTracks.slice(0,100);
  trackPop.sort(function(a,b){
        return b.trackPopularity - a.trackPopularity
  })
  const trackPopUnique = []
    trackPop.map((track,i) => {
        if (i<trackPop.length-1){
            if (track.trackName !== trackPop[i+1].trackName && track.artistName !== trackPop[i+1].artistName)
                trackPopUnique.push(track);
        }
        return trackPopUnique;
    })
    const trackPop3 = trackPopUnique.slice(0,3);
  const trackPop3low = trackPopUnique.slice(trackPopUnique.length-3,trackPopUnique.length);

  //danceability collapse
  const [openDance, setDanceOpen] = useState(false);
  const dance = spotifyID.topTracks.slice(0,100);
  dance.sort(function(a,b){
      return b.danceability - a.danceability
  })
  const danceUnique = []
    dance.map((track,i) => {
        if (i<dance.length-1){
            if (track.trackName !== dance[i+1].trackName && track.artistName !== dance[i+1].artistName)
                danceUnique.push(track);
        }
        return danceUnique;
    })
    const dance3 = danceUnique.slice(0,3);
  const dance3low = danceUnique.slice(danceUnique.length-3,danceUnique.length);

  //energy collapse
  const [openEnergy, setEnergyOpen] = useState(false);
  const energy = spotifyID.topTracks.slice(0,100);
  energy.sort(function(a,b){
      return b.energy - a.energy
  })
  const energyUnique = []
  energy.map((track,i) => {
      if (i<energy.length-1){
          if (track.trackName !== energy[i+1].trackName && track.artistName !== energy[i+1].artistName)
              energyUnique.push(track);
      }
      return energyUnique;
  })
  const energy3 = energyUnique.slice(0,3);
const energy3low = energyUnique.slice(energyUnique.length-3,energyUnique.length);

  //acousticness collapse
  const [openAcousticness, setAcousticnessOpen] = useState(false);
  const acoustic = spotifyID.topTracks.slice(0,100);
  acoustic.sort(function(a,b){
      return b.acousticness - a.acousticness
  })
  const acousticUnique = []
    acoustic.map((track,i) => {
        if (i<acoustic.length-1){
            if (track.trackName !== acoustic[i+1].trackName && track.artistName !== acoustic[i+1].artistName)
                acousticUnique.push(track);
        }
        return acousticUnique;
    })
    const acoustic3 = acousticUnique.slice(0,3);
  const acoustic3low = acousticUnique.slice(acousticUnique.length-3,acousticUnique.length);

  //instrumentalness collapse
  const [openInstrumental, setInstrumentalOpen] = useState(false);
  const instrumental = spotifyID.topTracks.slice(0,100);
  instrumental.sort(function(a,b){
      return b.instrumentalness - a.instrumentalness
  })
  const instrumentalUnique = []
    instrumental.map((track,i) => {
        if (i<instrumental.length-1){
            if (track.trackName !== instrumental[i+1].trackName && track.artistName !== instrumental[i+1].artistName)
                instrumentalUnique.push(track);
        }
        return instrumentalUnique;
    })
    const instrumental3 = instrumentalUnique.slice(0,3);
  const instrumental3low = instrumentalUnique.slice(instrumentalUnique.length-3, instrumentalUnique.length);

  //valence collapse
  const [openValence, setValenceOpen] = useState(false);
  const valence = spotifyID.topTracks.slice(0,100);
  valence.sort(function(a,b){
      return b.valence - a.valence
  })
  const valenceUnique = []
    valence.map((track,i) => {
        if (i<valence.length-1){
            if (track.trackName !== valence[i+1].trackName && track.artistName !== valence[i+1].artistName)
                valenceUnique.push(track);
        }
        return valenceUnique;
    })
    const valence3 = valenceUnique.slice(0,3);
  const valence3low = valenceUnique.slice(valenceUnique.length-3, valenceUnique.length);


  if (spotifyID.userID === "" ) {
    return <ScreenOverlay text="Collecting your information" />;
  } else if (spotifyID) {
      const icon_src = spotifyID.imageURL ? spotifyID.imageURL : logo_small
      const user = spotifyID.name ? spotifyID.name : ''
    return (
        <div className="user-landing-root">
        <Navbar1/>
        <div className="userProfile-title">
            <strong className="userProfile-title-text">My Music Profile</strong>
            <div className="under-bar"></div>
        </div>
        <div className="quickStats">
            <div className="UP_icon">
                <img className="user_icon" src={icon_src} alt={user}></img>
            </div>
            <div className="stats">
                <div className="stats_title">Average Music Stats</div>
                <div className="stats_sub_title">Click each property for more info!</div>
                <div className="columns">
                    <div className="column">
                        <div className="open"
                            onClick={() => {setTrackPopOpen(!openTrackPop); setDanceOpen(false); setEnergyOpen(false); setAcousticnessOpen(false); setInstrumentalOpen(false); setValenceOpen(false)}}
                            aria-controls="example-collapse-text"
                            aria-expanded={openTrackPop}>
                            <div className="trackPopularity">Track Popularity: </div>
                            <div className="UP_percentage">{spotifyID.musicalProfile.trackPopularity.toFixed(2)}%</div>
                        </div>
                        <Collapse in={openTrackPop}>
                            <div id="example-collapse-text" className="UP_collapseBody">
                                <Carousel interval={null} indicators={false} defaultActiveIndex={0} className="descriptor-carousel">
                                    <Carousel.Item>
                                        <div className="description">
                                            <div className="blurb">
                                                Track Popularity, like all of the other properties, is calculated by Spotify. We've taken the average popularity of your top 100 songs.
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="descriptorCarouselItem">
                                            <div className="collapseText">Your MOST popular top tracks are:</div>
                                                <div className="top3">
                                                {trackPop3.map((track,i) => (
                                                    <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                        <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                        <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                        <div className="UP_trackArtist">{track.artistName}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="descriptorCarouselItem">
                                            <div className="collapseText">Your LEAST popular top tracks are:</div>
                                                <div className="top3">
                                                {trackPop3low.map((track,i) => (
                                                    <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                        <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                        <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                        <div className="UP_trackArtist">{track.artistName}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                                
                                
                            </div>
                        </Collapse>

                        <div className="open" 
                            onClick={() => {setTrackPopOpen(false); setDanceOpen(!openDance); setEnergyOpen(false); setAcousticnessOpen(false); setInstrumentalOpen(false); setValenceOpen(false)}}
                            aria-controls="example-collapse-text"
                            aria-expanded={openDance}>
                            <div className="danceability">Danceability: </div>
                            <div className="UP_percentage">{spotifyID.musicalProfile.danceability.toFixed(2)}%</div>
                        </div>
                        <Collapse in={openDance}>
                            <div id="example-collapse-text" className="UP_collapseBody">
                                <Carousel interval={null} indicators={false} defaultActiveIndex={0} className="descriptor-carousel">
                                    <Carousel.Item>
                                        <div className="description">
                                            <div className="blurb">
                                             Danceability includes elements like tempo, rhythm stability, beat strength, and overall regularity. How much does the track make people want to dance?
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="descriptorCarouselItem">
                                            <div className="collapseText">Your top tracks with the HIGHEST danceability:</div>
                                                <div className="top3">
                                                {dance3.map((track,i) => (
                                                    <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                        <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                        <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                        <div className="UP_trackArtist">{track.artistName}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="descriptorCarouselItem">
                                            <div className="collapseText">Your top tracks with the LOWEST danceability:</div>
                                                <div className="top3">
                                                {dance3low.map((track,i) => (
                                                    <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                        <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                        <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                        <div className="UP_trackArtist">{track.artistName}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </Collapse>

                        <div className="open" 
                            onClick={() => {setTrackPopOpen(false); setDanceOpen(false); setEnergyOpen(!openEnergy); setAcousticnessOpen(false); setInstrumentalOpen(false); setValenceOpen(false)}}
                            aria-controls="example-collapse-text"
                            aria-expanded={openEnergy}>
                            <div className="energy">Energy: </div>
                            <div className="UP_percentage">{spotifyID.musicalProfile.energy.toFixed(2)}%</div>
                        </div>
                        <Collapse in={openEnergy}>
                            <div id="example-collapse-text" className="UP_collapseBody">
                                <Carousel interval={null} indicators={false} defaultActiveIndex={0} className="descriptor-carousel">
                                    <Carousel.Item>
                                        <div className="description">
                                            <div className="blurb">
                                                Energy is a measure of intensity and activity. Spotify notes attributes like dynamic range, perceived loudness, timbre, onset rate, and general entropy.
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="descriptorCarouselItem">
                                            <div className="collapseText">Your top tracks with the HIGHEST energy:</div>
                                            <div className="top3">
                                            {energy3.map((track,i) => (
                                                <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                    <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                    <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                    <div className="UP_trackArtist">{track.artistName}</div>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="descriptorCarouselItem">
                                            <div className="collapseText">Your top tracks with the LOWEST energy:</div>
                                            <div className="top3">
                                            {energy3low.map((track,i) => (
                                                <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                    <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                    <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                    <div className="UP_trackArtist">{track.artistName}</div>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </Collapse>
                    </div>

                    <div className="column">

                    <div className="open" 
                            onClick={() => {setTrackPopOpen(false); setDanceOpen(false); setEnergyOpen(false); setAcousticnessOpen(!openAcousticness); setInstrumentalOpen(false); setValenceOpen(false)}}
                            aria-controls="example-collapse-text"
                            aria-expanded={openAcousticness}>
                            <div className="acousticness">Acousticness: </div>
                            <div className="UP_percentage">{spotifyID.musicalProfile.acousticness.toFixed(2)}%</div>
                        </div>
                        <Collapse in={openAcousticness}>
                            <div id="example-collapse-text" className="UP_collapseBody">
                                <Carousel interval={null} indicators={false} defaultActiveIndex={0} className="descriptor-carousel">
                                    <Carousel.Item>
                                        <div className="description">
                                            <div className="blurb">
                                             This metric is quite simple, how acoustic does your track feel? This is Spotify's best guess from 0 (not sure that's acoustic) to 1 (pretty sure that's acoustic).
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="descriptorCarouselItem">
                                            <div className="collapseText">Your top tracks with the HIGHEST acousticness:</div>
                                            <div className="top3">
                                            {acoustic3.map((track,i) => (
                                                <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                    <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                    <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                    <div className="UP_trackArtist">{track.artistName}</div>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="descriptorCarouselItem">
                                            <div className="collapseText">Your top tracks with the LOWEST acousticness:</div>
                                            <div className="top3">
                                            {acoustic3low.map((track,i) => (
                                                <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                    <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                    <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                    <div className="UP_trackArtist">{track.artistName}</div>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </Collapse>

                        <div className="open" 
                            onClick={() => {setTrackPopOpen(false); setDanceOpen(false); setEnergyOpen(false); setAcousticnessOpen(false); setInstrumentalOpen(!openInstrumental); setValenceOpen(false)}}
                            aria-controls="example-collapse-text"
                            aria-expanded={openInstrumental}>
                            <div className="instrumentalness">Instrumentalness: </div>
                            <div className="UP_percentage">{spotifyID.musicalProfile.instrumentalness.toFixed(2)}%</div>
                        </div>
                        <Collapse in={openInstrumental}>
                            <div id="example-collapse-text" className="UP_collapseBody">
                            <Carousel interval={null} indicators={false} defaultActiveIndex={0} className="descriptor-carousel">
                                <Carousel.Item>
                                    <div className="description">
                                        <div className="blurb">
                                            Instrumentalness predicts whether a track contains no vocals. Although, "Ooh" and "aah" sounds are considered to be instrumental for this metric.
                                        </div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="descriptorCarouselItem">
                                        <div className="collapseText">Your top tracks with the HIGHEST instrumentalness:</div>
                                        <div className="top3">
                                        {instrumental3.map((track,i) => (
                                            <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                <div className="UP_trackArtist">{track.artistName}</div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>    
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="descriptorCarouselItem">
                                        <div className="collapseText">Your top tracks with the LOWEST instrumentalness:</div>
                                        <div className="top3">
                                        {instrumental3low.map((track,i) => (
                                            <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                <div className="UP_trackArtist">{track.artistName}</div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                            </div>
                        </Collapse>

                        <div className="open" 
                            onClick={() => {setTrackPopOpen(false); setDanceOpen(false); setEnergyOpen(false); setAcousticnessOpen(false); setInstrumentalOpen(false); setValenceOpen(!openValence)}}
                            aria-controls="example-collapse-text"
                            aria-expanded={openValence}>
                            <div className="valence">Valence: </div>
                            <div className="UP_percentage">{spotifyID.musicalProfile.valence.toFixed(2)}%</div>
                        </div>
                        <Collapse in={openValence}>
                            <div id="example-collapse-text" className="UP_collapseBody">
                            <Carousel interval={null} indicators={false} defaultActiveIndex={0} className="descriptor-carousel">
                                <Carousel.Item>
                                    <div className="description">
                                        <div className="blurb">
                                        Valence is Spotify's measure for a track's positivity. High valence tracks generally sound more happy and low valence tracks are more sad.
                                        </div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="descriptorCarouselItem">
                                        <div className="collapseText">Your top tracks with the HIGHEST valence score are:</div>
                                        <div className="top3">
                                        {valence3.map((track,i) => (
                                            <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                <div className="UP_trackArtist">{track.artistName}</div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="descriptorCarouselItem">
                                        <div className="collapseText">Your top tracks with the LOWEST valence score are:</div>
                                        <div className="top3">
                                        {valence3low.map((track,i) => (
                                            <div className="userProfile-track-container" onClick={()=>openSong(track.linkURL)}>
                                                <img src={track.imageURL} alt={track.trackName} className="collapseImage"></img>
                                                <div className="UP_trackName"><strong>{track.trackName}</strong></div>
                                                <div className="UP_trackArtist">{track.artistName}</div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                            </div>
                        </Collapse>

                    </div>
                </div>
            </div>
        </div>
        <div className="top-stats-display">
            <GroupTopStats groupUsers={userArray}/>
        </div>
        <div className="top-genres-display">
            <TopGenres groupUsers={userArray} />
        </div>
    </div>
    );
    }
};

export default UserProfile;