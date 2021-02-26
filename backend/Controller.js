const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

let User = require("./Models/user.model");
let Group = require("./Models/group.model");

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const backend_url = process.env.BACKEND_URL;
const frontend_url = process.env.FRONTEND_URL;
const groupCodeGenerator = require("./scripts.js");

const redirect_uri = backend_url + "callback"; // Your redirect uri

// instantiate spotifyApi object
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

// Initial Tester
exports.getUser = async (req, res) => {
  spotifyApi.setAccessToken(req.params.token);

  spotifyApi.getMe().then(
    (data) => {
      res.json(data);
    },
    (err) => {
      res.status(400).json(err);
    }
  );
};

/**
 * middle ware for creating a group
 * POST method to create a new group
 *
 * @param {} req {groupName: String, spotifyID: String}
 * @param {} res
 */
exports.createGroup = async (req, res) => {
  generatedGroupCode = groupCodeGenerator.generate();
  //create a new instance of the group model named newGroup
  const newGroup = new Group({
    //format for storing data for the group model
    groupCode: generatedGroupCode,
    groupName: req.body.name,
    groupLeader: req.body.spotifyID,
    users: req.body.spotifyID,
  });

  newGroup
    .save() //.save() is a mongoose method for storing newGroup in database
    .then((result) => {
      //Add group to user who created the group
      User.updateOne(
        { userID: req.body.spotifyID },
        { $addToSet: { groups: generatedGroupCode } }
      )
        .then(() => {
          //response status to creating a new group
          res.status(201).json({
            message: "Group created",
            return: result,
          });
        })
        //error when updating User object with new group code
        .catch((err) =>
          res.json({
            message: "Error when updating User object with new group code",
            error: err,
          })
        );
    })
    //error when saving new group
    .catch((err) =>
      res.json({
        message: "Error when saving new group",
        error: err,
      })
    );
};

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

      let topTracks = [];
      let topTrackIDs = [];

      //get user's top 50 tracks
      await spotifyApi
        .getMyTopTracks({ limit: 50 })
        .then((data) => {
          for (x of data.body.items) {
            let track = {};
            track.trackName = x.name;
            track.trackID = x.id;
            track.trackPopularity = x.popularity;
            track.linkURL = x.external_urls.spotify;
            track.imageURL = x.album.images[0].url;
            track.artistName = x.artists[0].name;

            topTrackIDs.push(x.id);
            topTracks.push(track);
          }
        })
        .catch((err) => {
          res.json({ message: "Unable to get user top tracks.", error: err });
          return;
        });

      //get the corresponding top track features to those 50 songs
      await spotifyApi
        .getAudioFeaturesForTracks(topTrackIDs)
        .then((data) => {
          var i = 0;
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
              // topTracks[i]['liveness'] = x.liveness; Ignore for now
              // note liveness if added needs to be in the model as well (type: Number)
              topTracks[i]["valence"] = x.valence;
              topTracks[i]["duration_ms"] = x.duration_ms;
            } else {
              break; // theoretically should probably throw an error but break for now for simplicity
            }
            i++; // iterate for the next item to add in our topTracks array
          }
        })
        .catch((err) => {
          res.json({ message: "Unable to get user top artists.", error: err });
          return;
        });

      let topArtists = [];
      //get user's top 30 artists
      await spotifyApi
        .getMyTopArtists({ limit: 25 })
        .then((data) => {
          // iterate over data and add relevant artist attributes
          for (x of data.body.items) {
            let artist = {};
            artist.artistName = x.name;
            artist.artistID = x.id;
            artist.followerCount = x.followers.total;
            artist.artistPopularity = x.popularity;
            artist.imageURL = x.images[0].url;
            artist.linkURL = x.external_urls.spotify;

            topArtists.push(artist);
          }
        })
        .catch((err) => {
          res.json({ message: "Unable to get user top artists.", error: err });
          return;
        });

      // initiate vars for the musical profile
      var pop = ( dnce = nrgy = spch = acst = inst = vale = 0);
      // Calculate their musical profile (use averages for now) (calc sums and div n)
      for (x of topTracks) {
        pop += x.popularity;
        dnce += x.danceability;
        nrgy += x.energy;
        spch += x.speechiness;
        acst += x.acousticness;
        inst += x.instrumentalness;
        vale += x.valence;
      }
      pop /= 50;
      dnce /= 50;
      nrgy /= 50;
      spch /= 50;
      acst /= 50;
      inst /= 50;
      vale /= 50;

      musicalProfile = {
        danceability: dnce,
        energy: nrgy,
        speechiness: spch,
        acousticness: acst,
        instrumentalness: inst,
        valence: vale,
      };

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
                imageURL: data.body.images[0].url,
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
                  imageURL: data.body.images[0].url,
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

/**
 * Middleware for group joining end point
 * POST method that lets a user join a desired group
 
 * @param {} req {groupCode: String, spotifyID: String}
 * @param {} res
 */
exports.joinGroup = async (req, res) => {
  //add userID to the group object
  Group.updateOne(
    { groupCode: req.body.groupCode }, //filter
    { $addToSet: { users: req.body.spotifyID } }
  )
    .then(() => {
      //add groupCode to user object
      User.updateOne(
        { userID: req.body.spotifyID }, //filter
        { $addToSet: { groups: req.body.groupCode } }
      )
        .then(() => {
          res.json({
            message: "Successfully joined group",
            groupCode: req.body.groupCode,
          });
        })
        //error with adding group to user object
        .catch((err) => {
          res.json({
            message: "Unable to add group to user object",
            error: err,
          });
        });
    })
    //error with adding user to group object
    .catch((err) => {
      res.json({
        message: "Unable to add user to group object",
        error: err,
      });
    });
};


/** 
 * Middleware for group leaving endpoint
 * POST method that lets users leave a group
 *
 * @param {} req {groupCode: String, spotifyID: String}
 * @param {} res
 */
exports.leaveGroup = async (req, res) => {
  //remove userID from group object
  Group.updateOne(
    { groupCode: req.body.groupCode }, //filters for the specified group
    { $pull: { users: req.body.spotifyID } } //remove userID from users field
  )
    .then(() => {
      //remove groupCode from user object
      User.updateOne(
        { userID: req.body.spotifyID }, //filters for specified user
        { $pull: { groups: req.body.groupCode } } //remove groupCode from groups field
      )
        .then(() => {
          res.json({
            message: "Successfully left group",
            groupCode: req.body.groupCode,
          });
        })
        //error with removing groupCode from user object
        .catch((err) => {
          res.json({
            message: "Unable to remove group from user object",
            error: err,
          });
        });
    })
    //error removing userID from group object
    .catch((err) => {
      res.json({
        message: "Unable to remove user from group object",
        error: err,
      });
    });
};

//middleware for getting all userIDs of users in a group.
/**
 * GET method for all the users in a group
 *
 * @param {groupCode: String} req
 * @param {} res
 */
exports.getGroupUsers = async (req, res) => {
  Group.findOne({ groupCode: req.params.groupCode })
    .then(function (data) {
      res.json(data.users);
    })

    .catch((err) => {
      res.json({
        message: "Unable to find group",
        error: err,
      });
    });
};

/**
 * GET method for getting all the groups a user is in
 * @param {userID: String} req 
 * @param {} res 
 */
exports.getUserGroups = async (req, res) => {
  let groupIDs;

  //get user's groups
  try {
    let data = await User.findOne({ userID: req.params.userID });
    groupIDs = data.groups;
  } catch (err) {
    res.json({
      message: "Unable to find user",
      error: err,
    });
  }

  //query groups using the groupIDs
  try {
    let data = await Group.find({ groupCode: { $in: groupIDs } });
    res.json(data);
  } catch (err) {
    res.json({
      message: "Unable to find groups",
      error: err,
    });
  }
};
