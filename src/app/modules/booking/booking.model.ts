import { model, Schema, Types } from 'mongoose';
import { RequestBooking } from './booking.interface';

const RequestBookingSchema = new Schema<RequestBooking>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookingRequest: {
      type: Boolean,
      required: false,
      default: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    dateTime: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Cancelled'],
      default: 'Pending',
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    totalPrice: { type: Number, required: false },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[0-9]{10,15}$/, 'Invalid phone number'],
      required: false,
    },
    transaction: {
      type: {
        id: { type: String, required: false },
        transactionStatus: { type: String, required: false },
        date_time: { type: String, required: false },
        method: { type: String, required: false },
        sp_message: { type: String, required: false },
        sp_code: { type: String, required: false },
        bank_status: { type: String, required: false },
      },
      required: false,
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<RequestBooking>('Booking', RequestBookingSchema);
