import express, { Request, Response } from 'express';
import currentUserHandler from '../middlewares/current-user-handler';
import { Url } from '../enums/url';

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
