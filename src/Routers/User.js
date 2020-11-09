const {Router} = require("express");
const router = Router();


const {CreateUser,ListUserSeller,EditUserSeller,GetNroUsers} = require("../Controllers/UserController.js");

router.route("/Create")
       .post(CreateUser);
router.route("/")
      .get(ListUserSeller);
router.route("/Edit")
       .put(EditUserSeller);
router.route("/NroUser")
      .get(GetNroUsers)
 module.exports = router;      