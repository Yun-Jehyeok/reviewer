const express = require("express");
const { Post } = require("../../models/post");
const { User } = require("../../models/user");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const { S3 } = require("@aws-sdk/client-s3");

const config = require("../../config/index");

const { S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } = config;

const router = express.Router();

router.get("/skip/:page/:filter/:langFilter", async (req, res) => {
    try {
        let page = (Number(req.params.page) - 1) * 16;
        let { filter, langFilter } = req.params;

        let postFindResult = [];

        if (langFilter === "all") {
            if (filter === "registerDate") {
                postFindResult = await Post.find()
                    .skip(page)
                    .limit(16)
                    .sort({ register_date: -1 });
            } else if (filter === "reputation") {
                postFindResult = await Post.find()
                    .skip(page)
                    .limit(16)
                    .sort({ reputation: -1 });
            }
        } else {
            if (filter === "registerDate") {
                postFindResult = await Post.find({
                    lang: { $in: [langFilter] },
                })
                    .skip(page)
                    .limit(16)
                    .sort({ register_date: -1 });
            } else if (filter === "reputation") {
                postFindResult = await Post.find({
                    lang: { $in: [langFilter] },
                })
                    .skip(page)
                    .limit(16)
                    .sort({ reputation: -1 });
            }
        }

        res.status(200).json({
            success: true,
            allPostsCnt: postFindResult.length,
            posts: postFindResult,
        });
    } catch (e) {
        res.status(400).json({ success: false, msg: e.message });
    }
});

// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
AWS.config.update({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
});

const upload = multer({
    storage: multerS3({
        s3: new S3({
            credentials: {
                accessKeyId: S3_ACCESS_KEY,
                secretAccessKey: S3_SECRET_ACCESS_KEY,
            },

            region: "ap-northeast-2",
        }),
        bucket: "fukinfriends",
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `feed/${file.originalname}_${new Date().valueOf()}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/image", upload.array("image", 3), async (req, res) => {
    try {
        res.json({ success: true, url: req.files.map((v) => v.location) });
    } catch (e) {
        console.error(e);
        res.json({ success: false, url: null });
    }
});

router.post("/", (req, res) => {
    const { userId, title, content, lang, price, imgs } = req.body;

    console.log("postRequest:::", userId, title, content, lang, price, imgs);

    User.findOne({ _id: userId }).then((user) => {
        if (!user) return res.status(400).json({ success: false });

        const newPost = new Post({
            title,
            content,
            lang,
            price,
            creator: userId,
            imgs,
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

router.get("/:id", (req, res) => {
    const id = req.params.id;

    Post.findOne({ _id: id })
        .populate(["reviews", "creator"])
        .then((post) => {
            if (!post)
                return res.status(400).json({
                    success: false,
                    msg: "해당 게시글이 존재하지 않습니다.",
                });

            res.status(200).json({ success: true, post: post });
        });
});

router.get("/post/best", async (req, res) => {
    try {
        const postFindResult = await Post.find()
            .limit(5)
            .sort({ reputation: 1 });

        res.status(200).json({
            success: true,
            posts: postFindResult,
        });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.msg });
    }
});

router.get("/post/new", async (req, res) => {
    try {
        const postFindResult = await Post.find()
            .limit(5)
            .sort({ register_date: -1 });

        res.status(200).json({
            success: true,
            posts: postFindResult,
        });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.msg });
    }
});

module.exports = router;
