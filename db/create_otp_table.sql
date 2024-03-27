-- Create OTP data table
CREATE TABLE IF NOT EXISTS otp_data (
    id SERIAL PRIMARY KEY, -- Auto-incrementing unique identifier
    email VARCHAR(255) UNIQUE NOT NULL, -- Unique email address (indexed for uniqueness)
    otp VARCHAR(6) NOT NULL, -- OTP value (6 characters)
    otp_expiry TIMESTAMP NOT NULL -- Expiry time of the OTP
);
