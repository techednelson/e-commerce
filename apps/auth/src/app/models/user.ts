import { model, Schema, Document, Model } from 'mongoose';
import { hashPassword } from '../services/password';

interface UserDoc extends Document {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: IUser): UserDoc;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await hashPassword(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.statics.build = (user: IUser) => new User(user);

const User = model<UserDoc, UserModel>('User', userSchema);

export default User;
