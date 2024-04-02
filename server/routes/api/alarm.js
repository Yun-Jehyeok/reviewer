const express = require("express");
const { User } = require("../../models/user");
const { Alarm } = require("../../models/alarm");

const moment = require("moment");
const router = express.Router();

// Get All Alarms
router.get("/:userId", async (req, res) => {
    try {
        const query = await Alarm.find({ creator: req.params.userId }).sort({
            register_date: -1,
        });
        // .populate(['creator']);

        const alarms = JSON.parse(JSON.stringify(query));
        alarms.forEach((alram) => {
            alram.date = moment(alram.register_date).format(
                "YYYY.MM.DD HH:mm:ss",
            );
        });
        res.status(200).json({
            success: true,
            alarms,
        });
    } catch (e) {
        res.status(400).json({ success: false, msg: e.message });
    }
});

// Create Alarms
router.post("/", (req, res) => {
    const { userId, content } = req.body;

    const newAlarm = new Alarm({
        creator: userId,
        content,
    });

    newAlarm.save().then(() => {
        User.findByIdAndUpdate(userId, {
            $push: {
                alarms: newAlarm._id,
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

// Read Alarm
router.put("/status/:id", (req, res) => {
    Alarm.findByIdAndUpdate(req.params.id, {
        isRead: true,
    })
        .then((alramResponse) => {
            const responseData = JSON.parse(JSON.stringify(alramResponse));
            responseData.isRead = true;
            res.status(200).json({ success: true, data: responseData });
        })
        .catch((e) => {
            res.status(400).json({ success: false, msg: e.msg });
        });
});

module.exports = router;
