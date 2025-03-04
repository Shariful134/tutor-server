import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUsers, UserModel } from './auth.interface';
import config from '../../config';

const usersSchema = new Schema<IUsers>(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      minlength: [6, 'Password must be 6 characters'],
      select: false,
      trim: true,
    },
    role: {
      type: String,
      enum: ['student', 'tutor'],
      default: 'student',
    },
    bio: {
      type: String,
      required: false,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\+?[0-9]{10,15}$/, 'Invalid phone number'],
      required: false,
    },
    subjects: [{ type: String }],
    shift: {
      type: String,
      enum: ['Morning', 'Afternoon', 'Evening', 'Night'],
    },
    day: {
      type: String,
      enum: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      required: false,
    },
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

// hashing password and save into DB
usersSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// check user
usersSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

// check password
usersSchema.statics.isPasswordMatched = async function (
  planTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(planTextPassword, hashedPassword);
};

export const User = model<IUsers, UserModel>('User', usersSchema);
