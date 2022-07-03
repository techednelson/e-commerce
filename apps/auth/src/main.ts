import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app/app';

const start = async () => {
  try {
    //Todo temp fix until figure out env or secrets in kubernetes
    await mongoose.connect(
      process.env.NX_MONGO_URL ?? 'mongodb://auth-mongo-service:27017/auth'
    );

    console.log('connected to MongoDB');
    const port = process.env.port || 3333;
    await app.listen(port);
    console.log(`Listening at http://localhost:${port}/api`);
  } catch (err) {
    console.error(err);
  }
};

start();
