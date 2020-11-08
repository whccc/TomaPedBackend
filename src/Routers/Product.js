const {Router} = require("express");
const router = Router();


const {CreateProduct,ListProducts,GetArchivo,EditProduct,GetProduct} = require("../Controllers/ProductController.js");

router.route("/Create")
       .post(CreateProduct);
router.route("/")
       .get(ListProducts);           
router.route("/:strCode")
       .get(GetProduct);
router.route("/img/:Img")
       .get(GetArchivo);       
router.route("/Edit")
       .put(EditProduct);
 module.exports = router;      