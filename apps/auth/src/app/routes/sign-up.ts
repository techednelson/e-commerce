import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import User from '../models/User';
import {
  ISignInUp,
  BadRequestError,
  validationHandler,
  Url,
} from '@e-commerce/shared';

const router = express.Router();
router.post(
  Url.SignUp,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as ISignInUp;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    req.session.jwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY
    );

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
