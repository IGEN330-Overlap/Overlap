import React from 'react';
import './MusicalProfile.css';
import logo_small from './logo small.svg';

export const MusicalProfile = ({groupUsers}) => {
    
    // musical profile arry sort
    let musicalProfiles = [];
    let danceability = [];
    let valence = [];
    let energy = [];
    let popularity = [];
    groupUsers.map((user) => (
        musicalProfiles.push({ name: user.name, icon: user.imageURL ? user.imageURL : logo_small, musicalProfile: user.musicalProfile })
    ))

    musicalProfiles.map((profile) => {
        danceability.push({ name: profile.name, icon: profile.icon, stat: profile.musicalProfile.danceability });
        valence.push({ name: profile.name, icon: profile.icon, stat: profile.musicalProfile.valence });
        energy.push({ name: profile.name, icon: profile.icon, stat: profile.musicalProfile.energy });
        popularity.push({ name: profile.name, icon: profile.icon, stat: profile.musicalProfile.trackPopularity });
        return musicalProfiles
    })

    console.log(danceability)
    console.log(valence)
    console.log(energy)
    console.log(popularity)

    return (
        <div className="musical-profile-root">
            <div className="musical-profile-content">
                <div className="musical-profile-heading">
                    <h1 className="text"><strong>Music Stats</strong></h1>
                    <div className="under-bar"></div>
                </div>
                <div className="musical-attribute">
                    <strong>Danceability</strong>
                    <p>Danceability measures how easy it is to dance to your music.</p>
                    <div className="musical-scale">
                        <div className="scale-bar"></div>
                        <div className="user-position">
                            {danceability.map((user,i) => ( 
                                <div className="user-info" style={{left: user.stat + "%"}} key={i}>
                                    <img className="user-icon" src={user.icon} alt={user.name}/>
                                    <div className="user-name">
                                        {user.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="scale-markers">
                            <div className="scale-point"><h5>0%</h5></div>
                            <div className="scale-point"></div>
                            <div className="scale-point"><h5>50%</h5></div>
                            <div className="scale-point"></div>
                            <div className="scale-point"><h5>100%</h5></div>
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
                                <div className="user-info" style={{left: user.stat + "%"}} key={i}>
                                    <img className="user-icon" src={user.icon} alt={user.name}/>
                                    <div className="user-name">
                                        {user.name}
                                    </div>
                                    {/* <div className="user-stat">
                                        {user.stat}
                                    </div> */}
                                </div>
                            ))}
                        </div>
                        <div className="scale-markers">
                            <div className="scale-point"><h5>0%</h5></div>
                            <div className="scale-point"></div>
                            <div className="scale-point"><h5>50%</h5></div>
                            <div className="scale-point"></div>
                            <div className="scale-point"><h5>100%</h5></div>
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
                                <div className="user-info" style={{left: user.stat + "%"}} key={i}>
                                    <img className="user-icon" src={user.icon} alt={user.name}/>
                                    <div className="user-name">
                                        {user.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="scale-markers">
                            <div className="scale-point"><h5>0%</h5></div>
                            <div className="scale-point"></div>
                            <div className="scale-point"><h5>50%</h5></div>
                            <div className="scale-point"></div>
                            <div className="scale-point"><h5>100%</h5></div>
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
                                <div className="user-info" style={{left: user.stat + "%"}} key={i}>
                                    <img className="user-icon" src={user.icon} alt={user.name}/>
                                    <div className="user-name">
                                        {user.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="scale-markers">
                            <div className="scale-point"><h5>0%</h5></div>
                            <div className="scale-point"></div>
                            <div className="scale-point"><h5>50%</h5></div>
                            <div className="scale-point"></div>
                            <div className="scale-point"><h5>100%</h5></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}