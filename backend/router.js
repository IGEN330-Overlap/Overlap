const router = require("express").Router(); //require express router

const Controller = require("./Controller.js");
const SpotifyRequests = require("./Algorithm/SpotifyRequests.js");

//define get request for retreiving user information
router.get("/token/:token/user", Controller.getUser)

//define post request for making a new group
router.post("/groups/create", Controller.createGroup);

//route post request for new user login
router.post("/users/login", Controller.loginUser);

//define post request for joining a group
router.post("/groups/join", Controller.joinGroup);

// TESTING ALGO
router.get("/test/getTopTracks", SpotifyRequests.getMyTopTracks);
router.get("/test/trackFeature", SpotifyRequests.getTrackFeatures);
router.get("/test/getTopArtists", SpotifyRequests.getMyTopArtists);

module.exports = router;