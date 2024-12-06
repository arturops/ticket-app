import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSigningKey } from '../config';

interface UserPayload {
  id: string;
  email: string;
}

// adds the curretnUser optinal attribute to the Request interface
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // first check if there is a session and jwt
  // if None present then go to next
  if (!req.session?.jwt) {
    return next();
  }

  // if we have a jwt then verify it to retrieve the payload
  try {
    const payload = jwt.verify(req.session.jwt, jwtSigningKey) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    console.log('Corrupted login');
  }

  // whether or not jwt was decode we need to go to next
  next();
};
