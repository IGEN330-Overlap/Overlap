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


/* ------ TESTER ------ */
exports.notFunTest = async (req, res) => {
    spotifyApi.setRefreshToken(req.body.refreshToken);

    //set new access token
    spotifyApi.refreshAccessToken().then(
        (data) => {
            console.log('The access token has been refreshed!');
            spotifyApi.setAccessToken(data.body.access_token);

            // Get a user's top Playlists
            // spotifyApi.getMyTopTracks().then(
            //     (data) => {
            //         for (x of data.body.items) {
            //             console.log("ID is" + x['id'])
            //             console.log("Name is " + x['name'])
            //             // console.log("Artist is " + x['artists'])
            //             // Figure out how to do artist objects
            //             console.log("Popularity is " + x['popularity'] + "\n");
            //         }
            //     },
            //     //SpotifyAPI return error
            //     (err) => {
            //         res.status(400).json(err);
            //     }
            // )
            spotifyApi.getMyTopArtists().then(
                (data) => {
                    for (x of data.body.items){
                        console.log("Name is: " + x['name'])
                        console.log("Popularity score is: " + x['popularity'])
                        console.log("Common genres are: " + x['genres'] + "\n")
                    }
                },
                //SpotifyAPI return error
                (err) => {
                    res.status(400).json(err);
                }
            )
        },
        (err) => {
            res.json("Unable to refresh access token.");
            console.log(err);
        }
    );
}

