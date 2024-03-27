// services/emailService.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Configure Nodemailer using environment variables
const transporter = nodemailer.createTransport({
    //service: 'Gmail', 
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

// This function sends OTP by email
async function sendOTPByEmail(email, otpCode) {
    try {
      // Send mail with defined transport object
      await transporter.sendMail({
        from: 'nirby7@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otpCode}`,
      });
      console.log('OTP sent successfully!');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  }
  
  // Export the function to use in other modules
  module.exports = {sendOTPByEmail};
