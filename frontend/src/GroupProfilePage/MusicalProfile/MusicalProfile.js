import React, { useState, useEffect } from 'react';
import './MusicalProfile.css';
import logo_small from './logo small.svg';
import {ReactComponent as UpArrow} from "./up-arrow.svg"

import Carousel from 'react-bootstrap/Carousel';

export const MusicalProfile = ({groupUsers}) => {
    
    // get screen width to determine how many items in the carousel
    const [width, getWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            getWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    // musical profile arry sort
    let musicalProfiles = [];
    let danceability = [];
    let valence = [];
    let energy = [];
    let popularity = [];
    groupUsers.map((user) => (
        musicalProfiles.push({ name: user.name, icon: user.imageURL ? user.imageURL : logo_small, musicalProfile: user.musicalProfile })
    ))

    //find min, max, and avg values
    let danceability_data = [];
    let valence_data = [];
    let energy_data = [];
    let popularity_data = [];

    musicalProfiles.map((profile) => {
        danceability_data.push(profile.musicalProfile.danceability);
        valence_data.push(profile.musicalProfile.valence);
        energy_data.push(profile.musicalProfile.energy);
        popularity_data.push(profile.musicalProfile.trackPopularity);
        return musicalProfiles;
    })

    let min_danceability = Math.round(Math.min(...danceability_data) - 1.25);
    let max_danceability = Math.round(Math.max(...danceability_data) + 1.25);

    let min_valence = Math.round(Math.min(...valence_data) - 1.25);
    let max_valence = Math.round(Math.max(...valence_data) + 1.25);

    let min_energy = Math.round(Math.min(...energy_data) - 1.25);
    let max_energy = Math.round(Math.max(...energy_data) + 1.25);

    let min_popularity = Math.round(Math.min(...popularity_data) - 1.25);
    let max_popularity = Math.round(Math.max(...popularity_data) + 1.25);

    musicalProfiles.map((profile) => {
        danceability.push({ name: profile.name, icon: profile.icon, stat: profile.musicalProfile.danceability });
        valence.push({ name: profile.name, icon: profile.icon, stat: profile.musicalProfile.valence });
        energy.push({ name: profile.name, icon: profile.icon, stat: profile.musicalProfile.energy });
        popularity.push({ name: profile.name, icon: profile.icon, stat: profile.musicalProfile.trackPopularity });

        return musicalProfiles
    })

    const scrollTop = () =>{
        document.querySelector("body").scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    };

    return (
        <div className="musical-profile-root">
            <div className="musical-profile-content">
                <div className="musical-profile-heading">
                    <h1 className="text"><strong>Music Stats</strong></h1>
                    <div className="under-bar"></div>
                </div>
                {width > 480 ?
                <div className="mp-desktop">
                    <div className="musical-attribute">
                        <strong>Danceability</strong>
                        <p>Danceability measures how easy it is to dance to your music.</p>
                        <div className="musical-scale">
                            <div className="scale-bar"></div>
                            <div className="user-position">
                                {danceability.map((user,i) => ( 
                                    <div className="user-info" style={{left: (100*(user.stat-min_danceability)/(max_danceability-min_danceability)) + "%"}} key={i}>
                                        <img className="user-icon" src={user.icon} alt={user.name}/>
                                        <div className="user-name">
                                            {user.name}
                                            <div className="user-stat">
                                                {user.stat.toFixed(2) + "%"}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="scale-markers">
                                <div className="scale-point"><h5>{min_danceability}%</h5></div>
                                <div className="scale-point"></div>
                                <div className="scale-point"><h5>{(min_danceability + max_danceability)/2}%</h5></div>
                                <div className="scale-point"></div>
                                <div className="scale-point"><h5>{max_danceability}%</h5></div>
                            </div>
                        </div>
                    </div>
                    <div className="musical-attribute">
                        <strong>Valence</strong>
                        <p>A higher valence value means your music taste is generally more positive.</p>
                        <div className="musical-scale">
                            <div className="scale-bar"></div>
                            <div className="user-position">
                                {valence.map((user,i) => ( 
                                    <div className="user-info" style={{left: (100*(user.stat-min_valence)/(max_valence-min_valence)) + "%"}} key={i}>
                                        <img className="user-icon" src={user.icon} alt={user.name}/>
                                        <div className="user-name">
                                            {user.name}
                                            <div className="user-stat">
                                                {user.stat.toFixed(2) + "%"}
                                            </div>
                                        </div>                                     
                                    </div>
                                ))}
                            </div>
                            <div className="scale-markers">
                                <div className="scale-point"><h5>{min_valence}%</h5></div>
                                <div className="scale-point"></div>
                                <div className="scale-point"><h5>{(min_valence + max_valence)/2}%</h5></div>
                                <div className="scale-point"></div>
                                <div className="scale-point"><h5>{max_valence}%</h5></div>
                            </div>
                        </div>
                    </div>
                    <div className="musical-attribute">
                        <strong>Energy</strong>
                        <p>The energy attribute measures how energetic your music is.</p>
                        <div className="musical-scale">
                            <div className="scale-bar"></div>
                            <div className="user-position">
                                {energy.map((user,i) => ( 
                                    <div className="user-info" style={{left: (100*(user.stat-min_energy)/(max_energy-min_energy)) + "%"}} key={i}>
                                        <img className="user-icon" src={user.icon} alt={user.name}/>
                                        <div className="user-name">
                                            {user.name}
                                            <div className="user-stat">
                                                {user.stat.toFixed(2) + "%"}
                                            </div>
                                        </div>                                        
                                    </div>
                                ))}
                            </div>
                            <div className="scale-markers">
                                <div className="scale-point"><h5>{min_energy}%</h5></div>
                                <div className="scale-point"></div>
                                <div className="scale-point"><h5>{(min_energy + max_energy)/2}%</h5></div>
                                <div className="scale-point"></div>
                                <div className="scale-point"><h5>{max_energy}%</h5></div>
                            </div>
                        </div>
                    </div>
                    <div className="musical-attribute">
                        <strong>Track Popularity</strong>
                        <p>Your overall track popularity tells you how popular the songs you listen to are.</p>
                        <div className="musical-scale">
                            <div className="scale-bar"></div>
                            <div className="user-position">
                                {popularity.map((user,i) => ( 
                                    <div className="user-info" style={{left: (100*(user.stat-min_popularity)/(max_popularity-min_popularity)) + "%"}} key={i}>
                                        <img className="user-icon" src={user.icon} alt={user.name}/>
                                        <div className="user-name">
                                            {user.name}
                                            <div className="user-stat">
                                                {user.stat.toFixed(2) + "%"}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="scale-markers">
                                <div className="scale-point"><h5>{min_popularity}%</h5></div>
                                <div className="scale-point"></div>
                                <div className="scale-point"><h5>{(min_popularity + max_popularity)/2}%</h5></div>
                                <div className="scale-point"></div>
                                <div className="scale-point"><h5>{max_popularity}%</h5></div>
                            </div>
                        </div>
                    </div>  
                </div>
                :
                // switch to mobile sizing
                <div className="mp-mobile">
                    <Carousel interval = {null} defaultActiveIndex = {0} className="mp-carousel" indicators = {false}>
                        <Carousel.Item>
                        <div className="musical-attribute">
                            <strong>Danceability</strong>
                            <p>Danceability measures how easy it is to dance to your music.</p>
                            <div className="musical-scale">
                                <div className="scale-bar"></div>
                                <div className="user-position">
                                    {danceability.map((user,i) => ( 
                                        <div className="user-info" style={{top: (100*(max_danceability-user.stat)/(max_danceability-min_danceability)) + "%"}} key={i}>
                                            <img className="user-icon" src={user.icon} alt={user.name}/>
                                            <div className="user-name">
                                                {user.name}
                                                <div className="user-stat">
                                                    {user.stat.toFixed(2) + "%"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="scale-markers">
                                    <div className="scale-point"><h5>{max_danceability}%</h5></div>
                                    <div className="scale-point"></div>
                                    <div className="scale-point"><h5>{(min_danceability + max_danceability)/2}%</h5></div>
                                    <div className="scale-point"></div>
                                    <div className="scale-point"><h5>{min_danceability}%</h5></div>
                                </div>
                            </div>
                        </div>
                        </Carousel.Item>
                        <Carousel.Item>
                        <div className="musical-attribute">
                            <strong>Valence</strong>
                            <p>A higher valence value means your music taste is generally more positive.</p>
                            <div className="musical-scale">
                                <div className="scale-bar"></div>
                                <div className="user-position">
                                    {valence.map((user,i) => ( 
                                        <div className="user-info" style={{top: (100*(max_valence-user.stat)/(max_valence-min_valence)) + "%"}} key={i}>
                                            <img className="user-icon" src={user.icon} alt={user.name}/>
                                            <div className="user-name">
                                                {user.name}
                                                <div className="user-stat">
                                                    {user.stat.toFixed(2) + "%"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="scale-markers">
                                    <div className="scale-point"><h5>{max_valence}%</h5></div>
                                    <div className="scale-point"></div>
                                    <div className="scale-point"><h5>{(min_valence + max_valence)/2}%</h5></div>
                                    <div className="scale-point"></div>                                    
                                    <div className="scale-point"><h5>{min_valence}%</h5></div>
                                </div>
                            </div>
                        </div>
                        </Carousel.Item>
                        <Carousel.Item>
                        <div className="musical-attribute">
                            <strong>Energy</strong>
                            <p>The energy attribute measures how energetic your music is.</p>
                            <div className="musical-scale">
                                <div className="scale-bar"></div>
                                <div className="user-position">
                                    {energy.map((user,i) => ( 
                                        <div className="user-info" style={{top: (100*(max_energy-user.stat)/(max_energy-min_energy)) + "%"}} key={i}>
                                            <img className="user-icon" src={user.icon} alt={user.name}/>
                                            <div className="user-name">
                                                {user.name}
                                                <div className="user-stat">
                                                    {user.stat.toFixed(2) + "%"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="scale-markers">
                                    <div className="scale-point"><h5>{max_energy}%</h5></div>
                                    <div className="scale-point"></div>
                                    <div className="scale-point"><h5>{(min_energy + max_energy)/2}%</h5></div>
                                    <div className="scale-point"></div>
                                    <div className="scale-point"><h5>{min_energy}%</h5></div>
                                </div>
                            </div>
                        </div>
                        </Carousel.Item>
                        <Carousel.Item>
                        <div className="musical-attribute">
                            <strong>Track Popularity</strong>
                            <p>Your overall track popularity tells you how popular the songs you listen to are.</p>
                            <div className="musical-scale">
                                <div className="scale-bar"></div>
                                <div className="user-position">
                                    {popularity.map((user,i) => ( 
                                        <div className="user-info" style={{top: (100*(max_popularity-user.stat)/(max_popularity-min_popularity)) + "%"}} key={i}>
                                            <img className="user-icon" src={user.icon} alt={user.name}/>
                                            <div className="user-name">
                                                {user.name}
                                                <div className="user-stat">
                                                    {user.stat.toFixed(2) + "%"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="scale-markers">
                                    <div className="scale-point"><h5>{max_popularity}%</h5></div>
                                    <div className="scale-point"></div>
                                    <div className="scale-point"><h5>{(min_popularity + max_popularity)/2}%</h5></div>
                                    <div className="scale-point"></div>
                                    <div className="scale-point"><h5>{min_popularity}%</h5></div>
                                </div>
                            </div>
                        </div> 
                        </Carousel.Item>
                    </Carousel>
                </div>}
            <UpArrow className="up-arrow" onClick={scrollTop}/>
            </div>
        </div>
    )
}