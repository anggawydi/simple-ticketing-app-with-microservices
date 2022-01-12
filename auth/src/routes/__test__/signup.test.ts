import request from 'supertest';
import { app } from '../../app';

it('return a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('return a 422 with an invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'dasjhgjhdasgh',
      password: 'password',
    })
    .expect(422);
});

it('return a 422 with an invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'dasjhgjhdasgh',
      password: '1',
    })
    .expect(422);
});

it('return a 422 with email or password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
    })
    .expect(422);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'password',
    })
    .expect(422);
});

it('disallow duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
