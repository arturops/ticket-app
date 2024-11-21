import express from 'express';
import { svcUrl } from '../config';

const router = express.Router();

const route = svcUrl.concat('/signin');

router.post(route, (req, res) => {
  const {email, password }: {email: string, password: string} = req.body;
  console.log(`${email}, ${password} signin works`);
  res.send("Hi new user!!");
});

export { router as signinRouter };