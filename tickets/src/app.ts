import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@apstix/common';
import { isTestEnv } from './config';

const app = express();
// trust proxy because we are using an ingress in k8s
// and we should allow that data to flow through it into our app
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    //secure - uses https to create cookie if true
    secure: isTestEnv ? false : true,
  })
);

//must be before errorHandler, so that
//errorHandler can catch the error
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
