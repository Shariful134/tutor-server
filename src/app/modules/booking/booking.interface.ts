import { Types } from 'mongoose';

export interface IBooking {
  student: Types.ObjectId;
  tutor: Types.ObjectId;
  dateTime: Date;
  duration: number;
  status: 'pending' | 'paid' | 'canceled';
  totalPrice: number;
}
