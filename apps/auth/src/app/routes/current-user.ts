import express, { Request, Response } from 'express';
import currentUserHandler from '../middlewares/current-user-handler';

const router = express.Router();
router.get(
  '/auth/users/current-user',
  currentUserHandler,
  (req: Request, res: Response) => {
    const currentUser = req.currentUser || null;
    res.send({ currentUser });
  }
);

export { router as userRouter };
