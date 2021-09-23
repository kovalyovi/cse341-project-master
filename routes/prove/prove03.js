//TA03 PLACEHOLDER
const express = require("express");
const router = express.Router();
const prove03Controller = require("../../controllers/prove/prove03.js");

router.get("/", prove03Controller.getProducts);
router.get("/users", prove03Controller.getUsers);
router.get("/search", prove03Controller.getSearchProducts);

module.exports = router;
