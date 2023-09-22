// 저장 test
const express = require("express");
const router = express.Router();
const { dataget, saveDiceData } = require("../controllers/dice");

//chart.js 전송
router.get("/diceData", dataget);

router.post("/diceSave", saveDiceData);
module.exports = router;
