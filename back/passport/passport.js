const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = () => {
  //로그인시 실행, req.session 객체에 데이터 저장
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  //각 요청마다 실행 passport.session 미들웨어가 호출
  //조회한 정보를 req.user에 저장 -> 로그인한 사용자의 정보를 조회
  passport.deserializeUser((email, done) => {
    User.findOne({ where: { email } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: true,
        passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다" });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
