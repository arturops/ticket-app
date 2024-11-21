import express from 'express';
import { svcUrl } from '../config';

const router = express.Router();

const route = svcUrl.concat('/signout');

router.post(route, (req, res) => {
  console.log("signout works");
  res.send("Hi new user!!");
});

export { router as signoutRouter };