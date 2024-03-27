//send-otp-api.test

const request = require('supertest');
const app = require('../server.js'); 

describe('POST /send-otp', () => {
  it('should return an error if email is missing', async () => {
    const res = await request(app)
      .post('/send-otp')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Email is required');
  });
});
