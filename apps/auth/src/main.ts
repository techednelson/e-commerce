import * as express from 'express';
import { userRouter } from './app/routes/current-user';
import { signInRouter } from './app/routes/sign-in';
import { signUpRouter } from './app/routes/sign-up';
import { signOutRouter } from './app/routes/sign-out';
import errorHandler from './app/middlewares/error-handler';
import { NotFoundError } from './app/errors/not-found-error';

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
