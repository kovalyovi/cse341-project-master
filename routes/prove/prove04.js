//TA03 PLACEHOLDER
const express = require("express");
const router = express.Router();
const prove04Controller = require("../../controllers/prove/prove04.js");

router.get("/", prove04Controller.getProducts);
router.get("/product/:productIndex", prove04Controller.getProduct);
router.get("/users", prove04Controller.getUsers);
router.get("/cart-items", prove04Controller.getCartItems);
router.get("/users/add", prove04Controller.getAddUsers);
router.post("/users/add", prove04Controller.addUser);
router.post("/cart/add", prove04Controller.addProductToCart);
router.post("/users/update", prove04Controller.updateUser);
router.post("/users/delete", prove04Controller.deleteUser);
router.post("/cart-items/delete", prove04Controller.deleteFromCart);
router.get("/users/edit/:id", prove04Controller.editUser);
router.get("/search", prove04Controller.getSearchProducts);

module.exports = router;
