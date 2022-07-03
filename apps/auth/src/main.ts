import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app/app';
import { environment } from './environments/environment';

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-service:27017/auth');
    // await mongoose.connect(environment.dbURL);
    console.log('connected to MongoDB');

    const port = process.env.port || 3333;
    await app.listen(port);
    console.log(`Listening at http://localhost:${port}/api`);
  } catch (err) {
    console.error(err);
  }
};

start();
