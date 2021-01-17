const router = require("express").Router(); //require express router

const Controller = require("./Controller.js");

//route get request for retreiving user information
router.get("/token/:token/user", Controller.getUser);

//route post request for new user login
router.post("/users/login", Controller.loginUser);

module.exports = router;