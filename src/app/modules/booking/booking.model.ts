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
      enum: ['pending', 'paid', 'canceled'],
      default: 'pending',
    },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<IBooking>('Booking', bookingSchema);
