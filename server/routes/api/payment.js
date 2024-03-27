const express = require("express");
const { User } = require("../../models/user");
const { Payment } = require("../../models/payment");
const moment = require("moment");
const router = express.Router();

// Get Payment History
router.post("/skip/:page", async (req, res) => {
    try {
        const { id, purpose } = req.body;

        let page = (Number(req.params.page) - 1) * 16;

        // const paymentCnt = await Payment.countDocuments();

        const paymentCondition = {
            userId: id,
        };

        if (purpose) paymentCondition["purpose"] = purpose;

        let paymentResult = await Payment.find(paymentCondition)
            .skip(page)
            .limit(16)
            .sort({ register_date: -1 });

        paymentResult = JSON.parse(JSON.stringify(paymentResult));
        paymentResult.forEach((item) => {
            item.date = moment(item.register_date).format("YYYY.MM.DD");
            item.purpose = item.purpose === "C" ? "충전" : "사용";
        });

        res.status(200).json({
            success: true,
            // allPostsCnt: paymentCnt,
            data: paymentResult,
        });
    } catch (e) {
        res.status(400).json({ success: false, msg: e.message });
    }
});

module.exports = router;
