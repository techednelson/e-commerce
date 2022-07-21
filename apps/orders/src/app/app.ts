import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {
  currentUserHandler,
  errorHandler,
  NotFoundError,
} from '@e-commerce/shared';
import {
  createOrderRouter,
  deleteOrderRouter,
  findAllOrderRouter,
  findOrderByIdRouter,
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
app.use(currentUserHandler);

app.use(deleteOrderRouter);
app.use(findAllOrderRouter);
app.use(createOrderRouter);
app.use(findOrderByIdRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
