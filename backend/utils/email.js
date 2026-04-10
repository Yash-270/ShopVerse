require("dotenv").config();
const nodemailer=require("nodemailer");
const transporter=nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.EMAIL_PASS,
    }
});

module.exports = transporter;