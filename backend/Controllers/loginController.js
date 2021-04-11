const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

let User = require("../Models/user.model");
const { calculateMusicalProfile } = require("../scripts");
const { extractUsersTopTracks } = require("../scripts.js");
const { extractUsersTopArtistsAndGenres } = require("../scripts.js");

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const backend_url = process.env.BACKEND_URL;

const redirect_uri = backend_url + "callback"; // Your redirect uri

/**
 * middleware for a user login
 * POST: Creates / updates a users schema in DB upon login
 * Overwrites previous user if they already have logged in otherwise create new
 *
 * @param {} req {refreshToken: String}
 * @param {} res
 */
exports.loginUser = async (req, res) => {
  // instantiate spotifyApi object
  let spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
  });

  //set refresh token
  spotifyApi.setRefreshToken(req.body.refreshToken);

  //set new access token
  spotifyApi.refreshAccessToken().then(
    async (data) => {
      spotifyApi.setAccessToken(data.body.access_token);

      let topTracks = [];

      //instantiate corresponding IDs for getting audio features
      let topTrackIDs = [];
      let short_term = [];
      let med_term = [];
      let long_term = [];
      //get user's top 50 short term tracks
      try {
        //spotify api call
        let data = await spotifyApi.getMyTopTracks({
          limit: 50,
          time_range: "short_term",
        });

        if( data.statusCode != 200) {
          console.log("top tracks for short term exit code not 200: ", data.statusCode);
          throw new Error();
        }

        short_term = extractUsersTopTracks(data.body.items);

        if (short_term == "") {
          throw new Error();
        }
      } catch (err) {
        res.json({ message: "Unable to get user top tracks.", error: err });
        return;
      }
      //get user's top 50 medium term tracks
      try {
        //spotify api call
        let data = await spotifyApi.getMyTopTracks({
          limit: 50,
          time_range: "medium_term",
        });

        if( data.statusCode != 200) {
          console.log("top tracks for medium term exit code not 200: ", data.statusCode);
          throw new Error();
        }

        med_term = extractUsersTopTracks(data.body.items);
        if (med_term == "") {
          throw new Error();
        }
      } catch (err) {
        res.json({ message: "Unable to get user top tracks.", error: err });
        return;
      }

      //get user's top 50 long term tracks
      try {
        //spotify api call
        let data = await spotifyApi.getMyTopTracks({
          limit: 50,
          time_range: "long_term",
        });

        if( data.statusCode != 200) {
          console.log("top tracks for long term exit code not 200: ", data.statusCode);
          throw new Error();
        }

        long_term = extractUsersTopTracks(data.body.items);
        if (long_term == "") {
          throw new Error();
        }
      } catch (err) {
        res.json({ message: "Unable to get user top tracks.", error: err });
        return;
      }

      var x = 2; // previuosly already added the first 2 from short-term
      var y = 1; // previously already added first song from med term
      var dupCount = 0;
      var isShortTerm = true;

      // add to top tracks via the short and medium term top tracks
      // Alternate additions every 5 ranking (i.e. 5 short term then 5 medium term)
      // Done to help improve the accuracy of our rankings
      for (var i = 0; i < short_term[0].length + med_term[0].length - 3; i++) {
        // isShortTerm -> true means add short term
        if (isShortTerm) {
          // verify iterator x is within bounds
          if (x == short_term[0].length) {
            continue;
          }
          // add song if it doesn't already exist in topTracksIDs
          if (!topTrackIDs.some((x) => x === short_term[1][x])) {
            topTracks.push(short_term[0][x]);
            topTrackIDs.push(short_term[1][x]);
          } else {
            // Else it is a duplicate so add to the front
            topTracks.unshift(short_term[0][x]);
            topTrackIDs.unshift(short_term[1][x]);
            dupCount++;
          }
          x++; // increment short_term counter, switch to medium term if we've added 5 now
          if (i % 5 == 0) {
            isShortTerm = false;
          }
        } else {
          // Do  same thing as  short term except with the medium term list and its iterator y
          if (y == med_term[0].length) {
            continue;
          }
          if (!topTrackIDs.some((x) => x === med_term[1][y])) {
            topTracks.push(med_term[0][y]);
            topTrackIDs.push(med_term[1][y]);
          } else {
            topTracks.unshift(med_term[0][y]);
            topTrackIDs.unshift(med_term[1][y]);
            dupCount++;
          }
          y++;
          if (i % 5 == 0) {
            isShortTerm = true;
          }
        }
      }

      if (topTracks == null || topTracks.length == 0) {
        console.log(topTracks);
        res.status(500).json("Sorry, we can't get you Spotify music data.");
        return
      }

      // splice and flip the duplicates added because they were added in reverse order
      let tmp = topTracks.splice(0, dupCount);
      tmp = tmp.reverse();
      topTracks = topTracks.splice(dupCount);
      topTracks = tmp.concat(topTracks); // concatenate reordered duplicates to the rest of the tracks

      tmp = topTrackIDs.splice(0, dupCount);
      tmp = tmp.reverse();
      topTrackIDs = topTrackIDs.splice(dupCount);
      topTrackIDs = tmp.concat(topTrackIDs);

      //Add short 2, then med1, then short1
      // Resultant ranking is 1=short1, 2=med1, 3=short2
      topTracks.unshift(short_term[0][1]);
      topTracks.unshift(med_term[0][0]);
      topTracks.unshift(short_term[0][0]);
      topTrackIDs.unshift(short_term[1][1]);
      topTrackIDs.unshift(med_term[1][0]);
      topTrackIDs.unshift(short_term[1][0]);

      // Append the long term results so long as they don't already exist in TopTracks
      for (var i = 0; i < long_term[0].length; i++) {
        if (!topTrackIDs.some((x) => x === long_term[1][i])) {
          topTracks.push(long_term[0][i]);
          topTrackIDs.push(long_term[1][i]);
        }
      }

      //get the corresponding top track features to up to 100 songs
      try {
        //Spotify api call
        let data = await spotifyApi.getAudioFeaturesForTracks(
          topTrackIDs.splice(0, 100)
        );
        
        if(data.body.audio_features == null) {
          console.log("null array from first audio features call");
          throw new Error();
        }

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
            console.log("ID DOESNT MATCH HERE:");
            console.log(topTracks[i]);
            console.log(x.id);
            //topTracks.splice(i, 1);
            continue; // skip to next, ids were not the same
          }
          i++; // iterate for the next item to add in our topTracks array
        }
      } catch (err) {
        res.json({
          message: "Unable to get track audio features.",
          error: err,
        });
        return;
      }

      if (topTrackIDs.length != 0) {
        //get the corresponding top track features to those 50 songs
        try {
          //Spotify api call
          let data = await spotifyApi.getAudioFeaturesForTracks(
            topTrackIDs.splice(0, 100)
          );

          if(data.body.audio_features == null) {
            console.log("null array from second audio features call");
            throw new Error();
          }

          let i = 100;
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
              console.log("ID DOESNT MATCH HERE:");
              console.log(topTracks[i]);
              console.log(x.id);
              continue; // skip to next, ids were not the same
            }
            i++; // iterate for the next item to add in our topTracks array
          }
        } catch (err) {
          res.json({
            message: "Unable to get track audio features.",
            error: err,
          });
          return;
        }
      }

      //instantiate top artists array
      let topArtists = [];
      let topGenres = [];

      //get user's top 50 artists medium term
      try {
        let data = await spotifyApi.getMyTopArtists({
          limit: 50,
          time_range: "medium_term",
        });
        // See function for greater detail on data extraction
        let tmp = extractUsersTopArtistsAndGenres(data.body.items);
        topArtists = tmp[0];
        topGenres = tmp[1];
      } catch (err) {
        console.log("medium artists error");
        res.json({ message: "Unable to get user top artists.", error: err });
        return;
      }
      //get user's top 50 artists short term
      try {
        let data = await spotifyApi.getMyTopArtists({
          limit: 50,
          time_range: "short_term",
        });

        let tmp = extractUsersTopArtistsAndGenres(data.body.items);

        // iterate over top short term artists completely
        for (var i = 0; i < tmp[0].length; i++) {
          // if the artistID doesn't exist from top medium term then add
          if (!topArtists.some((x) => x.artistID === tmp[0][i].artistID)) {
            topArtists.push(tmp[0][i]);
            topGenres.push(tmp[1][i]);
          }
        }
      } catch (err) {
        res.json({ message: "Unable to get user top artists.", error: err });
        return;
      }
      //get user's top 50 artists long term
      try {
        let data = await spotifyApi.getMyTopArtists({
          limit: 50,
          time_range: "long_term",
        });

        let tmp = extractUsersTopArtistsAndGenres(data.body.items);

        for (var i = 0; i < tmp[0].length; i++) {
          // if the artistID doesn't exist from previous terms then add
          if (!topArtists.some((x) => x.artistID === tmp[0][i].artistID)) {
            topArtists.push(tmp[0][i]);
            topGenres.push(tmp[1][i]);
          }
        }
      } catch (err) {
        res.json({ message: "Unable to get user top artists.", error: err });
        return;
      }

      if (topArtists == null || topArtists.length == 0) {
        console.log(topArtists);
        res.status(500).json("Sorry, we can't get your Spotify artist data.");
        return;
      }


      topGenres = topGenres.flat(); //put each item as a genre

      // Create a map of KVP for the top genres to pull out the counts
      const map = topGenres.reduce(
        (a, c) => a.set(c, (a.get(c) || 0) + 1),
        new Map()
      );

      // Extract KVPs into result object
      let result = [...map.entries()];
      topGenres = []; // reset top genres so we can re populate

      for (x of result) {
        // Only add valid/existing genres
        if (x[0] == "undefined" || x[0] == null) {
          continue;
          // genre must occur at least 3 times to be deemed "top"
        } else if (x[1] >= 3) {
          // push genre and count of genre respectively
          topGenres.push({
            genre: x[0],
            count: x[1],
          });
        }
      }

      // Resort based on counts (highest at front), could be optimized into for loop todo
      topGenres = topGenres.sort((a, b) => {
        return b.count - a.count;
      });

      //Remove null or undefined elements
      topTracks = topTracks.filter(
        track => track != undefined
      );

      // Remove all duplicates
      topTracks = topTracks.filter(
        (v, i, a) => a.findIndex((t) => t.trackID === v.trackID) === i
      );

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
                imageURL:
                  data.body.images.length != 0 ? data.body.images[0].url : "",
                email: data.body.email,
                musicalProfile: musicalProfile,
                topTracks: topTracks, // Add top 50 tracks with their attributes
                topArtists: topArtists, // Add top 30 artists with their attributes
                topGenres: topGenres,
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
                  imageURL:
                    data.body.images.length != 0 ? data.body.images[0].url : "",
                  email: data.body.email,
                  musicalProfile: musicalProfile,
                  topTracks: topTracks,
                  topArtists: topArtists,
                  topGenres: topGenres,
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
