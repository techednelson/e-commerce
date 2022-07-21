import express, { Request, Response } from 'express';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuthHandler,
} from '@e-commerce/shared';
import Order from '../models/Order';

const router = express.Router();

router.get(
  '/api/orders/:id',
  requireAuthHandler,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('clothing');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as findOrderByIdRouter };
