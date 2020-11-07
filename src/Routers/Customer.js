const {Router} = require("express");
const router = Router();


const {CreateCustomer,ListCustomers,EditCustomer} = require("../Controllers/CustomerController.js");

router.route("/Create")
       .post(CreateCustomer);
router.route("/")
       .get(ListCustomers);       
router.route("/Edit")
       .put(EditCustomer);

 module.exports = router;      