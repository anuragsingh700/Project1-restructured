const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAccount = require('../models/UserAccount');
const nodemailer = require('nodemailer');

const jwtSecret = process.env.JWT_SECRET;

// ------------------------- Route to sign up a new user -------------------------
router.post('/createuser_signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(req.body.password, salt);

        const newUserAccount = await UserAccount.create({
            name: req.body.name,
            email: req.body.email,
            password: secpassword,
            admin: req.body.admin
        });

        res.json({ success: true, user_signup: newUserAccount });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create user signup", error: error.message });
    }
});

// ------------------------- Route for user login -------------------------
router.post('/createuser_login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await UserAccount.findOne({ email });
        if (!userData) {
            return res.status(400).json({ success: false, message: "Email does not exist" });
        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Password does not match" });
        }

        const payload = {
            user: {
                id: userData.id
            }
        };

        const authToken = jwt.sign(payload, jwtSecret);
        return res.json({
            success: true,
            authToken,
            admin: userData.admin
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Login failed", error: error.message });
    }
});

// ------------------------- Nodemailer transporter -------------------------
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: true
    }
});

// ------------------------- Route to send an email -------------------------
router.post('/email', async (req, res) => {
    const { email, subject, message } = req.body;

    try {
        const mailoption = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            text: message
        };
        const info = await transporter.sendMail(mailoption);
        console.log('Email sent: %s', info.messageId);
        res.json({ success: true, mailoption });
    } catch (error) {
        console.error('Error sending email:', error.message);
        res.status(500).json({ success: false, error_createuser: error.message });
    }
});

module.exports = router;
