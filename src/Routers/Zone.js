const {Router} = require("express");
const router = Router();


const {CreateZone,ListZones,EditZone} = require("../Controllers/ZoneController.js");

router.route("/Create")
       .post(CreateZone);
router.route("/")
      .get(ListZones);
router.route("/Edit")
       .put(EditZone);
 module.exports = router;      