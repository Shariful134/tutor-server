import { Types } from 'mongoose';

export interface RequestBooking {
  student: Types.ObjectId;
  tutor: Types.ObjectId;
  bookingRequest?: boolean;
  dateTime?: Date;
  duration?: number;
  address?: string;
  status?: 'Pending' | 'Paid' | 'Cancelled';
  totalPrice?: number;
  phone?: string;
  transaction?: {
    id?: string;
    transactionStatus?: string;
    date_time?: string;
    method?: string;
    sp_message?: string;
    sp_code?: string;
    bank_status?: string;
  };
}

// export interface IBooking {
//   dateTime: Date;
//   duration: number;
//   address: string;
//   status: 'Pending' | 'Paid' | 'Cancelled';
//   totalPrice: number;
//   phone: string;
//   transaction: {
//     id: string;
//     transactionStatus: string;
//     date_time: string;
//     method: string;
//     sp_message: string;
//     sp_code: string;
//     bank_status: string;
//   };
// }
