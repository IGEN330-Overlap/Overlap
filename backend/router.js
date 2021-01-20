const router = require("express").Router(); //require express router

const Controller = require("./Controller.js");

//define get request for retreiving user information
router.get("/token/:token/user", Controller.getUser);

router.post("/group/create", Controller.createGroup);


module.exports = router;