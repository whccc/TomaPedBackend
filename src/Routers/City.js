const {Router} = require("express");
const router = Router();


const {CreateCity} = require("../Controllers/CityController.js");

router.route("/Create")
       .post(CreateCity);
      
 module.exports = router; 