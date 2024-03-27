//otpHelper.js

// Get One Time Code Expiration
function getOtpExpiration() {
    return  new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
  }


  module.exports = { getOtpExpiration };
