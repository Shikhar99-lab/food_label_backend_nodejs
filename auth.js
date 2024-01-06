const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Mock database
const users = [];

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via email
function sendOTPEmail(email, otp) {
    // Implement email sending logic using nodemailer
}

// User registration endpoint
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    const otpSecret = generateOTP();
    
    const user = { username, password, email, otpSecret };
    users.push(user);

    sendOTPEmail(email, otpSecret);

    res.json({ message: 'User registered successfully. OTP sent to your email.' });
});

// User login with OTP endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const otp = generateOTP();
        user.otpSecret = otp;

        sendOTPEmail(user.email, otp);

        const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ message: 'OTP sent to your email.', token });
    } else {
        res.status(401).json({ message: 'Invalid credentials.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
