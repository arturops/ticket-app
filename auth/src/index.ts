import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  //not localhost because we are using k8s service auth-mongo-svc
  // ALSO, we add a db 'auth'
  try {
    await mongoose.connect('mongodb://auth-mongo-svc:27017/auth');
    console.log('Auth connected to mongo db');
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log('==> Auth - listening on 3000');
});

// mongoose starts after our app starts
start();
