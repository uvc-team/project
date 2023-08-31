const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

const { sequelize } = require("./models/index");
const passportConfig = require("./passport/passport");
const authRouter = require("./router/authRouter");
const cors = require("cors");
const app = express();

passportConfig();

// port 설정
app.set("port", process.env.PORT || 8080);

// DB연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//cors설정
app.use(
  cors({
    origin: "http://192.168.0.124:3000",
    // origin: true, //전체허용
    credentials: true,
  })
);

//모든요청의 응답헤더에 cors정책 설정
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://192.168.0.124:3000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// 라우터
app.use("/auth", authRouter);

// 에러 핸들링
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
