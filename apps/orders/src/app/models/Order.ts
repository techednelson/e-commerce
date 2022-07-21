import { model, Schema, Document, Model } from 'mongoose';
import { ClothingDoc } from './Clothing';
import { OrderStatus } from '@e-commerce/shared';

interface OrderDoc extends Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  clothing: ClothingDoc;
}

interface IOrder {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  clothing: ClothingDoc;
}

interface OrderModel extends Model<OrderDoc> {
  build(order: IOrder): OrderDoc;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: { type: Schema.Types.Date },
    clothing: { type: Schema.Types.ObjectId, ref: 'Clothing' },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (order: IOrder) => new Order(order);

const Order = model<OrderDoc, OrderModel>('Order', orderSchema);

export default Order;
