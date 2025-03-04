import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.model';

//get all tutors
const getStudentsIntoDB = async () => {
  const result = await User.find();
  if (!result.length) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student is not found!');
  }
  const tutors = result.filter((tutor) => tutor.role == 'student');
  return tutors;
};

export const studentsServices = {
  getStudentsIntoDB,
};
