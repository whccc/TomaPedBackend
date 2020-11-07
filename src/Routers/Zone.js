const {Router} = require("express");
const router = Router();


const {CreateZone,ListZones} = require("../Controllers/ZoneController.js");

router.route("/Create")
       .post(CreateZone);
router.route("/")
      .get(ListZones)
 module.exports = router;      