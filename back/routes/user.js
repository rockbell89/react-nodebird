const express = require("express");
const { User, Post } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

// login
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

// logout
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
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
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

// get user
router.get("/:userId", async (req, res, next) => {
  console.log("get user");
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
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
          attributes: ["id"],
        },
        {
          model: User,
          as: "Followers",
          attributes: ["id"],
        },
      ],
    });
    if (user) {
      const userInfo = user.toJSON();
      userInfo.Posts = userInfo.Posts.length;
      userInfo.Followers = userInfo.Followers.length;
      userInfo.Followings = userInfo.Followings.length;
      res.status(200).send(userInfo);
    } else {
      res.status(404).send("존재하지않는 사용자입니다");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// signup
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
router.patch("/:userId/follow", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.params.userId),
      },
    });
    if (!user) return res.status(403).send("존재하지 않는 사용자입니다");
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// unfollow
router.delete("/:userId/follow", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.params.userId),
      },
    });
    if (!user) return res.status(403).send("존재하지 않는 사용자입니다");
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// get followers
router.get("/followers", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.user.id),
      },
    });
    console.log("user", user);
    if (!user) return res.status(403).send("존재하지 않는 사용자입니다");
    const followers = await user.getFollowers();
    console.log("followers", followers);
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// get followings
router.get("/followings", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.user.id),
      },
    });
    if (!user) return res.status(403).send("존재하지 않는 사용자입니다");
    const followings = await user.getFollowings();
    console.log("followings", followings);
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// remove follower
router.delete("/follower/:userId", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.params.userId),
      },
    });
    if (!user) return res.status(403).send("존재하지 않는 사용자입니다");
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// change nicnake
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
