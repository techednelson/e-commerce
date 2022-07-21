import { model, Schema, Document, Model } from 'mongoose';
import Order from './Order';
import { OrderStatus } from '@e-commerce/shared';

interface IClothing {
  title: string;
  price: number;
}

export interface ClothingDoc extends Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

interface ClothingModel extends Model<ClothingDoc> {
  build(clothing: IClothing): ClothingDoc;
}

const clothingSchema = new Schema<IClothing>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
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

clothingSchema.statics.build = (clothing: IClothing) => new Clothing(clothing);

clothingSchema.methods.isReserved = async function () {
  // this === the clothing document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    clothing: this,
    status: {
      $in: [OrderStatus.Created, OrderStatus.Pending, OrderStatus.Complete],
    },
  });

  return !!existingOrder;
};

const Clothing = model<ClothingDoc, ClothingModel>('Clothing', clothingSchema);

export default Clothing;
