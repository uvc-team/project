const bcrypt = require("bcrypt");
const passport = require("passport");
const { createToken } = require("../middlewares/index");
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(404).json({ message: "이미 존재하는 이메일 입니다" });
    }
    const exnick = await User.findOne({ where: { nick } });
    if (exnick) {
      return res.status(404).json({ message: "중복되는 닉네임 입니다." });
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
          const token = createToken(user);

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

exports.nickChange = async (req, res, next) => {
  const { email, newnick, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    const samenick = await User.findOne({ where: { nick: newnick } });

    if (!user) {
      return res.status(404).json({ message: "존재하지 않는 이메일입니다." });
    }

    if (!newnick) {
      return res.status(400).json({ message: "닉네임을 입력해주세요." });
    }

    if (samenick) {
      return res.status(400).json({ message: "중복되는 닉네임입니다." });
    }

    // 입력된 비밀번호와 저장된 해시 값의 일치 여부 확인
    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    user.nick = newnick;

    await user.save();

    return res.status(200).json({ message: "닉네임 변경 성공" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
