import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.services';

//get user profile
const getUserProfile = catchAsync(async (req, res, next) => {
  const userInfo = req.user;
  const result = await userServices.getUserProfileIntoDB(userInfo);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User Retrieved Successfully',
    data: result,
  });
});

//update user profile
const updateUser = catchAsync(async (req, res, next) => {
  const userInfo = req.user;

  const result = await userServices.updateUserIntoDB(userInfo, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User updated Successfully',
    data: result,
  });
});

export const userControllers = {
  updateUser,
  getUserProfile,
};
