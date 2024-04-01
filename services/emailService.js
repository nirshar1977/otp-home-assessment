// services/emailService.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_SPECIFIC_PASSWORD,
    },
});

// This function sends OTP by email
async function sendOTPByEmail(email, otpCode) {
    try {
     const info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject:`Your OTP Code`,
          text: `Your OTP code is: ${otpCode}`
      });
      console.log('Otp sent successfully by email to:', email);
      return info.messageId;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
 }
  
  // Export the function to use in other modules
  module.exports = {sendOTPByEmail};
