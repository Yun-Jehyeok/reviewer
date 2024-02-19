const express = require('express');
const { User } = require('../../models/user');
const { Application } = require('../../models/application');

const router = express.Router();

router.post('/apply', (req, res) => {
  const { applicantId, reviewerId } = req.body;

  let applicant = User.findOne({ _id: applicantId });
  let reviewer = User.findOne({ _id: reviewerId });

  if (!applicant)
    return res
      .status(400)
      .json({ success: false, msg: '로그인이 필요한 서비스입니다.' });
  if (!reviewer)
    return res
      .status(400)
      .json({ success: false, msg: '해당 리뷰어를 찾을 수 없습니다.' });

  const newApplication = new Application({
    applicantId,
    reviewerId,
  });

  newApplication.save().then(() => {
    User.findByIdAndUpdate(reviewerId, {
      $push: {
        applications: newApplication._id,
      },
    })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((e) => {
        res.status(400).json({ success: false, msg: e.msg });
      });
  });
});

module.exports = router;
