// 저장 test
const express = require("express");
const router = express.Router();
const { saveDiceData, dataget } = require("../controllers/dice");

router.post("/diceSave", saveDiceData);

router.get("/diceData", dataget);

module.exports = router;
