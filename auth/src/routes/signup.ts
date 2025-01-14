import express, { Request, Response } from 'express';
import { svcUrl, jwtSigningKey } from '../config';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@apstix/common';
import jwt from 'jsonwebtoken';

const router = express.Router();

const route = svcUrl.concat('/signup');

router.post(
  route,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 to 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('Email in use');
      throw new BadRequestError('This email is already used.');
    }

    const newUser = User.build({ email, password });
    console.log('Creating user ...');
    await newUser.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      jwtSigningKey
    );
    // add jwt to header
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(newUser);
  }
);

export { router as signupRouter };
