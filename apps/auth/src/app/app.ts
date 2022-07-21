import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@e-commerce/shared';
import {
  signInRouter,
  signOutRouter,
  signUpRouter,
  userRouter,
} from './routes';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
  })
);
app.use(userRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
