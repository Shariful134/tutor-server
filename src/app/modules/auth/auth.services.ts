import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IUsers, TUserLogin } from './auth.interface';
import { User } from './auth.model';
import config from '../../config';
import jwt from 'jsonwebtoken';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

type TStudent = {
  name: string;
  email: string;
  role: string;
};

// create user
const registerStudentIntoDB = async (payload: TStudent) => {
  // return result;
  const user = await User.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Email already registered!');
  }

  const result = await User.create(payload);

  return result;
};
// change Profile img
const changeProfileImgIntoDB = async (file: any, id: string, email: string) => {
  const user = await User.findOne({ email });
  const findUser = await User.findById(id);

  //checking user is exists
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not Found!');
  }
  if (!findUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not Found!');
  }
  if (user?.role !== findUser?.role) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized!');
  }
  const imageName = user?.name;
  let imageLink;
  if (file) {
    imageLink = await sendImageToCloudinary(imageName, file?.path);
  }

  const profileImg = { profileImage: imageLink?.secure_url };

  const result = await User.findByIdAndUpdate(id, profileImg, {
    new: true,
  });
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to set your Profile');
  }

  return result;
};

// register as tutor
const registerasTutorIntoDB = async (payload: IUsers) => {
  const role = 'tutor';
  const tutorData = { ...payload, role };
  const result = await User.create(tutorData);
  return result;
};

// update as tutor
const updateTutorIntoDB = async (
  file: any,
  email: string,
  id: string,
  payload: Partial<IUsers>,
) => {
  const currenUser = await User.findOne({ email });
  const findUser = await User.findById(id);

  if (!currenUser?._id.equals(findUser?._id)) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Your are not Authorized!');
  }

  const imageName = currenUser?.name;
  let imageLink;
  if (file) {
    imageLink = await sendImageToCloudinary(imageName, file?.path);
  }

  const profileImage = imageLink?.secure_url;

  const payloads = { ...payload, profileImage };

  console.log(profileImage);
  console.log(payloads);
  const result = await User.findByIdAndUpdate({ _id: id }, payloads, {
    new: true,
  });
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
  changeProfileImgIntoDB,
  registerStudentIntoDB,
  updateTutorIntoDB,
  registerasTutorIntoDB,
  loginUserIntoDB,
};
