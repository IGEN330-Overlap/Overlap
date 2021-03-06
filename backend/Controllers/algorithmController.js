const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

let User = require("../Models/user.model");
let Group = require("../Models/group.model");

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const backend_url = process.env.BACKEND_URL;
const frontend_url = process.env.FRONTEND_URL;

const redirect_uri = backend_url + "callback"; // Your redirect uri

// instantiate spotifyApi object
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.generateGroupsTopPlaylist = async (req, res) => {

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.createSpotifyPlaylist = async (req, res) => {
    // Connect to spotify API using the owners refresh access token
    let playlistName;
    let tracks = [];

    // spotifyApi.setRefreshToken(req.body.refreshToken);
    try {
        let data = await Group.findOne(
                { groupCode: req.body.groupCode },
                { playlist: { $elemMatch: { _id: req.body.playlistID}}},
            )
        res.json(data)
        
    } catch (err) {
        res.json(err)
    }
}