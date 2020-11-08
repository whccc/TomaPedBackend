const { Router } = require("express");
const router = Router();


const { Login} = require("../Controllers/LoginController.js");

router.route("/")
      .post(Login);

module.exports = router; 