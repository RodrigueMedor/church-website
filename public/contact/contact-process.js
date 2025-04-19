const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from a .env file

const app = express();
const port = 8081;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allowed origins for CORS
const allowedOrigins = ['http://localhost:8080', 'http://localhost:8081'];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.EMAIL_USER, // Email from environment variable
        pass: process.env.EMAIL_PASS  // Password from environment variable
    }
});
app.post('/contact/contact-process', (req, res) => {
    const { name, email, message, subject } = req.body;

    // Validate form fields
    if (!name || !email || !message || !subject) {
        console.error('Invalid form data');
        return res.status(400).send('Invalid form data');
    }

    // Validate recipient email
    // if (!process.env.RECIPIENT_EMAIL) {
    //     console.error('Recipient email is not defined in environment variables');
    //     return res.status(500).send('Recipient email is not configured');
    // }

    // if (!req.body.recipientEmail) {
    //     console.error('Recipient email is not provided in the form data');
    //     return res.status(400).send('Recipient email is required');
    // }

    const eSubject = `You've been contacted by ${name} — ${subject}`;
    const eBody = `
        You have been contacted by: ${name}
        
        E-mail: ${email}
        
        Subject: ${subject}
        
        Message:
        ${message}
    `;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Ensure this is defined
        subject: eSubject,
        text: eBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Failed to send mail:', error);
            return res.status(500).send('Failed to send email');
        }
        console.log('Mail sent successfully:', info.response);
        res.send('Email sent successfully');
    });
});
// app.post('/contact/contact-process', (req, res) => {
//     const { name, email, message, subject } = req.body;
//
//     console.log('EMAIL_USER:', process.env.EMAIL_USER);
//     console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
//     // Validate form fields
//     if (!name || !email || !message || !subject) {
//         console.error('Invalid form data');
//         return res.status(400).send('Invalid form data');
//     }
//
//     const eSubject = `You've been contacted by ${name} — ${subject}`;
//     const eBody = `
//         You have been contacted by: ${name}
//
//         E-mail: ${email}
//
//         Subject: ${subject}
//
//         Message:
//         ${message}
//     `;
//
//     const mailOptions = {
//         from: email,
//         to: process.env.RECIPIENT_EMAIL, // Recipient email from environment variable
//         subject: eSubject,
//         text: eBody
//     };
//
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Failed to send mail:', error);
//             return res.status(500).send('Failed to send email');
//         }
//         console.log('Mail sent successfully:', info.response);
//         res.send('Email sent successfully');
//     });
// });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});