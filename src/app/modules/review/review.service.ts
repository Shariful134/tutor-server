import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.model';
import { IReview } from './review.interface';
import { Review } from './review.model';

// create review and comment
const createReviewIntoDB = async (payload: IReview) => {
  const student = await User.findById(payload.student);
  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student is not found!');
  }

  const tutor = await User.findById(payload.tutor);

  if (!tutor) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor is not found!');
  }

  const result = await Review.create(payload);
  return result;
};

//review and comment get
const getReviewCommentIntoDB = async () => {
  const result = await Review.find().populate('student').populate('tutor');
  if (!result.length) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Review and comment is not found!',
    );
  }
  return result;
};

//review and comment get signle
const getReviewCommentSignleIntoDB = async (id: string) => {
  const result = await Review.findById(id)
    .populate('student')
    .populate('tutor');
  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Review and comment is not found!',
    );
  }
  return result;
};

//review and comment get update
const UpdateReviewCommentIntoDB = async (
  id: string,
  payload: Partial<IReview>,
) => {
  const result = await Review.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Review and comment is not found!',
    );
  }
  return result;
};
//review and comment delete
const deleteReviewCommentIntoDB = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Review and comment is not found!',
    );
  }
  return result;
};

export const reviewServices = {
  createReviewIntoDB,
  getReviewCommentIntoDB,
  getReviewCommentSignleIntoDB,
  UpdateReviewCommentIntoDB,
  deleteReviewCommentIntoDB,
};
