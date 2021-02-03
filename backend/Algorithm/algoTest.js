const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.BACKEND_URL + 'callback'; // Your redirect uri

// Import Song and Artist class 
let Song = require('./Song.js');
let Artist = require('./Artist.js')

// instantiate spotifyApi object
var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
});

/**
 * Main function for the playlist generation, "Best" set up
 * @param {[spotifyID], [refreshAccessTokens], playlistLength} req 
 * @param {spotifyPlaylistURL, "whatever else is needed"} res 
 */
// exports.mainAlgo = async (req, res) =>{
//     console.log("ONLY PSEUDOCODE RIGHT NOW")
//     // iterate through every refresh access token and append data into the temporary library
//     /* for(x in req.body.refreshAccessTokens){
//         // Collect an individuals top tracks, artists
//         // listening habits of user previously collected
//     }*/ // NOW ALL DATA HAS BEEN COLLECTED AND ADDED TO A TEMPORARY LIBRARY

//     // iterate through song library and get the corresponding song attributes
//     /*
//     for(x in songLibrary){}
//     */ // NOW ALL SONG ATTRIBUTES AND DATA ARE COMPLETELY COLLECTED... READY TO ALGORITHM

//     // USE HELPER METHOD TO EXECUTE ALGORITHM. Pass args from collected data and return playlist
//     // Verify playlist has no missing params and all fields are correctly satisfied
//     // Create Spotify Playlist
//     // Add songs to the created spotify playlist
//     // GIVE RESPONSE
// } 

/**
 * get a users top tracks based on their unique refresh token 
 * maybe pass the id as well and it will be inserted to correspond to the user
 * @param {refreshtoken, ??id??} req 
 * @param {Song(name, id, popularity)} res 
 */
exports.getMyTopTracks = async (req, res) => {
    spotifyApi.setRefreshToken(req.body.refreshToken); // Set refresh token
    var playlistSongs = []; // Array for creating playlist of songs

    spotifyApi.refreshAccessToken().then(
        (data) => {

            spotifyApi.setAccessToken(data.body.access_token); // Set Access token

            // Get a user's top tracks
            spotifyApi.getMyTopTracks().then(
                (data) => {
                    // Iterate through every item from data body extracting useful types for a song
                    for (x of data.body.items) {
                        // Add to playlist array with each Song ADT
                        playlistSongs.push(new Song(x['name'], x['id'], x['popularity'], x['type']));
                    }

                    // respond with the array of song names
                    res.json(playlistSongs);
                    console.log("successfully added top tracks")
                },
                (err) => { //SpotifyAPI return error
                    res.status(400).json(err);
                })
        },
        (err) => {//access token refresh error
            res.json("Unable to refresh access token.");
            console.log(err);
    });
}

/**
 * gets a users top tracks based on their unique refresh token and ??spotifyID??
 * @param {refreshToken} req 
 * @param {[Artist], spotifyID} res 
 */
exports.getMyTopArtists = async(req, res) =>{
    spotifyApi.setRefreshToken(req.body.refreshToken); // Set refresh token
    var topArtists = [];

    spotifyApi.refreshAccessToken().then(
        (data) => {
            spotifyApi.setAccessToken(data.body.access_token);

            /* Get a User’s Top Artists*/
            spotifyApi.getMyTopArtists().then(
                (data) => {
                    // iterate over each artist collecting necessary data
                    for(x of data.body.items){
                        // Push new Artist object 
                        topArtists.push(new Artist(x['name'], x['id'], x['popularity'], x['genres'], x['type'], x['images']))
                    }
                    // console.log(topArtists);
                    res.json(topArtists)

                }, (err) => {
                    console.log('Something went wrong!', err);
            });
        },
        //access token refresh error
        (err) => {
            res.json("Unable to refresh access token.");
            console.log(err);
    });
}

/**
 * getting track features LEFT FOR LATER
 * @param {*} req 
 * @param {*} res 
 */
exports.getTrackFeatures = async (req, res) => {
    spotifyApi.setRefreshToken(req.body.refreshToken);

    //set new access token
    spotifyApi.refreshAccessToken().then(
        (data) => {
            spotifyApi.setAccessToken(data.body.access_token);
            
            /* Get Audio Features for several tracks */
            spotifyApi.getAudioFeaturesForTracks(['4iV5W9uYEdYUVa79Axb7Rh', '3Qm86XLflmIXVm1wcwkgDK'])
                .then((data) => {
                    console.log(data.body);
                }, (err) => {
                    done(err);
                });
        },
        //access token refresh error
        (err) => {
            res.json("Unable to refresh access token.");
            console.log(err);
        }
    );
}
