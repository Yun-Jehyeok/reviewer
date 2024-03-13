const express = require('express');
const { User } = require('../../models/user');
const { Review } = require('../../models/review');
const { Post } = require('../../models/post');
const { Application } = require('../../models/application');

const router = express.Router();

// Get All Reviews
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Review.find({ postId: id })
    .then((reviews) => {
      if (!reviews)
        return res
          .status(400)
          .json({ success: false, msg: '리뷰가 없습니다.' });

      res.status(200).json({ success: true, reviews });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: err.msg });
    });
});

// Create Review
router.post('/', (req, res) => {
  const { creator, nickname, content, score, postId, appId } = req.body;

  const newReview = new Review({
    creator,
    nickname,
    content,
    score,
    postId,
  });

  newReview.save().then(() => {
    Post.findByIdAndUpdate(postId, {
      $push: {
        reviews: newReview._id,
      },
    })
      .then(() => {
        Application.findByIdAndUpdate(appId, {
          review: newReview._id,
        })
          .then(() => {
            res.status(200).json({ success: true });
          })
          .catch((e) => {
            res.status(400).json({ success: false, msg: e.msg });
          });
      })
      .catch((e) => {
        res.status(400).json({ success: false, msg: e.msg });
      });
  });
});

module.exports = router;
