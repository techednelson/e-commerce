import express, { Request, Response } from 'express';
import { currentUserHandler, Url } from '@e-commerce/shared';

const router = express.Router();
router.get(
  Url.CurrentUser,
  currentUserHandler,
  (req: Request, res: Response) => {
    const currentUser = req.currentUser || null;
    res.send({ currentUser });
  }
);

export { router as userRouter };
