import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
  var getSignupCookie: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = (await mongoose.connection.db?.collections()) || [];

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
  // for clossing all connections it is possible to use
  // mongoose.disconnect();
});

global.getSignupCookie = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const resp = await request(app)
    .post('/api/v0/users/signup')
    .send({ email: email, password: password });

  // get the cookie info from the signup
  // to use it in another request
  // (must be done manually - browser and postman automate cookie persistance not test)
  const cookie = resp.get('Set-Cookie');
  if (!cookie) {
    throw new Error('Undefined cookie at signup');
  }

  return cookie;
};
