const express = require("express");
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProduct} = require("../controllers/productController");

const router = express.Router();

//Get all the products
router.route("/products").get(getAllProducts);

//Creating a new product
router.route("/product/new").post(createProduct);

//Updating the product
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProduct);

module.exports = router;