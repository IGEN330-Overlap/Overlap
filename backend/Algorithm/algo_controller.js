// Don't bother using the song and artist class
const SpotifyWebApi = require("spotify-web-api-node");
// const { db } = require("../Models/user.model");
require("dotenv").config();

const overlapLogo = process.env.OVERLAP_LOGO;
const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.BACKEND_URL + "callback"; // Your redirect uri
// instantiate spotifyApi object
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

let User = require("../Models/user.model");
// let Group = require("../Models/group.model");

exports.getMyTopTracks = async (req, res) => {
  //set refresh token
  spotifyApi.setRefreshToken(req.body.refreshToken);

  //set new access token
  spotifyApi.refreshAccessToken().then(
    async (data) => {
      spotifyApi.setAccessToken(data.body.access_token);

      let topTracks = [];
      let topTrackIDs = [];
      //get user's top 3 tracks
      await spotifyApi
        .getMyTopTracks({limit: 50, time_range: "medium_term"})
        .then((data) => {
          for (x of data.body.items) {
            let track = {}; // track data needed for song
            track.trackName = x.name;
            track.trackID = x.id;
            track.popularity = x.popularity;
            track.artistName = x.artists[0].name;

            topTrackIDs.push(x.id);
            topTracks.push(track);
          }
        })
        .catch((err) => {
          res.json({ message: "Unable to get user top tracks.", error: err });
          return;
        });  

      //get the corresponding top track features
      await spotifyApi
        .getAudioFeaturesForTracks(topTrackIDs)
        .then((data) => {
          var i = 0;
          // iterate over return data to extract the corresponding individual track features
          for (x of data.body.audio_features) {
            
            // Verify that we are adding to the corresponding song
            // Add the song attributes as well
            if (topTracks[i]['trackID'] == x.id) {
              topTracks[i]['danceability'] = x.danceability;
              topTracks[i]['energy'] = x.energy;
              topTracks[i]['key'] = x.key;
              topTracks[i]['loudness'] = x.loudness;
              topTracks[i]['mode'] = x.mode;
              topTracks[i]['speechiness'] = x.speechiness;
              topTracks[i]['acousticness'] = x.acousticness;
              topTracks[i]['instrumentalness'] = x.instrumentalness;
              topTracks[i]['liveness'] = x.liveness;
              topTracks[i]['valence'] = x.valence;
              topTracks[i]['tempo'] = x.tempo;
              topTracks[i]['duration_ms'] = x.duration_ms;
            }
            i++; // iterate for the next item
          }
        })
        .catch((err) => {
          res.json({ message: "Unable to get user top artists.", error: err });
          return;
        });

      res.json(topTracks); // Respond with the top track features and the songs
    },
    //access token refresh error
    (err) => {
      res.json({ message: "Unable to refresh access token.", error: err });
    }
  );
};

exports.buildSpotifyPlaylist = async (req, res) => {
  
  topTracks = []; // Array to store the total data from mongoDB

  // Map the user ids sent to get the mongoDB user information
  var user_ids = req.body.userIDs.map((id) => {return id});
  await User.find({userID: {$in: user_ids}})
    .then((data) => {
      // topTracks = data.topTracks.map((trackList) => {return trackList})
      // console.log(topTracks)
      for (x of data){
        topTracks.push(x.topTracks);
      }
      // res.json(topTracks)
    })
    .catch((err) =>{
      res.json(err)
    })
  
    playlist = [];

    // DO THE ALGORITHM, TO IMPLEMENT
    for(var i = 0; i < topTracks.length; i++){
      for(var j = 0; j < 5; j++){
        playlist.push("spotify:track:" + topTracks[i][j].trackID);
      }
    }

    spotifyApi.setRefreshToken(req.body.refreshToken);
  // Connect to spotify API using the owners refresh access token
  await spotifyApi.refreshAccessToken()
    .then( async (data) => {
      spotifyApi.setAccessToken(data.body.access_token);
      
      var playlistID; // playlistID to be used in adding to the playlist
      await spotifyApi
        .createPlaylist("Overlap YOLO", {'description': "Gang", 'public': true})
        .then((data) => {
          console.log("Playlist Created") 
          playlistID = data.body.id;

        })
        .catch((err) => {
          console.log(err)
        })
      
      await spotifyApi
        .addTracksToPlaylist(playlistID, playlist)
        .then((data) =>{
          console.log('Added tracks to playlist!', data.statusCode);
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });
      await spotifyApi
        .uploadCustomPlaylistCoverImage(playlistID, overlapLogo)
        .then((data) => {
          console.log("uploaded playlist image", data)
        })
        .catch((err) => {
          console.log(err)
        })
    
    res.json({
      message: "Successfully created playlist",
      return: {
        playlistID: playlistID,
        // playlistOwner: req.body.userID,
        playlistTracks: playlist,
      }
    });

  })
}

/* 
THINK ABOUT LOGIN and the scopes
Algorithm Development
Integrating a base64 for the playlist Logo
TODO build playlist model
outline integrating the playlist model and the necessary endpoints as well as adding it into this one
*/