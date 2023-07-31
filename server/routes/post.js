const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const login = require("../middleware/login");
const Post = mongoose.model("Post");

router.get("/allpost", login, (req, res) => {
  Post.find()
    .populate("postedBy", "_id, name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", login, (req, res) => {
  const { body, photo } = req.body;
  if (!body) {
    return res.status(422).json({ error: "Please add all fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    // title: title,
    body,
    photo,
    postedBy: req.user,
  });
  console.log(req.user);
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", login, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id, name")
    .then((myPost) => {
      res.json({ myPost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", login, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/unlike", login, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
