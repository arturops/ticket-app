import express from 'express';
import { Request, Response } from 'express';
import { jwtSigningKey, svcUrl } from '../config';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@apstix/common';
import { User } from '../models/user';
import { Password } from '../utils/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

const route = svcUrl.concat('/signin');

router.post(
  route,
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Invalid password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.log('Email does not exist');
      throw new BadRequestError('Invalid credentials');
    }

    const valid_password = await Password.compare(
      existingUser.password,
      password
    );
    if (!valid_password) {
      console.log('Wrong password');
      throw new BadRequestError('Invalid credentials');
    }

    if (req.session && req.session.jwt) {
      try {
        const payload = jwt.verify(req.session.jwt, jwtSigningKey);
        console.log(`=> Signin successful ${email} !`);
        res.status(202).send(payload);
        return;
      } catch (err) {
        console.log('Corrupted login');
        throw new BadRequestError('Invalid credentials');
      }
    }

    // assign new jwt at login
    const newJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      jwtSigningKey
    );
    req.session = {
      jwt: newJWT,
    };

    console.log(`> Signin successful ${email} !`);
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
