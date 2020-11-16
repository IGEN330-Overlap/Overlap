const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const backend_url = process.env.BACKEND_URL;
const frontend_url = process.env.FRONTEND_URL;

const redirect_uri = backend_url + 'callback'; // Your redirect uri

// instantiate spotifyApi object
var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
});

//get current user middleware
exports.getUser = async (req, res) => {
    spotifyApi.setAccessToken(req.params.token);

    spotifyApi.getMe().then(
        (data) => {
            res.json(data);
        },
        (err) => {
            res.status(400).json(err);
        })
}

