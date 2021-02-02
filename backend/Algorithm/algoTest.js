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
    constructor(name, id, popularity)
    {
        this.name = name;
        this.id = id;
        this.popularity = popularity;
    }
}

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
                    // iterate through data adding the name and id of each song
                    for (x of data.body.items) {
                        playlistSongs.push(new Song(
                                                    x['name'], 
                                                    x['id'], 
                                                    x['popularity']
                                                    ));
                    }

                    // respond with an array of Song types containing top playlist
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
