import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app/app';

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-service:27017/auth');
    // await mongoose.connect('mongodb://localhost:27017/auth');
    console.log('connected to MongoDB');

    const port = process.env.port || 3333;
    await app.listen(port);
    console.log(`Listening at http://localhost:${port}/auth`);
  } catch (err) {
    console.error(err);
  }
};

start();
