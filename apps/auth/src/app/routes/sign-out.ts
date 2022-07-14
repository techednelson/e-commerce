import express, { Request, Response } from 'express';
import { Url } from '@e-commerce/domain';

const router = express.Router();
router.post(Url.SingOut, (req: Request, res: Response) => {
  req.session = null;
  res.send('Log out successful');
});

export { router as signOutRouter };
