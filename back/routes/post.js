const express = require("express");
const { isLoggedIn } = require("../middlewares");
const { Comment, Post, Image, User, Hashtag } = require("../models");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 이미지 저장 디렉토리
const dirPath = "uploads";
try {
  fs.accessSync(dirPath);
} catch (error) {
  fs.mkdirSync(dirPath);
}

// upload image
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출
      const basename = path.basename(file.originalname, ext);
      done(null, `${basename}-${new Date().getTime()}${ext}`);
    },
  }),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

// find all
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 50,
      // offset: 0,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Image,
        },
        {
          model: Comment,
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// create
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    const hashtags = req.body.content.match(/(#[^\s]+)/);

    // hashtag
    if (hashtags) {
      const newHastag = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            // 종복 값이 없을 경우에 생성
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      console.log("newHashtag", newHastag);
      // if (newHastag) {
      //   await post.addHashtags(newHastag.map((tag) => tag[0]));
      // }
    }

    // image
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const newPost = await Post.findOne({
      where: {
        id: post.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) return res.status(403).send("존재하지 않는 게시글입니다");

    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId),
      UserId: req.user.id,
    });

    const newComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// PATCH
router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) return res.status(403).send("게시글이 존재하지 않습니다.");
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DELETE
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) return res.status(401).send("존재하지않는 게시물입니다");
    await Post.destroy({
      where: {
        id: post.id,
        UserId: req.user.id,
      },
    });
    res.status(200).json({
      PostId: post.id,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) return res.status(403).send("게시글이 존재하지 않습니다.");
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post(
  "/images",
  isLoggedIn,
  upload.array("image"), // single , array, none
  async (req, res, next) => {
    console.log("req.files", req.files);
    res.json(req.files.map((image) => image.filename));
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = router;
