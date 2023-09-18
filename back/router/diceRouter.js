// 저장 test
const express = require("express");
const router = express.Router();
const { dataget } = require("../controllers/dice");

//chart.js 전송
router.get("/diceData", dataget);

module.exports = router;
