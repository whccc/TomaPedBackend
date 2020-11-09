const { Router } = require("express");
const router = Router();


const { CreateOrder,FinalizeOrder,CreateDetail} = require("../Controllers/OrderController.js");

router.route("/Create")
      .post(CreateOrder);
router.route("/FinalizeOrder")
      .put(FinalizeOrder);
router.route("/CreateDetail")
      .post(CreateDetail);

module.exports = router; 