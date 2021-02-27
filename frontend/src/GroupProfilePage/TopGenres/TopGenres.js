import React from 'react';
import './TopGenres.css';

const top_genres = ['pop','indie pop','electropop','country pop','yay pop']

export const TopGenres = (props) => {
    return (
        <div className="top-genres-root">
            <div className="top-genres-heading">
                <h1 className="text"><strong>Top Genres</strong></h1>
                <div className="under-bar"></div>
            </div>
            <div className="genre-bubbles">
                <div className="top-genre-1">
                    <h2><strong>{top_genres[0]}</strong></h2>
                </div>
                <div className="top-genre-2">
                    <h2><strong>{top_genres[1]}</strong></h2>
                </div>
                <div className="top-genre-3">
                    <h2><strong>{top_genres[2]}</strong></h2>
                </div>
                <div className="top-genre-4">
                    <h2><strong>{top_genres[3]}</strong></h2>
                </div>
                <div className="top-genre-5">
                    <h2><strong>{top_genres[4]}</strong></h2>
                </div>
            </div>
        </div>
    )
}