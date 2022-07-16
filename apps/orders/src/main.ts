import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app/app';

const start = async () => {
  try {
    await mongoose.connect(process.env.ORDERS_MONGO_URI);
    console.log('connected to MongoDB');
    const port = process.env.port || 3334;
    await app.listen(port);
    console.log(`Listening at http://localhost:${port}/api/orders`);
  } catch (err) {
    console.error(err);
  }
};

start();
