import React from 'react';
import './TopGenres.css';

export const TopGenres = ({groupUsers}) => {
    
    let filler = 0;

    //collect group top genres
    let allGenres = [];
    if (groupUsers) {
        if(groupUsers.length === 1){
            groupUsers[0].topGenres.map((genre) => (allGenres.push(genre)));
        }
        else{
            groupUsers.map((user) => (
                user.topGenres.map((genre) => (
                    allGenres.push(genre)
                ))
            ))
        }
    }
    
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
    
    let totalCounts = 0;
    uniqueGenres.map((genre) => {
        if (genre.count > (uniqueGenres[Math.round(uniqueGenres.length/4)].count))
            totalCounts = totalCounts + genre.count
        return totalCounts;
    })

    top_genres[0] ? (top_genres[0].count/totalCounts < 0.5 ? filler = 40 : filler = 0) : filler = 0;

    return (
        <div className="top-genres-root">
            <div className="top-genres-heading">
                <h1 className="text"><strong>Top Genres</strong></h1>
                <div className="under-bar"></div>
            </div>
            <div className="genre-bars">
                <div className="genre_bar_div one">
                    <div className="genre_bar one" style={{width: filler + (top_genres[0].count/totalCounts)*100 + "%"}}>
                        <strong className="genre_name">{top_genres[0] ? top_genres[0].genre : 'Unable to find genre'}</strong>
                    </div>                   
                    <strong className="genre_percentage">{top_genres[0] ? ((top_genres[0].count/totalCounts)*100).toFixed(2) + "%" : 'Unable to find genre'}</strong>                    
                </div>
                <div className="genre_bar_div two">
                    <div className="genre_bar two" style={{width: (filler + (top_genres[1].count/totalCounts)*100) + "%"}}>
                        <strong className="genre_name">{top_genres[1] ? top_genres[1].genre : 'Unable to find genre'}</strong>
                    </div>
                    <strong className="genre_percentage">{top_genres[1] ? ((top_genres[1].count/totalCounts)*100).toFixed(2) + "%" : 'Unable to find genre'}</strong>
                </div>
                <div className="genre_bar_div three">
                    <div className="genre_bar three" style={{width: (filler + (top_genres[2].count/totalCounts)*100) + "%"}}>
                        <strong className="genre_name">{top_genres[2] ? top_genres[2].genre : 'Unable to find genre'}</strong>
                    </div>
                    <strong className="genre_percentage">{top_genres[2] ? ((top_genres[2].count/totalCounts)*100).toFixed(2) + "%" : 'Unable to find genre'}</strong>
                </div>
                <div className="genre_bar_div four">
                    <div className="genre_bar four" style={{width: (filler + (top_genres[3].count/totalCounts)*100) + "%"}}>
                        <strong className="genre_name">{top_genres[3] ? top_genres[3].genre : 'Unable to find genre'}</strong>
                    </div>
                    <strong className="genre_percentage">{top_genres[3] ? ((top_genres[3].count/totalCounts)*100).toFixed(2) + "%" : 'Unable to find genre'}</strong>
                </div>
                <div className="genre_bar_div five">
                    <div className="genre_bar five" style={{width: (filler + (top_genres[4].count/totalCounts)*100) + "%"}}>
                        <strong className="genre_name">{top_genres[4] ? top_genres[4].genre : 'Unable to find genre'}</strong>
                    </div>
                    <strong className="genre_percentage">{top_genres[4] ? ((top_genres[4].count/totalCounts)*100).toFixed(2) + "%" : 'Unable to find genre'}</strong>
                </div>
            </div>
        </div>
    )
}