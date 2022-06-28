import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import BadRequestError from '../errors/bad-request-error';
import { comparePassword } from '../services/password';
import User from '../models/user';
import validationHandler from '../middlewares/validation-handler';
import { Url } from '../enums/url';

const router = express.Router();
router.post(
  Url.SignIn,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validationHandler,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await comparePassword(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    req.session.jwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY
    );

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
