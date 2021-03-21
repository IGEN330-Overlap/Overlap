// Don't bother using the song and artist class
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const {extractUsersTopTracks} = require("../scripts.js");

// const overlapLogo = process.env.OVERLAP_LOGO;
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
let Group = require("../Models/group.model");


exports.getRecommendations = async(req, res) => {

  spotifyApi.setRefreshToken(req.body.refreshToken);

  try {
    let data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body.access_token)
    let info = [];

    try {
      // Get recommendations for the group
      let data = await spotifyApi.getRecommendations({
        target_danceability: 0.574,
        target_energy: 0.7662,
        target_valence: 0.4338,
        min_popularity: 50,
        // seed_artists: [
        //   "2xaAOVImG2O6lURwqperlD",
        //   "4sTQVOfp9vEMCemLw50sbu",
        //   "3TVXtAsR1Inumwj472S9r4",
        // ],
        seed_tracks: [
          "2CgOd0Lj5MuvOqzqdaAXtS",
          "4Sfa7hdVkqlM8UW5LsSY3F",
          "7gMlhlV1AllhpBM8ssg7z6"
        ]
      })
      
      // add the songs ensuring that their type is correct and that there is populated data
      for (x of data.body.tracks){
        if (x.type == "track" && x.album.images.length != 0){          
          info.push({
            trackName: x.name,
            trackID: x.id,
            imageURL: x.album.images[0].url,
            linkURL: x.external_urls.spotify,
            artistName: x.artists[0].name,
            identifier: x.name + " " + x.artists[0].name
          })
        }
      }

      res.json(info)
      // console.log(recommendations.tracks.length)

      // res.json(info);
    } catch (err) {
      res.json(err)
    }
  } catch (err) {
    res.json(err)
  }
}

exports.getMyTopArtists = async(req, res) => {
  //set refresh token
  spotifyApi.setRefreshToken(req.body.refreshToken);

  //set new access token
  spotifyApi.refreshAccessToken().then(
    async (data) => {
      spotifyApi.setAccessToken(data.body.access_token);

      let topTracks = [];
      let topTrackIDs = [];

      //get user's top 50 short term tracks
      try {
        //spotify api call
        let data = await spotifyApi.getMyTopTracks({
          limit: 50,
          time_range: "short_term",
        });

        let tmp = extractUsersTopTracks(data.body.items);
        topTracks = tmp[0];
        topTrackIDs = tmp[1];

      } catch (err) {
        res.json({ message: "Unable to get user top tracks.", error: err });
        return;
      }

      //get the corresponding top track features to up to 100 songs
      try {
        //Spotify api call
        let data = await spotifyApi.getAudioFeaturesForTracks(
          topTrackIDs.splice(0, 100)
        );

        let i = 0;
        // iterate over return data to extract the corresponding individual track features
        for (x of data.body.audio_features) {
          // Verify that we are adding to the corresponding song and if successful add attributes
          if (topTracks[i]["trackID"] == x.id) {
            topTracks[i]["danceability"] = x.danceability;
            topTracks[i]["energy"] = x.energy;
            topTracks[i]["key"] = x.key;
            topTracks[i]["loudness"] = x.loudness;
            topTracks[i]["mode"] = x.mode;
            topTracks[i]["speechiness"] = x.speechiness;
            topTracks[i]["acousticness"] = x.acousticness;
            topTracks[i]["instrumentalness"] = x.instrumentalness;
            topTracks[i]["valence"] = x.valence;
            topTracks[i]["duration_ms"] = x.duration_ms;
          } else {
            delete topTracks[i];
            continue; // skip to next, ids were not the same
          }
          i++; // iterate for the next item to add in our topTracks array
        }

        console.log("Got top tracks :)")
        res.json(topTracks); // Respond with the top track features and the songs

      } catch (err) {
        res.json({
          message: "Unable to get track audio features.",
          error: err,
        });
        return;
      }

    },
    //access token refresh error
    (err) => {
      res.json({ message: "Unable to refresh access token.", error: err });
    }
  );
}



exports.getMyTopTracks = async (req, res) => {
  //set refresh token
  spotifyApi.setRefreshToken(req.body.refreshToken);

  //set new access token
  spotifyApi.refreshAccessToken().then(
    async (data) => {
      spotifyApi.setAccessToken(data.body.access_token);

      try {
        let data = await spotifyApi.getMyTopArtists({
          limit: 50,
          time_range: "medium_term",
        });

        let topArtists = extractUsersTopArtists(data.body.items);
        res.json(topArtists)
      } catch (err) {
        res.json({ message: "Unable to get user top artists.", error: err });
        return;
      }

    },
    //access token refresh error
    (err) => {
      res.json({ message: "Unable to refresh access token.", error: err });
    }
  );
};

/**
 * POST Method, All in one endpoint that gets users and generates the spotify playlist
 *
 * NOTE the algorithm is incomplete (not done at all)
 * @param { userIDs: [String], refreshToken: String, groupeCdoe: String} req.body
 * @param { message: String, return: {json} } res
 */
exports.buildSpotifyPlaylist = async (req, res) => {
  
  topTracks = []; // Array to store the total data from mongoDB
  spotifyApi.setRefreshToken(req.body.refreshToken);
  // Map the user ids sent to get the mongoDB user information

  var user_ids;
  await Group.findOne({ groupCode: req.body.groupCode }).then((data) => {
    user_ids = data.users;
  });

  await User.find({ userID: { $in: user_ids } })
    .then((data) => {
      // topTracks = data.topTracks.map((trackList) => {return trackList})
      // console.log(topTracks)
      for (x of data) {
        topTracks.push(x.topTracks);
      }
      // res.json(topTracks)
    })
    .catch((err) => {
      res.json(err);
    });

  playlistTracksIDs = [];
  dbTrackList = [];

  // DO THE ALGORITHM, TO IMPLEMENT
  for (var i = 0; i < topTracks.length; i++) {
    for (var j = 0; j < 5; j++) {
      playlistTracksIDs.push("spotify:track:" + topTracks[i][j].trackID);

      let track = {
        trackName: topTracks[i][j].trackName,
        trackID: topTracks[i][j].trackID,
        linkURL: topTracks[i][j].linkURL,
        imageURL: topTracks[i][j].imageURL,
        artistName: topTracks[i][j].aristName,
      };
      dbTrackList.push(track);
    }
  }

  // Connect to spotify API using the owners refresh access token
  await spotifyApi.refreshAccessToken().then(async (data) => {
    spotifyApi.setAccessToken(data.body.access_token);

    var playlistID; // playlistID to be used in adding to the playlist
    await spotifyApi
      .createPlaylist("{req.body.playlistName}", { description: "Gang", public: true })
      .then((data) => {
        console.log("Playlist Created", data.statusCode);
        playlistID = data.body.id;
      })
      .catch((err) => {
        console.log(err);
      });

    await spotifyApi
      .addTracksToPlaylist(playlistID, playlistTracksIDs)
      .then((data) => {
        console.log("Added tracks to playlist!", data.statusCode);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
    // await spotifyApi
    //   .uploadCustomPlaylistCoverImage(playlistID, overlapLogo)
    //   .then((data) => {
    //     console.log("uploaded playlist image", data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    var playlist = {
      playlistName: req.body.playlistName,
      tracks: dbTrackList,
    };

    await Group.updateOne(
      { groupCode: req.body.groupCode },
      { $addToSet: { playlists: playlist } }
    ).then(() => {
      res.json({
        message: "Successfully created playlist",
        return: {
          playlistID: playlistID,
          // playlistOwner: req.body.userID,
          playlistTracks: playlist,
        },
      });
    });
  });
};

/* 
THINK ABOUT LOGIN and the scopes
Algorithm Development
Integrating a base64 for the playlist Logo
TODO build playlist model
outline integrating the playlist model and the necessary endpoints as well as adding it into this one
add the ugc-image-upload to the scopes for now and will need to redo getting the access-token
*/
