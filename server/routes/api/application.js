const express = require("express");
const { User } = require("../../models/user");
const { Application } = require("../../models/application");
const { ChatRoom } = require("../../models/chatRoom");
const { Payment } = require("../../models/payment");

const router = express.Router();

router.post("/apply", (req, res) => {
    const { applicantId, reviewerId, postId } = req.body;

    let applicant = User.findOne({ _id: applicantId });
    let reviewer = User.findOne({ _id: reviewerId });

    if (!applicant)
        return res
            .status(400)
            .json({ success: false, msg: "로그인이 필요한 서비스입니다." });
    if (!reviewer)
        return res
            .status(400)
            .json({ success: false, msg: "해당 리뷰어를 찾을 수 없습니다." });

    const newApplication = new Application({
        applicantId,
        reviewerId,
        point: req.body.point,
        postId,
    });

    newApplication.save().then(() => {
        console.log("Check 0");
        User.findByIdAndUpdate(reviewerId, {
            $push: {
                getApplications: newApplication._id,
            },
        })
            .then(() => {
                console.log("Check 1");
                User.findByIdAndUpdate(applicantId, {
                    $push: {
                        applications: newApplication._id,
                    },
                    $inc: {
                        point: -req.body.point,
                    },
                })
                    .then(() => {
                        console.log("Check 2");
                        const newPayment = new Payment({
                            userId: applicantId,
                            point: req.body.point,
                            purpose: "U",
                        });

                        newPayment
                            .save()
                            .then(() => {
                                res.status(200).json({ success: true });
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    success: false,
                                    msg: err.msg,
                                });
                            });
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

// 대기중 -> 진행중
router.put("/status/proceeding", (req, res) => {
    const { id } = req.body;

    Application.findById(id).then((application) => {
        if (!application)
            return res.status(400).json({
                success: false,
                msg: "해당 신청 내역을 찾을 수 없습니다.",
            });

        // ChatRoom 생성
        let newChatRoom = new ChatRoom({
            users: [application.applicantId, application.reviewerId],
        });

        newChatRoom.save().then(
            Application.findByIdAndUpdate(id, {
                status: "proceeding",
                chatRoom: newChatRoom._id,
            })
                .then(() => {
                    res.status(200).json({ success: true });
                })
                .catch((e) => {
                    res.status(400).json({ success: false, msg: e.msg });
                }),
        );
    });
});

// 진행중 -> 완료 (리뷰어)
router.put("/status/complete/reviewer", (req, res) => {
    const { id } = req.body;

    let application = Application.findById(id);
    if (!application)
        return res.status(400).json({
            success: false,
            msg: "해당 신청 내역을 찾을 수 없습니다.",
        });

    Application.findById(id).then((foundApp) => {
        if (foundApp.applicantComplete) {
            Application.findByIdAndUpdate(id, {
                status: "complete",
                reviewerComplete: true,
            })
                .then((app) => {
                    User.findByIdAndUpdate(app.reviewerId, {
                        $inc: {
                            point: app.point,
                        },
                    })
                        .then(() => {
                            res.status(200).json({ success: true });
                        })
                        .catch((e) => {
                            res.status(400).json({
                                success: false,
                                msg: e.msg,
                            });
                        });
                })
                .catch((e) => {
                    res.status(400).json({ success: false, msg: e.msg });
                });
        } else {
            Application.findByIdAndUpdate(id, {
                reviewerComplete: true,
            })
                .then(() => {
                    res.status(200).json({ success: true });
                })
                .catch((e) => {
                    res.status(400).json({ success: false, msg: e.msg });
                });
        }
    });
});

// 진행중 -> 완료 (지원자)
router.put("/status/complete/applicant", (req, res) => {
    const { id } = req.body;

    let application = Application.findById(id);
    if (!application)
        return res.status(400).json({
            success: false,
            msg: "해당 신청 내역을 찾을 수 없습니다.",
        });

    Application.findById(id).then((foundApp) => {
        if (foundApp.reviewerComplete) {
            Application.findByIdAndUpdate(id, {
                status: "complete",
                applicantComplete: true,
            })
                .then((app) => {
                    User.findByIdAndUpdate(app.reviewerId, {
                        $inc: {
                            point: app.point,
                        },
                    })
                        .then(() => {
                            res.status(200).json({ success: true });
                        })
                        .catch((e) => {
                            res.status(400).json({
                                success: false,
                                msg: e.msg,
                            });
                        });
                })
                .catch((e) => {
                    res.status(400).json({ success: false, msg: e.msg });
                });
        } else {
            Application.findByIdAndUpdate(id, {
                applicantComplete: true,
            })
                .then((app) => {
                    res.status(200).json({ success: true });
                })
                .catch((e) => {
                    res.status(400).json({ success: false, msg: e.msg });
                });
        }
    });
});

router.get("/reviews/:id", async (req, res) => {
    try {
        const reviews = await Application.find({ reviewerId: req.params.id })
            .sort({ date: -1 })
            .populate(["applicantId", "reviewerId", "review"]);

        res.status(200).json({
            success: true,
            reviews,
        });
    } catch (e) {
        res.status(400).json({ success: false, msg: e.message });
    }
});

router.get("/applications/:id", async (req, res) => {
    try {
        const reviews = await Application.find({ applicantId: req.params.id })
            .sort({ date: -1 })
            .populate(["applicantId", "reviewerId"]);

        res.status(200).json({
            success: true,
            reviews,
        });
    } catch (e) {
        res.status(400).json({ success: false, msg: e.message });
    }
});

router.get("/chats/:roomId", async (req, res) => {
    try {
        await ChatRoom.findById(req.params.roomId)
            .populate("chats")
            .then((room) => {
                if (!room)
                    return res.status(400).json({
                        success: false,
                        msg: "해당 채팅룸을 찾을 수 없습니다.",
                    });

                res.status(200).json({ success: true, room });
            })
            .catch((err) => {
                res.status(400).json({ success: false, msg: e.message });
            });
    } catch (e) {
        res.status(400).json({ success: false, msg: e.message });
    }
});

module.exports = router;
