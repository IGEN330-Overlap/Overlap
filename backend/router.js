const router = require("express").Router(); //require express router

const Controller = require("./Controller.js");
const algoTest = require("./Algorithm/algoTest.js");

//define get request for retreiving user information
router.get("/token/:token/user", Controller.getUser)

//define get request for retreiving UserIDs (spotifyIDs) of all users in a group
router.get("/groups/:groupCode/users", Controller.getGroupUsers)

//define get request for retreiving all group codes a single user is a member in
router.get("/users/:userID/groups", Controller.getUserGroups)

//define post request for making a new group
router.post("/groups/create", Controller.createGroup);

//route post request for new user login
router.post("/users/login", Controller.loginUser);

//define post request for joining a group
router.post("/groups/join", Controller.joinGroup);

//define post request for leaving a group
router.post("/groups/leave", Controller.leaveGroup);

// TESTING ALGO
router.get("/test/getTopTracks", algoTest.getMyTopTracks);
router.get("/test/trackFeature", algoTest.getTrackFeatures);
router.get("/test/getTopArtists", algoTest.getMyTopArtists);

module.exports = router;