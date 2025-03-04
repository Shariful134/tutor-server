import { Types } from 'mongoose';

interface Payment {
  student: Types.ObjectId;
  tutor: Types.ObjectId;
  amount: number;
  paymentMethod: string;
  status: 'completed' | 'pending';
  timestamp: Date;
}
