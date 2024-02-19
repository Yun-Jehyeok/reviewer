const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const config = require('../../config/index');
const { auth } = require('../../middleware/auth');

const { JWT_SECRET } = config;

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res
      .status(400)
      .json({ success: false, msg: '이메일을 작성해주세요.' });
  else if (!password)
    return res
      .status(400)
      .json({ success: false, msg: '비밀번호를 작성해주세요.' });

  User.findOne({ email }).then((user) => {
    if (!user)
      return res
        .status(400)
        .json({ success: false, msg: '이메일을 확인해주세요.' });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res
          .status(400)
          .json({ success: false, msg: '비밀번호를 확인해주세요.' });

      jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) return res.status(400).json({ success: false, msg: err });

          res.json({
            success: true,
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        },
      );
    });
  });
});

router.post('/register', (req, res) => {
  const { name, email, password, phone, nickname } = req.body;

  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: '이름을 작성해주세요.' });
  else if (!email)
    return res
      .status(400)
      .json({ success: false, msg: '이메일을 작성해주세요.' });
  else if (!password)
    return res
      .status(400)
      .json({ success: false, msg: '비밀번호를 입력해주세요.' });
  else if (!phone)
    return res
      .status(400)
      .json({ success: false, msg: '휴대폰 번호를 입력해주세요.' });
  else if (!nickname)
    return res
      .status(400)
      .json({ success: false, msg: '닉네임을 입력해주세요.' });

  User.findOne({ email }).then((user) => {
    if (user)
      return res
        .status(400)
        .json({ success: false, msg: '이미 존재하는 이메일입니다.' });

    const newUser = new User({
      name,
      email,
      password,
      phone,
      nickname,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ err });

        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) return res.status(400).json({ err });

              res.json({
                success: true,
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            },
          );
        });
      });
    });
  });
});

router.post('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(400).json({ msg: '유저가 존재하지 않습니다.' });
    }

    const userRes = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.json({ success: true, user: userRes });
  } catch (e) {
    res.status(400).json({ success: false, msg: e.message });
  }
});

module.exports = router;
