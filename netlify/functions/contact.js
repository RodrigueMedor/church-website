const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { name, email, message, subject } = JSON.parse(event.body);

    if (!name || !email || !message || !subject) {
        return {
            statusCode: 400,
            body: 'Invalid form data',
        };
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    console.log('Email user:', process.env.EMAIL_USER);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `You've been contacted by ${name} — ${subject}`,
        text: `
            You have been contacted by: ${name}
            
            E-mail: ${email}
            
            Subject: ${subject}
            
            Message:
            ${message}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: 'Email sent successfully',
        };
    } catch (error) {
        console.error('Failed to send mail:', error);
        console.log('Failed to send mail:', error);
        return {
            statusCode: 500,
            body: 'Failed to send email',
        };
    }
};