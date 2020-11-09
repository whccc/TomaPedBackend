const { Router } = require("express");
const router = Router();


const { CreateOrder,FinalizeOrder,CreateDetail,ListOrders} = require("../Controllers/OrderController.js");

router.route("/Create")
      .post(CreateOrder);
router.route("/FinalizeOrder")
      .put(FinalizeOrder);
router.route("/CreateDetail")
      .post(CreateDetail);
router.route("/")
      .get(ListOrders);
module.exports = router; 