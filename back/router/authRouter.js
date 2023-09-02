const express = require("express");
const passport = require("passport");
const {
  isLoggedIn,
  isNotLoggedIn,
  verifyToken,
  createToken,
} = require("../middlewares/index");
const { signup, login, logout } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", isNotLoggedIn, signup);

router.post("/login", isNotLoggedIn, login);

router.get("/kakao", passport.authenticate("kakao"));

router.get("/kakao/callback", (req, res, next) => {
  passport.authenticate("kakao", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      // 인증 실패
      return res.status(401).json({ message: "카카오 로그인 실패" });
    }
    // 인증 성공
    req.logIn(user, function (err) {
      if (err) {
        console.error(err);
        return next(err);
      }

      // 로그인 성공 후 리다이렉트
      return res.redirect("http://localhost:3000/");
    });
  })(req, res, next);
});

router.get("/logout", verifyToken, logout);

module.exports = router;
