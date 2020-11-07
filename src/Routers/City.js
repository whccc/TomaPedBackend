const { Router } = require("express");
const router = Router();


const { CreateCity,ListCities,EditCity } = require("../Controllers/CityController.js");

router.route("/Create")
      .post(CreateCity);
router.route("/")
      .get(ListCities);
router.route("/Edit")
      .put(EditCity);

module.exports = router; 