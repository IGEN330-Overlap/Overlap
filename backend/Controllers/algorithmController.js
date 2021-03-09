const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

let User = require("../Models/user.model");
let Group = require("../Models/group.model");
let Scripts = require("../scripts.js")

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
 * 
 * @param {userIDs: [Strings], groupCode: String} req 
 * @param {*} res 
 */
exports.generateGroupsTopPlaylist = async (req, res) => {

    usersTopTracks = []; // stores each users top tracks as a single item

    let userIDs = req.body.userIDs.map((id) => { return id });
    let numUsers = userIDs.length;

    // Collect user top track data into top tracks array
    try {
        let data = await User.find({ userID: { $in: userIDs } });

        // Add each persons dataset to our master array
        for (x of data) { usersTopTracks.push(x.topTracks); }

    } catch (err) {
        res.json({ message: "error on finding users", error: err });
    }

    let playlistTracksAndInfo = []; // array to store the tracks of our playlist

    let masterSet = []; //stores all top tracks as an item
    let masterIDs = []; //stores all track IDs as an item

    // put all the songs into one array, the master set
    for (x of usersTopTracks) {
        for (data of x) {
            masterSet.push(data);
            masterIDs.push(data.trackID)
        }
    }

    /* Let's algorithm: This is making a 30 song playlist */

    // Count occurences of songs in master set
    let counts = masterIDs.reduce((a, c) => {
        a[c] = (a[c] || 0) + 1;
        return a;
    }, {});

    // find max count of common occurences in the masterID set
    let maxCount = Math.max(...Object.values(counts));
    // uncover most commonly occuring ids and store to most Frequent tracks

    let playlistTracks = []; // Array to store songs to be added to playlist
    var numSongs = 0; // used to keep track of how many songs to add in each step

    /*
    NOTE: what happens if one person is in the group and tries to make a playlist?????
    algo off the top of my head would no likey, needs small adjustment at top of this block of ifs 
    */

    // If there are at least 2 users and max count occurs in at least half the users
    if (numUsers <= 2 && maxCount == 2){
        let mostFrequentTracks = Object.keys(counts).filter(k => counts[k] === maxCount);
        // Each nested if block in this set of if/elif statements does the same thing
        // add first 20 tracks if there are that many
        // else add however many songs there are that occur maxCount times

        if (mostFrequentTracks.length > 20){
            playlistTracks = mostFrequentTracks.slice(0, 20);
            numSongs = 20;
        } else {
            playlistTracks = mostFrequentTracks;
            numSongs = mostFrequent
            Tracks.length;
        }
    // If there are less than 7 users add if maxCount > (half the users rounded up)
    } else if (numUsers <= 7 && maxCount >= numUsers - Math.floor(numUsers / 2) ){
        let numOccurencesOfSongsToAdd = numUsers - Math.floor(numUsers / 2);
        let mostFrequentTracks = Object.keys(counts).filter(k => counts[k] <= numOccurencesOfSongsToAdd);

        if (mostFrequentTracks.length > 20){
            playlistTracks = mostFrequentTracks.slice(0, 20);
            numSongs = 20;
        } else {
            playlistTracks = mostFrequentTracks;
            numSongs = mostFrequentTracks.length;
        }
    // If there are more than 7 users add if maxCount > (half the users rounded down)
    } else if (numUsers > 7 && maxCount >= numUsers - Math.ceil(numUsers / 2)) {
        let numOccurencesOfSongsToAdd = numUsers - Math.ceil(numUsers / 2);
        let mostFrequentTracks = Object.keys(counts).filter(k => counts[k] <= numOccurencesOfSongsToAdd);

        if (mostFrequentTracks.length > 20){
            playlistTracks = mostFrequentTracks.slice(0, 20);
            numSongs = 20;
        } else {
            playlistTracks = mostFrequentTracks;
            numSongs = mostFrequentTracks.length;
        }
    }

    // Using track sounds to add the rest of the songs

    /* End of algorithm */

    // Parses master set and adds the generate playlist tracks and the necessary info too
    // This can def be optimized

    var i, j = 0;
    for (i = 0; playlistTracksAndInfo.length < playlistTracks.length; i++) {
        // trackIDs match then add the corresponding data
        if (playlistTracks[j] == masterSet[i].trackID) {
            playlistTracksAndInfo.push(
                {
                    trackName: masterSet[i].trackName,
                    trackID: masterSet[i].trackID,
                    imageUrl: masterSet[i].imageURL,
                    linkURL: masterSet[i].linkURL,
                    artistName: masterSet[i].artistName
                }
            )
            // iterate to next track and reset the master to retraverse from left
            j++;
            i = 0;
        }
    }

    playlist = {
        playlistName: req.body.playlistName,
        tracks: playlistTracksAndInfo
    }

    try {
        let data = await Group.updateOne(
            { groupCode: req.body.groupCode },
            { $addToSet: { playlists: playlist } }
        )
        res.json({
            message: "added playlist to the group",
            playlist: playlist
        }
        );

    } catch (err) {
        res.json({
            message: "Unable to add playlist",
            error: err,
        });
    }
}


/**
 * POST Create the spotify playlist
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.createSpotifyPlaylist = async (req, res) => {

    // Connect to spotify API using the owners refresh access token
    spotifyApi.setRefreshToken(req.body.refreshToken);

    // find the group and the corresponding playlistID (playlist object ID)
    try {
        let data = await Group.findOne(
            { groupCode: req.body.groupCode },
            { playlist: { $elemMatch: { _id: req.body.playlistID } } },
        )
        res.json(data) // SHIT DOESN'T WORK

    } catch (err) {
        res.json(err)
    }
}

/**
 * GET Method for retriveing a past playlist
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getGroupPlaylist = async (req, res) => {
    console.log("EMPTY");
}