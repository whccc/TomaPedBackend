const {Router} = require("express");
const router = Router();


const {CreateUser,ListUserSeller} = require("../Controllers/UserController.js");

router.route("/Create")
       .post(CreateUser);
router.route("/")
      .get(ListUserSeller);
      
 module.exports = router;      