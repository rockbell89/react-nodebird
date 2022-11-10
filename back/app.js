// app.js
// const http = require("http");
// const server = http.createServer((req, res) => {
//   console.log("hello nodejs!");
//   res.write("<h1>on server!</h1>");
//   res.end("end");
// });
// server.listen(3065, () => {
//   console.log("서버 실행중!");
// });

const express = require("express");
const app = express();
const port = 3065;
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const passportConfig = require("./passport");
const db = require("./models");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
dotenv.config();
const hpp = require("hpp");
const helmet = require("helmet");

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공!");
  })
  .catch(console.error);
passportConfig();

// middleware

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan("dev")); // request debugging
}
app.use(
  cors({
    origin: process.env.SITE_URL, // true - dev
    credentials: true, // true - cookie
  })
);

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.session());
app.use(passport.initialize());

// router
app.use("/post", postRouter);
app.use("/user", userRouter);

// error middlware

//
app.listen(port, () => {
  console.log(`${port} : 서버 실행 중!`);
});
