import express, { Request, Response } from 'express';
import { svcUrl } from '../config';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const route = svcUrl.concat('/signup');

router.post(
  route, 
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({min: 4, max: 20})
      .withMessage('Password must be between 4 to 20 characters'),
  ], 
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      // send array of json objects describing each error if > 1
      res.status(400).send(errors.array());
      return
    }
    const {email, password }: {email: string, password: string} = req.body;
    console.log('Creating user ...');
    res.send();
});

export { router as signupRouter };