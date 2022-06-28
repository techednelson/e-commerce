import express, { Request, Response } from 'express';

const router = express.Router();
router.post('/auth/users/sign-out', (req: Request, res: Response) => {
  req.session = null;
  res.send('Log out successful');
});

export { router as signOutRouter };
