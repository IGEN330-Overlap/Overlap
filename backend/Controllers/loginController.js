const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

let User = require("../Models/user.model");
let Group = require("../Models/group.model");
const { calculateMusicalProfile } = require("../scripts");
const { extractUsersTopTracks } = require("../scripts.js");
const { extractUsersTopArtists } = require("../scripts.js");


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
 * middleware for a user login
 * POST: Creates / updates a users schema in DB upon login
 * Overwrites previous user if they already have logged in otherwise create new
 *
 * @param {} req {refreshToken: String}
 * @param {} res
 */
exports.loginUser = async (req, res) => {
  //set refresh token
  spotifyApi.setRefreshToken(req.body.refreshToken);

  //set new access token
  spotifyApi.refreshAccessToken().then(
    async (data) => {
      spotifyApi.setAccessToken(data.body.access_token);

      //insantiate topTracks array to add to user object
      let topTracks = [];

      //instantiate corresponding IDs for getting audio features
      let topTrackIDs = [];

      //get user's top 50 medium term tracks
      try {
        //spotify api call
        let data = await spotifyApi.getMyTopTracks({ limit: 50, time_range: "short_term" });

        // store data extractions in tmp
        let tmp = extractUsersTopTracks(data.body.items);
        topTracks = tmp[0];
        topTrackIDs = tmp[1];

      } catch (err) {
        res.json({ message: "Unable to get user top tracks.", error: err });
        return;
      }
      //get user's top 50 short term tracks
      try {
        //spotify api call
        let data = await spotifyApi.getMyTopTracks({ limit: 50, time_range: "medium_term" });

        let tmp = extractUsersTopTracks(data.body.items);

        // iterate over top short term tracks completely 
        // recall tmp[0] is arr of topTracks & data, tmp[1] is arr of topTrackIDs
        for (var i = 0; i < tmp[0].length; i++){
          // if the trackID doesn't exist from top medium term then add
          if (!topTrackIDs.some(x => x === tmp[1][i])){
            topTracks.push(tmp[0][i]);
            topTrackIDs.push(tmp[1][i]);
          } else {

            topTracks = topTracks.filter(x => x.trackID != tmp[1][i]);
            topTrackIDs = topTrackIDs.filter(x => x != tmp[1][i]);

            topTracks.unshift(tmp[0][i]);
            topTrackIDs.unshift(tmp[1][i]);
          }
        }        

      } catch (err) {
        res.json({ message: "Unable to get user top tracks.", error: err });
        return;
      }
      
      //get the corresponding top track features to those 50 songs
      try {
        //Spotify api call
        let data = await spotifyApi.getAudioFeaturesForTracks(topTrackIDs);

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
            continue; // skip to next, ids were not the same
          }
          i++; // iterate for the next item to add in our topTracks array
        }
      } catch (err) {
        res.json({ message: "Unable to get track audio features.", error: err });
        return;
      }

      //instantiate top artists array
      let topArtists = [];

      //get user's top 50 artists medium term
      try {
        let data = await spotifyApi.getMyTopArtists({ limit: 50, time_range: "medium_term" });

        topArtists = extractUsersTopArtists(data.body.items);

      } catch (err) {
        res.json({ message: "Unable to get user top artists.", error: err });
        return;
      }
      //get user's top 50 artists short term
      try {
        let data = await spotifyApi.getMyTopArtists({ limit: 50, time_range: "short_term" });

        tmp = extractUsersTopArtists(data.body.items);

        // iterate over top short term tracks completely 
        for (var i = 0; i < tmp.length; i++){
          // if the artistID doesn't exist from top medium term then add
          if (!topArtists.some(x => x.artistID === tmp[i].artistID)) {
            topArtists.push(tmp[i]);
          }
        }
      } catch (err) {
        res.json({ message: "Unable to get user top artists.", error: err });
        return;
      }
      //get user's top 50 artists short term
      try {
        let data = await spotifyApi.getMyTopArtists({ limit: 50, time_range: "long_term" });

        tmp = extractUsersTopArtists(data.body.items);

        // iterate over top short term tracks completely 
        for (var i = 0; i < tmp.length; i++){
          // if the artistID doesn't exist from top medium term then add
          if (!topArtists.some(x => x.artistID === tmp[i].artistID)) {
            topArtists.push(tmp[i]);
          }
        }
      } catch (err) {
        res.json({ message: "Unable to get user top artists.", error: err });
        return;
      }

      // use scripted method for calculating musical profile and store in musicalProfile
      musicalProfile = calculateMusicalProfile(topTracks);
      // multiply so all attributes are on the 0-100 scale

      musicalProfile.danceability *= 100; 
      musicalProfile.energy *= 100;
      musicalProfile.speechiness *= 100;
      musicalProfile.acousticness *= 100;
      musicalProfile.instrumentalness *= 100;
      musicalProfile.valence *= 100;

      //get user object from SpotifyAPI
      spotifyApi.getMe().then(
        (data) => {
          //update user object with new information, and create if not already existing
          User.updateOne(
            { userID: data.body.id }, // Filter
            {
              $set: {
                userID: data.body.id,
                refreshToken: req.body.refreshToken,
                name: data.body.display_name,
                imageURL: data.body.images.length != 0 ? data.body.images[0].url : "",
                email: data.body.email,
                musicalProfile: musicalProfile,
                topTracks: topTracks, // Add top 50 tracks with their attributes
                topArtists: topArtists, // Add top 30 artists with their attributes
              },
            }, //Update
            { upsert: true } //create User if does not already exist
          )
            .then(() => {
              res.json({
                message: "User logged in successfully.",
                return: {
                  userID: data.body.id,
                  refreshToken: req.body.refreshToken,
                  name: data.body.display_name,
                  imageURL: data.body.images.length != 0 ? data.body.images[0].url : "",
                  email: data.body.email,
                  musicalProfile: musicalProfile,
                  topTracks: topTracks,
                  topArtists: topArtists,
                },
              });
            })
            .catch((err) => {
              res.json({ message: "Unable to login user.", error: err });
            });
        },
        //SpotifyAPI return error
        (err) => {
          res.json({ message: "SpotifyAPI return error.", error: err });
        }
      );
    },
    //access token refresh error
    (err) => {
      res.json({ message: "Unable to refresh access token.", error: err });
    }
  );
};
