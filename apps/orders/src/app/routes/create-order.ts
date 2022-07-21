import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuthHandler,
  validationHandler,
} from '@e-commerce/shared';
import Clothing from '../models/Clothing';
import Order from '../models/Order';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  '/api/orders',
  requireAuthHandler,
  [body('clothingId').not().isEmpty().withMessage('TicketId must be provided')],
  validationHandler,
  async (req: Request, res: Response) => {
    const { clothingId } = req.body;

    // Find the ticket the user is trying to order in the database
    const clothing = await Clothing.findById(clothingId);
    if (!clothing) {
      throw new NotFoundError();
    }

    // Make sure that this ticket is not already reserved
    const isReserved = await clothing.isReserved();
    if (isReserved) {
      throw new BadRequestError('Clothing is already reserved');
    }

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the order and save it to the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      clothing,
    });
    await order.save();

    // Publish an event saying that an order was created

    res.status(201).send(order);
  }
);

export { router as createOrderRouter };
