const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    logger: true,
    secure: true,
    auth: {
        user: process.env.email,
        pass: process.env.pwd
    },
    tls: {
        rejectUnauthorized: false
    }
});