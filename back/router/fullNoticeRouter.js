const express = require("express");

const { verifyToken } = require("../middlewares/index");
const { isPresident, isManager } = require("../middlewares/position");

const { notify } = require("../controllers/fullNotice");

const router = express.Router();

router.post("/fullNotice", verifyToken, isPresident, isManager, notify);

module.exports = router;
