const router = require("express").Router(); //require express router

const Controller = require("./Controller.js");
const algoTest = require("./Algorithm/algoTest.js");
const algoController = require("./Algorithm/algo_controller.js")

//define get request for retreiving user information
router.get("/users/:id/user", Controller.getUser)

//define get request for retreiving all users in a group
router.get("/groups/:groupCode/users", Controller.getGroupUsers)

//define get request for retreiving all groups a single user is in
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
router.get("/test/getTopTracksNoAttributes", algoTest.getMyTopTracks);
router.get("/test/trackFeature", algoTest.getTrackFeatures);
router.get("/test/getTopArtists", algoTest.getMyTopArtists);
router.get("/test/getTopTrackIDs", algoTest.getTopTrackIds);
router.get("/test/getTopTracks", algoController.getMyTopTracks);

module.exports = router;