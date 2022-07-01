const express = require("express");
const router = express.Router();
console.log("router loaded");
let homeController = require("../controler/home");
router.get("/", homeController.home);

module.exports = router;
