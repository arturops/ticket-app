import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

const AUTH_HOST = 'http://localhost';

app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);

//must be before errorHandler, so that
//errorHandler can catch the error
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  //not localhost because we are using k8s service auth-mongo-svc
  // ALSO, we add a db 'auth'
  try {
    await mongoose.connect('mongodb://auth-mongo-svc:27017/auth');
    console.log('Auth connected to mongo db');
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log('==> Auth - listening on 3000');
});

// mongoose starts after our app starts
start();
