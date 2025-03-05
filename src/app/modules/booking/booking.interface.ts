import { Types } from 'mongoose';

export interface IBooking {
  student: Types.ObjectId;
  tutor: Types.ObjectId;
  dateTime: Date;
  duration: number;
  address: string;
  status: 'Pending' | 'Paid' | 'Cancelled';
  totalPrice: number;
  phone: string;
  transaction: {
    id: string;
    transactionStatus: string;
    date_time: string;
    method: string;
    sp_message: string;
    sp_code: string;
    bank_status: string;
  };
}
