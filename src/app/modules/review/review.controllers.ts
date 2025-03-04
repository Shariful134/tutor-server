import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewServices } from './review.service';

//create
const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReviewIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review Create successfully!',
    data: result,
  });
});
const getReview = catchAsync(async (req, res) => {
  const result = await reviewServices.getReviewCommentIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review are Retrived successfully!',
    data: result,
  });
});
const getSingleReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewServices.getReviewCommentSignleIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review Retrived successfully!',
    data: result,
  });
});
const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewServices.UpdateReviewCommentIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review Updated successfully!',
    data: result,
  });
});
const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewServices.deleteReviewCommentIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review Delete successfully!',
    data: result,
  });
});

export const reviewControllers = {
  createReview,
  getReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
