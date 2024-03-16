const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const config = require('../../config/index');
const { auth } = require('../../middleware/auth');
const coolsms = require('coolsms-node-sdk');
const { Post } = require('../../models/post');
const nodemailer = require('nodemailer');

const {
  JWT_SECRET,
  COOLSMS_APIKEY,
  COOLSMS_APIKEY_SECRET,
  NODEMAILER_USER,
  NODEMAILER_PASS,
} = config;

const router = express.Router();

router.get('/:token', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(400).json({ msg: '유저가 존재하지 않습니다.' });
    }

    res.json({ success: true, user });
  } catch (e) {
    res.status(400).json({ success: false, msg: e.message });
  }
});

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

router.delete('/withdrawal/:id', async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    await Post.deleteMany({ creator: req.params.id });

    return res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
});

router.post('/email', async (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).then(async (user) => {
    if (!user)
      return res
        .status(400)
        .json({ success: false, msg: '이메일을 확인해주세요.' });

    let authNum = '';
    for (let i = 0; i < 6; i++) {
      authNum += Math.floor(Math.random() * 10);
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmlail.com',
      port: 587,
      secure: false,
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS,
      },
    });

    let mailOptions = {
      from: NODEMAILER_USER,
      to: email,
      subject: '[REVIEWERS] 비밀번호 찾기 인증번호',
      html: `<div>아래 인증번호를 입력해주세요.</div><br/><div>${authNum}</div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('emailError:::', error);
        return res
          .status(400)
          .json({ success: false, msg: '인증번호를 보내는데 실패했습니다.' });
      }

      res.send({ success: true, msg: authNum });
      transporter.close();
    });
  });
});

router.put('/pw', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user)
      return res
        .status(400)
        .json({ success: false, msg: '이메일을 확인해주세요.' });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(400).json({ success: false, msg: err });

        try {
          await User.findByIdAndUpdate(
            user.id,
            { password: hash },
            { new: true },
          );
          res.json({ success: true, msg: '비밀번호가 변경되었습니다.' });
        } catch (e) {
          res.json({ success: false, msg: e.message });
        }
      });
    });
  });
});

router.put('/:id', (req, res) => {
  const { nickname, price, oneLineIntroduce, introduce, techs } = req.body;

  User.findById(req.params.id).then((user) => {
    if (!user)
      return res
        .status(400)
        .json({ success: false, msg: '유저를 찾을 수 없습니다.' });

    User.findByIdAndUpdate(req.params.id, {
      price,
      oneLineIntroduce,
      introduce,
      nickname,
      lang: techs,
    })
      .then((user) => {
        res.json({ success: true, msg: user });
      })
      .catch((err) => {
        res.status(400).json({ success: false, msg: err.msg });
      });
  });
});

router.put('/payment/:id', (req, res) => {
  const { point } = req.body;
  User.findByIdAndUpdate(req.params.id, {
    $inc: {
      point,
    },
  })
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: err.msg });
    });
});

module.exports = router;
