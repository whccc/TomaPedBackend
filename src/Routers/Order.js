const { Router } = require("express");
const router = Router();


const { CreateOrder,FinalizeOrder} = require("../Controllers/OrderController.js");

router.route("/Create")
      .post(CreateOrder);
router.route("/FinalizeOrder")
      .put(FinalizeOrder);

module.exports = router; 