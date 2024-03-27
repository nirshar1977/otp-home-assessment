//server.js

//---------------------------------------------------------------

const { generateOTP } = require('./services/codeGeneratorService');
const { getOtpExpiration } = require('./helpers/otpHelper');
const { saveOTPToDatabase, getActiveOTP } = require('./db/db');
const { apiKey, cityList } = require('./config/config'); 

const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

//---------------------------------------------------------------

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// Endpoint to generate and send OTP
app.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email:", email);
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let otp = await getActiveOTP(email); // Currently we are going to the DB, but we can use cache instead e.g: Redis
    const currentTime = new Date();

    if (otp && otp.otp_expiry > currentTime) {
      // Active OTP exists and hasn't expired yet
      otp = otp.otp;
    } else {
      // Generate OTP 
      otp = await generateOTP(apiKey, cityList);
      console.log('Generated OTP:', otp);
      const otpExpiry = getOtpExpiration();
      
      // Save OTP to database
      await saveOTPToDatabase(email, otp, otpExpiry)
      .then(() => {
        console.log('OTP saved to the database successfully');
      })
      .catch((error) => {
        console.error('Error saving OTP to the database:', error);
      });
    }

    // Send OTP via email
    await sendOTPByEmail(email, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate OTP' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});