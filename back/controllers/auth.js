const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
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

      return req.login(user, async (loginError) => {
        // async 추가
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }

        // 로그인 성공 후 토큰 생성
        try {
          const token = jwt.sign(
            { id: user.id, nick: user.nick }, // user 정보 사용
            process.env.JWT_SECRET,
            { expiresIn: "1m" }
          );
          // 토큰과 함께 응답 전송
          return res.json({
            message: "로그인성공",
            token,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            code: 500,
            message: "서버에러",
          });
        }
      });
    }
  )(req, res, next);
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

// exports.tokenLogout = (req, res) => {

// }
