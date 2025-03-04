import { Types } from 'mongoose';

interface IReview {
  student: Types.ObjectId;
  tutor: Types.ObjectId;
  rating: number;
  comment?: string;
  timestamp: Date;
}
