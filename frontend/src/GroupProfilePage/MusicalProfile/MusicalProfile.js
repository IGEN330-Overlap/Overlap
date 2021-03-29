import React from 'react';
import './MusicalProfile.css';

export const MusicalProfile = ({groupUsers}) => {
    
    // musical profile arry sort
    let musicalProfiles = [];
    let danceability = [];
    let valence = [];
    let energy = [];
    let popularity = [];
    groupUsers.map((user) => (
        musicalProfiles.push({ name: user.name, musicalProfile: user.musicalProfile })
    ))

    musicalProfiles.map((profile) => {
        danceability.push({ name: profile.name, stat: profile.musicalProfile.danceability });
        valence.push({ name: profile.name, stat: profile.musicalProfile.valence });
        energy.push({ name: profile.name, stat: profile.musicalProfile.energy });
        popularity.push({ name: profile.name, stat: profile.musicalProfile.trackPopularity });
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
                    </div>
                </div>
                <div className="musical-attribute">
                    <strong>Valence</strong>
                    <p>A higher valence value means your music taste is generally more positive.</p>
                </div>
                <div className="musical-attribute">
                    <strong>Energy</strong>
                    <p>The energy attribute measures how energetic your music is.</p>
                </div>
                <div className="musical-attribute">
                    <strong>Track Popularity</strong>
                    <p>Your overall track popularity tells you how popular the songs you listen to are.</p>
                </div>
            </div>
        </div>
    )
}