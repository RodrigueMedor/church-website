const nodemailer = require('nodemailer');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async (event) => {
    console.log('Function triggered:', event.httpMethod);

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: 'Method Not Allowed',
        };
    }

    try {
        console.log('Raw body:', event.body);
        const { name, email, message, subject } = JSON.parse(event.body);

        if (!name || !email || !message || !subject) {
            return {
                statusCode: 400,
                headers,
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

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `You've been contacted by ${name} — ${subject}`,
            text: `You have been contacted by: ${name}\n\nE-mail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "Email sent successfully!" }),
        };

    } catch (error) {
        console.error('Failed to send mail:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Failed to send email." }),
        };
    }
};