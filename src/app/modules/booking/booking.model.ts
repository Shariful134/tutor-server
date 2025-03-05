import { model, Schema, Types } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    duration: {
      type: Number,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Cancelled'],
      default: 'Pending',
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    totalPrice: { type: Number, required: true },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[0-9]{10,15}$/, 'Invalid phone number'],
    },
    transaction: {
      id: String,
      transactionStatus: String,
      date_time: String,
      method: String,
      sp_message: String,
      sp_code: String,
      bank_status: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<IBooking>('Booking', bookingSchema);
