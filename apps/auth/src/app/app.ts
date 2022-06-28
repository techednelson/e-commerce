import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { userRouter } from './routes/current-user';
import { signUpRouter } from './routes/sign-up';
import { signInRouter } from './routes/sign-in';
import { signOutRouter } from './routes/sign-out';
import NotFoundError from './errors/not-found-error';
import errorHandler from './middlewares/error-handler';

const app = express();
// app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
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
