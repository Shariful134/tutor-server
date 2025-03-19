import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { authServices } from './auth.services';
import config from '../../config';

//registered user
const registerStudent = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await authServices.registerStudentIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student registered successfully',
    data: result,
  });
});

//changeProfile Img
const changeProfileImg = catchAsync(async (req, res) => {
  const file = req?.file;
  const { id } = req.params;
  const { userEmail } = req.user;
  const result = await authServices.changeProfileImgIntoDB(file, id, userEmail);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile Imgae Update successfully',
    data: result,
  });
});

//register as a tutor
const registerasTutor = catchAsync(async (req, res) => {
  const result = await authServices.registerasTutorIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tutor registered successfully',
    data: result,
  });
});

//update as a tutor
const updateTutor = catchAsync(async (req, res) => {
  const file = req?.file;
  const { userEmail } = req?.user;
  const { id } = req?.params;
  const result = await authServices.updateTutorIntoDB(
    file,
    userEmail,
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tutor Updated successfully',
    data: result,
  });
});

//login User
const loginUser = catchAsync(async (req, res, next) => {
  const result = await authServices.loginUserIntoDB(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login Successfully!',
    data: {
      accessToken,
    },
  });
});

export const authControllers = {
  changeProfileImg,
  registerStudent,
  updateTutor,
  registerasTutor,
  loginUser,
};
