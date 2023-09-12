const bcrypt = require("bcrypt");
const passport = require("passport");
const { createToken } = require("../middlewares/index");
const User = require("../models/user");
const Position = require("../models/position");

exports.signup = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const exUser = await User.findOne({
      where: { email },
    });
    if (exUser) {
      return res.status(404).json({ message: "이미 존재하는 이메일 입니다" });
    }
    if (!name) {
      return res.status(404).json({ message: "이름을 입력해 주세요" });
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      name,
      password: hash,
      positionId: 3,
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

        try {
          //사용자 직급 추가
          const userRole = await User.findOne({
            where: { userId: user.userId },
            include: [{ model: Position, as: "Position" }],
          });

          if (!userRole) {
            return res.status(404).json({ message: "없는 사용자 입니다" });
          }
          const role = userRole.Position.dataValues.role;

          // 로그인 성공 후 토큰 생성
          const token = createToken(user);

          return res.json({
            message: "로그인성공",
            token,
            role,
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
