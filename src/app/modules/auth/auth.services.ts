import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IUsers, TUserLogin } from './auth.interface';
import { User } from './auth.model';
import config from '../../config';
import jwt from 'jsonwebtoken';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

// create user
const registerIntoDB = async (payload: IUsers) => {
  // const result = await User.create(payload);

  // return result;
  const user = await User.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Email already registered!');
  }

  const result = await User.create(payload);

  return result;
};
// create as tutor
const registerasTutorIntoDB = async (
  file: any,
  email: string,
  payload: IUsers,
) => {
  // return result;
  const user = await User.isUserExistsByEmail(email);

  //checking user is exists
  let role;
  if (user) {
    role = 'tutor';
  } else {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not Found!');
  }

  const imageName = payload.name;
  const { secure_url } = await sendImageToCloudinary(imageName, file?.path);

  const tutorData = { ...payload, role, profileImage: secure_url };
  console.log('tutorData', tutorData);
  console.log(secure_url);
  console.log(file);
  const result = await User.findOneAndUpdate({ email }, tutorData, {
    new: true,
  });
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to set your Profile');
  }
  return result;
};

//logged user

const loginUserIntoDB = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!');
  }

  //checking if the password is correct or uncorrect
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password does not match!');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '30d',
    },
  );

  return { accessToken, refreshToken };
};

export const authServices = {
  registerIntoDB,
  registerasTutorIntoDB,
  loginUserIntoDB,
};
