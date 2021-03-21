import React from 'react';
import './MusicalProfile.css';

export const MusicalProfile = ({groupUsers}) => {

    console.log(groupUsers)

    return (
        <div className="musical-profile-root">
            <div className="musical-profile-heading">
                <h1 className="text"><strong>Music Stats</strong></h1>
                <div className="under-bar"></div>
            </div>
        </div>
    )
}