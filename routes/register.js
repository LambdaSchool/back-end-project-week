const express = require("express");
const router = express.Router();
const helpers = require("../helpers");

router.route("/").post(helpers.register);

module.exports = router;
