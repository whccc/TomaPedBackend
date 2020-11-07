const {Router} = require("express");
const router = Router();


const {CreateUser,ListUserSeller,EditUserSeller} = require("../Controllers/UserController.js");

router.route("/Create")
       .post(CreateUser);
router.route("/")
      .get(ListUserSeller);
router.route("/Edit")
       .put(EditUserSeller);
      
 module.exports = router;      