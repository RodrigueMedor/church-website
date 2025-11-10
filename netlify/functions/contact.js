const nodemailer = require('nodemailer');
require('dotenv').config();

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async (event) => {
    console.log('Function triggered:', event.httpMethod);

    // Handle preflight request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    // Reject unsupported HTTP methods
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: 'Method Not Allowed',
        };
    }

    try {
        console.log('Raw request body:', event.body);

        const { name, email, message, subject } = JSON.parse(event.body);

        // Validate required fields
        if (!name || !email || !message || !subject) {
            console.warn('Missing required form fields');
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid form data. All fields are required.' }),
            };
        }

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log('Using email account:', process.env.EMAIL_USER);

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `You've been contacted by ${name} — ${subject}`,
            text: `You have been contacted by: ${name}\n\nE-mail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent successfully:', info.messageId);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Email sent successfully!' }),
        };

    } catch (error) {
        console.error('Error while sending email:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to send email.',
                details: error.message, // helpful for debugging
            }),
        };
    }
};