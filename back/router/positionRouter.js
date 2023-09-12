const express = require("express");

const { verifyToken } = require("../middlewares/index");
const { isPresident } = require("../middlewares/position");

const { roleChange } = require("../controllers/position");

const router = express.Router();

router.post("/roleChange", verifyToken, isPresident, roleChange);

module.exports = router;
