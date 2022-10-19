const express = require("express");
const { isLoggedIn } = require("../middlewares");
const { Comment, Post, Image, User } = require("../models");
const router = express.Router();

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
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
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

module.exports = router;
