import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

interface Session {
  jwt: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
      session?: Session;
    }
  }
}

const currentUserHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    req.currentUser = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY
    ) as UserPayload;
  } catch (err) {
    console.error(err);
  }

  next();
};

export default currentUserHandler;
