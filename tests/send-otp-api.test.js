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

  it('should return an error if email is missing', async () => {
    const res = await request(app)
      .post('/send-otp')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Email is required');
  });  
});



