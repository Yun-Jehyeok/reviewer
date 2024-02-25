const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const config = require('../../config/index');
const { auth } = require('../../middleware/auth');
const coolsms = require('coolsms-node-sdk');

const { JWT_SECRET, COOLSMS_APIKEY, COOLSMS_APIKEY_SECRET } = config;

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

          delete user.password;
          res.json({
            success: true,
            token,
            user,
          });
        },
      );
    });
  });
});

router.post('/register', (req, res) => {
  const { name, email, password, phone, nickname } = req.body;

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
                user: delete user.password,
              });
            },
          );
        });
      });
    });
  });
});

router.post('/phone', async (req, res) => {
  const { phone } = req.body;

  let authNum = '';
  for (let i = 0; i < 6; i++) {
    authNum += Math.floor(Math.random() * 10);
  }

  const mysms = coolsms.default;
  const messageService = new mysms(COOLSMS_APIKEY, COOLSMS_APIKEY_SECRET);
  const result = await messageService.sendOne({
    to: phone,
    from: '01056294023',
    text: `인증번호 [${authNum}]를 입력해주세요.`,
  });

  if (result.statusCode === '2000')
    return res.status(200).json({ success: true, msg: authNum });

  return res.status(400).json({ success: false, msg: '인증 문자 전송 실패' });
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
