import express from 'express';
import { svcUrl } from '../config';

const router = express.Router();

const route = svcUrl.concat('/currentuser');

router.get(route, (req, res) => {
  console.log("get works");
  res.send("Hi new user!!");
});

export { router as currentUserRouter };