const {Router} = require("express");
const router = Router();


const {CreateUser} = require("../Controllers/UserController.js");

router.route("/Create")
       .post(CreateUser);

 module.exports = router;      