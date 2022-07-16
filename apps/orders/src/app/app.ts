import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@e-commerce/shared';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production',
  })
);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
