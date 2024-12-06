import express from 'express';
import { svcUrl } from '../config';

const router = express.Router();

const route = svcUrl.concat('/signout');

router.post(route, (req, res) => {
  // to empty a session and destroy it
  req.session = null;
  console.log('Signout');
  res.send({});
});

export { router as signoutRouter };
