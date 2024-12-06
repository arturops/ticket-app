import express from 'express';
import { jwtSigningKey, svcUrl } from '../config';
import jwt from 'jsonwebtoken';

const router = express.Router();

const route = svcUrl.concat('/currentuser');

router.get(route, (req, res) => {
  if (!req.session?.jwt) {
    res.send({ currentUser: null });
    return;
  }

  try {
    const payload = jwt.verify(req.session.jwt, jwtSigningKey);
    res.send({ currentUser: payload });
  } catch (err) {
    console.log('Session expired');
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
