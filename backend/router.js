const router = require("express").Router(); //require express router

//Controller imports
const crudController = require("./Controllers/crudController.js");
const loginController = require("./Controllers/loginController.js");
const algorithmController = require("./Controllers/algorithmController.js");

//Algorithm test imports
const algoTest = require("./Algorithm/algoTest.js");
const algoController = require("./Algorithm/algo_controller.js");

//define get request for retreiving user information
router.get("/users/:id/user", crudController.getUser);

//define get request for retreiving all users in a group
router.get("/groups/:groupCode/users", crudController.getGroupUsers);

//define get request for retreiving all groups a single user is in
router.get("/users/:userID/groups", crudController.getUserGroups);

//define post request for making a new group
router.post("/groups/create", crudController.createGroup);

//route post request for new user login
router.post("/users/login", loginController.loginUser);

//define post request for joining a group
router.post("/groups/join", crudController.joinGroup);

//define post request for leaving a group
router.post("/groups/leave", crudController.leaveGroup);

//define post request for creating spotify playlist
router.post("/groups/addToSpotify", algorithmController.createSpotifyPlaylist);

//define post request for generating playlist
router.post("/groups/generatePlaylist", algorithmController.generateGroupsTopPlaylist);

//define get request for a previously generated playlist
router.get("/groups/:playlistID/playlist", algorithmController.getGroupPlaylist);

// TESTING ALGO
router.get("/test/getTopTracksNoAttributes", algoTest.getMyTopTracks);
router.get("/test/trackFeature", algoTest.getTrackFeatures);
router.get("/test/getTopArtists", algoTest.getMyTopArtists);
router.get("/test/getTopTrackIDs", algoTest.getTopTrackIds);
router.get("/test/getTopTracks", algoController.getMyTopTracks);
router.post("/test/buildSpotifyPlaylist", algoController.buildSpotifyPlaylist);
router.get("/test/getRecommendations", algoController.getRecommendations);

module.exports = router;
