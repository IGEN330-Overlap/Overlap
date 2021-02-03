// Custom Song class
class Song {
    // Fields
    name; 
    #id; // private field and cannot be modified
    popularity;
    danceability;
    energy;
    key;
    loudness;
    mode;
    speechiness;
    acousticness;
    instrumentalness;
    liveness;
    valence;
    tempo;
    duration_ms;
    time_signature;

    // Song constructor, Includes all the features of a song now
    // danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration_ms, time_signature 
    constructor(name, id, popularity, danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration_ms, time_signature){
        this.name = name;
        this.id = id;
        this.popularity = popularity;
    };
    method; AddTrackFeatures(songID){

        spotifyApi.getAudioFeaturesForTrack(songID).then(
            (data) => {
                // Collect the features for each song
                // Note there's probably a better way to do it... hardcoded for now
                this.danceability = data.body['danceability'];
                this.energy = data.body['energy'];
                this.key = data.body['key'];
                this.loudness = data.body['loudness'];
                this.mode = data.body['mode'];
                this.speechiness = data.body['speechiness'];
                this.acousticness = data.body['acousticness'];
                this.instrumentalness = data.body['instrumentalness'];
                this.liveness = data.body['liveness'];
                this.valence = data.body['valence'];
                this.tempo = data.body['tempo'];
                this.duration_ms = data.body['duration_ms'];
                this.time_signature = data.body['time_signature'];
                },
            (err) => { done (err); }
        );;
    }
}

module.exports = Song;