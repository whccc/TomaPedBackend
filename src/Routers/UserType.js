const {Router} = require("express");
const router = Router();


const {CreateUserType} = require("../Controllers/UserTypeController.js");

router.route("/Create")
       .post(CreateUserType);

 module.exports = router;      