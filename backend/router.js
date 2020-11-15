const router = require("express").Router(); //require express router

const Controller = require("./Controller.js");

router.get("/token/:token/user", Controller.getUser);

module.exports = router;