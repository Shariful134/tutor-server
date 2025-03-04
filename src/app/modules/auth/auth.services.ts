import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IUsers, TUserLogin } from './auth.interface';
import { User } from './auth.model';
import config from '../../config';
import jwt from 'jsonwebtoken';

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
  loginUserIntoDB,
};
