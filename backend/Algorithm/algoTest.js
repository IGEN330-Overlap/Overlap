const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.BACKEND_URL + "callback"; // Your redirect uri

// Import Song and Artist class
let Song = require("./Song.js");
let Artist = require("./Artist.js");

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
  var topTracks = []; // Array for creating playlist of songs

  spotifyApi.refreshAccessToken().then(
    (data) => {
      spotifyApi.setAccessToken(data.body.access_token); // Set Access token

      // Get a user's top tracks
      spotifyApi.getMyTopTracks({limit: 30, time_range: "long_term"}).then(
        (data) => {
          // Iterate through every item from data body extracting useful types for a song
          for (x of data.body.items) {
            // Add to playlist array with each Song ADT
            topTracks.push(
              new Song(x["name"], x["id"], x["popularity"], x["type"])
            );
          }
          // respond with the array of song names
          res.json(topTracks);
          //res.json(data);
          console.log("Got the top SOngs :)");
        },
        (err) => {
          //SpotifyAPI return error
          res.status(400).json({ message: "RUH ROH error", error: err });
        }
      );
    },
    (err) => {
      //access token refresh error
      res.json({ message: "Unable to refresh access token", error: err });
    }
  );
};




exports.getTopTrackIds = async (req, res) => {
  spotifyApi.setRefreshToken(req.body.refreshToken); // Set refresh token
  var trackIDs = []; // Array for creating playlist of songs

  spotifyApi.refreshAccessToken().then(
    (data) => {
      spotifyApi.setAccessToken(data.body.access_token); // Set Access token

      // Get a user's top tracks
      spotifyApi.getMyTopTracks({limit : 30, offset : 0}).then(
        (data) => {
          // Iterate through every item from data body extracting useful types for a song
          for (x of data.body.items) {
            // Add to playlist array with each Song ADT
            trackIDs.push(x["id"])
          }
          // respond with the array of song names
          res.json(trackIDs);
          //res.json(data);
          console.log("Got the top song ids :)");
        },
        (err) => {
          //SpotifyAPI return error
          res.status(400).json({ message: "RUH ROH error", error: err });
        }
      );
    },
    (err) => {
      //access token refresh error
      res.json({ message: "Unable to refresh access token", error: err });
    }
  );
};

/**
 * gets a users top tracks based on their unique refresh token and ??spotifyID??
 * @param {refreshToken} req
 * @param {[Artist], spotifyID} res
 */
exports.getMyTopArtists = async (req, res) => {
  spotifyApi.setRefreshToken(req.body.refreshToken); // Set refresh token
  var topArtists = [];
  spotifyApi.refreshAccessToken().then(
    (data) => {
      spotifyApi.setAccessToken(data.body.access_token);

      /* Get a User’s Top Artists*/
      spotifyApi.getMyTopArtists().then(
        (data) => {
          // iterate over each artist collecting necessary data
          for (x of data.body.items) {
            // Push new Artist object
            topArtists.push(
              new Artist(
                x["name"],
                x["id"],
                x["popularity"],
                x["genres"],
                x["type"],
                x["images"]
              )
            );
          }
          console.log("Got the top Artists :)");
          //res.json(topArtists);
          res.json(data);
        },
        (err) => {
          res.json({ message: "RUH ROH error", error: err });
        }
      );
    },
    //access token refresh error
    (err) => {
      res.json({message: "Unable to refresh access token.", error: err});
    }
  );
};


/**
 * getting track features. Request body needs an array of songIDs and refresh token
 * @param {[array of "songIDs"], refresh token} req
 * @param {*} res
 */
exports.getTrackFeatures = async (req, res) => {
  spotifyApi.setRefreshToken(req.body.refreshToken);
 
  let songIDs = req.body.songIDs; //array holding song ids that we want features of

  if (songIDs > 100) {
    songIDs.splice(100); // spotifyAPI call limits to 100 so only take first 100
  }

  //set new access token
  spotifyApi.refreshAccessToken().then(
    (data) => {
      spotifyApi.setAccessToken(data.body.access_token);

      /* Get Audio Features for several tracks */
      spotifyApi.getAudioFeaturesForTracks(songIDs).then(
        (data) => {
          res.json(data.body);
          console.log("Got the audio features :)");
        },
        (err) => {
          res.json({ message: "RUH ROH error, see console", error: err });
        }
      );
    },
    //access token refresh error
    (err) => {
      res.json({ message: "Unable to refresh access token.", error: err });
    }
  );
};
