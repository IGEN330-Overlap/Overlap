const router = require("express").Router(); //require express router

const Controller = require("./Controller.js");

//define get request for retreiving user information
router.get("/token/:token/user", Controller.getUser)

//define get request for retreiving UserIDs (spotifyIDs) of all users in a group
router.get("/groups/:groupCode/users", Controller.getGroupUsers)

//define post request for making a new group
router.post("/groups/create", Controller.createGroup);

//route post request for new user login
router.post("/users/login", Controller.loginUser);

//define post request for joining a group
router.post("/groups/join", Controller.joinGroup);

module.exports = router;