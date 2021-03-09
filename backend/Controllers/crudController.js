const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

let User = require("../Models/user.model");
let Group = require("../Models/group.model");

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const backend_url = process.env.BACKEND_URL;
const frontend_url = process.env.FRONTEND_URL;
const scripts = require("../scripts.js");

const redirect_uri = backend_url + "callback"; // Your redirect uri

// instantiate spotifyApi object
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

/**
 * GET method to collect a users information
 *
 * Responds with the user data and req.param needs the spotifyID "userID"
 *
 * @param {userID: String} req userID param required
 * @param {} res All the user data
 */
exports.getUser = async (req, res) => {
  User.findOne({ userID: req.params.id }) // Find the user in collection based on id
    .then((data) => {
      // If user exists respond with data else respond with inability to find
      if (data) {
        res.json(data);
      } else {
        res.json({
          message: "Unable to find user",
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Unable to find user",
        error: err,
      });
    });
};

/**
 * middle ware for creating a group
 * POST method to create a new group
 *
 * @param {} req {groupName: String, spotifyID: String}
 * @param {} res
 */
exports.createGroup = async (req, res) => {
  generatedGroupCode = scripts.generateGroupCode();
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
  let userIDs;
  
  try {
    let data = await Group.findOne({ groupCode: req.params.groupCode });
    userIDs = data.users;
  } catch(err){
    res.json({
      message: "Unable to find group",
      error: err,
    });
  }

  //returning/querying the user documents associated with each userID
  try{
    let data = await User.find({ userID: { $in: userIDs } });
    res.json(data);
  } catch (err) {
    res.json({
      message: "Unable to find users",
      error: err,
    });
  }
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
