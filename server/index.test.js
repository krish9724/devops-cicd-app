const request = require('supertest');
const app = require('./index');

describe('API Tests', () => {
  test('GET / should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('Backend Running');
  });

  test('GET /api/health should return healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /api/tasks should return array of tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('POST /api/tasks should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task from CI/CD' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task from CI/CD');
    expect(res.body.done).toBe(false);
  });
});
