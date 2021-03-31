import React from 'react';
import './TopGenres.css';

export const TopGenres = ({groupUsers}) => {
    
    //collect group top genres
    let allGenres = [];
    groupUsers.map((user) => (
        user.topGenres.map((genre) => (
            allGenres.push(genre)
        ))
    ))
    
    //sort genres
    let uniqueGenres = [];
    allGenres.forEach(function (genre) {
        if(!this[genre.genre]) {
            this[genre.genre] = { genre: genre.genre, count: 0 };
            uniqueGenres.push(this[genre.genre]);
        }
        this[genre.genre].count += genre.count;
    }, Object.create(null));
    
    uniqueGenres.sort(function(a,b){
        return b.count-a.count
    })
    
    let top_genres = uniqueGenres.slice(0,5);

    return (
        <div className="top-genres-root">
            <div className="top-genres-heading">
                <h1 className="text"><strong>Top Genres</strong></h1>
                <div className="under-bar"></div>
            </div>
            <div className="genre-bubbles">
                <div className="top-genre-1">
                    <div className="bubble"></div>
                    <h2><strong>{top_genres[0] ? top_genres[0].genre : 'Unable to find genre'}</strong></h2>
                </div>
                <div className="top-genre-2">
                    <div className="bubble"></div>
                    <h2><strong>{top_genres[1] ? top_genres[1].genre : 'Unable to find genre'}</strong></h2>
                </div>
                <div className="top-genre-3">
                    <div className="bubble"></div>
                    <h2><strong>{top_genres[2] ? top_genres[2].genre : 'Unable to find genre'}</strong></h2>
                </div>
                <div className="top-genre-4">
                    <div className="bubble"></div>
                    <h2><strong>{top_genres[3] ? top_genres[3].genre : 'Unable to find genre'}</strong></h2>
                </div>
                <div className="top-genre-5">
                    <div className="bubble"></div>
                    <h2><strong>{top_genres[4] ? top_genres[4].genre : 'Unable to find genre'}</strong></h2>
                </div>
            </div>
        </div>
    )
}