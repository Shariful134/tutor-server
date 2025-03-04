import { model, Schema, Types } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    rating: {
      type: Number,
    },
    comment: {
      type: String,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<IReview>('Review', reviewSchema);
