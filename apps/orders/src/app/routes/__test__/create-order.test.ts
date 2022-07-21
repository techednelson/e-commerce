import { Types } from 'mongoose';
import request from 'supertest';
import app from '../../app';
import Clothing from '../../models/Clothing';
import Order from '../../models/Order';

it('returns an error if the clothing does not exist', async () => {
  const clothingId = new Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ clothingId })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
  const clothing = Clothing.build({
    title: 'concert',
    price: 20,
  });
  await clothing.save();
  const order = Order.build({
    ticket,
    userId: 'laskdflkajsdf',
    // status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it('reserves a ticket', async () => {
  const ticket = Clothing.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it.todo('emits an order created event');
