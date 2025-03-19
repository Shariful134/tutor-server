import { StatusCodes } from 'http-status-codes';
import { IUsers } from '../auth/auth.interface';
import { User } from '../auth/auth.model';
import AppError from '../../errors/AppError';
import { IUserInfo } from '../../types/types';

// get All Users
const getAllUsersIntoDB = async () => {
  const result = await User.find();

  //checking User is exists
  if (!result.length) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not Found!');
  }

  return result;
};
// get user profile
const getUserProfileIntoDB = async (userInfo: IUserInfo) => {
  const { userEmail } = userInfo;
  const result = await User.findOneAndUpdate({ email: userEmail });

  //checking User is exists
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not Found!');
  }

  return result;
};

//update user
const updateUserIntoDB = async (
  userInfo: IUserInfo,
  payload: Partial<IUsers>,
) => {
  const { userEmail } = userInfo;
  const result = await User.findOneAndUpdate({ email: userEmail }, payload, {
    new: true,
  });

  //checking User is exists
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not Found!');
  }

  return result;
};
export const userServices = {
  getAllUsersIntoDB,
  updateUserIntoDB,
  getUserProfileIntoDB,
};
