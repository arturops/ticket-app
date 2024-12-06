import express from 'express';
import { svcUrl } from '../config';
import { currentUserMiddleware } from '../middlewares/current-user';

const router = express.Router();

const route = svcUrl.concat('/currentuser');

router.get(route, currentUserMiddleware, (req, res) => {
  // need `|| null` to avoid sending 'undefined'
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
