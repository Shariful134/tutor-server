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
      select: 0,
      trim: true,
    },
    role: {
      type: String,
      enum: ['student', 'tutor', 'admin'],
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

    gradeLevel: {
      type: String,
      trim: true,
      required: false,
    },
    category: {
      type: String,
      required: false,
      trim: true,
    },
    hourlyRate: {
      type: Number,
      required: false,
      trim: true,
    },
    availability: [
      {
        day: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],

    ratings: [{ type: Number, min: 1, max: 5 }],
    subjects: [{ type: String }],
    profileImage: {
      type: String,
      required: false,
      trim: true,
    },
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
