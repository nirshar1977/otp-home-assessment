//send-otp-api.test

const request = require('supertest');
const app = require('../server.js');

describe('POST /send-otp', () => {
  let server;

  beforeAll(async () => {
    server = await app.listen(3000); 
  });

  afterAll(async () => {
    await server.close();
  });

  it('should return a success message if OTP is sent successfully', async () => {
    const response = await request(app)
      .post('/send-otp')
      .send({ email: 'test@example.com' }); // Provide a valid email for testing

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'OTP sent successfully' });
  });

  it('should return an error if email is missing', async () => {
    const res = await request(app)
      .post('/send-otp')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Email is required');
  });  

  it('should return an error if email format is invalid', async () => {
    const invalidEmail = 'invalid-email'; // Invalid email format
    const res = await request(app)
      .post('/send-otp')
      .send({ email: invalidEmail }); // Send the invalid email in the request body

    expect(res.status).toBe(400); // Expecting a 400 Bad Request status code
    expect(res.body).toHaveProperty('error', 'Invalid email format'); // Expecting an error message in the response body
  });
});



