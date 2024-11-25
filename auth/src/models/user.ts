import mongoose from 'mongoose';
import { Password } from '../utils/password';

// Interface that describes the properties of a User
// This is a Schema
interface UserAttrs {
  email: string;
  password: string;
}

// Interface that describes the properties
// that a User Model has. This is a Model, includes methods
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Interface that describes the properties of a
// User Document has. (Mongo data/document)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// hash the password before storing data in db
// Use the mongoose `.pre()` hook
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }

  done();
});

// method to build a new User(), helps
// validate types and args when creating a user
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// meaning <UserDoc-> the values aka doc format to validate
// , UserModel> -> the value type returned
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
