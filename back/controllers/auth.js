const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    console.log(exUser);
    if (exUser) {
      return res.status(404).json({ message: "이미 존재하는 이메일 입니다" });
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.status(200).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
exports.login = (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(error);
      }

      if (!user) {
        return res.status(404).json(`message: ${info.message}`);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }

        // res.cookie("user", user);
        // console.log(res.cookie);
        return res.json({ message: "로그인성공" });
      });
    }
  )(req, res, next); //미들웨어 내의 미들웨어에 붙힘
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.session.destroy(); // 세션도 삭제
      res.status(200).json({ message: "로그아웃하엿습니다" });
    }
  });
};
