const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const login = require("../middleware/login");
const Post = mongoose.model("Post");

router.get("/allpost", login, (req, res) => {
  Post.find()
    .populate("comments.postedBy", "_id, name")
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

router.get("/posts/:postId", (req, res) => {
  const postId = req.params.postId;

  // MongoDB dan postni olish va uni sahifaga jo'natish
  Post.findById(postId)
    .populate("comments.postedBy", "_id, name")
    .populate("postedBy", "_id, name")
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post topilmadi" });
      }
      res.json(post);
    })

    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Serverda xatolik yuz berdi" });
    });
});

router.put("/comments", login, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id, name")
    .populate("postedBy", "_id, name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else res.json(result);
    });
});

module.exports = router;
