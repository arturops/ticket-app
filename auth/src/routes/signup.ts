import express, { Request, Response } from 'express';
import { svcUrl } from '../config';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
      // send array of json objects describing each error if > 1
      //res.status(400).send(errors.array());
      //return
    }

    const { email, password }: { email: string; password: string } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('Email in use');
      throw new BadRequestError('This email is already used.');
    }

    const newUser = User.build({ email, password });
    console.log('Creating user ...');
    await newUser.save();

    res.status(201).send(newUser);
  }
);

export { router as signupRouter };
