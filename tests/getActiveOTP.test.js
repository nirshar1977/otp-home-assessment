// Import the necessary modules for testing
const { getActiveOTP } = require('../db/db');

const request = require('supertest');
const app = require('../server.js');

// Mock the database connection or use a test database
jest.mock('../db/db');

describe('getActiveOTP Function', () => {
    afterEach(() => {
        jest.resetAllMocks(); // Reset mock function calls after each test
    });


  test('should return active OTP if found', async () => {
    // Mock the behavior of the database function to return an active OTP
    const mockResult = {
      rows: [{ otp: '123456', otp_expiry: new Date() }],
    };
    getActiveOTP.mockResolvedValueOnce(mockResult);

    // Call the function under test
    const email = 'test@example.com';
    const result = await getActiveOTP(email);

    // Check if the function returned the correct result
    expect(result).toEqual({
      otp: '123456',
      otp_expiry: expect.any(Date),
    });
  });

  test('should return null if no active OTP found', async () => {
    // Mock the behavior of the database function to return no active OTP
    const mockResult = {
      rows: [],
    };
    getActiveOTP.mockResolvedValueOnce(mockResult);

    // Call the function under test
    const email = 'nonexistent@example.com';
    const result = await getActiveOTP(email);

    // Check if the function returned null as expected
    expect(result).toBeNull();
  });

  test('should throw an error if database operation fails', async () => {
    // Mock the behavior of the database function to throw an error
    const errorMessage = 'Database connection error';
    getActiveOTP.mockRejectedValueOnce(new Error(errorMessage));

    // Call the function under test
    const email = 'test@example.com';
    await expect(getActiveOTP(email)).rejects.toThrow(errorMessage);
  });
});
