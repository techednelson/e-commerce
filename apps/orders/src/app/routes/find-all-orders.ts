import express, { Request, Response } from 'express';
import { requireAuthHandler } from '@e-commerce/shared';
import Order from '../models/Order';

const router = express.Router();

router.get(
  '/api/orders',
  requireAuthHandler,
  async (req: Request, res: Response) => {
    const orders = await Order.find({
      userId: req.currentUser!.id,
    }).populate('ticket');

    res.send(orders);
  }
);

export { router as findAllOrderRouter };
