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
 * POST generate group top playlists
 * @param {*} req 
 * @param {*} res 
 */
exports.generateGroupsTopPlaylist = async (req, res) => {

    spotifyApi.setRefreshToken(req.body.refreshToken); // RefreshToken for spotify access
    topTracks = []; // Array to store the total data from mongoDB

    let userIDs = req.body.userIDs.map((id) => {return id});

    try {
        let data = await User.find({userID: {$in: userIDs}});

        // Add each persons dataset to our master array
        for(x of data){ topTracks.push(x.topTracks); }

    } catch (err) {
        res.json({message: "error on finding users", error: err});
    }
    
    let playlistTracks = [];

    /* Let's algorithm */
    let masterSet = [];
    let masterIDs = []
    
    // put all the songs into one array, the master set
    for (x of topTracks){
        for (data of x){
            masterSet.push(data);
        }
    }

    for (x of masterSet) {
        masterIDs.push(x.trackID);
    }

    // Count occurences of songs in master set
    let counts = masterIDs.reduce((a, c) => {
        a[c] = (a[c] || 0) +1;
        return a;
    }, {});

    // find max count
    let maxCount = Math.max(...Object.values(counts));
    // uncover most commonly occuring ids
    let mostFrequentTracks = Object.keys(counts).filter(k => counts[k] >= maxCount - 1); 

    var j = 0;

    for (var i = 0; i < masterSet.length; i++) {
        if (mostFrequentTracks[j] == masterSet[i].trackID){
            playlistTracks.push({
                trackName: masterSet[i].trackName,
                trackID: masterSet[i].trackID,
                imageUrl: masterSet[i].imageURL,
                linkURL: masterSet[i].linkURL,
                artistName: masterSet[i].artistName
            })
            j++;
        }
    }

    playlist = {
        playlistName: req.body.playlistName,
        tracks: playlistTracks
    }

    try {
        let data = await Group.updateOne(
                { groupCode: req.body.groupCode },
                { $addToSet: { playlists: playlist } }
            )
        res.json({ 
            message: "added playlist to the group",
            playlist: playlist}
            );

    } catch (err) {
        res.json({
            message: "Unable to add playlist",
            error: err,
        });
    }
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
        res.json(data) // SHIT DOESN'T WORK
        
    } catch (err) {
        res.json(err)
    }
}