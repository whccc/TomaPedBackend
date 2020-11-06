const {Router} = require("express");
const router = Router();


const {CreateZone} = require("../Controllers/ZoneController.js");

router.route("/Create")
       .post(CreateZone);

 module.exports = router;      