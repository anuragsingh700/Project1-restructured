const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');

router.get('/userdata', async (req, res) => {
    try {
        await connectDB();
        res.send([global.userdata]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch user data" });
    }
});

module.exports = router;
