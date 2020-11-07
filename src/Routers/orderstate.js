const {Router} = require("express");
const router = Router();


const {CreateOrderState} = require("../Controllers/OrderStateController.js");

router.route("/Create")
       .post(CreateOrderState);

 module.exports = router;      