const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.BACKEND_URL + 'callback'; // Your redirect uri

// instantiate spotifyApi object
var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
});

// Custom Song class
class Song {
    // Song constructor
    constructor(name, id, popularity){
        this.name = name;
        this.id = id;
        this.popularity = popularity;
    }
}

// Main function for the playlist generation, "Best" Group playlist set up
/* request body requirements
    spotifyID: [array] of spotifyIDs
    refreshAccessTokens: [array] of spotify refresh tokens
    playlist length: number 
*/
/* Response format
    spotifyPlaylistURL: whatever characterizes the unique spotify playlist
    ... Parlay with team what else this will entail
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

/* ------ TESTER ------ */
exports.notFunTest = async (req, res) => {
    spotifyApi.setRefreshToken(req.body.refreshToken);

    var playlistSongs = []; // Array for creating playlist of songs

    //set new access token
    spotifyApi.refreshAccessToken().then(
        (data) => {
            spotifyApi.setAccessToken(data.body.access_token);

            // Get a user's top Playlists
            spotifyApi.getMyTopTracks().then(
                (data) => {
                    for (x of data.body.items) {
                        playlistSongs.push(new Song(
                                                x['name'], 
                                                x['id'], 
                                                x['popularity'])
                                            );
                    }

                    // respond with the array of song names
                    res.json(playlistSongs);
                },
                //SpotifyAPI return error
                (err) => {
                    res.status(400).json(err);
                }
            )
        },
        //access token refresh error
        (err) => {
            res.json("Unable to refresh access token.");
            console.log(err);
        }
    );
}
