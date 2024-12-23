import request from 'supertest';
import { app } from '../../app';

const route = '/api/v0/users/signin';
const signup_route = '/api/v0/users/signup';

it('fail when non-existent email used to signin', async () => {
  // unexistent email fails
  await request(app)
    .post(route)
    .send({ email: 'bad@test.com', password: 'password' })
    .expect(422);
});

it('fail when wrong pasword is used to signin', async () => {
  const userEmail = 'test@test.com';
  const password = 'password';

  // first create user
  await request(app)
    .post(signup_route)
    .send({ email: userEmail, password: password })
    .expect(201);

  // wrong password fails
  await request(app)
    .post(route)
    .send({ email: userEmail, password: 'bad-password' })
    .expect(422);
});

it('success when sigin again with same email while signed in - jwt remains same', async () => {
  const userEmail = 'test@test.com';
  const password = 'password';

  // first create user
  await request(app)
    .post(signup_route)
    .send({ email: userEmail, password: password })
    .expect(201);

  // user can signin
  const response = await request(app)
    .post(route)
    .send({ email: userEmail, password: password })
    .expect(200);

  // user signin again with same email
  const responseTwo = await request(app)
    .post(route)
    .send({ email: userEmail, password: password })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
  expect(response.get('Set-Cookie') === responseTwo.get('Set-Cookie'));
});

it('succees with signin - jwt for signup and sigin is same', async () => {
  const userEmail = 'test@test.com';
  const password = 'password';

  // first create user
  const respSignup = await request(app)
    .post(signup_route)
    .send({ email: userEmail, password: password })
    .expect(201);

  // user can signin
  const respSigin = await request(app)
    .post(route)
    .send({ email: userEmail, password: password })
    .expect(200);

  expect(respSignup.get('Set-Cookie') === respSigin.get('Set-Cookie'));
});
