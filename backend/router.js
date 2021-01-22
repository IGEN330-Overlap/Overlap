const router = require("express").Router(); //require express router

const Controller = require("./Controller.js");

//define get request for retreiving user information
router.get("/token/:token/user", Controller.getUser)


//define post request for making a new group
router.post("/group/create", Controller.createGroup);

//router.get("/group/codeGenerator",scripts.generate);


module.exports = router;