const request = require('supertest');
const api = request('http://localhost:5003');

describe('Integration Test (Auth → Progress → Leaderboard)', () => {
  let token;

  test('Register user', async () => {
    const res = await api.post('/auth/register').send({ username: 'itestuser3', password: '12345678' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test('Complete a day', async () => {
    const res = await api.post('/progress/day')
      .set('Authorization', token)
      .send({ day: 1, datetime: Date.now() });
    expect(res.statusCode).toBe(200);
  });

  test('Get leaderboard', async () => {
    const res = await api.get('/leaderboard')
      .set('Authorization', token);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
