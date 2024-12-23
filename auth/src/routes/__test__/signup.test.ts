import request from 'supertest';
import { app } from '../../app';
import config from '../../config';

const route = '/api/v0/users/signup';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post(route)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post(route)
    .send({ email: 'bad', password: 'password' })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post(route)
    .send({ email: 'test@test.com', password: '' })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  //missing password and email
  await request(app).post(route).send({}).expect(400);

  //missing password
  await request(app).post(route).send({ email: 'test@test.com' }).expect(400);

  //missing email
  await request(app).post(route).send({ password: 'password' }).expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post(route)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
  // duplicate email should fail
  await request(app)
    .post(route)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(422);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post(route)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  //check response
  console.log(config);
  expect(response.get('Set-Cookie')).toBeDefined();
});
