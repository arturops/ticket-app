import mongoose from 'mongoose';
import { app } from './app';
import { mongoURI } from './config';

const start = async () => {
  //not localhost because we are using k8s service auth-mongo-svc
  // ALSO, we add a db 'auth'
  try {
    await mongoose.connect(mongoURI);
    console.log('Tickets connected to mongo db');
  } catch (err) {
    console.error(err);
  }
};

app.listen(3006, () => {
  console.log('==> Tickets - listening on 3006');
});

// mongoose starts after our app starts
start();
