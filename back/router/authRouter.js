const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/index");
const { signup, login, logout } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", isNotLoggedIn, signup);

router.post("/login", isNotLoggedIn, login);

router.get("/logout", isLoggedIn, logout);

module.exports = router;
