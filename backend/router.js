const router = require("express").Router(); //require express router

const Controller = require("./Controller.js");
const algoTest = require("./Algorithm/algoTest.js");

//define get request for retreiving user information
router.get("/token/:token/user", Controller.getUser)

//define post request for making a new group
router.post("/group/create", Controller.createGroup);

//route post request for new user login
router.post("/users/login", Controller.loginUser);

// TESTING ALGO
router.get("/test/getTopTracks", algoTest.getMyTopTracks);
router.get("/test/trackFeature", algoTest.getTrackFeatures);
router.get("/test/getTopArtists", algoTest.getMyTopArtists);

module.exports = router;