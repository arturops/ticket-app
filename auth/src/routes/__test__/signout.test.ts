import request from 'supertest';
import { app } from '../../app';

const routeSignUp = '/api/v0/users/signup';
const routeSignOut = '/api/v0/users/signout';

it('clears the cookie after signing out', async () => {
  const email = 'test@test.com';
  const password = 'password';

  // create user
  await request(app)
    .post(routeSignUp)
    .send({ email: email, password: password })
    .expect(201);

  // sign out
  const respSignOut = await request(app).post(routeSignOut).expect(200);

  // check cookie session is null
  const cookie = respSignOut.get('Set-Cookie');
  if (!cookie) {
    throw new Error('Undefined cookie');
  }
  // for a cookie with null session aka resetted
  // we always expect this value
  const expectedCookieVal = [
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
  ];
  expect(cookie[0]).toEqual(expectedCookieVal[0]);
});
