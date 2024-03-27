// db.js
const { Pool } = require('pg');

const dotenv = require('dotenv');
dotenv.config();


// Create a PostgreSQL pool
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    //password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: 5432, // Default PostgreSQL port
});

pool.connect((err, client, done) => {
    if (err) {
      console.error('Error connecting to PostgreSQL:', err.stack);
    } else {
      console.log('Connected to PostgreSQL database');
    }
  });



/* Function to save OTP to the database
*   We are using the ON CONFLICT ... DO UPDATE clause in PostgreSQL to perform an upsert operation (insert or update if a conflict occurs) 
*   instead of explicitly checking for the existence of a record and then deciding whether to update or insert.
*/

async function saveOTPToDatabase(email, otp, otpExpiry) {
  
  console.log('Saving OTP to the database:');
  console.log('Email:', email);
  console.log('OTP:', otp);
  console.log('OTP Expiry:', otpExpiry);

  //Get connection from pool
  const client = await pool.connect();
  try {
    // Begin a transaction
    await client.query('BEGIN');

    // Insert OTP data into the database
    const queryText = `INSERT INTO otp_data(email, otp, otp_expiry) VALUES($1, $2, $3) ON CONFLICT (email) DO UPDATE SET otp = EXCLUDED.otp, otp_expiry = EXCLUDED.otp_expiry`;
    const queryParams = [email, otp, otpExpiry];
    await client.query(queryText, queryParams);

    // Commit the transaction
    await client.query('COMMIT');
  } catch (error) {
    // Rollback the transaction if an error occurs
    await client.query('ROLLBACK');
    throw error; // Throw the error for handling at a higher level
  } finally {
    // Release the client back to the pool
    client.release();
  }
}

//This function fetchs the active OTP for a user/email from the database
async function getActiveOTP(email) {
    const client = await pool.connect();
    try {
      const queryText = `SELECT otp, otp_expiry FROM otp_data WHERE email = $1 AND otp_expiry > NOW()  - INTERVAL '5 minutes' ORDER BY otp_expiry DESC LIMIT 1`;
      const queryParams = [email];
      const result = await client.query(queryText, queryParams);

  
      if (result.rows.length > 0) {
        // Return the active OTP and its expiry time
        const otp =  result.rows[0].otp;
        const otpEpiration = result.rows[0].otp_expiry;
        console.log("Active otp found:", otp, "Otp Expiration:", otpEpiration);
        return {
          otp: otp,
          otp_expiry: otpEpiration,
        };
      } else {
        console.log("No active otp found for the user:", email);
        return null;
      }
    } finally {
      client.release(); // Release the client back to the pool
    }
  }

module.exports = { saveOTPToDatabase, getActiveOTP };