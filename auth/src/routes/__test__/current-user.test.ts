import request from 'supertest';
import { app } from '../../app';

const routeSignup = '/api/v0/users/signup';
const routeCurrentUser = '/api/v0/users/currentuser';

it('responds with details about the current user', async () => {
  const email = 'test@test.com';
  const cookie = await global.getSignupCookie();

  // set the cookie to verify we get the expected
  // current user info
  const resp = await request(app)
    .get(routeCurrentUser)
    .set('Cookie', cookie)
    .expect(200);

  expect(resp.body.currentUser.email).toEqual(email);
});

it('responds with current user null when not auth', async () => {
  // no cookie set
  const resp = await request(app).get(routeCurrentUser).expect(200);

  expect(resp.body.currentUser).toEqual(null);
});
