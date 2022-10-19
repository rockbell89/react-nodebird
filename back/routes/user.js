const express = require("express");
const { User, Post } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      console.log(error);
      next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.log("loginError", loginError);
        return next(loginError);
      }
      const result = await User.findOne({
        where: {
          id: user.id,
        },
        attributes: ["id", "email", "nickname"],
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      return res.status(201).json(result);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("성공적으로 로그아웃되었습니다!");
});

// user
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      const result = await User.findOne({
        where: {
          id: user.id,
        },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      res.status(200).json(result);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) return res.status(403).send("이미 존재하는 사용자입니다");

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send("회원가입이 완료되었습니다.");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// follow

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    const nickname = User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    });
    if (nickname) return res.status(401).send("이미 존재하는 닉네임입니다");
    await User.update(
      { nickname: req.body.nickname },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    res.status(201).json({
      nickname: req.body.nickname,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
