const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../src/routes/userRoutes');
const { sequelize } = require('../src/models');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset database before tests
});

describe('User API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });
    if (res.error) console.error(res.error);
    // console.log("Response:", res.body); // Log the response body for debugging
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('username', 'testuser');
    expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    if (res.error) console.error(res.error);
    // console.log("Response:", res.body); // Log the response body for debugging
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});

afterAll(async () => {
  await sequelize.close(); // Close the connection after tests
});
