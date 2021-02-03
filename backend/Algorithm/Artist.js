/**
 * Artist ADT used to hold artists
 */
class Artist{
    // Fields
    name; // String
    #id; // String
    popularity; // Number
    genres; // Array of the artists top genres
    type; // String
    images; // Array of image objects

    // Constructor for Artist
    constructor(name, id, popularity, genres, type, images){
        this.name = name;
        this.#id =id;
        this.popularity = popularity;
        this.genres = genres;
        this.type = type;
        this.images = images;
    }
}

module.exports = Artist