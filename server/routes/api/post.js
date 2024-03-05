const express = require('express');
const { Post } = require('../../models/post');
const { User } = require('../../models/user');

const router = express.Router();

router.get('/skip/:page', async (req, res) => {
  try {
    let page = (Number(req.params.page) - 1) * 16;

    const postCount = await Post.countDocuments();
    const postFindResult = await Post.find()
      .skip(page)
      .limit(16)
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      allPostsCnt: postCount,
      posts: postFindResult,
    });
  } catch (e) {
    res.status(400).json({ success: false, msg: e.message });
  }
});

router.post('/', (req, res) => {
  const { userId, title, content, lang, price } = req.body;

  User.findOne({ _id: userId }).then((user) => {
    if (!user) return res.status(400).json({ success: false });

    const newPost = new Post({
      title,
      content,
      lang,
      price,
      creator: userId,
    });

    newPost.save().then(() => {
      User.findByIdAndUpdate(userId, {
        $push: {
          posts: newPost._id,
        },
      })
        .then(() => {
          res.status(200).json({ success: true, id: newPost._id });
        })
        .catch((e) => {
          res.status(400).json({ success: false });
        });
    });
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Post.findOne({ _id: id }).then((post) => {
    if (!post)
      return res
        .status(400)
        .json({ success: false, msg: '해당 게시글이 존재하지 않습니다.' });

    res.status(200).json({ success: true, post: post });
  });
});

module.exports = router;
