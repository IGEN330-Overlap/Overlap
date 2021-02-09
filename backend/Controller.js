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

//get current user middleware
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

//create a new group middleware
//parameters: (name, spotifyID) where name is the group name and spotifyID
//            is the spotifyID of the group leader
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

//middleware for user login
//handles both new and returning user login
exports.loginUser = async (req, res) => {
  //set refresh token
  spotifyApi.setRefreshToken(req.body.refreshToken);

  //set new access token
  spotifyApi.refreshAccessToken().then(
    async (data) => {
      spotifyApi.setAccessToken(data.body.access_token);

      let topTracks = [];

      //get user's top 3 tracks
      await spotifyApi
        .getMyTopTracks()
        .then((data) => {
          for (let i = 0; i < 3; i++) {
            let track = {};
            track.songName = data.body.items[i].name;
            track.songID = data.body.items[i].id;
            track.songPopularity = data.body.items[i].popularity;
            track.linkURL = data.body.items[i].external_urls.spotify;
            track.imageURL = data.body.items[i].album.images[0].url;
            track.artistName = data.body.items[i].artists[0].name;

            topTracks.push(track);
          }
        })
        .catch((err) => {
          res.json({ message: "Unable to get user top tracks.", error: err });
          return;
        });
      
      let topArtists = [];

      //get user's top three artists
      await spotifyApi
        .getMyTopArtists()
        .then((data) => {
          for (let i = 0; i < 3; i++) {
            let artist = {};
            artist.artistName = data.body.items[i].name;
            artist.artistID = data.body.items[i].id;
            artist.followerCount = data.body.items[i].followers.total;
            artist.artistPopularity = data.body.items[i].popularity;
            artist.imageURL = data.body.items[i].images[0].url;
            artist.linkURL = data.body.items[i].external_urls.spotify;

            topArtists.push(artist);
          }
        })
        .catch((err) => {
          res.json({ message: "Unable to get user top artists.", error: err });
          return;
        });

      //get user object from SpotifyAPI
      spotifyApi.getMe().then(
        (data) => {
          //update user object with new information, and create if not already existing
          User.updateOne(
            { userID: data.body.id }, //Filter
            {
              $set: {
                userID: data.body.id,
                refreshToken: req.body.refreshToken,
                name: data.body.display_name,
                imageURL: data.body.images[0].url,
                email: data.body.email,
                topTracks: [topTracks[0], topTracks[1], topTracks[2]],
                topArtists: topArtists,
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

//middleware for group joining endpoint
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

//middleware for getting all userIDs of users in a group.
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

//middleware for getting all groupcodes for a single user
exports.getUserGroups = async (req, res) => {
  User.findOne({ userID: req.params.userID })
    .then(function (data) {
      res.json(data.groups);
    })

    .catch((err) => {
      res.json({
        message: "Unable to find user",
        error: err,
      });
    });
};
